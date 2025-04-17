import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// URL of backend
const API_URL = `${import.meta.env.VITE_API_URL}/dashboard/administrator/doctors`;

// Fetch all doctors from doctors collection
export const fetchAllDoctors = createAsyncThunk("consultants/fetchAllDoctors", async ({ search = "", sort = "" } = {}) => {
    const response = await axios.get(`${API_URL}/all?search=${search}&sort=${sort}`);
    return response.data;
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
    }
})

export const { setSearch, setSort } = consultantSlice.actions;
export default consultantSlice.reducer;