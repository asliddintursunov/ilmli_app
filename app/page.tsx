import StartReading from "@/components/StartReading";
import Image from "next/image";
import { RxAvatar } from "react-icons/rx";
import { BsGraphUpArrow } from "react-icons/bs";
import InfiniteScroll from "@/components/InfiniteScroll";
import getInitialProducs from "@/lib/getInitialProducs";
import trendings from "@/lib/getTrendingOnIlmli";
export default async function Home() {
  const isRegistered = false;

  const produstsData: Promise<Product[]> = getInitialProducs();
  const products: Product[] = await produstsData;

  return (
    <>
      <main className="flex min-h-screen flex-col items-start">
        <div className="w-full flex items-stretch justify-between p-4 border-b-[1px] border-gray-600">
          <div className="flex flex-col justify-center items-start gap-6">
            <h2 className="md:text-3xl sm:text-2xl text-xl font-normal">
              {isRegistered
                ? "Ilmli platfromasi orqali O'zbek tilidagi amaliy bilimlar bazasi yaralishiga o'z xissangizni qo'sing"
                : "Ilmli platformasida siz o'zingiz uchun yangi amaliy bilimlarni o'rganing va o'z bilimlaringizni boshqalar bilan ulashishing"}
            </h2>
            <StartReading />
          </div>
          <div className="hidden sm:block">
            <div className="w-[250px] h-[250px] border-1 border-slate-600 bg-gray-600 grid place-items-center">
              <h1 className="text-white">Qandaydir Gif</h1>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="flex flex-col justify-start gap-1">
          <div className="flex gap-3 justify-start items-center px-2">
            <BsGraphUpArrow className="text-2xl" />
            <h3 className="text-xl">Trending on Ilmli</h3>
          </div>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-x-10 sm:gap-x-6 gap-y-4 p-4">
            {trendings().map((trending: Trending) => {
              return (
                <div
                  key={trending.id}
                  className="max-w-80 py-3 px-5 shadow-md hover:shadow-xl flex flex-col justify-between items-start rounded-md cursor-pointer dark:hover:bg-slate-700/20 transition-all"
                >
                  <div className="flex gap-1 items-start justify-start">
                    {/* <Image 
                src={trending.pic}
                alt="avatar"
                width={30}
                height={30}
                /> */}
                    <RxAvatar className="text-2xl" />
                    <span className="font-medium text-sm">{trending.name}</span>
                  </div>
                  <div>
                    <span className="text-md font-bold">{trending.title}</span>
                  </div>
                  <div className="flex items-center justify-start gap-2">
                    <span className="text-sm text-gray-500">
                      {trending.posted}
                    </span>
                    &#x2022;
                    <span className="text-sm text-gray-500">
                      {trending.readTime}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <InfiniteScroll data={products.slice(0, 10)} />
      </main>
    </>
  );
}
