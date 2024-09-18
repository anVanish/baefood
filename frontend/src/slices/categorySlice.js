import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAuthorizationHeader } from '../utils/AuthorizationHeader';

export const getCategories = createAsyncThunk(
    'categories/list',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('api/v1/categories', {
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
            return rejectWithValue(error.response.data.message);
        }
    }
);

const categorySlices = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.categories = action.payload.data.categories;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            });
    },
});

export default categorySlices.reducer;
