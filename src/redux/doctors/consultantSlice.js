import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// URL of backend
const API_URL = `${import.meta.env.VITE_API_URL}/dashboard/administrator/doctors`;

// Fetch all doctors from doctors collection
export const fetchAllDoctors = createAsyncThunk("consultants/fetchAllDoctors", async ({ search = "", sort = "" } = {}) => {
    const response = await axios.get(`${API_URL}/all?search=${search}&sort=${sort}`);
    return response.data;
});

// Update Availability
export const updateAvailability = createAsyncThunk("consultants/update-availability", async ({ id, updatedAvailability }) => {
    const response = await axios.put(
        `${API_URL}/update-availability/${id}`,
        updatedAvailability,
        {
            timeout: 5000,
        }
    );
    return response.data;
});

// Remove doctor from doctors collection
export const removeSpecificDoctor = createAsyncThunk("consultants/remove-doctor", async (id) => {
    await axios.delete(`${API_URL}/remove-doctor/${id}`);
    return id;
  });

const consultantSlice = createSlice({
    name: "consultants",
    initialState: { consultants: [], status: "idle", search: "", sort: "", error: null },
    reducers: {
        setSearch(state, action) {
            state.search = action.payload
        },
        setSort(state, action) {
            state.sort = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllDoctors.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchAllDoctors.fulfilled, (state, action) => {
                state.consultants = action.payload;
                state.status = "succeeded";
            })
            .addCase(updateAvailability.fulfilled, (state, action) => {
                const index = state.consultants.findIndex((consultant) => consultant._id === action.payload._id);
                if (index !== -1) {
                    state.consultants[index] = action.payload;
                }
            })
            .addCase(removeSpecificDoctor.fulfilled, (state, action) => {
                state.consultants = state.consultants.filter((consultant) => consultant._id !== action.payload);
            });
    }
})

export const { setSearch, setSort } = consultantSlice.actions;
export default consultantSlice.reducer;