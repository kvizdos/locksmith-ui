export interface LocksmithGlobals {
  injectHeaders?: () => HeadersInit | undefined;
  injectURLParams?: () => Record<string, string> | undefined;
}

declare global {
  interface Window {
    locksmith?: LocksmithGlobals;
  }
}
