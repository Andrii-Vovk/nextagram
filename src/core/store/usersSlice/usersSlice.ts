/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ProfileCardProps } from "../../../ui/components/ProfileCard/ProfileCard";
import { getAllProfiles } from "../../services/requests";
import ApiProfieToPropsProfile from "../../utils/ApiPorfileToPropsProfile";

interface UsersStoreState {
    status: 'loaded' | 'pending' | 'error';
    profiles?: ProfileCardProps[];
}

const initialState: UsersStoreState = {
    status: 'pending',
}

export const fetchProfiles = createAsyncThunk('users/fetchProfiles', async (token: string) => {
    const response = await getAllProfiles(token);
    return response?.map(item => ApiProfieToPropsProfile(item, 'Homepage'));
  })

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(fetchProfiles.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(fetchProfiles.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.profiles = action.payload;
            })
            .addCase(fetchProfiles.rejected, (state) => {
                state.status = 'error';
            })
    }
})

export default usersSlice.reducer;