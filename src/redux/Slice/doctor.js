import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doctorSchedule: null,
  doctorInforSchedule: null,
};

export const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    doctorSchedule: (state, action) => {
      state.doctorSchedule = action.payload;
    },
    doctorInforSchedule: (state, action) => {
      state.doctorInforSchedule = action.payload;
    },
  },
});
export const { doctorSchedule, doctorInforSchedule } = doctorSlice.actions;

export default doctorSlice.reducer;
