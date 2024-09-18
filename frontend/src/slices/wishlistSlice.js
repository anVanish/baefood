import { createSlice } from '@reduxjs/toolkit';

const getWishList = () => {
    const storedWishlist = localStorage.getItem('wishlist');
    return storedWishlist ? JSON.parse(storedWishlist) : [];
};

const wishlistSlice = createSlice({
    name: 'wishList',
    initialState: {
        wishlist: getWishList(),
    },
    reducers: {
        addOrRemoveWishlist: (state, action) => {
            const food = action.payload;
            const isFoodInWishlist = state.wishlist.some(
                (item) => item && item._id === food._id
            );
            let updatedWishlist;

            if (isFoodInWishlist) {
                updatedWishlist = state.wishlist.filter(
                    (item) => item && item._id !== food._id
                );
            } else {
                updatedWishlist = [...state.wishlist, food];
            }

            state.wishlist = updatedWishlist;
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        },
    },
});

export const { addOrRemoveWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
