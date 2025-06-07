// src/features/auth/authSlice.ts
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { UserInfo } from '@/types/user.d';

interface AuthState {
  token: string | null;
  user: UserInfo | null;
}
const initialState: AuthState = { token: null, user: null };

interface Credentials {
  token: string;
  user: UserInfo;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<Credentials>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: () => ({ ...initialState }),
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
