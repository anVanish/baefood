import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAuthorizationHeader } from '../utils/AuthorizationHeader';
import { foodUrl } from '../constants/urlConstants';
import authSlice from './authSlice';

export const getFoods = createAsyncThunk(
    'foods/list',
    async ({ page = 0, limit = 9, categoryId }, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${foodUrl}?categoryId=${
                    categoryId || ''
                }&page=${page}&limit=${limit}`,
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
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const updateFood = createAsyncThunk(
    'foods/updateFood',
    async ({ food }, { rejectWithValue }) => {
        try {
            const { _id, ...rest } = food;
            const response = await axios.put(
                `${foodUrl}/${food._id}`,
                rest,
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
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const deleteFood = createAsyncThunk(
    'foods/deleteFood',
    async ({ foodId }, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `${foodUrl}/${foodId}`,
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
            return rejectWithValue(error.response.data.message);
        }
    }
);

const foodSlices = createSlice({
    name: 'food',
    initialState: {
        foods: [],
        total: 0,
        page: 0,
        loading: false,
        error: null,
        updateLoading: false,
        updateError: null,
        deleteLoading: false,
        deleteError: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFoods.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFoods.fulfilled, (state, action) => {
                const { foods, total, page } = action.payload;
                state.loading = false;
                state.error = null;
                state.foods = foods;
                state.total = total;
                state.page = page;
            })
            .addCase(getFoods.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })

            //update food
            .addCase(updateFood.pending, (state) => {
                state.updateLoading = true;
                state.updateError = null;
            })
            .addCase(updateFood.fulfilled, (state, action) => {
                state.updateLoading = false;
                state.updateError = null;
                toast.success('Cập nhật món ăn thành công', {
                    autoClose: 1000,
                });
            })
            .addCase(updateFood.rejected, (state, action) => {
                state.updateLoading = false;
                state.updateError = action.payload;
                toast.error(action.payload);
            })

            //delete food
            .addCase(deleteFood.pending, (state) => {
                state.deleteLoading = true;
                state.deleteError = null;
            })
            .addCase(deleteFood.fulfilled, (state, action) => {
                state.deleteLoading = false;
                state.deleteError = null;
                toast.success('Xóa món ăn thành công', { autoClose: 1000 });
            })
            .addCase(deleteFood.rejected, (state, action) => {
                state.deleteLoading = false;
                state.deleteError = action.payload;
                toast.error(action.payload);
            });
    },
});

export default foodSlices.reducer;
