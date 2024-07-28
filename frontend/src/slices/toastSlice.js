import { createSlice } from '@reduxjs/toolkit';

export const toastSlice = createSlice({
    name: 'toast',
    initialState: null,
    reducers: {
        showToast: (state, action) => {
            return action.payload; // { message: '', type: 'success' }
        },
        clearToast: (state, action) => {
            return null;
        },
    },
});

export const { showToast, clearToast } = toastSlice.actions;
export default toastSlice.reducer;
