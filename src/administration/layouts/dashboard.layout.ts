import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import baseCSS from "../styles";
import { Router } from "@vaadin/router";
import "firelight-ui/feedback/prompt.component";
import "firelight-ui/feedback/confirm.component";
import "firelight-ui/feedback/alert.component";
import "firelight-ui/icons/ui-icon.component";
import {
  DismissToast,
  NotifyToast,
} from "firelight-ui/feedback/toast.component";
import { IconComponent } from "firelight-ui/icons/ui-icon.component";

interface DropdownItem {
  name: string;
  path: string;
}

interface NavbarItem {
  name: string;
  path: string;
  dropdown?: DropdownItem[]; // Optional property
}

interface NavbarItems {
  left: NavbarItem[];
  right: NavbarItem[];
}

interface Navbars {
  [role: string]: NavbarItems; // Index signature to allow any string as a key
}

@customElement("locksmith-layout")
export class DashboardLayoutComponent extends LitElement {
  static styles = [
    baseCSS,
    css`
      :host {
        display: block;
        overflow-x: hidden;
      }
      #root {
        min-height: 100dvh;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        position: relative;
        background-color: #f3f3fa;
        width: 100vw;
      }

      #navcontainer {
        background-color: rgb(255, 255, 255);
        padding: 0.5rem 1rem;
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100vw;
        gap: 1.25rem;
        display: flex;
        justify-content: center;
        border-bottom: 1px solid var(--gray-200);
        z-index: 1000;
      }

      h1#logo {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 1rem;
        aspect-ratio: 1/1;
      }

      nav {
        width: 100%;
        max-width: 72rem;
      }

      nav #full {
        width: 100%;
        display: flex;
        gap: 1rem;
        align-items: center;
        flex-direction: row;
        justify-content: space-between;
        padding: 0.35rem 0rem;
      }

      nav #full div:not(#overview) {
        display: flex;
        align-items: center;
        gap: 1.25rem;
      }

      nav p,
      nav a,
      nav button {
        padding: 0.45rem 1rem;
        border: 0;
      }
      nav a,
      nav button {
        color: var(--primary-950);
        background-color: white;
        border-radius: 0.75rem;
        transition: 200ms;
        font-weight: 500;
        cursor: pointer;
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      nav button {
        font-size: 1rem;
        width: 100%;
        text-align: left;
        font-weight: 500;
        white-space: no-wrap;
      }

      nav img {
        width: 3rem;
        aspect-ratio: 1 / 1;
      }

      nav #full a:not(.active),
      nav #full p,
      nav #full span {
        display: none;
      }

      nav a.active,
      nav button.active {
        background-color: var(--primary-100);
        color: var(--primary-800);
      }

      nav span.settings {
        cursor: pointer;
      }

      nav a:not(.active):hover,
      nav button:not(.active):hover {
        background-color: var(--primary-50);
      }

      #mobile {
        flex-direction: column;
        gap: 0.5rem;
        padding-top: 1rem;
        display: none;
      }

      #mobile.show {
        display: flex;
      }

      #mobile a,
      #mobile p {
        padding: 0.75rem 1rem 0.75rem 1rem;
      }

      #mobile #footer {
        display: flex;
        justify-content: space-between;
      }

      #wrapper {
        margin-top: 69px;
        display: grid;
        gap: 2rem;
        padding: 1rem;
        width: 100%;
      }

      h1 {
        font-size: 1rem;
        color: #6c43e8;
      }

      .dropdown {
        position: relative;
      }

      .dropdown > section {
        display: none;
        position: absolute;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        border-radius: 0.75rem;
        padding: 0.25rem;
        z-index: 1001;
        width: 100%;
        background-color: white;
      }

      #mobile-ham {
        background-color: #fff;
        border: 0;
        font-size: 1.5rem;
        color: #3d2a7c;
      }

      nav #full .medium-hide {
        display: none;
      }

      #footer {
        color: var(--gray-400);
        font-size: 0.75rem;
        margin-top: 2rem;
        padding-top: 2rem;
        border-top: 1px solid var(--gray-200);
      }

      .desktop-hide {
        display: inline-block !important;
      }

      #overview {
        display: none;
      }

      @media (min-width: 680px) {
        .dropdown:hover > section {
          display: block;
        }
        .desktop-hide {
          display: none !important;
        }
        nav img {
          width: 3rem;
        }

        nav #full a:not(.active),
        nav #full p,
        nav #full span {
          display: block;
        }

        #mobile-ham,
        #mobile,
        #mobile.show {
          display: none;
        }
      }

      #saving {
        background-color: var(--primary-200);
        border-radius: 2rem;
        color: var(--primary-800);
      }

      @media (min-width: 825px) {
        nav #full .medium-hide {
          display: block;
        }

        :host([wide-content]) main {
          max-width: 65vw;
          max-width: 65dvw;
        }
      }

      @media (min-width: 930px) {
        #wrapper {
          margin-top: 80px;
          padding: 1rem 0;
          grid-template-columns: 1fr minmax(0, 72rem) 1fr;
        }
      }
    `,
  ];

