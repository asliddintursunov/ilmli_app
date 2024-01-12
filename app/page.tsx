import StartReading from "@/components/StartReading";

import InfiniteScroll from "@/components/InfiniteScroll";
import getInitialProducs from "@/lib/getInitialProducs";
import Sidebar from "@/components/Sidebar";
import Trendings from "@/components/Trendings";
export default async function Home() {
  const isRegistered = false;
  const products: Product[] = await getInitialProducs();

  return (
    <>
      <main className="flex min-h-screen flex-col">
        {/* Headers */}
        <div className="border-b-[1px] border-gray-600 bg-yellow-500">
          <div className="w-full flex items-stretch justify-between p-4 max-w-[1440px] mx-auto">
            <div className="flex flex-col justify-center items-start gap-6">
              <h2 className="md:text-3xl sm:text-2xl text-xl font-normal">
                {isRegistered
                  ? "Ilmli platfromasi orqali O'zbek tilidagi amaliy bilimlar bazasi yaratilishiga o'z xissangizni qo'sing"
                  : "Ilmli platformasida yangi amaliy bilimlarni o'rganing va o'z bilimlaringizni boshqalar bilan ulashing"}
              </h2>
              <StartReading />
            </div>
            <div className="hidden sm:block">
              <div className="w-[250px] h-[250px] border-1 border-slate-600 bg-gray-600 grid place-items-center">
                <h1 className="text-white">Qandaydir Gif</h1>
              </div>
            </div>
          </div>
        </div>

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
