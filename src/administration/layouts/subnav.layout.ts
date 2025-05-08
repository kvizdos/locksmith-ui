import { ParamValue, Router, RouterLocation } from "@vaadin/router";
import { LitElement, html, css, TemplateResult, PropertyValues } from "lit";
import { property, state, customElement } from "lit/decorators.js";
import { router } from "../outlet/outlet";
import baseCSS from "../styles";
import "./dashboard.layout";

export interface PageComponentInterface {
  OnPageLoad: () => Promise<boolean>;
  setProps?: (props: Record<string, any>) => void;
  GetRightAside?: () => TemplateResult;
  ExtraLeftAside?: () => TemplateResult;
}

export interface SubnavHeaderButton {
  Text: string;
  Action: (component?: PageComponentInterface) => void;
}

export interface SubnavPage<T extends PageComponentInterface> {
  SortIndex: number; // used for sorting on the sidebar
  PageName: string; // show on sidebar
  PageKey: string; // used for URL
  PageComponent: new () => T; // Component class constructor
  LoadProps?: () => Record<string, any>;
}

export type SubnavPagesList = { [group: string]: SubnavPage<any>[] };

@customElement("locksmith-subnav-layout")
export class SubnavLayoutComponent extends LitElement {
  @property({ type: String }) urlBase: String = "";

  @property({ type: String }) urlGroup: ParamValue = "";

  @property({ type: String }) urlKey: ParamValue = "";

  @property({ type: Array }) pages: SubnavPagesList = {};

  @state() activePageKey: String = "";

  @state() activePageComponent: PageComponentInterface | undefined = undefined;

  @state() activePage: SubnavPage<any> | undefined = undefined;

  constructor() {
    super();

    window.addEventListener(
      "vaadin-router-location-changed",
      this.listenForPageChanges,
    );

    this.addEventListener("destruct", this.destruct);
    // window.addEventListener('popstate', this.handlePopState);
  }

  destruct() {
    window.removeEventListener(
      "vaadin-router-location-changed",
      this.listenForPageChanges,
    );
    this.removeEventListener("destruct", this.destruct);
  }

  listenForPageChanges = (event: any) => {
    const { location } = event.detail;
    const { pathname } = location;

    this.destruct();

    if (pathname.substring(this.urlBase.length, pathname.length).length === 0) {
      return;
    }

    this.urlKey = location.params.urlKey;
    this.urlGroup = location.params.urlGroup;

    // Perform your logic for parameter updates
  };

  static styles = [
    baseCSS,
    css`
      #root {
      }

      .aside div#buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        width: 100%;
        row-gap: 0.5rem;
      }

      .aside > div:first-of-type:last-of-type > h3 {
        display: none;
      }

      .aside > div {
        display: flex;
        flex-direction: column;
        gap: 0.15rem;
      }
      .aside > div:not(:last-of-type) {
        margin-bottom: 1rem;
      }
      .aside div h3 {
        font-size: 0.85rem;
        color: var(--primary-800);
        margin-bottom: 0.5rem;
      }

      .aside button {
        background-color: var(--primary-200);
        border: 0;
        padding: 0.5rem 1rem;
        border-radius: 2rem;
        font-size: 1rem;
        color: var(--primary-950);
      }

      .aside button.active {
        background-color: var(--primary-500);
        color: #fff;
      }

      @media (min-width: 825px) {
        .aside {
          justify-self: flex-end;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          width: 100%;
          width: 14rem;
        }

        .aside:not(.right) {
          padding-left: 2rem;
        }

        .aside > div {
          display: flex;
          flex-direction: column;
        }
        .aside div#buttons {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .aside div h3 {
          font-size: 1rem;
          margin-bottom: 1rem;
          color: black;
        }

        .aside > div:first-of-type:last-of-type > h3 {
          display: inherit;
        }

        .aside div:not(:first-of-type) {
          margin-top: 1.25rem;
        }

        .aside button {
          width: 100%;
          padding: 1rem 0rem;
          font-size: 1rem;
          background-color: unset;
          color: var(--primary-950);
          text-align: left;
          border: 0;
          border-radius: 0.25rem;
          cursor: pointer;
          transition: 200ms;
        }

        @media (hover) {
          .aside button:hover {
            background-color: var(--primary-100);
            padding: 1rem;
          }
        }

        .aside button.active {
          background-color: var(--primary-200);
          color: var(--primary-950);
          transition: 200ms;
          padding: 1rem;
        }

        .aside button.active:focus-visible {
          outline: 2px solid var(--primary-600);
        }

        #main {
          max-width: 72rem;
        }
      }
    `,
  ];

