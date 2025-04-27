// src/slices/bedsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedBed: null,
  isBookingModalOpen: false,
  isDetailsModalOpen: false,
  selectedBedType: '',
};

const bedsSlice = createSlice({
  name: 'beds',
  initialState,
  reducers: {
    setSelectedBed: (state, action) => {
      state.selectedBed = action.payload;
    },
    setIsBookingModalOpen: (state, action) => {
      state.isBookingModalOpen = action.payload;
    },
    setIsDetailsModalOpen: (state, action) => {
      state.isDetailsModalOpen = action.payload;
    },
    setSelectedBedType: (state, action) => {
      state.selectedBedType = action.payload;
    },
    resetBookingModal: (state) => {
      state.isBookingModalOpen = false;
      state.selectedBedType = '';
    },
    resetDetailsModal: (state) => {
      state.isDetailsModalOpen = false;
      state.selectedBed = null;
    },
  },
});

export const {
  setSelectedBed,
  setIsBookingModalOpen,
  setIsDetailsModalOpen,
  setSelectedBedType,
  resetBookingModal,
  resetDetailsModal,
} = bedsSlice.actions;

export default bedsSlice.reducer;