import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAuthorizationHeader } from '../utils/AuthorizationHeader';

export const getCart = createAsyncThunk(
    'cart/list',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('api/v1/carts', {
                ...getAuthorizationHeader(),
            });

            const data = response.data;

            if (data.success) {
                return data;
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.carts = action.payload.data.carts;
            })
            .addCase(getCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            });
    },
});

export default cartSlice.reducer;
