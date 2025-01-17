import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timeSchedule: "",
};

export const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    timeSchedule: (state, action) => {
      state.timeSchedule = action.payload;
    },
  },
});
export const { timeSchedule } = scheduleSlice.actions;

export default scheduleSlice.reducer;
