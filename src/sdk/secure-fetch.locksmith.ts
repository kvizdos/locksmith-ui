/**
 * Allows for easy popping of 2FA / Re-Auth
 * required endpoints.
 */
export async function SecureFetch(
  input: string | URL | globalThis.Request,
  init?: RequestInit,
) {
  return fetch(input, init);
}
