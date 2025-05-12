import { css } from "lit";

export const inputStyles = css`
  input {
    padding: 0.85rem;
    border-radius: 0.5rem;
    border: 1px solid var(--input-border, var(--gray-300, #bdbdbd));
    font-size: 1rem;
    width: 100%;
  }
  input:-webkit-autofill,
  textarea:-webkit-autofill,
  select:-webkit-autofill {
    border: 0;
    -webkit-text-fill-color: black;
    -webkit-box-shadow: 0 0 0px 1000px 0 inset;
    transition: background-color 5000s ease-in-out 0s;
  }
  .input-container *:user-invalid {
    outline: 1px solid var(--danger-600, #e01e47);
  }

  textarea {
    padding: 0.85rem;
    border-radius: 0.5rem;
    border: 1px solid var(--input-border, var(--gray-300, #bdbdbd));
    font-size: 1rem;
    width: 100%;
    resize: vertical;
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
    color: #656565;
    font-size: 0.85rem;
    margin: 0.25rem 0 0.5rem 0;
  }

  .input-container > label:has(button) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .input-container > label button {
    border: 0;
    background: 0;
    padding: 0;
    margin: 0;
    display: flex;
    color: var(--accent);
    align-items: center;
    font-weight: 600;
    cursor: pointer;
    gap: 0.5rem;
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
    border: 1px solid var(--input-border, #bdbdbd);
    width: 100%;
    font-size: 1rem;
  }

  .input-container input:focus {
    outline: 2px solid var(--accent);
  }

  .input-container p#error {
    margin-top: 0.25rem;
    color: var(--danger-600);
    font-size: 0.85rem;
    display: none;
  }

  .input-container :user-invalid + p#error {
    display: inherit;
  }

  .input-container :user-invalid {
    border-radius: 0.5rem;
    outline: 2px solid var(--danger-600);
  }
`;
