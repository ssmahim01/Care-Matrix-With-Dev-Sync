import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/dashboard/administrator/doctors`;

// Fetch all doctors
export const fetchDoctors = createAsyncThunk("doctors/fetchAll", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Fetch specific doctor
export const fetchSpecificDoctor = createAsyncThunk("doctors/fetchDoctor", async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
});

// Add new doctor
export const addDoctor = createAsyncThunk("doctors/add", async (doctorData) => {
  const response = await axios.post(API_URL, doctorData);
  return response.data;
});

// Update doctor
export const updateDoctor = createAsyncThunk("doctors/update", async ({ id, updatedData }) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedData);
  return response.data;
});

// Delete doctor
export const deleteDoctor = createAsyncThunk("doctors/delete", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const doctorSlice = createSlice({
  name: "doctors",
  initialState: { doctors: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.doctors = action.payload;
        state.status = "succeeded";
      })
      .addCase(addDoctor.fulfilled, (state, action) => {
        state.doctors.push(action.payload);
      })
      .addCase(updateDoctor.fulfilled, (state, action) => {
        const index = state.doctors.findIndex((doc) => doc._id === action.payload._id);
        if (index !== -1) {
          state.doctors[index] = action.payload;
        }
      })
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.doctors = state.doctors.filter((doc) => doc._id !== action.payload);
      });
  },
});

export default doctorSlice.reducer;