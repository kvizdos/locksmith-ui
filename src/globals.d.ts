export interface LocksmithGlobals {
  injectHeaders?: () => HeadersInit | undefined;
  signOutParams?: () => Record<string, string> | undefined;
}

declare global {
  interface Window {
    locksmith?: LocksmithGlobals;
  }
}
