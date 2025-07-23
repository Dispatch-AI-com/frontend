// src/features/auth/authSlice.ts
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { AuthErrorType } from '@/types/auth-errors';
import type { UserInfo } from '@/types/user.d';

interface AuthState {
  token: string | null;
  user: UserInfo | null;
  isAuthenticated: boolean;
  authError?: {
    type: AuthErrorType;
    timestamp: number;
    showModal: boolean;
  };
  lastAuthCheck: number;
  isCheckingAuth: boolean;
}

const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
  authError: undefined,
  lastAuthCheck: 0,
  isCheckingAuth: false,
};

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
      state.isAuthenticated = true;
      state.authError = undefined;
      state.lastAuthCheck = Date.now();
    },
    setUser: (state, action: PayloadAction<UserInfo | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.authError = undefined;
      state.lastAuthCheck = Date.now();
    },
    logout: state => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.authError = undefined;
    },
    setAuthError: (state, action: PayloadAction<AuthErrorType>) => {
      // 只有真正的认证错误才显示模态框
      const isAuthenticationError = [
        'USER_DELETED',
        'USER_BANNED',
        'USER_INACTIVE',
        'TOKEN_EXPIRED',
        'TOKEN_INVALID',
        'PERMISSION_DENIED',
      ].includes(action.payload);

      state.authError = {
        type: action.payload,
        timestamp: Date.now(),
        showModal: isAuthenticationError,
      };
      state.isCheckingAuth = false;
    },
    clearAuthError: state => {
      state.authError = undefined;
    },
    setCheckingAuth: (state, action: PayloadAction<boolean>) => {
      state.isCheckingAuth = action.payload;
    },
    updateLastAuthCheck: state => {
      state.lastAuthCheck = Date.now();
    },
  },
});

export const {
  setCredentials,
  setUser,
  logout,
  setAuthError,
  clearAuthError,
  setCheckingAuth,
  updateLastAuthCheck,
} = authSlice.actions;
export default authSlice.reducer;
