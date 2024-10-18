import InfiniteScroll from "@/components/InfiniteScroll";
import Sidebar from "@/components/Sidebar";
import Trendings from "@/components/Trendings";
import HeaderContent from "@/components/HeaderContent";
import {
  fetchFirstTenArticles,
  fetchTrendingArticles,
  getUserInterests,
} from "@/lib/fetchFunctions";
import HeaderSlider from "@/components/HeaderSlider";
import Navbar from "@/components/Navbar";

export const runtime = "edge";

export default async function Home() {
  const [trendings, articles, userInterests]: [
    Article[] | undefined | null,
    Article[] | undefined | null,
    string[]
  ] = await Promise.all([
    fetchTrendingArticles(),
    fetchFirstTenArticles(0),
    getUserInterests(),
  ]);

  return (
    <>
      <nav className="border-b-2 border-gray-600 bg-gray-300">
        <Navbar />
      </nav>
      <main className="flex min-h-screen flex-col">
        <HeaderContent />
        {userInterests.length && (
          <HeaderSlider topics={userInterests} path={undefined} />
        )}
        <div className="flex flex-col gap-4 md:gap-6 max-w-[1440px] mx-auto">
          <br />
          <br />
          <Trendings trendings={trendings ? trendings : []} />
          <div className="flex flex-col-reverse md:flex-row  justify-start items-start gap-6 md:gap-16 relative border-t border-gray-200">
            <InfiniteScroll firstTenArticles={articles ? articles : []} />
            <Sidebar />
          </div>
        </div>
      </main>
    </>
  );
}
