"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
type Props = {
  newest: { newest: Article[] };
};

function Newest({ newest }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const articles = newest.newest;

  return (
    <main className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-x-10 sm:gap-x-6 gap-y-4">
      {articles.length > 0 ? (
        articles.map((el: Article) => {
          return (
            <div
              key={el.post_id}
              className="pb-4 shadow-sm hover:shadow-xl flex flex-col justify-between items-start rounded-sm cursor-pointer dark:hover:bg-slate-500/20 transition-all min-h-[120px] w-full md:w-[255px] lg:w-[320px] gap-4"
              onClick={() =>
                router.push(
                  `${pathname}/${el.post_title}_${el.post_uuid}`
                    .replaceAll(" ", "-")
                    .toLowerCase()
                )
              }
            >
              <Image
                width={400}
                height={250}
                src={el.post_image}
                alt={el.user_name}
                loading="lazy"
                className="rounded-sm object-cover object-center flex-1"
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
                  <span className="font-medium text-sm">{el.user_name}</span>
                </div>
                <div className="mt-1 text-ellipsis">
                  <span className="text-md font-bold ">{el.post_title}</span>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <span className="text-sm text-gray-500">
                    {el.post_created_time}
                  </span>
                  &#x2022;
                  <span className="text-sm text-gray-500">{"el.readTime"}</span>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-4xl">
          <h1>No newest stories found!</h1>
        </div>
      )}
    </main>
  );
}

export default Newest;
