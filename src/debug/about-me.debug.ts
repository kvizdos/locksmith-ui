import { StateController } from "@lit-app/state";
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { aboutMe } from "../sdk/aboutme.state";
import "../sdk/components/user-icon.component";

@customElement("about-me-debug")
export class AboutMeDebug extends LitElement {
  static styles = css`
    pre {
      font-family: monospace;
      background: #111;
      color: #0f0;
      padding: 1rem;
      border-radius: 8px;
      overflow: auto;
    }
  `;

  private aboutMeState = new StateController(this, aboutMe);

  connectedCallback(): void {
    super.connectedCallback();
  }

  firstUpdated() {
    aboutMe.loadIfNeeded();
  }

  render() {
    return html`
      <h3>About Me State</h3>
      <pre>
${JSON.stringify(
          {
            info: aboutMe.info,
            permissions: aboutMe.permissions,
          },
          null,
          2,
        )}</pre
      >

      <p>Extras</p>
      <pre>${JSON.stringify(aboutMe.extras, null, 2)}</pre>

      ${aboutMe.hasPermission("user.delete.other")
        ? html`<p>Only users with user.delete.other can see this</p>`
        : html`<p
            style="background-color: #e01e47; padding: 1rem; border-radius: 0.5rem; color: white;"
          >
            This is hidden because you don't have permission to do it.
          </p>`}

      <locksmith-user-icon></locksmith-user-icon>
    `;
  }
}
