import { createSlice } from '@reduxjs/toolkit';

export const loginModalSlice = createSlice({
    name: 'loginModal',
    initialState: { isOpen: false, isAdmin: false },
    reducers: {
        openModal: (state, action) => {
            state.isOpen = true;
            state.isAdmin = action.payload.isAdmin;
        },
        closeModal: (state) => {
            state.isOpen = false;
        },
    },
});

export const { openModal, closeModal } = loginModalSlice.actions;
export default loginModalSlice.reducer;
