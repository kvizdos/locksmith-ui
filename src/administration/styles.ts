import { css } from "lit";

export default css`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  .skeletonBase {
    transition: opacity 200ms;
    opacity: 0;
  }
  .skeletonBase.skeleton {
    opacity: 1;
    position: relative;
    /* other styles */
    width: fit-content;
    transition: opacity 200ms;
  }

  .skeletonCache {
    font-style: italic;
    opacity: 0.85;
  }

  .skeletonBase.skeletonLoaded:not(.skeleton) {
    opacity: 1;
    transition: opacity 0ms !important;
  }
  .skeletonBase.skeleton::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, var(--primary-100), var(--primary-200));
    transition: opacity 200ms;
    background-size: 200% 200%; /* Makes the animation smoother */

    pointer-events: none;
    animation: gradient-animation 500ms infinite;
    z-index: 1;
    border-radius: 0.5rem;
    opacity: 1;
  }

  .skeletonBase.skeleton.skeletonLoaded::before {
    opacity: 0;
  }

  .skeletonBase.skeleton:not(.skeletonLoaded) > *,
  .skeletonBase.skeletonResolved.skeleton:not(.skeletonLoaded) {
    color: transparent !important;
  }

  .skeletonPointerOnly {
    pointer-events: none; /* Disables all hover and click events */
  }

  @keyframes gradient-animation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1rem;
    flex-wrap: wrap;
    gap: 0rem 1rem;
  }

  header > div {
    display: flex;
    gap: 1rem;
    flex-direction: column;
  }

  header > div.float {
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
  }

  .btn {
    text-align: center;
    border: 0;
    padding: 0.75rem 1rem;
    text-decoration: none;
    border-radius: 0.5rem;
    transition: 200ms;
    cursor: pointer;
    font-size: 1rem;
  }
  .btn:not(.sm) {
    font-weight: 600;
  }
  .btn:not(.tertiary):not(:disabled) {
    -webkit-box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.15);
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.15);
  }
  .btn.big {
    padding: 1rem 1rem;
    font-size: 1rem;
  }
  .btn:disabled {
    cursor: not-allowed;
  }

  .btn.primary {
    background-color: var(--primary-500);
    color: #ffffff;
  }
  .btn.primary.danger {
    background-color: var(--danger-600);
  }
  .btn.primary:hover {
    background-color: var(--primary-600);
  }
  .btn.primary.danger:hover {
    background-color: var(--danger-700);
  }
  .btn.primary:active {
    background-color: var(--primary-900);
  }
  .btn.primary.danger:active {
    background-color: var(--danger-800);
  }
  .btn.primary:disabled {
    background-color: var(--primary-100);
    color: var(--primary-600);
  }
  .btn.primary.danger:disabled {
    background-color: var(--danger-100);
    color: var(--danger-600);
  }
  .btn.rounded {
    border-radius: 2rem;
    padding: 0.55rem 2rem;
    font-weight: normal;
  }

  .btn.tertiary {
    padding: 0.25rem 0.5rem;
    border-bottom: 1px solid var(--primary-500);
    color: var(--primary-500);
    border-radius: 0;
    background: 0;
  }
  .btn.tertiary.danger {
    border-bottom: 1px solid var(--danger-500);
    color: var(--danger-500);
  }
  .btn.tertiary:hover {
    border-bottom: 1px solid var(--primary-600);
    color: var(--primary-600);
  }
  .btn.tertiary.danger:hover {
    border-bottom: 1px solid var(--danger-600);
    color: var(--danger-600);
  }
  .btn.tertiary:active {
    border-bottom: 1px solid var(--primary-700);
    color: var(--primary-700);
  }
  .btn.tertiary.danger:active {
    border-bottom: 1px solid var(--danger-700);
    color: var(--danger-700);
  }
  .btn.tertiary:disabled {
    border-bottom: 1px solid var(--primary-200);
    color: var(--primary-200);
  }
  .btn.tertiary.danger:disabled {
    border-bottom: 1px solid var(--danger-200);
    color: var(--danger-200);
  }

  .btn.secondary {
    outline: 1px solid var(--primary-300);
    background: #fff;
    color: var(--primary-600);
  }
  .btn.secondary.danger {
    outline: 1px solid var(--danger-300);
    color: var(--danger-500);
  }
  .btn.secondary:not(:disabled):hover {
    outline: 1px solid var(--primary-200);
    background-color: var(--primary-50);
  }
  .btn.secondary.danger:not(:disabled):hover {
    outline: 1px solid var(--danger-200);
    background-color: var(--danger-50);
  }
  .btn.secondary:not(:disabled):active {
    outline: 1px solid var(--primary-100);
    background-color: var(--primary-200);
  }
  .btn.secondary.danger:not(:disabled):active {
    outline: 1px solid var(--danger-100);
    background-color: var(--danger-200);
  }
  .btn.secondary:disabled {
    outline: 1px solid var(--primary-200);
    color: var(--primary-300);
  }
  .btn.secondary.danger:disabled {
    outline: 1px solid var(--danger-200);
    color: var(--danger-300);
  }

  .btn:not(:active):focus-visible {
    outline: 3px solid var(--primary-300);
  }

  .btn.danger:not(:active):focus-visible {
    outline: 3px solid var(--danger-900);
  }

  header.x {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  header.x button {
    margin-bottom: 0.05rem;
  }
  div#header h1,
  header h1,
  .sectionHeader {
    font-size: 1.35rem;
    font-weight: 500;
    color: var(--primary-800);
    margin-bottom: 0.75rem;
  }

  .sectionSubheader {
    font-size: 1.25rem;
    font-weight: 500;
    color: var(--primary-800);
  }

  div#header h1.split,
  header h1.split {
    display: flex;
    gap: 0.25rem;
    color: var(--primary-800);
  }

  div#header h1.split > span,
  header h1.split > span {
    color: var(--primary-950);
  }

  header + #content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .subsectionHeader {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin-bottom: 1rem;
  }

  .subsectionHeader p#title {
    font-weight: 600;
    color: var(--primary-900);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .subsectionHeader p:not(#title) {
    color: var(--gray-600);
  }

  hr {
    border: 0.5px solid var(--gray-200);
  }

  .widget {
    outline: 1px solid var(--primary-100);
    padding: 1rem;
    border-radius: 0.5rem;
    display: flex;
    gap: 0.15rem;
    flex-direction: column;
    background-color: #fff;
  }
  button.widget {
    border: 0;
    font-size: inherit;
    text-align: left;
  }
  button.widget:hover,
  button.widget:focus-visible {
    outline: 2px solid var(--primary-500);
  }
  .widget.red {
    outline: 1px solid var(--danger-400);
    background-color: var(--danger-50);
    color: var(--danger-950);
  }
  .widget.red #description {
    color: var(--danger-800);
  }
  .widget.primary {
    outline: 1px solid var(--primary-400);
    background-color: var(--primary-50);
    color: var(--danger-950);
  }
  .widget.center span.icon {
    font-size: 2rem;
    color: var(--primary-600);
    height: auto;
    width: auto;
  }

  .widget.x {
    gap: 1rem;
  }

  .widget p#title {
    font-weight: 600;
  }

  .widget.callout p#title {
    font-size: 1.5rem;
    color: var(--primary-600);
    margin-bottom: 0.25rem;
  }
  .widget.callout p#title .secondary {
    font-size: 1rem;
    color: var(--gray-600);
  }

  .widget.callout p a.secondary {
    text-decoration: none;
    color: var(--primary-600);
  }

  .widget.callout p a.secondary:hover {
    color: var(--primary-600) !important;
  }

  .widget p#description {
    font-size: 0.85rem;
    color: var(--gray-700);
  }
  .widget.callout p#description {
    font-size: 0.95rem;
    color: var(--gray-800);
  }
  .widget.callout p#description .secondary {
    font-size: 0.85rem;
    color: var(--gray-600);
  }

  a[target="_blank"] {
    color: var(--primary-600);
  }

  a[target="_blank"]:hover {
    color: var(--primary-500);
  }

  a[target="_blank"]::after {
    display: inline-block;
    content: " ";
    background-repeat: no-repeat;
    width: 1ch;
    height: 1ch;
    background-size: contain;
    margin-left: 0.5rem;
  }

  .widget.center {
    align-items: center;
    justify-content: center;
  }

  button.widget.clickable {
    transition: 200ms;
    cursor: pointer;
    border: 0;
    background: 0;
    background-color: #fff;
  }
  button.widget.clickable:hover,
  button.widget.clickable:focus-visible {
    background-color: var(--gray-50);
  }
  button.widget.clickable:active {
    background-color: var(--gray-100);
    outline: 1px solid var(--gray-200);
  }
  button.widget.clickable:focus-visible {
    outline: 2px solid var(--primary-600);
  }
  button.widget.clickable p#title {
    font-size: 1rem;
    font-weight: 600;
  }

  .input-container {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .input-container > label {
    font-weight: 600;
    font-size: 0.85rem;
  }

  .input-container > label:not(:has(+ p)) {
    margin-bottom: 0.5rem;
  }

  .input-container > label + p {
    color: var(--gray-600);
    font-size: 0.85rem;
    margin: 0.25rem 0 0.5rem 0;
  }

  .input-container > label:has(~ input:required)::after {
    content: "*";
    margin-left: 0.25rem;
    color: var(--danger-400);
  }

  .input-container input,
  .input-container textarea {
    padding: 0.85rem 0.85rem;
    border-radius: 0.5rem;
    border: 1px solid var(--gray-300);
    width: 100%;
    font-size: 1rem;
  }

  .input-container input:focus {
    outline: 2px solid var(--primary-500);
  }

  .input-container p#error {
    margin-top: 0.25rem;
    color: var(--danger-600);
    font-size: 0.85rem;
    display: none;
  }

  .input-container input:invalid + p#error {
    display: inherit;
  }

  .input-container input:invalid {
    outline: 2px solid var(--danger-600);
  }

  .list .item {
    background: 0;
    width: 100%;
    border: 0;
    text-align: left;
  }

  .list button.item,
  .list a.item {
    text-decoration: none;
    color: #000;
    cursor: pointer;
    transition: 200ms;
    margin: 0;
    font-size: 1rem;
  }

  .list button.item:hover,
  .list button.item:focus-visible,
  .list a.item:hover,
  .list a.item:focus-visible,
  .list button.item.holdhover {
    background-color: var(--primary-50);
    padding-left: 1rem;
    padding-right: 1rem;
    border-radius: 0.25rem;
  }

  .list button.item:active,
  .list a.item:active {
    background-color: var(--primary-100);
  }

  .list button.item:focus-visible,
  .list a.item:focus-visible {
    outline: 2px solid var(--primary-600);
  }

  .list .item {
    padding: 1rem 0rem;
  }

  .list .item p#title {
    font-size: 1rem;
    margin-bottom: 0.25rem;
    font-weight: 600;
    color: var(--primary-900);
  }

  .list .item p#description {
    font-size: 0.85rem;
    color: var(--gray-600);
  }

  .list .item.row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .list .item:not(:first-of-type) {
    border-top: 1px solid var(--gray-200);
  }

  .list .section .item {
    border-left: 4px solid var(--itemColor, var(--primary-400));
    border-top: 0;
    padding: 0.5rem 0.5rem;
  }

  .list .section .item:not(:last-of-type) {
    box-shadow: inset 0 -1px 0 0 var(--gray-200); /* fakes border-bottom */
  }

  .list .section .header {
    font-weight: 600;
    font-size: 1rem;
    color: var(--primary-900);
    margin-bottom: 0.5rem;
  }

  .list .section:not(:first-of-type) .header {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--gray-200);
  }

  .grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .grid > div {
    display: flex;
    flex-direction: column;
  }

  .grid > div > .widget {
    flex-grow: 1;
  }

  .flex-row {
    display: flex;
    gap: 0.75rem;
    align-items: center;
  }

  .jumper {
    left: -100000dvw;
    position: absolute;
    transition: 0ms !important;
  }

  .jumper:focus {
    position: relative;
    left: 0;
    transition: 0ms !important;
  }

  @media (min-width: 680px) {
    .subsectionHeader {
      flex-direction: row;
      gap: 0.75rem;
    }
    .grid {
      display: grid;
      grid-gap: 1rem;
    }

    .grid.two {
      grid-template-columns: 1fr 1fr;
    }

    .grid.three {
      grid-template-columns: 1fr 1fr 1fr;
    }

    .grid.four {
      grid-template-columns: 1fr 1fr;
    }

    .widget.x {
      flex-direction: row;
      gap: 1rem;
      justify-content: space-between;
      align-items: center;
    }
    .widget.x > div {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
    }
  }

  @media (min-width: 1200px) {
    .grid.four {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }
`;
