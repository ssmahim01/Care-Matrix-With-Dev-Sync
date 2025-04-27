import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import menuReducer from "./menuSlice";
import doctorReducer from "./doctors/doctorSlice";
import consultantReducer from "./doctors/consultantSlice";
import patientReducer from "./patient/patientSlice";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    auth: authReducer,
    doctors: doctorReducer,
    consultants: consultantReducer,
    patientStats: patientReducer,
  },
});
