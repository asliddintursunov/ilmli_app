import InfiniteScroll from "@/components/InfiniteScroll";
import Sidebar from "@/components/Sidebar";
import Trendings from "@/components/Trendings";
import HeaderContent from "@/components/HeaderContent";
import {
  fetchFirstTenArticles,
  fetchTrendingArticles,
} from "@/lib/fetchFunctions";

export const runtime = "edge";

export default async function Home() {
  const [trendings, articles]: [
    Article[] | undefined | null,
    Article[] | undefined | null
  ] = await Promise.all([fetchTrendingArticles(), fetchFirstTenArticles(0)]);

  return (
    <>
      <main className="flex min-h-screen flex-col">
        <HeaderContent />
        <br />
        <br />
        <div className="flex flex-col gap-4 md:gap-6 max-w-[1440px] mx-auto">
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
