import { LitElement, html, css } from "lit";
import { state, customElement } from "lit/decorators.js";
import baseCSS from "../../styles";
import "../../layouts/subnav.layout";
import { SubnavPagesList } from "../../layouts/subnav.layout";
import { RouterLocation } from "@vaadin/router";
import { LocksmithLoginComponent } from "../../../forms/login.component";
import { LocksmithUsersSubPageView } from "./users/users.subpage";
import { LocksmithInvitationsSubPageView } from "./users/inviations.subpage";

// const logoUrl = new URL('../../assets/images/logo-wide.webp', import.meta.url)
//   .href;

@customElement("locksmith-users-page")
export class LocksmithUsersPage extends LitElement {
  static styles = [baseCSS, css``];

  onBeforeEnter(location: RouterLocation) {
    // Automatically sync the URL parameter to the @state property
    // userState.setUserID(location.params.userID as string);
  }

  pages: SubnavPagesList = {
    Users: [
      {
        PageKey: "all",
        PageComponent: LocksmithUsersSubPageView,
        PageName: "Registered Users",
        SortIndex: 0,
      },
      {
        PageKey: "invites",
        PageComponent: LocksmithInvitationsSubPageView,
        PageName: "Invitations",
        SortIndex: 1,
      },
    ],
  };

  render() {
    return html`
      <locksmith-subnav-layout
        .urlBase=${`/locksmith/users`}
        .pages=${this.pages}
      >
      </locksmith-subnav-layout>
    `;
  }
}
