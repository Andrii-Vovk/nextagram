import { createAsyncThunk } from "@reduxjs/toolkit";

import { logInRequest, signUpRequest } from "../../services/requests";

import { LoginData, SignUpData } from "./authSlice";

export const login = createAsyncThunk(
    "auth/login",
    async (logindata: LoginData, { rejectWithValue }) => {
      const res = await logInRequest(logindata.login, logindata.password);
  
      if (!res) {
        return rejectWithValue("Something went wrong");
      }
      return res.headers.authorization;
    }
  );
  
  export const signUp = createAsyncThunk(
    "auth/signUp",
    async (signUpData: SignUpData, { rejectWithValue, dispatch }) => {
      const res = await signUpRequest(signUpData.login, signUpData.username, signUpData.password);
  
      if (!res) {
        return rejectWithValue("Something went wrong");
      }
      return dispatch(login({login: signUpData.login, password: signUpData.password}));
    }
  );