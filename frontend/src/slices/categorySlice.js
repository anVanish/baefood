import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAuthorizationHeader } from "../utils/AuthorizationHeader";
import { categoryUrl } from "../constants/urlConstants";

export const getCategories = createAsyncThunk(
    "categories/list",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${categoryUrl}`,
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

export const updateCategory = createAsyncThunk(
    "categories/updateCategory",
    async ({ category }, { rejectWithValue }) => {
        try {
            const { _id, ...rest } = category;
            const response = await axios.put(
                `${categoryUrl}/${_id}`,
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

export const deleteCategory = createAsyncThunk(
    "categories/deleteCategory",
    async ({ categoryId }, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `${categoryUrl}/${categoryId}`,
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

export const addCategory = createAsyncThunk(
    "categories/addCategory",
    async ({ category }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${categoryUrl}`,
                category,
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

const categorySlices = createSlice({
    name: "category",
    initialState: {
        categories: [],
        loading: false,
        error: null,
        updateLoading: false,
        updateError: null,
        deleteLoading: false,
        deleteError: null,
        addLoading: false,
        addError: null,
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
                state.categories = action.payload.categories;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })

            //update category
            .addCase(updateCategory.pending, (state) => {
                state.updateLoading = true;
                state.updateError = null;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.updateLoading = false;
                state.updateError = null;
                toast.success("Cập nhật danh mục thành công", {
                    autoClose: 1000,
                });
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.updateLoading = false;
                state.updateError = action.payload;
                toast.error(action.payload);
            })

            //delete food
            .addCase(deleteCategory.pending, (state) => {
                state.deleteLoading = true;
                state.deleteError = null;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.deleteLoading = false;
                state.deleteError = null;
                toast.success("Xóa danh mục thành công", { autoClose: 1000 });
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.deleteLoading = false;
                state.deleteError = action.payload;
                toast.error(action.payload);
            })

            //add food
            .addCase(addCategory.pending, (state) => {
                state.addLoading = true;
                state.addError = null;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.addLoading = false;
                state.addError = null;
                toast.success("Thêm danh mục thành công", { autoClose: 1000 });
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.addLoading = false;
                state.addError = action.payload;
                toast.error(action.payload);
            });
    },
});

export default categorySlices.reducer;
