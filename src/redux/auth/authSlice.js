import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Login User
    loginUser: (state, action) => {
      state.user = action.payload;
    },
    // Logout User
    logOutUser: (state) => {
      (state.user = null), (state.loading = false);
    },
    // Loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { loginUser, logOutUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
