export type Role = 'admin' | 'user';

export interface GoogleAccountLink {
  primaryEmail: string; // 用户的主要邮箱
  googleEmail?: string; // 关联的Google邮箱
  googleAccessToken?: string;
  calendarAccessGranted: boolean;
  lastSyncTime?: Date;
}

export interface UserInfo {
  _id: string;
  email: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  role: Role;
  googleId?: string;
  avatar?: string;
  provider?: string;
  googleAccountLink?: GoogleAccountLink;
}
