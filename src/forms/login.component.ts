import { LitElement, html, css } from "lit";
import { state, property, customElement } from "lit/decorators.js";
import { inputStyles } from "../styles/inputs.style";
import "firelight-ui/buttons/button.component";
import { ButtonComponent } from "firelight-ui/buttons/button.component";
import { createRef, ref, Ref } from "lit/directives/ref.js";
import { GenerateFingerprint } from "../helpers/fingerprint";
import "firelight-ui/icons/ui-icon.component";

export interface LoginOptions {
  OauthProviders: string[];
  PathToOnboard?: string;
  PublicRegistrationsDisabled?: boolean;
}

@customElement("locksmith-login")
export class LocksmithLoginComponent extends LitElement {
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

      #inputs .input-container:last-of-type {
        margin-top: 1rem;
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
      }

      p#error {
        color: #b8123a;
        margin-top: 0.5rem;
      }

      a {
        color: var(--accent);
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

      ui-icon {
        --primary-600: var(--accent);
        --primary-500: var(--accent);
      }
    `,
  ];

  @property() jsonSettings: string = "";

  @property() appName: string = "FILL ME";

  @property() settings: LoginOptions = {
    OauthProviders: [],
  };

  @property() originOverride?: string = "";

  @state() showingPassword: boolean = false;

  @state() errorMsg?: string = undefined;

  @state() loadedOnce: boolean = false;

  @state() isOnboarding: boolean = false;

  signInRef: Ref<ButtonComponent> = createRef();

  emailRef: Ref<HTMLInputElement> = createRef();

  passwordRef: Ref<HTMLInputElement> = createRef();

  connectedCallback(): void {
    super.connectedCallback();
    const onboardParam = new URLSearchParams(window.location.search).get(
      "onboard",
    );

    if (onboardParam === "true") {
      this.isOnboarding = true;
    }
  }

  firstUpdated() {
    this.emailRef.value?.focus();
    if (this.jsonSettings !== "") {
      setTimeout(() => {
        this.settings = JSON.parse(this.jsonSettings);
        this.loadedOnce = true;
      });
    }
  }

  canSignIn() {
    return (
      this.emailRef.value?.value.length > 0 &&
      this.passwordRef.value?.value.length > 0
    );
  }

  async sendLoginRequest() {
    const fp = await GenerateFingerprint();
    const body = {
      username: this.emailRef.value!.value,
      password: this.passwordRef.value!.value,
      fingerprint: fp,
    };

    const resp = await fetch(`${this.originOverride ?? ""}/api/login`, {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (resp.status !== 200) {
      const js = await resp.json();
      if (js.error) {
        throw new Error(js.error);
      }
      throw new Error("Something went wrong.");
    }
  }

  async attemptSignIn() {
    this.errorMsg = undefined;
    if (!this.canSignIn()) {
      this.errorMsg = `Please enter your username and password.`;
      // this.errorMsg =
      //   "Please enter your username and password." + crypto.randomUUID();
      if (this.emailRef.value?.value.length === 0) {
        this.emailRef.value?.focus();
      } else {
        this.passwordRef.value?.focus();
      }
      return;
    }

    this.signInRef.value!.loading = true;
    this.requestUpdate();

    try {
      await this.sendLoginRequest();
      window.location.href =
        this.isOnboarding && this.settings.PathToOnboard !== undefined
          ? this.settings.PathToOnboard
          : "/app";
    } catch (e) {
      console.error(e);
      this.errorMsg = undefined;
      await this.updateComplete;
      this.errorMsg = e.message;
    } finally {
      this.signInRef.value!.loading = false;
    }
  }

  render() {
    return html` <div id="root" class="${this.loadedOnce ? "" : "hide"}">
      <div id="header">
        <h1>Sign in to ${this.appName}</h1>
        ${this.settings.PublicRegistrationsDisabled !== true ||
        this.isOnboarding
          ? html`
              <p id="intro">
                ${!this.isOnboarding
                  ? html`Need an account?
                      <a href="/register">Create account</a>`
                  : html`<strong>Welcome!</strong> Please sign in for the first
                      time.`}
              </p>
            `
          : html``}
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

        <div class="input-container">
          <label for="password"
            >Password
            <button
              aria-label="${this.showingPassword
                ? "Hide password"
                : "Show password"}"
              tabindex="-1"
              @click=${() => {
                const t = this.passwordRef.value!.type;
                this.passwordRef.value!.type =
                  t === "password" ? "text" : "password";
                if (t === "text") {
                  this.showingPassword = false;
                } else {
                  this.showingPassword = true;
                }
              }}
            >
              <ui-icon
                name="${this.showingPassword ? "view-hidden" : "view-visible"}"
                size="1rem"
              ></ui-icon>
              <p>${this.showingPassword ? "Hide" : "Show"}</p>
            </button>
          </label>
          <input
            id="password"
            ${ref(this.passwordRef)}
            autofill="password"
            type="password"
            placeholder="Your password"
          />
        </div>
      </div>

      <div id="signInArea">
        <button-component
          ${ref(this.signInRef)}
          class="big"
          .expectLoad=${true}
          .loadingText=${"Signing in.."}
          @fl-click=${this.attemptSignIn}
          >Sign in</button-component
        >

        <a href="/reset-password">Forgot Password</a>
      </div>

      ${this.settings.OauthProviders.length > 0
        ? html`
            <div class="hr-split">
              <hr />
              <p>Or...</p>
              <hr />
            </div>
          `
        : undefined}
      ${this.settings.OauthProviders.map(
        (provider) => html`
      <a class="oauth" href="/api/auth/oauth/${provider}">
        <img src="/api/auth/oauth/${provider}/logo"></img>
          Sign in with ${provider}
          <span></span></a>
      `,
      )}
    </div>`;
  }
}
