import { LitElement, html, css, PropertyValueMap } from "lit";
import { state, property, customElement } from "lit/decorators.js";
import { inputStyles } from "../styles/inputs.style";
import "firelight-ui/buttons/button.component";
import { ButtonComponent } from "firelight-ui/buttons/button.component";
import { createRef, ref, Ref } from "lit/directives/ref.js";
import { GenerateFingerprint } from "../helpers/fingerprint";
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
        margin-top: 0.5rem;
      }

      #spinner {
        width: 2rem;
        height: 2rem;
        border: 3px solid #e5e5e5;
        border-top-color: var(--accent);
        border-radius: 999px;
        animation: spin 0.8s linear infinite;
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
      const resp = await fetch(`/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Packet ${this.registrationPacketJWT}`,
        },
      });
      if (!resp.ok) {
        this.errorMsg = await resp.text();
        return;
      }
    } catch (e) {
      console.log(e);
      this.errorMsg = "Failed to register";
    }
  }

  render() {
    return html`
      <div id="root">
        ${!this.errorMsg
          ? html`<div id="spinner" aria-label="Loading"></div>`
          : html``}
        <div id="header">
          <h1>Setting up your ${this.appName} account..</h1>

          <p id="intro">This should only take a moment.</p>
          ${this.errorMsg ? html`<p id="error">${this.errorMsg}</p>` : html``}
        </div>
      </div>
    `;
  }
}
