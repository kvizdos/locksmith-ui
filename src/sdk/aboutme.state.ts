import { State, property, storage } from "@lit-app/state";

const TTL_MS = 1000 * 60 * 15; // 15 minutes
// const TTL_MS = 1000 * 5; // 15 minutes

export type AboutMeCallback = {
  username: string;
  id: string;
  role: string;
  permissions: string[];
};

export type ExtraAboutMeFunc = (
  info: AboutMeCallback,
) => Promise<Record<string, any>>;
export type AboutMeSignOutCallbackFunc = (info: AboutMeCallback) => void;

export class AboutMeState extends State {
  static SignOutCallback?: AboutMeSignOutCallbackFunc = undefined;
  static GetExtraAboutMe?: ExtraAboutMeFunc = undefined;

  @storage({ key: "i", prefix: "_identity" })
  @property()
  infoRaw: string;

  get info() {
    return this.infoRaw ? JSON.parse(this.infoRaw) : undefined;
  }

  set info(val) {
    this.infoRaw = val ? JSON.stringify(val) : "";
  }

  get username() {
    return this.info?.["username"].split("@")[0] ?? "unknown";
  }

  get email() {
    return this.info?.["email"] ?? "unknown";
  }

  get role() {
    return this.info?.["role"] ?? "unknown";
  }

  @storage({ key: "x", prefix: "_identity" })
  @property()
  rawExtras: string;

  set extras(value: Record<string, any>) {
    this.rawExtras = JSON.stringify(value);
  }

  get extras() {
    if (this.rawExtras === "" || this.rawExtras === undefined) {
      return {};
    }
    try {
      return JSON.parse(this.rawExtras);
    } catch (e) {
      console.error(e);
      return {};
    }
  }

  @storage({ key: "p", prefix: "_identity" })
  @property()
  permissions: string;

  @storage({ key: "la", prefix: "_identity" })
  @property()
  loadedAt: string;

  async loadIfNeeded(force = false) {
    const now = Date.now();
    const infoLoaded = this.infoRaw !== "";
    const permsLoaded = this.permissions?.length > 0;
    const isExpired = +this.loadedAt !== 0 && now - +this.loadedAt > TTL_MS;

    if (infoLoaded && permsLoaded && !isExpired && !force) return;

    try {
      const res = await fetch("/api/management/me");
      if (!res.ok) throw new Error("Failed to fetch /me");

      const data = await res.json();
      this.info = data.info;
      this.permissions = data.permissions.join(",");
      this.loadedAt = `${now}`;

      if (AboutMeState.GetExtraAboutMe) {
        const res = await AboutMeState.GetExtraAboutMe({
          id: data.info["id"],
          username: data.info["username"],
          role: data.info["role"],
          permissions: data.info["permissions"],
        });
        this.extras = res;
      }
    } catch (err) {
      console.error("Failed to load /me:", err);
      window.location.href = "/login";
    }
  }

  hasPermission(perm: string) {
    return (this.permissions || "").split(",").includes(perm);
  }

  hasRole(role: string[] | string) {
    if (Array.isArray(role)) {
      return role.some((r) => this.role === r);
    } else {
      return this.role === role;
    }
  }

  get isLaunchpad() {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith("LaunchpadUser" + "=")) {
        return cookie.substring("LaunchpadUser".length + 1);
      }
    }
    return undefined;
  }

  private clear() {
    localStorage.removeItem("_identity_i");
    localStorage.removeItem("_identity_p");
    localStorage.removeItem("_identity_la");
    localStorage.removeItem("_identity_x");
  }

  signOut() {
    if (AboutMeState.SignOutCallback !== undefined) {
      AboutMeState.SignOutCallback({
        id: this.info["id"],
        username: this.info["username"],
        role: this.info["role"],
        permissions: this.permissions.split(","),
      });
    }
    this.clear();
    window.location.href = "/sign-out";
  }
}

export const aboutMe = new AboutMeState();
