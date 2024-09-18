import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAuthorizationHeader } from '../utils/AuthorizationHeader';

export const getCart = createAsyncThunk(
    'cart/list',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                'api/v1/carts',
                getAuthorizationHeader()
            );

            const data = response.data;

            if (data.success) {
                return data.data;
            } else {
                return rejectWithValue(data.message);
            }
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            rejectWithValue(error.response.data.message);
        }
    }
);

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ foodId }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `api/v1/carts/${foodId}`,
                {},
                getAuthorizationHeader()
            );

            const data = response.data;
            if (data.success) {
                return data.data;
            } else {
                return rejectWithValue(data.message);
            }
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            rejectWithValue(error.response.data.message);
        }
    }
);

export const deleteFromCart = createAsyncThunk(
    'cart/deleteFromCart',
    async ({ foodId }, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `api/v1/carts/${foodId}`,
                getAuthorizationHeader()
            );

            const data = response.data;
            if (data.success) {
                return data.data;
            } else {
                return rejectWithValue(data.message);
            }
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            rejectWithValue(error.response.data.message);
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        carts: [],
        loading: false,
        error: null,
        addCartLoading: false,
        addCartError: false,
        deleteCartLoading: false,
        deleteCartError: false,
    },
    extraReducers: (builder) => {
        builder
            //get list cart
            .addCase(getCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.carts = action.payload.carts;
            })
            .addCase(getCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })

            //add to cart
            .addCase(addToCart.pending, (state) => {
                state.addCartLoading = true;
                state.addCartError = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.addCartLoading = false;
                state.addCartError = null;
                state.carts = action.payload.carts;
                toast.success(`Thêm vào giỏ hàng thành công`, {
                    autoClose: 1000,
                });
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.addCartLoading = false;
                state.addCartError = action.payload;
                toast.error(action.payload);
            })

            //deleteFromCart
            .addCase(deleteFromCart.pending, (state) => {
                state.deleteCartLoading = true;
                state.deleteCartError = null;
            })
            .addCase(deleteFromCart.fulfilled, (state, action) => {
                state.deleteCartLoading = false;
                state.deleteCartError = null;
                state.carts = action.payload.carts;
                toast.success(`Xoá khỏi giỏ hàng thành công`, {
                    autoClose: 1000,
                });
            })
            .addCase(deleteFromCart.rejected, (state, action) => {
                state.deleteCartLoading = false;
                state.deleteCartError = action.payload;
                toast.error(action.payload);
            });
    },
});

export default cartSlice.reducer;
