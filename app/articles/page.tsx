import HeaderSlider from "@/components/HeaderSlider";
import {
  getArticlesByCategory,
  getForYouArticles,
  getUserInterests,
} from "@/lib/fetchFunctions";
import ArticlesNavBar from "./components/ArticlesNavBar";
import ArticlesContent from "./components/ArticlesContent";
import NotFound from "./not-found";
import Link from "next/link";
import clsx from "clsx";

export default async function Articles({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const userInterests: string[] = await getUserInterests();

  const search =
    typeof searchParams?.search === "string"
      ? searchParams?.search.toLowerCase()
      : "";

  const articles: Article[] = search
    ? await getArticlesByCategory(search, 0)
    : await getForYouArticles();

  return (
    <>
      <ArticlesNavBar />
      <main className="flex flex-col items-center">
        {userInterests.length && (
          <>
            <HeaderSlider
              path={`/articles?search=${search}`}
              topics={userInterests}
            />
          </>
        )}
      </main>
      {(!articles || articles.length === 0) && search === "" && (
        <h1>No articles found and no search term provided.</h1>
      )}

      {Array.isArray(articles) && articles.length > 0 ? (
        <div className="pb-10 max-w-[1240px] mx-auto">
          <ul className="mt-4 flex flex-col gap-2">
            {articles.map((item) => (
              <ArticlesContent key={item.post_id} props={item} />
            ))}
          </ul>
        </div>
      ) : (
        search && <NotFound topic={`${search}`} />
      )}
    </>
  );
}
