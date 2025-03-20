import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/features/userSlice";
import sellerReducer from "../redux/features/sellerSlice";
import adminReducer from "../redux/features/adminSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    admin: adminReducer,
  },
});
