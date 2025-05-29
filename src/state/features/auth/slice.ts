// src/state/features/auth/slice.ts
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
}

const initialState: AuthState = { token: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    logout: () => initialState,
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
