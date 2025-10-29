export type Role = 'admin' | 'user';
export type Plan = 'pro' | 'basic' | 'free' | string;

export interface UserInfo {
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: Role;
  status?: string;
  plan?: Plan;
}
