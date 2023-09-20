import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/product/productSlice";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import orderReducer from "../features/order/orderSlice";

export const store = configureStore({
  reducer: {
    product: productSlice,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});
