import { LitElement, html, css } from "lit";
import { state, property, customElement } from "lit/decorators.js";
import { inputStyles } from "../styles/inputs.style";
import "firelight-ui/buttons/button.component";
import { ButtonComponent } from "firelight-ui/buttons/button.component";
import { createRef, ref, Ref } from "lit/directives/ref.js";
import { GenerateFingerprint } from "../helpers/fingerprint";
import "firelight-ui/icons/ui-icon.component";

@customElement("locksmith-reset-password")
export class LocksmithResetPasswordComponent extends LitElement {
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

      #root.hide {
        opacity: 0;
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

      #inputs {
        display: flex;
        flex-direction: column;
        gap: 1rem;
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
    `,
  ];

  @property() hasResetCode: string = "";

  @property() appName: string = "FILL ME";

  @property() originOverride?: string = "";

  @property() minimumPasswordLength: number = 6;

  @state() showingPassword: boolean = false;

  @state() errorMsg?: string = undefined;

  @state() loadedOnce: boolean = false;

  @state() stage: 0 | 1 | 2 = 0;

  passwordRef: Ref<HTMLInputElement> = createRef();

  passwordConfirmationRef: Ref<HTMLInputElement> = createRef();

  resetButtonRef: Ref<ButtonComponent> = createRef();

  emailRef: Ref<HTMLInputElement> = createRef();

  resetFullyButtonRef: Ref<ButtonComponent> = createRef();

  firstUpdated() {
    this.emailRef.value?.focus();
    this.passwordRef.value?.focus();
    setTimeout(() => {
      this.loadedOnce = true;
    });
  }

  async attemptReset() {
    if (this.emailRef.value?.value.length === 0) {
      this.errorMsg = "Please enter an email address.";
      return;
    }

    this.resetButtonRef.value!.loading = true;

    const resp = await fetch(
      `${this.originOverride ?? ""}/api/reset-password?username=${this.emailRef.value!.value}`,
      {
        method: "POST",
      },
    );

    if (resp.status !== 200) {
      console.error("Something bad happened while resetting a password");
      this.errorMsg = "Something went wrong. Please try again later.";
      return;
    }

    this.stage = 1;
  }

  doPasswordsMatch() {
    return (
      this.passwordRef.value?.value ===
      this.passwordConfirmationRef.value?.value
    );
  }

  passwordLongEnough() {
    return this.passwordRef.value?.value.length >= this.minimumPasswordLength;
  }

  async fullyResetPassword() {
    if (!this.doPasswordsMatch()) {
      this.errorMsg = "The password must match.";
      return;
    }

    if (!this.passwordLongEnough()) {
      this.errorMsg = `Password must be at least ${this.minimumPasswordLength} characters long.`;
      this.passwordRef.value?.focus();
      return;
    }

    this.resetFullyButtonRef.value!.loading = true;

    const resp = await fetch(
      `${this.originOverride ?? ""}/api/reset-password`,
      {
        method: "PATCH",
        body: JSON.stringify({
          password: this.passwordRef.value!.value,
        }),
      },
    );

    if (resp.status !== 200) {
      console.error("Something bad happened while resetting a password");
      this.errorMsg = "Something went wrong. Please try again later.";
      return;
    }

    this.stage = 2;
  }

  render() {
    if (this.stage == 2) {
      return html`<div id="root" class="${this.loadedOnce ? "" : "hide"}">
        <div id="header">
          <h1>Your password has been reset.</h1>
          <p id="intro">
            <strong>You may now login using the new password.</strong> If you
            need any help, feel free to contact us.
          </p>
        </div>

        <a href="/login">Go to Login</a>
      </div>`;
    }
    if (this.hasResetCode !== "") {
      return html`<div id="root" class="${this.loadedOnce ? "" : "hide"}">
        <div id="header">
          <h1>Welcome back! Please enter a new password</h1>
          <p
            id="error"
            aria-live="assertive"
            role="status"
            aria-atomic="true"
            aria-relevant="additions"
          >
            ${this.errorMsg ? this.errorMsg : ""}
          </p>
        </div>
        <div id="inputs">
          <div class="input-container">
            <label for="password"
              >Password
              <button
                @click=${() => {
                  this.showingPassword = !this.showingPassword;
                }}
              >
                <ui-icon
                  name="${this.showingPassword
                    ? "view-hidden"
                    : "view-visible"}"
                  size="1rem"
                ></ui-icon>
                <p>${this.showingPassword ? "Hide" : "Show"}</p>
              </button>
            </label>
            <p>
              Must be at least ${this.minimumPasswordLength} characters long.
            </p>
            <input
              id="password"
              ${ref(this.passwordRef)}
              autocomplete="new-password"
              type="${this.showingPassword ? "text" : "password"}"
              placeholder="Your password"
            />
          </div>

          <div class="input-container">
            <label for="password">Confirm your Password</label>
            <input
              id="password"
              ${ref(this.passwordConfirmationRef)}
              autocomplete="new-password"
              type="${this.showingPassword ? "text" : "password"}"
              placeholder="Confirm your Password"
            />
          </div>
        </div>
        <button-component
          ${ref(this.resetFullyButtonRef)}
          class="big"
          .expectLoad=${true}
          .loadingText=${"Resetting.."}
          @fl-click=${this.fullyResetPassword}
          >Reset Password</button-component
        >
      </div>`;
    }
    if (this.stage == 1) {
      return html` <div id="root" class="${this.loadedOnce ? "" : "hide"}">
        <div id="header">
          <h1>Please check your email.</h1>
          <p id="intro">
            <strong>You may now safely close this window.</strong> If we have an
            account associated with the email address provided, you'll receive
            an email shortly with instructions to reset your password. Be sure
            to check your spam folder. If you need any help, feel free to
            contact us.
          </p>
        </div>
      </div>`;
    }

    return html` <div id="root" class="${this.loadedOnce ? "" : "hide"}">
      <div id="header">
        <h1>Forgot Password</h1>
        <p id="intro">
          Please enter your email address. We will email you a link to reset
          your password.
        </p>
        <p
          id="error"
          aria-live="assertive"
          role="status"
          aria-atomic="true"
          aria-relevant="additions"
        >
          ${this.errorMsg ? this.errorMsg : ""}
        </p>
      </div>

      <div id="inputs">
        <div class="input-container">
          <label for="username">Email Address</label>
          <input
            id="username"
            ${ref(this.emailRef)}
            autofill="username"
            autocapitalize="off"
            autocapitalize="off"
            placeholder="Your email"
          />
        </div>
      </div>

      <button-component
        ${ref(this.resetButtonRef)}
        class="big"
        .expectLoad=${true}
        .loadingText=${"Sending.."}
        @fl-click=${this.attemptReset}
        >Send Reset Link</button-component
      >
    </div>`;
  }
}
