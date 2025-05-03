import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useAxiosPublic } from "@/hooks/useAxiosPublic";
import { useAuthUser } from "./auth/authActions";

// Async thunk to fetch discount
export const fetchDiscount = createAsyncThunk(
  "discount/fetchDiscount",
  async ({ email, axiosPublic }, { rejectWithValue }) => {
    try {
      if (!email) {
        throw new Error("No email provided");
      }
      if (!axiosPublic || typeof axiosPublic !== "function") {
        throw new Error("Invalid axiosPublic instance");
      }
      const res = await axiosPublic(`/users/discount/${email}`);
      console.log("fetchDiscount response:", res.data);
      return res.data.discountVoucher;
    } catch (error) {
      console.error("fetchDiscount error:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Discount slice
const discountSlice = createSlice({
  name: "discount",
  initialState: {
    discount: 0,
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiscount.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDiscount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.discount = action.payload;
        console.log("fetchDiscount fulfilled, payload:", action.payload);
      })
      .addCase(fetchDiscount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch discount";
        console.log("fetchDiscount rejected, error:", action.payload);
      });
  },
});

// Custom hook to use discount
export const useDiscount = () => {
  const dispatch = useDispatch();
  const user = useAuthUser();
  const axiosPublic = useAxiosPublic();
  const discountState = useSelector((state) => state.discount || {
    discount: 0,
    isLoading: false,
    error: null,
  });
  const { discount, isLoading } = discountState;

  // Fetch discount when user.email changes
  useEffect(() => {
    if (user && typeof user.email === "string" && user.email) {
      console.log("Dispatching fetchDiscount for email:", user.email);
      dispatch(fetchDiscount({ email: user.email, axiosPublic }));
    } else {
      console.log("Skipping fetchDiscount: Invalid or missing email", { user });
    }
  }, [user?.email, axiosPublic, dispatch]);

  // Refetch function
  const refetch = () => {
    if (user && typeof user.email === "string" && user.email) {
      console.log("Refetch triggered for email:", user.email);
      dispatch(fetchDiscount({ email: user.email, axiosPublic }));
    } else {
      console.log("Refetch skipped: Invalid or missing email", { user });
    }
  };

  return [discount, isLoading, refetch];
};

export default discountSlice.reducer;