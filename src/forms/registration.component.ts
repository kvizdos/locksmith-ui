import { LitElement, html, css } from "lit";
import { state, property, customElement } from "lit/decorators.js";
import { inputStyles } from "../styles/inputs.style";
import "firelight-ui/buttons/button.component";
import { ButtonComponent } from "firelight-ui/buttons/button.component";
import { createRef, ref, Ref } from "lit/directives/ref.js";
import { GenerateFingerprint } from "../helpers/fingerprint";
import "firelight-ui/icons/ui-icon.component";

export interface RegistrationOptions {
  OauthProviders: string[];
}

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

      button#didYouMean {
        background: none;
        border: none;
        color: #b8123a;
        font-size: 0.85rem;
        text-align: left;
        margin-bottom: 0.5rem;
        padding: 0;
      }

      button#didYouMean > span {
        text-decoration: underline;
      }

      ui-icon {
        --primary-600: var(--accent);
        --primary-500: var(--accent);
      }

      a.oauth {
        border: 1px solid var(--input-border, #bdbdbd);
        background: #fff;
        font-size: 1rem;
        padding: 0.75rem;
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        color: #000;
        text-decoration: none;
        color: #000;
      }

      a.oauth img {
        height: 1rem;
      }

      button {
        cursor: pointer;
      }
      hr {
        border: 0;
        border-bottom: 1px solid #dcdcdc;
      }
      .hr-split {
        align-items: center;
        display: flex;
        gap: 1rem;
        width: 100%;
      }
      .hr-split hr {
        width: 100%;
        height: 0px;
      }
      .hr-split p {
        font-weight: 600;
        color: #7c7c7c;
      }
      #signInArea a {
        margin-top: 1rem;
        display: block;
        font-size: 0.85rem;
        width: fit-content;
      }
    `,
  ];

  @property() jsonSettings: string = "";

  @state() settings: RegistrationOptions = {
    OauthProviders: [],
  };

  @property() originOverride?: string = "";

  @property() forceEmail: string = "";

  @property() inviteCode: string = "";

  @property() appName: string = "FILL ME";

  @property() minimumPasswordLength: number = 6;
  @state()
  showingPassword: boolean = false;

  @state() errorMsg?: string = undefined;

  @state() didYouMean?: string;

  @state() confirmEmailRequired: boolean = false;

  @state() validationok: boolean = false;

  @state() loadingProvider?: string = undefined;

  @state() passwordValue = "";

  signUpRef: Ref<ButtonComponent> = createRef();

  emailRef: Ref<HTMLInputElement> = createRef();

  passwordRef: Ref<HTMLInputElement> = createRef();

  passwordConfirmationRef: Ref<HTMLInputElement> = createRef();

  firstUpdated() {
    this.emailRef.value?.focus();
    if (this.jsonSettings !== "") {
      setTimeout(() => {
        try {
          this.settings = JSON.parse(this.jsonSettings);
        } catch (err) {
          console.error("Invalid JSON in jsonSettings:", this.jsonSettings);
          throw err;
        }
      });
    }
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
      validationok: this.validationok,
    };

    this.validationok = false;
    this.confirmEmailRequired = false;
    this.didYouMean = undefined;

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
        if (js.rejectEmail) {
          throw new Error(
            "This email address is invalid. If you need help, please contact support.",
          );
        }
        if (js.confirmEmail) {
          if (js.didYouMean) {
            this.didYouMean = js.didYouMean;
          }
          this.confirmEmailRequired = true;
          this.validationok = true;
          throw new Error(
            "We couldn't verify this email address. Please double-check for typos before trying again.",
          );
        }
      }
      throw new Error("Something went wrong.");
    }
  }

  passwordLongEnough() {
    return this.passwordRef.value?.value.length >= this.minimumPasswordLength;
  }

  async attemptRegistration() {
    this.errorMsg = undefined;
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
      this.errorMsg = e.message;
    } finally {
      this.signUpRef.value!.loading = false;
    }
  }

  private renderOauthMethod(provider: string) {
    return html`
      ${this.loadingProvider === provider
        ? `Continuing with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`
        : `Continue with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`}
    `;
  }

  private makeBackedLink(to: string): string {
    const urlParams = new URLSearchParams(window.location.search);
    const rawBackTo = urlParams.get("b");
    let back: string;
    if (rawBackTo) {
      const backTo = decodeURIComponent(rawBackTo);
      if (backTo.length > 0 && backTo[0] === "/") {
        back = backTo;
      }
    }

    const searchParams = new URLSearchParams({
      page: back,
    });
    return `/${to}${back ? `?${searchParams.toString()}` : ""}`;
  }

  render() {
    return html` <div id="root">
      <div id="header">
        <h1>Sign up to ${this.appName}</h1>
        ${this.forceEmail.length === 0
          ? html`
              <p id="intro">
                Already have an account?
                <a href="${this.makeBackedLink("login")}">Sign in instead</a>
              </p>
            `
          : html``}
        <p id="error">${this.errorMsg}</p>
      </div>

      <div id="inputs">
        <div class="input-container">
          <label for="username">Email Address</label>
          ${this.didYouMean
            ? html`<button
                id="didYouMean"
                @click=${() => {
                  this.emailRef.value!.value = this.didYouMean;
                  this.emailRef.value!.focus();
                  this.didYouMean = undefined;
                }}
              >
                Did you mean <span>${this.didYouMean}</span>?
              </button>`
            : html``}
          <input
            id="username"
            ${ref(this.emailRef)}
            autofill="username"
            autocapitalize="off"
            autocapitalize="off"
            placeholder="Your email"
            value="${this.forceEmail}"
            ?disabled=${this.forceEmail.length > 0}
            @input=${() => {
              this.validationok = false;
              this.didYouMean = undefined;
            }}
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
            @input=${(e: Event) => {
              this.passwordValue = (e.target as HTMLInputElement).value;
            }}
            type="${this.showingPassword ? "text" : "password"}"
            placeholder="Your password"
          />
        </div>

        ${this.passwordValue.length > 0
          ? html`
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
            `
          : html``}
      </div>

      <button-component
        ${ref(this.signUpRef)}
        class="big"
        .expectLoad=${true}
        .loadingText=${"Signing Up.."}
        @fl-click=${this.attemptRegistration}
        >${this.confirmEmailRequired
          ? "Confirm & Sign Up"
          : "Sign Up"}</button-component
      >

      ${this.passwordValue.length === 0
        ? html` ${this.settings.OauthProviders.length > 0
            ? html`
                <div class="hr-split">
                  <hr />
                  <p>Or...</p>
                  <hr />
                </div>
              `
            : undefined}
          ${this.settings.OauthProviders.map((provider) => {
            const urlParams = new URLSearchParams(window.location.search);
            const rawBackTo = urlParams.get("b");
            let back: string;
            if (rawBackTo) {
              const backTo = decodeURIComponent(rawBackTo);
              if (backTo.length > 0 && backTo[0] === "/") {
                back = backTo;
              }
            }

            const searchParams = new URLSearchParams({
              page: back,
            });
            const url = `/api/login/${provider}${back ? `?${searchParams.toString()}` : ""}`;

            return html`
      <a class="oauth" href="${url}"
          @click=${(e: Event) => {
            e.preventDefault();
            this.loadingProvider = provider;
            window.location.href = (e.currentTarget as HTMLAnchorElement).href;
          }}>
        <img src="/api/login/${provider}/logo"></img>
            ${this.renderOauthMethod(provider)}
          <span></span></a>
      `;
          })}`
        : html``}
    </div>`;
  }
}
