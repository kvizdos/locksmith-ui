import { LitElement, html, css } from "lit";
import "firelight-ui/icons/ui-icon.component";
import { aboutMe } from "../aboutme.state";
import { StateController } from "@lit-app/state";
import { customElement, property, state } from "lit/decorators.js";
import { ref, createRef, Ref } from "lit/directives/ref.js";

@customElement("locksmith-user-icon")
export class LocksmithUserIconComponent extends LitElement {
  static styles = [
    css`
      #box {
        background-color: #d9eaff;
        position: relative;
        width: 1.25rem;
        aspect-ratio: 1/1;
        overflow: hidden;
        border-radius: 100%;
        border: 2px solid var(--primary-700, #1448e1);
        transition: 200ms;
        outline: 0px solid #8ec4ff;
        cursor: pointer;
        box-sizing: content-box;
        padding: 0;
      }

      #box:hover,
      #box:focus-visible {
        --primary-600: #1a5cf4;
        outline: 3px solid #d9eaff;
        transition: 200ms;
      }

      #box ui-icon {
        position: absolute;
        bottom: -4px;
        left: 0;
        --primary-600: var(--primary-900, #1a5cf4);
      }

      #container {
        display: flex;
        height: 2rem;
        align-items: center;
        gap: 0.85rem;
        position: relative;
      }

      #dropdown {
        margin-top: 0.65rem;
        position: absolute;
        top: 100%;
        border-top: 2px solid var(--primary-700, #1448e1);
        border-right: 1px solid var(--gray-100, #eaeaea);
        border-left: 1px solid var(--gray-100, #eaeaea);
        border-bottom: 1px solid var(--gray-100, #eaeaea);
        padding: 1.15rem;
        border-radius: 0 0 0 0.85rem;
        background-color: #fff;
        --width: 14rem;
        width: var(--width);
        left: calc(-1 * var(--width) - 1rem);
        box-shadow:
          0 4px 12px rgba(0, 0, 0, 0.1),
          0 2px 4px rgba(0, 0, 0, 0.06);
        transition: 200ms;
        opacity: 1;
      }

      #dropdown.closed {
        transform: scale3d(0.9, 0.9, 0.9);
        transition: 200ms;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
      }

      #dropdown * {
        box-sizing: border-box;
        margin: 0;
      }

      #dropdown #header {
        display: flex;
        gap: 1rem;
        align-items: center;
        --primary-600: var(--primary-800, #173ab6);
        --primary-500: var(--primary-300, #8ec4ff);
      }

      #dropdown #header #title {
        font-size: 1.1rem;
        font-weight: 500;
      }

      #dropdown #header #desc {
        font-size: 0.85rem;
        font-weight: 400;
        margin-top: 0.25rem;
        color: var(--gray-600, #656565);
        text-overflow: ellipsis;
        overflow: hidden;
      }

      #dropdown #header div {
        text-wrap: nowrap;
        overflow: hidden;
      }

      #dropdown #actions {
        margin-top: 0.5rem;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      #dropdown #actions a,
      #dropdown #actions button {
        cursor: pointer;
        background-color: #fff;
        display: flex;
        border: 0;
        align-items: center;
        gap: 1rem;
        border-radius: 0.45rem;
        font-size: 0.85rem;
        padding: 0.8rem 0;
        text-align: center;
        text-wrap: nowrap;
        text-decoration: none;
        color: #000;
        transition: 200ms;
      }

      #dropdown #actions button:hover,
      #dropdown #actions button:focus-visible {
        background-color: #f8f8f8;
        padding: 0.8rem;
        transition: 200ms;
      }

      #dropdown #actions button:focus-visible {
        outline: 2px solid var(--primary-600);
      }

      #dropdown #actions .row {
        display: flex;
        justify-content: flex-end;
      }

      :host([location-vertical="top"]) #dropdown {
        top: auto;
        bottom: 100%;
        margin-top: 0;
        margin-bottom: 1rem;
        border-radius: 0.85rem 0 0 0;
        border-bottom: 2px solid var(--primary-700, #1448e1);
        border-top: 1px solid var(--gray-100, #eaeaea);
      }

      :host([location-vertical="top"][location-horizontal="left"]) #dropdown {
        border-radius: 0 0.85rem 0 0;
      }

      :host([location-vertical="bottom"][location-horizontal="left"])
        #dropdown {
        border-radius: 0 0 0.85rem 0;
      }

      :host([location-horizontal="left"]) #dropdown {
        left: 0;
      }

      :host([location-horizontal="right"]) #dropdown {
        left: calc(-1 * var(--width) - 1rem);
      }

      #launchpad {
        box-sizing: border-box;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100svw;
        padding: 1rem;
        background-color: #fff;
        color: black;
        font-size: 1rem;
        z-index: 1000;

        border-top: 2px solid var(--primary-800, #173ab6);

        display: flex;
        gap: 1rem;
        align-items: center;

        justify-content: space-between;
      }

      #launchpad div {
        display: flex;
        gap: 1rem;
        align-items: center;
      }

      #launchpad #launchpad-status {
        font-weight: 600;
      }

      #launchpad * {
        margin: 0;
        padding: 0;
      }

      #launchpad a {
        color: black;
      }

      #launchpad button {
        color: black;
        margin: 0;
        padding: 0;
        border: none;
        background-color: transparent;
        font-size: 1.5rem;
        cursor: pointer;
      }
    `,
  ];

