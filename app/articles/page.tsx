import HeaderSlider from "@/components/HeaderSlider";
import { getArticlesByCategory, getUserInterests } from "@/lib/fetchFunctions";
import ArticlesNavBar from "./components/ArticlesNavBar";
import ArticlesContent from "./components/ArticlesContent";

export default async function Articles({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const userInterests: string[] = await getUserInterests();

  const search =
    typeof searchParams?.search === "string" ? searchParams?.search : "";

  const articles: Article[] = await getArticlesByCategory(search, 0);

  return (
    <>
      <ArticlesNavBar />
      <main className="flex flex-col items-center">
        {userInterests.length && <HeaderSlider topics={userInterests} />}
      </main>
      {articles && (
        <div className="pb-10 max-w-[1240px] mx-auto">
          <ul className="mt-4 flex flex-col gap-2">
            {articles.map((item) => (
              <ArticlesContent key={item.post_id} props={item} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
