"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
type Props = {
  category: string;
};

function RelatedArticlesButton({ category }: Props) {
  const pathname = usePathname();

  return (
    <>
      <Link
        className={clsx(
          "grid place-content-center text-sm sm:text-md cursor-pointer py-2 px-3 rounded-full bg-slate-400/10 hover:bg-slate-700/20 transition-all",
          {
            "bg-slate-700/20 border border-slate-500 pointer-events-none":
              pathname
                .replace("%20", "")
                .toLowerCase()
                .includes(category.replace(" ", "").toLowerCase()),
          }
        )}
        href={`/tag/${category}`}
      >
        {category}
      </Link>
    </>
  );
}

export default RelatedArticlesButton;
