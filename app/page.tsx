import InfiniteScroll from "@/components/InfiniteScroll";
import getInitialArticles from "@/lib/getInitialArticles";
import Sidebar from "@/components/Sidebar";
import Trendings from "@/components/Trendings";
import HeaderContent from "@/components/HeaderContent";
export default async function Home() {
  const products: Product[] = await getInitialArticles();

  return (
    <>
      <main className="flex min-h-screen flex-col">
        {/* Headers */}
        <HeaderContent />
        <br />
        <br />
        <div className="flex flex-col gap-4 md:gap-6 max-w-[1440px] mx-auto">
          <Trendings />
          <div className="flex flex-col-reverse md:flex-row  justify-start items-start gap-6 md:gap-16 relative ">
            <InfiniteScroll data={products} />
            <Sidebar />
          </div>
        </div>
      </main>
    </>
  );
}
