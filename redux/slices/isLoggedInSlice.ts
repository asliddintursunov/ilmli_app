import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState = {
  isLoggedIn: false
} as {
    isLoggedIn: boolean
};

export const isLoggedInSlice = createSlice({
  name: "isLoggedIn",
  initialState,
  reducers: {
    getIsLoggedIn: function (state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { getIsLoggedIn } = isLoggedInSlice.actions;
export default isLoggedInSlice.reducer;
