// src/redux/rewardUser/rewardUserSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch reward user
export const fetchRewardUser = createAsyncThunk(
  'rewardUser/fetchRewardUser',
  async (email) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/reward-users/${email}`);
    return response.data;
  }
);

const rewardUserSlice = createSlice({
  name: 'rewardUser',
  initialState: {
    rewardUser: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearRewardUser: (state) => {
      state.rewardUser = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRewardUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRewardUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rewardUser = action.payload;
      })
      .addCase(fetchRewardUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearRewardUser } = rewardUserSlice.actions;
export default rewardUserSlice.reducer;
