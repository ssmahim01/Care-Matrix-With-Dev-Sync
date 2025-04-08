import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/dashboard/administrator/doctors`;

// Fetch all doctors
export const fetchDoctors = createAsyncThunk("doctors/fetchDoctors", async ({search = "", sort = ""} = {}) => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/user-requests/doctors?search=${search}&sort=${sort}`);
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
export const updateDoctor = createAsyncThunk("doctors/update", async ({ id, noteOfAdministrator }) => {
  const response = await axios.patch(`${import.meta.env.VITE_API_URL}/user-requests/update-note/${id}`, {noteOfAdministrator});
  return response.data;
});

// Reject a doctor
export const rejectDoctor = createAsyncThunk("doctors/reject", async (id) => {
  const response = await axios.patch(`${import.meta.env.VITE_API_URL}/user-requests/reject-status/${id}`);
  return response.data;
});

// Assign a doctor
export const assignDoctor = createAsyncThunk("doctors/assign", async (id) => {
  const response = await axios.patch(`${import.meta.env.VITE_API_URL}/user-requests/assign-status/${id}`);
  return response.data;
});

// Convert role
export const convertRole = createAsyncThunk("doctors/role", async (email) => {
  const response = await axios.patch(`${import.meta.env.VITE_API_URL}/users/convert-role/${email}`);
  return response.data;
});

// Delete doctor
export const deleteDoctor = createAsyncThunk("doctors/delete", async (id) => {
  await axios.delete(`${import.meta.env.VITE_API_URL}/user-requests/delete-doctor/${id}`);
  return id;
});

const doctorSlice = createSlice({
  name: "doctors",
  initialState: { doctors: [], status: "idle", search: "", sort: "", error: null },
  reducers: {
    setSearch(state, action){
      state.search = action.payload
    },
    setSort(state, action){
      state.sort = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.status = "loading"
      })
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
      .addCase(rejectDoctor.fulfilled, (state, action) => {
        const index = state.doctors.findIndex((doc) => doc._id === action.payload._id);
        if (index !== -1) {
          state.doctors[index] = action.payload;
        }
      })
      .addCase(assignDoctor.fulfilled, (state, action) => {
        const index = state.doctors.findIndex((doc) => doc._id === action.payload._id);
        if (index !== -1) {
          state.doctors[index] = action.payload;
        }
      })
      .addCase(convertRole.fulfilled, (state, action) => {
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

export const { setSearch, setSort } = doctorSlice.actions;
export default doctorSlice.reducer;