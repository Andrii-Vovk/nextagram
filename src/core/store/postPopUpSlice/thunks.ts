import { createAsyncThunk } from "@reduxjs/toolkit";

import { postComment } from "../../services/requests";
import { RootState } from "../store";

import { ResendType, removeCommentById } from "./postPopUpSlice";

export const addComment = createAsyncThunk(
  "postPopUp/addComment",

  async (comment: string, { getState, rejectWithValue }) => {
    const state = getState() as RootState;

    if (state.popUp.post && state.auth.authToken) {
      const res = await postComment(
        comment,
        state.popUp.post?.id,
        state.auth.authToken
      );

      if (res === false) {
        return rejectWithValue(
          "Something went wrong while posting the comment"
        );
      }

      return res;
    }
    return rejectWithValue("Not Authorized");
  }
);

export const resendComment = createAsyncThunk(
  "postPopUp/resendComment",

  async (comment: ResendType, { dispatch }) => {
    dispatch(removeCommentById(comment.id));
    dispatch(addComment(comment.text));
  }
);
