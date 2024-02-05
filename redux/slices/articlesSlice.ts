import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState = {
  value: [] as Article[],
  category: null as string | null,
} as {
  value: Article[];
  category: string | null;
};

export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    // state, action: PayloadAction<Article[]>
    getRelatedArticles: function (
      state,
      action: PayloadAction<{
        category: string | null;
        articles: Article[];
      }>
    ) {
      if (action.payload.category === state.category) {
        const data = [];
        // if (action.payload.articles) {
        data.push(...state.value, ...action.payload.articles);
        // }
        state.value = data;
      } else {
        state.value = action.payload.articles;
        state.category = action.payload.category;
      }
      console.log(state.value);
    },
  },
});

export const { getRelatedArticles } = articlesSlice.actions;
export default articlesSlice.reducer;
