import { LitElement, html, css } from "lit";
import { state, property, customElement } from "lit/decorators.js";
import { inputStyles } from "../styles/inputs.style";
import "firelight-ui/buttons/button.component";
import { ButtonComponent } from "firelight-ui/buttons/button.component";
import { createRef, ref, Ref } from "lit/directives/ref.js";
import { GenerateFingerprint } from "../helpers/fingerprint";
import "firelight-ui/icons/ui-icon.component";

@customElement("locksmith-verify-email")
export class LocksmithVerifyEmailComponent extends LitElement {
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
        opacity: 1;
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

      p#resend {
        color: var(--accent);
        margin-top: 0.5rem;
      }

      a {
        color: var(--accent);
      }

      button {
        cursor: pointer;
      }

      ui-icon {
        --primary-600: var(--accent);
        --primary-500: var(--accent);
      }

      #email {
        font-size: 1rem;
        padding: 0.75rem;
        background-color: var(--gray-50, #f8f8f8);
        border: 1px solid var(--gray-200, #dcdcdc);
        border-radius: 0.25rem;
      }
    `,
  ];

  resendButtonRef: Ref<ButtonComponent> = createRef();

  @property() originOverride?: string = "";

  @property() email: string = "";

  @state() errorMsg?: string = undefined;

  @state() didResend: boolean = false;

  @state() loadedOnce: boolean = false;

  @state() resendDisabled: boolean = true;

  @state() resendSecondsLeft: number = 0;

  constructor() {
    super();

    this.startResendPeriod(30);
  }

  private startResendPeriod(duration: number) {
    this.resendDisabled = true;
    this.resendSecondsLeft = duration;

    const interval = setInterval(() => {
      this.resendSecondsLeft--;

      if (this.resendSecondsLeft <= 0) {
        clearInterval(interval);
        this.resendDisabled = false;
      }
    }, 1000);
  }

  private async resendLink() {
    if (this.resendDisabled) {
      return;
    }

    try {
      this.resendButtonRef.value!.loading = true;
      const resp = await fetch(
        `${this.originOverride ?? ""}/api/verify/resend`,
        {
          method: "POST",
        },
      );

      this.startResendPeriod(60);

      if (resp.status !== 200) {
        if (resp.status === 429) {
          this.errorMsg = "Please wait before trying again or contact support.";
          return;
        }

        this.errorMsg = "Please contact support.";
        return;
      }

      this.didResend = true;
    } catch (err) {
      console.error(err);
      this.errorMsg = "Please contact support.";
    } finally {
      this.resendButtonRef.value!.loading = false;
    }
  }

  render() {
    return html`<div id="root">
      <div id="header">
        <h1>Please verify your email.</h1>
        ${this.errorMsg
          ? html`<p
              id="error"
              aria-live="assertive"
              role="status"
              aria-atomic="true"
              aria-relevant="additions"
            >
              ${this.errorMsg}
            </p>`
          : html``}
        ${this.didResend
          ? html`<p
              id="resend"
              aria-live="assertive"
              role="status"
              aria-atomic="true"
              aria-relevant="additions"
            >
              Verification resent successfully.
            </p>`
          : html``}
        <p id="intro">
          We've sent an email to the following email address. Please click the
          verification link in the email to continue.<br /><br />

          <strong>Didn't get the email?</strong> Make sure to check your spam
          folder.<br /><br />

          <strong>Mistype the email?</strong> Please contact support and we'll
          get it changed.
        </p>
      </div>

      <p id="email">${this.email}</p>

      <button-component
        ${ref(this.resendButtonRef)}
        class="big"
        .expectLoad=${true}
        .disabled=${this.resendDisabled}
        .loadingText=${"Sending.."}
        @fl-click=${this.resendLink}
      >
        ${this.resendDisabled
          ? `Resend in ${this.resendSecondsLeft}s...`
          : "Resend Link"}</button-component
      >
    </div>`;
  }
}
