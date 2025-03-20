import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import menuReducer from "./menuSlice";
import doctorReducer from "./doctors/doctorSlice";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    auth: authReducer,
    doctors: doctorReducer
  },
});
