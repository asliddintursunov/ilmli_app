"use client";

import fetchRelatedArticles from "@/lib/fetchRelatedArticles";
import fetchRelatedTrendings from "@/lib/fetchRelatedTrendings";
import { getRelatedArticles } from "@/redux/slices/articlesSlice";
import { getRelatedTrendings } from "@/redux/slices/trendingsSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";

type Props = {
  category: string;
};

function RelatedArticlesButton({ category }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const dataCategory = useAppSelector((state) => state.articles.category);

  const handleClick = async function (category: string) {
    const data = category.split(" ").join("").toLowerCase();
    if (dataCategory === data) return;
    const res = fetchRelatedTrendings(data);
    const res2 = fetchRelatedArticles(data, 0);
    const [trendings, articles] = await Promise.all([res, res2]);

    dispatch(getRelatedTrendings(trendings));
    dispatch(
      getRelatedArticles({
        articles,
        category: data,
      })
    );
  };
  return (
    <>
      <button
        className="grid place-content-center text-sm sm:text-md cursor-pointer py-2 px-3 rounded-full bg-slate-400/10 hover:bg-slate-700/20 transition-all"
        onClick={() => handleClick(category)}
      >
        {category}
      </button>
    </>
  );
}

export default RelatedArticlesButton;
