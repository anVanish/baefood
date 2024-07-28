import { configureStore } from '@reduxjs/toolkit';
import toastReducer from '../slices/toastSlice';
import loginModalReducer from '../slices/loginModalSlice';

export const store = configureStore({
    reducer: {
        toast: toastReducer,
        loginModal: loginModalReducer,
    },
});
