import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import bedsReducer from "./bed/bedsSlice";
import cartReducer from "./cartSlice";
import consultantReducer from "./doctors/consultantSlice";
import doctorReducer from "./doctors/doctorSlice";
import { doctorStatsApi } from "./doctors/doctorStatsApi";
import menuReducer from "./menuSlice";
import patientReducer from "./patient/patientSlice";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    auth: authReducer,
    doctors: doctorReducer,
    consultants: consultantReducer,
    beds: bedsReducer,
    patientStats: patientReducer,
    cart: cartReducer,
    [doctorStatsApi.reducerPath]: doctorStatsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    getDefaultMiddleware().concat(doctorStatsApi.middleware);
  },
});
