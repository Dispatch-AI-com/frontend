// src/features/auth/authSlice.ts
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { UserInfo } from '@/types/user.d';

interface AuthState {
  user: UserInfo | null;
  isAuthenticated: boolean;
  csrfToken: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  csrfToken: null,
};

interface Credentials {
  user: UserInfo;
  csrfToken: string;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<Credentials>) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.csrfToken = action.payload.csrfToken;
    },
    updateCSRFToken: (state, action: PayloadAction<string>) => {
      state.csrfToken = action.payload;
    },
    logout: () => ({ ...initialState }),
  },
});

export const { setCredentials, updateCSRFToken, logout } = authSlice.actions;
export default authSlice.reducer;