  @property({ type: String }) locale = "en";

  @property({ type: Boolean }) mobileNavOpen = false;

  @property({ type: Boolean }) includeFooter = true;

  @property({ type: Object }) navbars: Navbars = {};

  constructor() {
    super();
    const userNavbar = {
      left: [
        {
          name: "Overview",
          path: "/locksmith",
        },
        {
          name: "Users",
          path: "/locksmith/users",
          dropdown: [
            // {
            //   name: 'Paused',
            //   path: '/dashboard/courses/list/paused',
            // },
            // {
            //   name: 'Pending',
            //   path: '/dashboard/courses/list/pending',
            // },
          ],
        },
      ],
      right: [],
    };
    this.navbars = {
      user: userNavbar,
    };

    window.ononline = this.onlineNotice;
    window.onoffline = this.offlineNotice;
  }

  onlineNotice() {
    console.log("notyfing toast");
    DismissToast("network");
    NotifyToast({
      id: "net",
      text: "You are back online.",
    });
  }

  offlineNotice() {
    NotifyToast({
      id: "network",
      text: "You are offline. Please reconnect to WiFi.",
      persist: true,
      danger: true,
    });
  }

  removeTrailingSlash(url: string) {
    if (url.endsWith("/")) {
      return url.slice(0, -1);
    }
    return url;
  }

  renderDropdownNavbar(pathInfo: NavbarItem) {
    return html`<section class="dropdown">
      <a
        class="${this.removeTrailingSlash(window.location.pathname) ===
        pathInfo.path
          ? "active"
          : ""}"
        href="${pathInfo.path}"
        >${pathInfo.name}</a
      >
      ${pathInfo.dropdown !== undefined
        ? html`
            <section>
              ${pathInfo.dropdown.map(
                (path) =>
                  html`<button @click=${() => Router.go(path.path)}>
                    ${path.name}
                  </button>`,
              )}
            </section>
          `
        : ""}
    </section>`;
  }

