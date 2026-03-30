import { LitElement, html, css } from "lit";
import { state, property, customElement } from "lit/decorators.js";
import { inputStyles } from "../styles/inputs.style";
import "firelight-ui/icons/ui-icon.component";

@customElement("locksmith-verify-code")
export class LocksmithVerifyCodeComponent extends LitElement {
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
        flex-direction: column;
        gap: 1rem;
        opacity: 1;
      }

      #header h1 {
        font-size: 1.5rem;
        font-weight: 500;
      }

      #header p#intro {
        font-weight: 300;
        margin-top: 0.5rem;
        font-size: 0.9rem;
        color: #464646;
        line-height: 1.35rem;
      }

      p#error {
        color: #b8123a;
        margin-top: 0.5rem;
      }

      p#success {
        color: var(--accent);
        margin-top: 0.5rem;
      }

      #loadingState {
        min-height: 220px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      #loadingCard {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        text-align: center;
      }

      .spinner {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 999px;
        border: 3px solid rgba(0, 0, 0, 0.12);
        border-top-color: var(--accent);
        animation: spin 0.8s linear infinite;
        flex-shrink: 0;
      }

      #loadingTitle {
        font-size: 1.1rem;
        font-weight: 500;
        color: #1f1f1f;
      }

      #loadingText {
        font-size: 0.92rem;
        line-height: 1.35rem;
        color: #5a5a5a;
        max-width: 24rem;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      ui-icon {
        --primary-600: var(--accent);
        --primary-500: var(--accent);
      }
    `,
  ];

  @property() originOverride?: string = "";
  @property() code: string = "";

  @state() errorMsg?: string = undefined;
  @state() didVerify = false;
  @state() isExchanging = true;

  constructor() {
    super();
    this.exchangeCode();
  }

  private async exchangeCode() {
    this.isExchanging = true;
    this.errorMsg = undefined;
    this.didVerify = false;

    try {
      const resp = await fetch(
        `${this.originOverride ?? ""}/api/verify/exchange`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            code: this.code,
          }),
        },
      );

      if (!resp.ok || resp.status !== 200) {
        if (resp.status === 429) {
          this.errorMsg =
            "This verification link has expired. Please request a new one.";
        } else {
          this.errorMsg =
            "Failed to verify this link. Please try verification again.";
        }
        return;
      }

      window.location.href = "/app";
    } catch (err) {
      console.error(err);
      this.errorMsg = "Please contact support.";
    } finally {
      this.isExchanging = false;
    }
  }

  private getTitle() {
    if (this.errorMsg) return "Failed to verify";
    if (this.didVerify) return "Verification successful";
    return "Verifying";
  }

  render() {
    if (this.isExchanging) {
      return html`
        <div
          id="loadingState"
          aria-live="polite"
          role="status"
          aria-atomic="true"
        >
          <div id="loadingCard">
            <div class="spinner" aria-hidden="true"></div>
            <p id="loadingTitle">Verifying your account</p>
            <p id="loadingText">
              Please wait a moment while we verify your account.
            </p>
          </div>
        </div>
      `;
    }

    return html`
      <div id="root">
        <div id="header">
          <h1>${this.getTitle()}.</h1>

          ${this.errorMsg
            ? html`
                <p
                  id="error"
                  aria-live="assertive"
                  role="status"
                  aria-atomic="true"
                  aria-relevant="additions"
                >
                  ${this.errorMsg}
                </p>
              `
            : html``}
          ${this.didVerify
            ? html`
                <p
                  id="success"
                  aria-live="polite"
                  role="status"
                  aria-atomic="true"
                >
                  You'll be redirected momentarily...
                </p>
              `
            : html``}

          <p id="intro">
            ${this.didVerify
              ? "Your email has been verified successfully."
              : "We couldn't verify this link."}
          </p>
        </div>
      </div>
    `;
  }
}
