import { LitElement, html, css } from "lit";
import { property, customElement } from "lit/decorators.js";
import "firelight-ui/icons/ui-icon.component";
import "firelight-ui/buttons/button.component";

@customElement("locksmith-error")
export class LocksmithErrorComponent extends LitElement {
  static styles = [
    css`
      #header {
        --red: #c22a19;
      }
      #header h1 {
        font-size: 1.5rem;
        font-weight: 600;
        display: flex;
        gap: 1rem;
        color: var(--red);
      }

      #header p#intro {
        font-weight: 300;
        margin-top: 0.5rem;
        font-size: 0.85rem;
        color: #464646;
      }

      a#back {
        gap: 0.5rem;
        color: black;
        display: flex;
        align-items: center;
        text-decoration: none;
        font-weight: 300;
      }

      ui-icon {
        --primary-600: var(--red);
      }

      hr {
        border: 0.5px solid #dcdcdc;
        margin: 2rem 0;
      }
    `,
  ];

  @property() errorTitle: string = "There was a bump in the road.";

  @property() errorDescription: string = "That's all we know.";

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`<div>
      <div id="header">
        <ui-icon name="xmark" size="2rem"></ui-icon>
        <h1>${this.errorTitle}</h1>
        <p id="intro">${this.errorDescription}</p>
      </div>

      <hr />

      <button-component
        class="big"
        @fl-click=${() => {
          window.location.href = "/app";
        }}
      >
        Return to App</button-component
      >
    </div>`;
  }
}
