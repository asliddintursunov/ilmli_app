"use client";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
type Props = {
  category: string;
};

function RelatedArticlesButton({ category }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <>
      <button
        className={clsx(
          "grid place-content-center text-sm sm:text-md cursor-pointer py-2 px-3 rounded-full bg-slate-400/10 hover:bg-slate-700/20 transition-all capitalize ",
          {
            "bg-slate-700/20 border border-slate-500 pointer-events-none":
              pathname.includes(category.replaceAll(" ", "-")),
          }
        )}
        onClick={() => {
          router.push(`/tag/${category.replaceAll(" ", "-")}`.toLowerCase());
        }}
      >
        {category}
      </button>
    </>
  );
}

export default RelatedArticlesButton;
