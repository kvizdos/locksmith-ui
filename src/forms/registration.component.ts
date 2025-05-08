import { LitElement, html, css } from "lit";
import { state, property, customElement } from "lit/decorators.js";
import { inputStyles } from "../styles/inputs.style";
import "firelight-ui/buttons/button.component";
import { ButtonComponent } from "firelight-ui/buttons/button.component";
import { createRef, ref, Ref } from "lit/directives/ref.js";
import { GenerateFingerprint } from "../helpers/fingerprint";
import "firelight-ui/icons/ui-icon.component";

@customElement("locksmith-registration")
export class LocksmithRegistrationComponent extends LitElement {
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

      #inputs {
        display: flex;
        flex-direction: column;
        gap: 1rem;
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

  @property() originOverride?: string = "";

  @property() forceEmail: string = "";

  @property() inviteCode: string = "";

  @property() appName: string = "FILL ME";

  @property() minimumPasswordLength: number = 6;
  @state()
  showingPassword: boolean = false;

  @state() errorMsg?: string = undefined;

  signUpRef: Ref<ButtonComponent> = createRef();

  emailRef: Ref<HTMLInputElement> = createRef();

  passwordRef: Ref<HTMLInputElement> = createRef();

  passwordConfirmationRef: Ref<HTMLInputElement> = createRef();

  firstUpdated() {
    this.emailRef.value?.focus();
  }

  canSignIn() {
    return (
      this.emailRef.value?.value.length > 0 &&
      this.passwordRef.value?.value.length > 0 &&
      this.passwordConfirmationRef.value?.value.length > 0
    );
  }

  doPasswordsMatch() {
    return (
      this.passwordRef.value?.value ===
      this.passwordConfirmationRef.value?.value
    );
  }

  async sendRegistrationRequest() {
    const body = {
      username: this.emailRef.value!.value,
      email: this.emailRef.value!.value,
      password: this.passwordRef.value!.value,
      code: this.inviteCode,
    };

    const resp = await fetch(`${this.originOverride ?? ""}/api/register`, {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (resp.status !== 200) {
      if (resp.status === 409) {
        throw new Error("This email is already being used.");
      }
      if (resp.status === 400) {
        const js = await resp.json();
        if (js.error === "password too short") {
          throw new Error("Password too short.");
        }
        if (js.error === "illegal username characters") {
          throw new Error("Email must be a valid email.");
        }
      }
      throw new Error("Something went wrong.");
    }
  }

  passwordLongEnough() {
    return this.passwordRef.value?.value.length >= this.minimumPasswordLength;
  }

  async attemptRegistration() {
    if (!this.canSignIn()) {
      this.errorMsg = "Please enter a username and password.";
      if (this.emailRef.value?.value.length === 0) {
        this.emailRef.value?.focus();
      } else if (this.passwordRef.value?.value.length === 0) {
        this.passwordRef.value?.focus();
      } else {
        this.passwordConfirmationRef.value?.focus();
      }
      return;
    }

    if (!this.doPasswordsMatch()) {
      this.errorMsg = "The password must match.";
      this.passwordConfirmationRef.value?.focus();
      return;
    }

    if (!this.passwordLongEnough()) {
      this.errorMsg = `Password must be at least ${this.minimumPasswordLength} characters long.`;
      this.passwordRef.value?.focus();
      return;
    }

    this.signUpRef.value!.loading = true;
    this.requestUpdate();

    try {
      await this.sendRegistrationRequest();
      window.location.href = "/login?onboard=true";
    } catch (e) {
      console.error(e);
      this.errorMsg = e.message;
    } finally {
      this.signUpRef.value!.loading = false;
    }
  }

  render() {
    return html` <div id="root">
      <div id="header">
        <h1>Sign up to ${this.appName}</h1>
        ${this.forceEmail.length === 0
          ? html`
              <p id="intro">
                Already have an account? <a href="/login">Sign in instead</a>
              </p>
            `
          : html``}
        <p id="error">${this.errorMsg}</p>
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
            value="${this.forceEmail}"
            ?disabled=${this.forceEmail.length > 0}
          />
        </div>

        <div class="input-container">
          <label for="password"
            >Password
            <button
              @click=${() => {
                this.showingPassword = !this.showingPassword;
              }}
            >
              <ui-icon
                name="${this.showingPassword ? "view-hidden" : "view-visible"}"
                size="1rem"
              ></ui-icon>
              <p>${this.showingPassword ? "Hide" : "Show"}</p>
            </button>
          </label>
          <p>Must be at least ${this.minimumPasswordLength} characters long.</p>
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
        ${ref(this.signUpRef)}
        class="big"
        .expectLoad=${true}
        .loadingText=${"Signing Up.."}
        @fl-click=${this.attemptRegistration}
        >Sign Up</button-component
      >
    </div>`;
  }
}
