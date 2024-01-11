import Image from "next/image";
import { BsGraphUpArrow } from "react-icons/bs";
import trendings from "@/lib/getTrendingOnIlmli";
export default function Trendings() {
  return (
    <div className="flex flex-col justify-start gap-1 ">
      <div className="flex gap-3 justify-start items-center">
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
                <Image
                  src={"/images/avatar.png"}
                  alt="avatar"
                  width={24}
                  height={24}
                  className="rounded-full border border-gray-600"
                />
                <span className="font-medium text-sm">{trending.name}</span>
              </div>
              <div>
                <span className="text-md font-bold">{trending.title}</span>
              </div>
              <div className="flex items-center justify-start gap-2">
                <span className="text-sm text-gray-500">{trending.posted}</span>
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
  );
}