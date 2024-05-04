import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  username: undefined,
} as {
  username?: string;
};

export const getNewRegisteredUsernameSlice = createSlice({
  name: "getNewRegisteredUsername",
  initialState,
  reducers: {
    getNewRegisteredUsername: function (
      state,
      action: PayloadAction<string | undefined>
    ) {
      state.username = action.payload;
    },
  },
});
export const { getNewRegisteredUsername } =
  getNewRegisteredUsernameSlice.actions;
export default getNewRegisteredUsernameSlice.reducer;
