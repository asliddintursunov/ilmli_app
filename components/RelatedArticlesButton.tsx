"use client";

import getRelatedArticles from "@/lib/getRelatedArticles";

type Props = {
  category: string;
};

function RelatedArticlesButton({ category }: Props) {
  const handleClick = async function (ca: string) {
    const data = ca.split(" ").join("").toLowerCase();
    const res = await getRelatedArticles(data);
    console.log(res);
  };
  return (
    <button
      className="grid place-content-center text-sm sm:text-md cursor-pointer py-2 px-3 rounded-full bg-slate-400/10 hover:bg-slate-700/20 transition-all"
      onClick={() => handleClick(category)}
    >
      {category}
    </button>
  );
}

export default RelatedArticlesButton;
