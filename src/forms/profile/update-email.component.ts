import { LitElement, html, css } from "lit";
import { state, property, customElement } from "lit/decorators.js";
import { aboutMe } from "../../sdk/aboutme.state";
import { StateController } from "@lit-app/state";
import "firelight-ui/navigation/quick.navigation";
import "firelight-ui/icons/ui-icon.component";
import { inputStyles } from "../../styles/inputs.style";

@customElement("locksmith-update-email")
export class LocksmithUpdateEmailComponent extends LitElement {
  static styles = [
    inputStyles,
    css`
      * {
        box-sizing: border-box;
      }
    `,
  ];

  private aboutMeState = new StateController(this, aboutMe);

  render() {
    return html`<div class="input-container">
      <label>
        Email Address
        <button>Change Email</button>
      </label>
      <input value="${aboutMe.email}" disabled />
    </div>`;
  }
}
