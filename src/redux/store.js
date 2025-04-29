import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./auth/authSlice";
import bedsReducer from "./bed/bedsSlice";
import cartReducer from "./cartSlice";
import consultantReducer from "./doctors/consultantSlice";
import appointmentReducer from "./appointments/appointmentsSlice"
import rewardUserReducer from './rewardUser/rewardUserSlice'; 
import doctorReducer from "./doctors/doctorSlice";
import { doctorStatsApi } from "./doctors/doctorStatsApi";
import menuReducer from "./menuSlice";
import patientReducer from "./patient/patientSlice";
import chatReducer from "./chat/chatSlice";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    auth: authReducer,
    doctors: doctorReducer,
    consultants: consultantReducer,
    appointments: appointmentReducer,
    rewardUser: rewardUserReducer,
    chats: chatReducer,
    beds: bedsReducer,
    patientStats: patientReducer,
    cart: cartReducer,
    [doctorStatsApi.reducerPath]: doctorStatsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(doctorStatsApi.middleware),
});

setupListeners(store.dispatch);
