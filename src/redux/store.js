import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import menuReducer from "./menuSlice";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    auth: authReducer,
  },
});
