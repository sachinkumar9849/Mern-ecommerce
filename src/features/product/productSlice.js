import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect"; // Import createSelector from reselect
import { fetchAllProducts, fetchProductsByFilters } from "./productAPI";

const initialState = {
  products: [],
  status: 'idle',
  totalItems:0
};

export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchProductsByFiltersAsync = createAsyncThunk(
  'product/fetchProductsByFilters',
  async ({filter,sort,pagination}) => {
    const response = await fetchProductsByFilters(filter,sort,pagination);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      
  },
});

export const { increment } = productSlice.actions;

// Define the selectAllProducts selector using createSelector
export const selectAllProducts = createSelector(
  (state) => state.product.products, // Adjust this to match your state structure
  (products) => products
);
export const selectTotalItems = (state) => state.product.totalItems;

// Export the reducer and the selector
export default productSlice.reducer;
