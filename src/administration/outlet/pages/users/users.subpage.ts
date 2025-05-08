import { LitElement, html, css } from "lit";
import { state, customElement } from "lit/decorators.js";
import { ref, createRef, Ref } from "lit/directives/ref.js";

import baseCSS from "../../../styles";
import { UserOverview } from "../../../types/user.type";

// const logoUrl = new URL('../../assets/images/logo-wide.webp', import.meta.url)
//   .href;

@customElement("locksmith-users-subpage")
export class LocksmithUsersSubPageView extends LitElement {
  static styles = [baseCSS, css``];

  @state() users: UserOverview[] = [];

  @state() loading: boolean = true;

  OnPageLoad() {
    this.fetchUsers();
  }

  async fetchUsers() {
    const resp = await fetch("/api/users/list");
    const js = await resp.json();
    this.users = js;
    this.loading = false;
  }

  render() {
    return html`
      <header>
        <div
          style="display: flex; flex-direction: row; align-items: center; gap: 1rem; margin-bottom: 1rem;"
        >
          <ui-icon
            name="person-group"
            colorway="lightSecondary"
            size="1.45rem"
          ></ui-icon>

          <h1 style="margin: 0;">All Users</h1>
        </div>
      </header>

      <div class="widget" style="${this.loading ? "display: none;" : ""}">
        <div class="list">
          ${this.users.map(
            (u) => html`
              <button href="#" class="item">
                <p id="title">${u.username ?? u.email}</p>
                <p id="description">
                  ${u.role} &bull; ${u.sessions} active sessions
                </p>
              </button>
            `,
          )}
        </div>
      </div>
    `;
  }
}
