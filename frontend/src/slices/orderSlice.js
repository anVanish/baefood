import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAuthorizationHeader } from '../utils/AuthorizationHeader';

const url = 'api/v1/orders';

export const getServeTime = createAsyncThunk(
    'order/getServeTime',
    async ({ day = 0 }, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${url}/serveTime?day=${day}`,
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

export const addOrder = createAsyncThunk(
    'order/addOrder',
    async ({ serveTime, serveDate }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${url}`,
                { serveTime, serveDate },
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

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orders: [],
        serveTimeLoading: false,
        serveTimeError: null,
        availableTimes: null,
        addOrderLoading: false,
        addOrderError: null,
    },
    extraReducers: (builder) => {
        builder
            //get serve time
            .addCase(getServeTime.pending, (state) => {
                state.serveTimeLoading = true;
                state.serveTimeError = null;
            })
            .addCase(getServeTime.fulfilled, (state, action) => {
                state.serveTimeLoading = false;
                state.serveTimeError = null;
                state.availableTimes = action.payload.serveDates;
            })
            .addCase(getServeTime.rejected, (state, action) => {
                state.serveTimeLoading = false;
                state.serveTimeError = action.payload;
                toast.error(action.payload);
            })

            //add new order
            .addCase(addOrder.pending, (state) => {
                state.addOrderLoading = true;
                state.addOrderError = null;
            })
            .addCase(addOrder.fulfilled, (state, action) => {
                state.addOrderLoading = false;
                state.addOrderError = null;
                toast.success('Lên món thành công', { autoClose: 1000 });
            })
            .addCase(addOrder.rejected, (state, action) => {
                state.addOrderLoading = false;
                state.addOrderError = action.payload;
                toast.error(action.payload);
            });
    },
});

export default orderSlice.reducer;
