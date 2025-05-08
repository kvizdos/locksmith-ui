import {
  Alert,
  Confirm,
  Prompt,
} from "firelight-ui/feedback/feedback.functions";
import "firelight-ui/buttons/button.component";
import { ButtonComponent } from "firelight-ui/buttons/button.component";
import { NotifyToast } from "firelight-ui/feedback/toast.component";
import { LitElement, html, css } from "lit";
import { state, customElement } from "lit/decorators.js";
import { ref, createRef, Ref } from "lit/directives/ref.js";
import { SecureFetch } from "../../../../sdk/secure-fetch.locksmith";
import { EpochToTimeAgo } from "../../../helpers/date.helpers";

import baseCSS from "../../../styles";
import { Invitation } from "../../../types/invitation.type";

// const logoUrl = new URL('../../assets/images/logo-wide.webp', import.meta.url)
//   .href;

@customElement("locksmith-invitations-subpage")
export class LocksmithInvitationsSubPageView extends LitElement {
  static styles = [baseCSS, css``];

  @state() invites: Invitation[] = [];

  @state() loading: boolean = true;

  sendInviteBtnRef: Ref<ButtonComponent> = createRef();

  OnPageLoad() {
    this.fetchInvites();
  }

  async fetchInvites() {
    const resp = await fetch("/api/users/invitations");
    const js = await resp.json();
    this.invites = js.reverse();
    this.loading = false;
  }

  async sendInvite() {
    const emailAddress = await Prompt({
      id: "send-invites",
      title: "Send a new Invite",
      description:
        "What is the new users email address? You will be able to select their role on the next screen.",
      type: "text",
    });

    if (emailAddress.canceled) {
      return;
    }

    const role = await Prompt({
      id: "invite-role",
      title: "What is this users role?",
      description: "This will give them specific permissions, be careful!",
      type: "radio",
      radioOptions: [
        {
          key: "user",
          title: "User",
        },
        {
          key: "admin",
          title: "Admin",
        },
      ],
    });

    if (role.canceled) {
      return;
    }

    this.sendInviteBtnRef.value!.loading = true;
    try {
      const resp = await SecureFetch("/api/users/invite", {
        method: "POST",
        body: JSON.stringify({
          email: emailAddress.value,
          role: role.value,
        }),
      });

      if (resp.status !== 200) {
        if (resp.status === 409) {
          Alert({
            title: "This user has already been invited.",
            description:
              "Please use a different email or re-issue the old invite.",
          });
          return;
        }

        throw new Error("Got a bad status code: " + resp.status);
      }

      NotifyToast({
        text: "Invitation email has been sent.",
      });
      this.invites = [
        {
          email: emailAddress.value,
          role: role.value,
          inviter: "",
          sentAt: +new Date() / 1000,
          userid: "",
        },
        ...this.invites,
      ];
    } catch (e) {
      NotifyToast({
        text: `Failed to send invite: ${e.message}`,
        danger: true,
      });
    } finally {
      this.sendInviteBtnRef.value!.loading = false;
    }
  }

  render() {
    return html`
      <header class="x">
        <div
          style="display: flex; flex-direction: row; align-items: center; gap: 1rem; margin-bottom: 1rem;"
        >
          <ui-icon
            name="email"
            colorway="lightSecondary"
            size="1.45rem"
          ></ui-icon>

          <h1 style="margin: 0;">Pending Invitations</h1>
        </div>
        <div>
          <button-component
            .expectLoad=${true}
            .loadingText=${"Sending Invite.."}
            ${ref(this.sendInviteBtnRef)}
            @fl-click=${() => {
              this.sendInvite();
            }}
          >
            Send Invite
          </button-component>
        </div>
      </header>

      <div class="widget" style="${this.loading ? "display: none;" : ""}">
        <div class="list">
          ${this.invites.map(
            (u) => html`
              <button href="#" class="item">
                <p id="title">${u.email}</p>
                <p id="description">Invited ${EpochToTimeAgo(u.sentAt)}</p>
              </button>
            `,
          )}
        </div>
      </div>
    `;
  }
}
