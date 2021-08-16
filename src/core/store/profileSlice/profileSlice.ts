/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

import { ProfileType } from "../../../ui/components/ProfileCard/ProfileCard";

import fetchProfile from "./thunks";

export interface ProfileStoreState {
    status: 'loaded' | 'pending' | 'error';
    profile?: ProfileType;
}

const initialState: ProfileStoreState = {
    status: 'pending',
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        updateProfile(state, action) {
            state.profile = action.payload.profile;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.profile = action.payload.profile;
            })
            .addCase(fetchProfile.rejected, (state) => {
                state.status = 'error';
            })
    }
})

export const {
    updateProfile
} = profileSlice.actions;

export default profileSlice.reducer;