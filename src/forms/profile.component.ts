import { LitElement, html, css } from "lit";
import { state, property, customElement } from "lit/decorators.js";
import { aboutMe } from "../sdk/aboutme.state";
import { StateController } from "@lit-app/state";
import "firelight-ui/navigation/quick.navigation";
import "firelight-ui/icons/ui-icon.component";
import { inputStyles } from "../styles/inputs.style";
import { LocksmithUpdateEmailComponent } from "./profile/update-email.component";

@customElement("locksmith-profile")
export class LocksmithProfileComponent extends LitElement {
  static styles = [
    inputStyles,
    css`
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

      a#back {
        gap: 0.5rem;
        color: var(--primary-600, #1a5cf4);
        display: flex;
        align-items: center;
        text-decoration: none;
        font-weight: 300;
      }
    `,
  ];

  private aboutMeState = new StateController(this, aboutMe);

  connectedCallback() {
    super.connectedCallback();
    aboutMe.loadIfNeeded(true);
  }

  render() {
    return html`<div>
      <a href="/app" id="back"
        ><ui-icon name="home" size="1.15rem"></ui-icon> Back to App</a
      >

      <div id="header">
        <h1>Hi, ${aboutMe.username}.</h1>
        <p id="intro">Manage your account settings here.</p>
        <p
          id="error"
          aria-live="assertive"
          role="status"
          aria-atomic="true"
          aria-relevant="additions"
        ></p>
      </div>

      <quick-nav
        .defaultPageKey=${`account`}
        .pages=${[
          {
            URLKey: "account",
            Name: "Account",
            PageComponent: LocksmithUpdateEmailComponent,
          },
          {
            URLKey: "security",
            Name: "Security",
            TemplateLiteral: html`<p>TODO</p>`,
          },
        ]}
      ></quick-nav>
    </div>`;
  }
}
