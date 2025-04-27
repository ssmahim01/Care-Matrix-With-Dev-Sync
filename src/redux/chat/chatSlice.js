import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chats",
    initialState: { chats: [], status: "idle", error: null, patient: null, doctor: null, pharmacist: null, patientStatus: "idle", patientError: null, doctorStatus: "idle", doctorError: null, pharmacistStatus: "idle", pharmacistError: null },
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

        // Actions for doctor data
        fetchDoctorStart(state) {
            state.doctorStatus = "loading";
            state.doctorError = null;
        },
        fetchDoctorSuccess(state, action) {
            state.doctor = action.payload;
            state.doctorStatus = "succeeded";
            state.doctorError = null;
        },
        fetchDoctorFailure(state, action) {
            state.doctorStatus = "failed";
            state.doctorError = action.payload;
        },
        // Actions for pharmacist data
        fetchPharmacistStart(state) {
            state.pharmacistStatus = "loading";
            state.pharmacistError = null;
        },
        fetchPharmacistSuccess(state, action) {
            state.pharmacist = action.payload;
            state.pharmacistStatus = "succeeded";
            state.pharmacistError = null;
        },
        fetchPharmacistFailure(state, action) {
            state.pharmacistStatus = "failed";
            state.pharmacistError = action.payload;
        },
    },
});

export const {
    fetchPatientStart,
    fetchPatientSuccess,
    fetchPatientFailure,
    fetchDoctorStart,
    fetchDoctorSuccess,
    fetchDoctorFailure,
    fetchPharmacistStart,
    fetchPharmacistSuccess,
    fetchPharmacistFailure
} = chatSlice.actions;

export default chatSlice.reducer;