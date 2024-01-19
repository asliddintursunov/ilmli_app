"use client";

import fetchRelatedTrendings from "@/lib/fetchRelatedTrendings";
import { getRelatedTrendings } from "@/redux/slices/trendingsSlice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

type Props = {
  category: string;
};

function RelatedArticlesButton({ category }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = async function (category: string) {
    const data = category.split(" ").join("").toLowerCase();
    const res = await fetchRelatedTrendings(data);

    dispatch(getRelatedTrendings(res));
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
