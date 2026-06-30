import { LitElement, html, css } from "lit";
import { state, property, customElement } from "lit/decorators.js";
import { inputStyles } from "../styles/inputs.style";
import "firelight-ui/buttons/button.component";
import "firelight-ui/icons/ui-icon.component";

@customElement("locksmith-register-trusted")
export class LocksmithRegisterTrustedComponent extends LitElement {
  static styles = [
    inputStyles,
    css`
      :host {
        display: block;
      }

      * {
        box-sizing: border-box;
        margin: 0;
        touch-action: manipulation;
      }

      #root {
        display: flex;
        gap: 2rem;
        flex-direction: column;
      }

      #header h1 {
        font-size: 1.5rem;
        font-weight: 500;
      }

      #header p#intro {
        font-weight: 300;
        margin-top: 0.5rem;
        font-size: 0.85rem;
        color: #464646;
        line-height: 1.15rem;
      }

      p#error {
        color: #b8123a;
        margin-top: 0.75rem;
        font-size: 0.85rem;
        line-height: 1.15rem;
      }

      #spinner {
        width: 2rem;
        height: 2rem;
        border: 3px solid #e5e5e5;
        border-top-color: var(--accent);
        border-radius: 999px;
        animation: spin 0.8s linear infinite;
      }

      #actions {
        margin-top: 1rem;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ];

  @property() appName: string = "FILL ME";
  @property() registrationPacketJWT?: string;

  @state() errorMsg?: string;

  protected firstUpdated(): void {
    this.swapRegistrationPacket();
  }

  private async swapRegistrationPacket() {
    if (!this.registrationPacketJWT) return;

    try {
      const registerResp = await fetch(`/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Packet ${this.registrationPacketJWT}`,
        },
      });

      if (!registerResp.ok) {
        this.errorMsg = await registerResp.text();
        return;
      }

      const registerJson = await registerResp.json();

      if (!registerJson.token) {
        this.errorMsg =
          "Registration finished, but sign in could not be completed.";
        return;
      }

      const loginResp = await fetch(`/api/login`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${registerJson.token}`,
        },
      });

      if (!loginResp.ok) {
        this.errorMsg = await loginResp.text();
        return;
      }

      let url = "/app";

      const urlParams = new URLSearchParams(window.location.search);
      const rawBackTo = urlParams.get("b");

      if (rawBackTo) {
        const backTo = decodeURIComponent(rawBackTo);
        if (backTo.length > 0 && backTo[0] === "/") {
          url = backTo;
        }
      }

      window.location.href = url;
    } catch (e) {
      console.error(e);
      this.errorMsg = "Failed to finish registration";
    }
  }

  private retryRegistration() {
    window.location.href = "/register";
  }

  render() {
    const hasError = !!this.errorMsg;

    return html`
      <div id="root">
        ${!hasError
          ? html`<div id="spinner" aria-label="Loading"></div>`
          : html``}

        <div id="header">
          <h1>
            ${hasError
              ? "Something went wrong"
              : html`Setting up your ${this.appName} account..`}
          </h1>

          <p id="intro">
            ${hasError
              ? "This registration may have expired. This can happen when too much time passes after starting registration with your sign-in provider."
              : "This should only take a moment."}
          </p>

          ${hasError
            ? html`
                <p id="error">${this.errorMsg}</p>

                <div id="actions">
                  <button-component
                    class="big"
                    @click=${this.retryRegistration}
                  >
                    Go Back
                  </button-component>
                </div>
              `
            : html``}
        </div>
      </div>
    `;
  }
}
