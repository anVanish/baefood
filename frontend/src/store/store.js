import { configureStore } from '@reduxjs/toolkit';
import toastReducer from '../slices/toastSlice';
import loginModalReducer from '../slices/loginModalSlice';
import authSlice from '../slices/authSlice';

export const store = configureStore({
    reducer: {
        toast: toastReducer,
        loginModal: loginModalReducer,
        auth: authSlice,
    },
});
