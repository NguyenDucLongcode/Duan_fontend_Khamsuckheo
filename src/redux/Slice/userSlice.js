import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  userInfor: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.isLogin = true;
      state.userInfor = action.payload;
    },
    userLogOut: (state) => {
      state.isLogin = false;
      state.userInfor = null;
    },
  },
});
export const { userLogin, userLogOut } = userSlice.actions;

export default userSlice.reducer;
