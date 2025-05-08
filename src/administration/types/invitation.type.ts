export type Invitation = {
  email: string;
  role: string;
  userid: string;
  inviter: string;
  sentAt: number; // Unix timestamp
};
