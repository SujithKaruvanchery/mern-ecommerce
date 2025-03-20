import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSellerAuth: false,
  sellerData: {},
};

export const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    saveSeller: (state, action) => {
      state.isSellerAuth = true;
      state.sellerData = action.payload;
    },
    clearSeller: (state) => {
      state.isSellerAuth = false;
      state.sellerData = {};
    },
  },
});

export const { saveSeller, clearSeller } = sellerSlice.actions;

export default sellerSlice.reducer;
