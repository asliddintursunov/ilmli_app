import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState = {
  value: [] as Article[],
} as {
  value: Article[];
};

export const trendingsSlice = createSlice({
  name: "trendings",
  initialState,
  reducers: {
    // state, action: PayloadAction<Article[]>
    getRelatedTrendings: function (state, action: PayloadAction<Article[]>) {
      state.value = action.payload;
    },
  },
});

export const { getRelatedTrendings } = trendingsSlice.actions;
export default trendingsSlice.reducer;
