"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
type Props = {
  latest: Article[];
};

function Latest({ latest }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <main className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-x-10 sm:gap-x-6 gap-y-4">
      {latest.length > 0 &&
        latest.map((el: Article) => {
          return (
            <div
              key={el.id}
              className="pb-4 shadow-sm hover:shadow-xl flex flex-col justify-between items-start rounded-sm cursor-pointer dark:hover:bg-slate-500/20 transition-all min-h-[120px] w-full md:w-[255px] lg:w-[320px] gap-4"
              onClick={() => router.push(`${pathname}/post/${el.title}`)}
            >
              <Image
                width={400}
                height={250}
                src={"/images/white_flower.jpg"}
                alt={el.name}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 33vw"
                className="rounded-sm"
              />
              <div className="mx-2">
                <div className="flex gap-1 items-start justify-start">
                  <Image
                    src={"/images/avatar.png"}
                    alt="avatar"
                    width={24}
                    height={24}
                    className="rounded-full border border-gray-600"
                  />
                  <span className="font-medium text-sm">{el.name}</span>
                </div>
                <div className="mt-1">
                  <span className="text-md font-bold">{el.title}</span>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <span className="text-sm text-gray-500">{el.posted}</span>
                  &#x2022;
                  <span className="text-sm text-gray-500">{el.readTime}</span>
                </div>
              </div>
            </div>
          );
        })}
    </main>
  );
}

export default Latest;
