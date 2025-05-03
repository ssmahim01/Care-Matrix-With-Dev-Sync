// src/redux/appointments/appointmentSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch appointments
export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAppointments',
  async ({ email, sortDate }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/appointments/${email}?sort=${sortDate}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState: {
    appointments: [],
    isLoading: false,
    isError: false,
    error: '',
  },
  reducers: {
    clearAppointments(state) {
      state.appointments = [];
      state.isLoading = false;
      state.isError = false;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = '';
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload || 'Failed to fetch appointments';
      });
  },
});

export const { clearAppointments } = appointmentSlice.actions;

export default appointmentSlice.reducer;
