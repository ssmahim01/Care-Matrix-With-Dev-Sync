import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import menuReducer from "./menuSlice";
import doctorReducer from "./doctors/doctorSlice";
import consultantReducer from "./doctors/consultantSlice";
import appointmentReducer from "./appointments/appointmentsSlice"
import rewardUserReducer from './rewardUser/rewardUserSlice'; 
import bedsReducer from "./bed/bedsSlice";
import patientReducer from "./patient/patientSlice";
import chatReducer from "./chat/chatSlice";
import cartReducer from "./cartSlice";

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
  },
});