  @property() location: {
    vertical: "top" | "bottom";
    horizontal: "left" | "right";
  } = {
    vertical: "top",
    horizontal: "right",
  };

  @state() open: boolean = false;

  @state() launchpadForceClosed: boolean = false;

  updated() {
    this.setAttribute("location-vertical", this.location.vertical);
    this.setAttribute("location-horizontal", this.location.horizontal);
  }

  private aboutMeState = new StateController(this, aboutMe);

  connectedCallback() {
    super.connectedCallback();
    aboutMe.loadIfNeeded();
  }

  private manageAccountButton: Ref<HTMLLinkElement> = createRef();

  openClicked() {
    this.open = !this.open;
    setTimeout(() => {
      if (this.open) {
        window.addEventListener("click", this.listenForOOBClicks);
        window.addEventListener("keydown", this.handleEscape);
        this.updateComplete.then(() => {
          setTimeout(() => {
            this.manageAccountButton.value?.focus();
          }, 100);
        });
      } else {
        window.removeEventListener("click", this.listenForOOBClicks);
        window.removeEventListener("keydown", this.handleEscape);
      }
    });
  }

  private handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") this.open = false;
  };

  private listenForOOBClicks = (e: MouseEvent) => {
    if (!this.shadowRoot) return;

    const path = e.composedPath();
    if (!path.includes(this.shadowRoot.host)) {
      this.open = false;
      window.removeEventListener("click", this.listenForOOBClicks);
    }
  };

  render() {
    return html` <div id="container">
        <button
          id="box"
          @click=${this.openClicked}
          aria-label="User profile"
          aria-expanded="${this.open ? "true" : "false"}"
          aria-controls="dropdown"
          aria-haspopup="menu"
        >
          <ui-icon name="person" size="1.25rem"></ui-icon>
        </button>

        <div id="dropdown" class="${!this.open ? "closed" : ""}">
          <div id="header">
            <div>
              <p id="title">${aboutMe.username}</p>
              <p id="desc">${aboutMe.email}</p>
            </div>
          </div>

          <div id="actions">
            <button
              ${ref(this.manageAccountButton)}
              @click=${() => {
                window.location.href = "/profile";
              }}
            >
              <ui-icon name="cog" size="1rem"></ui-icon>
              Manage Account
              <span></span>
            </button>
            ${aboutMe.hasPermission("view.ls-admin")
              ? html`
                  <button
                    @click=${() => {
                      window.location.href = "/locksmith";
                    }}
                  >
                    <ui-icon name="person-group" size="1rem"></ui-icon>
                    Administration
                    <span></span>
                  </button>
                `
              : undefined}
            <button
              id="logout"
              @click=${() => {
                aboutMe.signOut();
              }}
            >
              <ui-icon name="sign-out" size="1rem" colorway="danger"></ui-icon>
              Sign out
            </button>
          </div>
        </div>
      </div>

      ${aboutMe.isLaunchpad !== undefined && !this.launchpadForceClosed
        ? html`<div id="launchpad">
            <div>
              <p id="launchpad-status">Launchpad</p>
              <p id="launchpad-user">Viewing app as ${aboutMe.isLaunchpad}</p>
            </div>

            <div>
              <button
                @click=${() => {
                  this.launchpadForceClosed = true;
                }}
              >
                &times;
              </button>
            </div>
          </div>`
        : undefined}`;
  }
}
