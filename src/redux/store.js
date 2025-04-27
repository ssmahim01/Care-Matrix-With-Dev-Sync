import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import menuReducer from "./menuSlice";
import doctorReducer from "./doctors/doctorSlice";
import consultantReducer from "./doctors/consultantSlice";
import bedsReducer from "./bed/bedsSlice";
import patientReducer from "./patient/patientSlice";
import chatReducer from "./chat/chatSlice";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    auth: authReducer,
    doctors: doctorReducer,
    consultants: consultantReducer,
    chats: chatReducer,
    beds: bedsReducer,
    patientStats: patientReducer,
  },
});