  render() {
    return html`<div id="root">
        <prompt-component></prompt-component>
        <alert-component></alert-component>
        <toast-component></toast-component>
      <div id="navcontainer">
        <nav>
          <div id="full">
            <div>
              <h1 id="logo">
                  <svg viewBox="0 0 46 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 20V27.5C21.901 27.5019 20.8332 27.8659 19.9618 28.5357C19.0904 29.2055 18.464 30.1437 18.1794 31.2052C17.8948 32.2668 17.9679 33.3925 18.3874 34.4084C18.8068 35.4242 19.5493 36.2735 20.5 36.825V40C20.5 40.663 20.7634 41.2989 21.2322 41.7678C21.7011 42.2366 22.337 42.5 23 42.5V50H5.5C4.17392 50 2.90215 49.4732 1.96447 48.5355C1.02678 47.5979 0.5 46.3261 0.5 45V25C0.5 22.25 2.75 20 5.5 20H23Z" fill="#173ab6"/>
                  <path d="M23 42.5C23.663 42.5 24.2989 42.2366 24.7678 41.7678C25.2366 41.2989 25.5 40.663 25.5 40V36.825C26.4507 36.2735 27.1932 35.4242 27.6126 34.4084C28.0321 33.3925 28.1052 32.2668 27.8206 31.2052C27.536 30.1437 26.9096 29.2055 26.0382 28.5357C25.1668 27.8659 24.099 27.5019 23 27.5V20H30.5V12.5C30.5 10.5109 29.7098 8.60322 28.3033 7.1967C26.8968 5.79018 24.9891 5 23 5C21.0109 5 19.1032 5.79018 17.6967 7.1967C16.2902 8.60322 15.5 10.5109 15.5 12.5V15H10.5V12.5C10.5 9.18479 11.817 6.00537 14.1612 3.66117C16.5054 1.31696 19.6848 0 23 0C26.3152 0 29.4946 1.31696 31.8388 3.66117C34.183 6.00537 35.5 9.18479 35.5 12.5V20H40.5C41.8261 20 43.0979 20.5268 44.0355 21.4645C44.9732 22.4021 45.5 23.6739 45.5 25V45C45.5 46.3261 44.9732 47.5979 44.0355 48.5355C43.0979 49.4732 41.8261 50 40.5 50H23V42.5Z" fill="#173ab6"/>
                  </svg>
              </h1>
              ${this.navbars.user.left.map((path) => {
                if (path.dropdown !== undefined) {
                  return this.renderDropdownNavbar(path);
                }

                return html`<a
                  class="${this.removeTrailingSlash(
                    window.location.pathname,
                  ) === this.removeTrailingSlash(path.path)
                    ? "active"
                    : ""}"
                  href="${path.path}"
                  >${path.name}</a
                >`;
              })}
            </div>

            <div>
              <!-- <global-search-component></global-search-component> -->

              ${this.navbars.user.right.map((path) => {
                if (path.dropdown !== undefined) {
                  return this.renderDropdownNavbar(path);
                }

                return html`<a
                  class="${this.removeTrailingSlash(
                    window.location.pathname,
                  ) === this.removeTrailingSlash(path.path)
                    ? "active"
                    : ""}"
                  href="${path.path}"
                  >${path.name}</a
                >`;
              })}
              <a
                href="/dashboard/settings"
                aria-label="Settings"
                class="${
                  window.location.pathname === "/dashboard/settings"
                    ? "active"
                    : ""
                }"
                ><ui-icon name="cog" size="20px"></ui-icon></span
                ><span class="desktop-hide">&nbsp;Settings</span></a
              >

              <button
                id="mobile-ham"
                @click=${() => {
                  this.mobileNavOpen = !this.mobileNavOpen;
                }}
              >
                &#x2630;
              </button>
            </div>
          </div>
          <div id="mobile" class="${this.mobileNavOpen ? "show" : ""}">
            ${this.navbars.user.left.map(
              (path) =>
                html`<a
                  class="${window.location.pathname === path.path
                    ? "active"
                    : ""}"
                  href="${path.path}"
                  >${path.name}</a
                >`,
            )}
            ${this.navbars.user.right.map(
              (path) =>
                html`<a
                  class="${window.location.pathname === path.path
                    ? "active"
                    : ""}"
                  href="${path.path}"
                  >${path.name}</a
                >`,
            )}
            <a
              href="/dashboard/settings"
              aria-label="Settings"
              class="${
                window.location.pathname === "/dashboard/settings"
                  ? "active"
                  : ""
              }"
              ><span class="icon cog md settings"></span> Settings</a
            >
          </div>
        </nav>
      </div>
      <div id="wrapper">
        <slot name="aside"><br></br></slot>
        <main>
          <slot></slot>
        </main>
        <slot name="aside-right"><br></br></slot>
      </div>
    </div>`;
  }
}
