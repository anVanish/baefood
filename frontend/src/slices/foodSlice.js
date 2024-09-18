import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAuthorizationHeader } from '../utils/AuthorizationHeader';

export const getFoods = createAsyncThunk(
    'foods/list',
    async ({ page = 0, limit = 9, categoryId }, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `api/v1/foods?categoryId=${
                    categoryId || ''
                }&page=${page}&limit=${limit}`,
                { ...getAuthorizationHeader() }
            );

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

const foodSlices = createSlice({
    name: 'food',
    initialState: {
        foods: [],
        total: 0,
        loading: false,
        page: 0,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFoods.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFoods.fulfilled, (state, action) => {
                const { foods, total, page } = action.payload.data;
                state.loading = false;
                state.foods = foods;
                state.total = total;
                state.page = page;
            })
            .addCase(getFoods.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            });
    },
});

export default foodSlices.reducer;
