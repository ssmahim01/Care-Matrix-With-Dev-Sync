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
    // User state
    setUser: (state, action) => {
      state.user = action.payload;
    },
    // Update Username
    updateUsername: (state, action) => {
      if (state.user) {
        state.user.displayName = action.payload;
      }
    },
    // Update UserPhoto
    updateUserPhoto: (state, action) => {
      if (state.user) {
        state.user.photoURL = action.payload;
      }
    },
    // Loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  loginUser,
  logOutUser,
  setUser,
  updateUsername,
  updateUserPhoto,
  setLoading,
} = authSlice.actions;

export default authSlice.reducer;
