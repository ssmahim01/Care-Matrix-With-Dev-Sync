import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api_url = import.meta.env.VITE_API_URL;

export const fetchPatientStats = createAsyncThunk(
  "patientStats/fetchPatientStats",
  async (email) => {
    const { data } = await axios.get(`${api_url}/patient/stats/${email}`);
    return data;
  }
);

const patientStatsSlice = createSlice({
  name: "patientStats",
  initialState: {
    stats: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatientStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPatientStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
      })
      .addCase(fetchPatientStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default patientStatsSlice.reducer;
