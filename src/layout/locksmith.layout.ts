import { LitElement, html, css } from "lit";
import { state, property, customElement } from "lit/decorators.js";

@customElement("locksmith-layout")
export class LocksmithLayout extends LitElement {
  static styles = [
    css`
      * {
        box-sizing: border-box;
        touch-action: manipulation;
        margin: 0;
      }
      #root {
        display: flex;
        flex-direction: column;
        height: 100svh;
        --horizontal-padding: 1.5rem;
      }

      header,
      footer {
        padding: 1rem 1.5rem;
      }

      footer {
        padding-bottom: 1.5rem;
      }

      header {
        --accent-height: 0.5rem;
        padding-top: calc(1.5rem + var(--accent-height));
      }
      header img {
        height: 2.5rem;
      }

      header::before {
        z-index: -1;
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: var(--accent-height);
        background-color: var(--accent, #8c7ffa);
      }

      main {
        height: 100%;
        display: flex;
        justify-content: center;
      }

      main #slotWrapper {
        border-radius: 0.35rem;
        padding: 0rem var(--horizontal-padding);
        width: 100%;
      }

      @media (min-width: 650px) {
        #root {
          justify-content: space-between;
          --horizontal-padding: 3rem;
        }
        header {
          padding-bottom: 0;
        }
        main {
          height: 100%;
          align-items: center;
        }
        main #slotWrapper {
          background-color: #fff;
          border: 1px solid #dcdcdc;
          max-width: 28rem;
          padding: 3.5rem var(--horizontal-padding);
        }
      }
    `,
  ];

  render() {
    return html`<div id="root">
      <header>
        <img src="https://payments.blueprinteducation.org/favicon.ico" />
      </header>
      <main>
        <div id="slotWrapper">
          <slot name="main"></slot>
        </div>
      </main>
      <footer>
        <p>Footer</p>
      </footer>
    </div>`;
  }
}
