/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ErrorState {
    error: string | null;
}

const initialState: ErrorState = {
    error: null
}


const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setError(state, {payload}: PayloadAction<string>) {
            state.error = payload;
        },
        clearError(state) {
            state.error = null;
        }
    }
})

export const {setError, clearError} = errorSlice.actions;

export default errorSlice.reducer;

