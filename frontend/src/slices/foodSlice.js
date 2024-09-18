import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAuthorizationHeader } from '../utils/AuthorizationHeader';

export const getFoods = createAsyncThunk(
    'foods/list',
    async ({ categoryId }, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `api/v1/foods?categoryId=${categoryId || ''}`,
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
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFoods.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFoods.fulfilled, (state, action) => {
                state.loading = false;
                state.foods = action.payload.data.foods;
            })
            .addCase(getFoods.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            });
    },
});

export default foodSlices.reducer;
