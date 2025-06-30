export type Role = 'admin' | 'user';

export interface UserInfo {
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: Role;
  googleId?: string;
  avatar?: string;
  provider?: string;
}
