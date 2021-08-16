/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { login, signUp } from "./thunks";

interface AuthState {
  status: "pending" | "error" | "success" | null;
  error: string | null;
  authToken: string | null;
}

const initialState: AuthState = {
  status: null,
  error: null,
  authToken: null,
};

export interface LoginData {
  login: string;
  password: string;
}

export interface SignUpData {
  login: string;
  password: string;
  username: string;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, { payload }: PayloadAction<string>) {
      state.authToken = payload;
    },
    destroyToken(state) {
      state.authToken = null;
    },
    clearLoginError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.status = "success";
        state.authToken = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload as string;
      })
      .addCase(login.pending, (state) => {
        state.status = "pending";
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload as string;
      }) 
      .addCase(signUp.pending, (state) => {
        state.status = "pending";
      }) 
  },
});

export const { setToken, destroyToken, clearLoginError } = authSlice.actions;

export default authSlice.reducer;