  firstUpdated() {
    setTimeout(() => {
      const params = this.getRouteParams();
      this.urlGroup = params.urlGroup || "";
      this.urlKey = params.urlKey || "";
      if (this.activePageKey === "") {
        if (this.urlGroup === "" || this.urlKey === "") {
          this.loadPage(Object.keys(this.pages)[0], 0);
          return;
        }
        const matchingGroup = Object.keys(this.pages).find(
          (key) => key.toLowerCase() === this.urlGroup.toString().toLowerCase(),
        );
        if (matchingGroup) {
          const page = this.pages[matchingGroup].find(
            (p) => p.PageKey === this.urlKey,
          );
          if (page) {
            this.loadPage(matchingGroup, page.SortIndex);
          } else {
            this.loadPage(Object.keys(this.pages)[0], 0);
          }
        } else {
          this.loadPage(Object.keys(this.pages)[0], 0);
        }
      }
    }, 0);
  }

  getRouteParams() {
    // Assuming you have access to the current location via window.Vaadin.Router or similar
    if (router) {
      const currentLocation = router.location;
      return currentLocation.params;
    }
    return {};
  }

  async loadPage(group: string, sortKey: number, back?: Boolean) {
    this.activePageComponent = undefined;

    const pageIndex = this.pages[group].findIndex(
      (p) => p.SortIndex === sortKey,
    );

    if (pageIndex === -1) {
      throw new Error("page index does not exist!");
    }

    const page = this.pages[group][pageIndex];

    if (
      (this.urlGroup !== group.toLowerCase() && this.urlKey !== page.PageKey) ||
      page.PageKey !== this.activePageKey
    ) {
      const newUrl = `${this.urlBase}/${group.toLowerCase()}/${page.PageKey}`;
      if (!back) {
        if (this.activePageKey === "") {
          window.history.replaceState(
            {
              group,
              page: page.PageKey,
            },
            "",
            newUrl,
          );
        } else {
          window.history.pushState(
            {
              group,
              page: page.PageKey,
            },
            "",
            newUrl,
          );
        }
      }
    }

    this.activePage = page;

    this.activePageKey = page.PageKey;

    const pageComponent = new page.PageComponent();

    if (page.LoadProps !== undefined) {
      const props = page.LoadProps();
      pageComponent.setProps(props);
    }

    await pageComponent.OnPageLoad();

    this.activePageComponent = pageComponent;
  }

  render() {
    return html` <locksmith-layout>
      <aside class="aside" slot="aside">
        ${Object.keys(this.pages).map(
          (title) =>
            html`<div>
              <h3>${title}</h3>
              <div id="buttons">
                ${this.pages[title]
                  .sort((a, b) => a.SortIndex - b.SortIndex)
                  .map(
                    (page) =>
                      html`<button
                        @click=${() => this.loadPage(title, page.SortIndex)}
                        class="${this.activePageKey === page.PageKey
                          ? "active"
                          : ""}"
                      >
                        ${page.PageName}
                      </button>`,
                  )}
              </div>
            </div>`,
        )}
        ${this.activePageComponent?.ExtraLeftAside !== undefined
          ? html`<hr />
              ${this.activePageComponent.ExtraLeftAside()}`
          : html``}
      </aside>

      <div id="main">
        ${this.activePageComponent !== undefined
          ? html`${this.activePageComponent}`
          : "Loading.."}
      </div>

      ${this.activePageComponent?.GetRightAside !== undefined
        ? html`<div class="aside right" slot="aside-right">
            ${this.activePageComponent.GetRightAside()}
          </div>`
        : html``}
    </locksmith-layout>`;
  }
}
