import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chats",
    initialState: { chats: [], status: "idle", error: null, patient: null, doctor: null, pharmacist: null, patientStatus: "idle", patientError: null },
    reducers: {       
        // Actions for patient data
        fetchPatientStart(state) {
          state.patientStatus = "loading";
          state.patientError = null;
        },
        fetchPatientSuccess(state, action) {
          state.patient = action.payload;
          state.patientStatus = "succeeded";
          state.patientError = null;
        },
        fetchPatientFailure(state, action) {
          state.patientStatus = "failed";
          state.patientError = action.payload;
        },
      },
    });
    
    export const {
      fetchPatientStart,
      fetchPatientSuccess,
      fetchPatientFailure,
    } = chatSlice.actions;

export default chatSlice.reducer;