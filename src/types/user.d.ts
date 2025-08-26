export type Role = 'admin' | 'user';

export interface UserInfo {
  _id: string;
  email: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  role: Role;
  status?: string;
  googleId?: string;
  avatar?: string;
  provider?: string;
}
