import Image from "next/image";
import { BsGraphUpArrow } from "react-icons/bs";
import Skeleton from "./Skeleton";
import { Suspense } from "react";
import Link from "next/link";
import { formatTitleForUrl } from "@/lib/formatTitleForUrl";

type Params = {
  trendings: Article[];
};

export default async function Trendings({ trendings }: Params) {
  return (
    <div className="flex flex-col justify-start gap-1 mx-1">
      <div className="flex gap-3 justify-start items-center">
        <BsGraphUpArrow className="text-2xl" />
        <h3 className="text-xl">Trending on Ilmli</h3>
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-x-10 sm:gap-x-6 gap-y-4">
        <Suspense
          fallback={[1, 2, 3, 4, 5, 6].map((i) => {
            return <Skeleton key={i} image={false} />;
          })}
        >
          {trendings.map((trending: Article) => {
            return (
              <div
                key={trending.post_id}
                className="relative py-3 px-5 flex flex-col justify-between items-start cursor-pointer hover:bg-gray-100/50 transition-all min-h-[120px] w-full md:w-[255px] lg:w-[320px] xl:w-[425px] border-b border-gray-200"
              >
                <Link
                  href={`/tag/${
                    trending.post_primary_category
                  }/${formatTitleForUrl(
                    `${trending.post_title}_${trending.post_uuid}`
                  )}`}
                  className="absolute w-full h-full left-0 top-0"
                />
                <div className="flex gap-1 items-start justify-start">
                  <Image
                    src={"/images/avatar.png"}
                    alt="avatar"
                    width={24}
                    height={24}
                    loading="lazy"
                    className="rounded-full border border-gray-600"
                  />
                  <Link
                    href={`/@${trending.user_name}/home`}
                    className="font-medium text-sm hover:underline z-10"
                  >
                    {trending.user_name}
                  </Link>
                </div>
                <div>
                  <span className="text-md font-bold">
                    {trending.post_title}
                  </span>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <span className="text-sm text-gray-500">
                    {trending.post_created_time}
                  </span>
                  {/* &#x2022;
                  <span className="text-sm text-gray-500">
                    {"trending.post_read_time"}
                  </span> */}
                </div>
              </div>
            );
          })}
        </Suspense>
      </div>
    </div>
  );
  return <></>;
}
