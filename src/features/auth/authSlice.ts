import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { UserInfo } from '@/types/user.d';

interface AuthState {
  token: string | null;
  user: UserInfo | null;
}
const initialState: AuthState = { token: null, user: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (s, a: PayloadAction<AuthState>) => {
      s.token = a.payload.token;
      s.user = a.payload.user;
    },
    logout: () => initialState,
  },
});
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
