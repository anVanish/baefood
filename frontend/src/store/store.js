import { configureStore } from '@reduxjs/toolkit';
import toastReducer from '../slices/toastSlice';
import loginModalReducer from '../slices/loginModalSlice';
import authSlice from '../slices/authSlice';
import foodSlice from '../slices/foodSlice';
import categorySlice from '../slices/categorySlice';
import wishlistSlice from '../slices/wishlistSlice';

export const store = configureStore({
    reducer: {
        toast: toastReducer,
        loginModal: loginModalReducer,
        auth: authSlice,
        food: foodSlice,
        category: categorySlice,
        wishlist: wishlistSlice,
    },
});
