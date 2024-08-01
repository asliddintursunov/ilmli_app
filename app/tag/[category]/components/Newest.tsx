"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
type Props = {
  newest: Article[];
};

function Newest({ newest }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const articles = newest;

  return (
    <main className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-x-10 sm:gap-x-6 gap-y-4">
      {articles.length > 0 ? (
        articles.map((el: Article) => {
          return (
            <div
              key={el.post_id}
              className="pb-4 flex flex-col justify-between items-start rounded-sm cursor-pointer hover:bg-gray-200/50 transition-all min-h-[120px] w-full md:w-[255px] lg:w-[320px] gap-4 p-4"
            >
              <Image
                width={400}
                height={250}
                src={el.post_image}
                alt={el.user_name}
                loading="lazy"
                className="rounded-sm object-cover object-center flex-1"
                onClick={() =>
                  router.push(
                    `${pathname}/${el.post_title}_${el.post_uuid}`
                      .replaceAll(" ", "-")
                      .toLowerCase()
                  )
                }
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
                  <Link
                    href={`/@${el.user_name}/home`}
                    className="font-medium text-sm hover:underline"
                  >
                    {el.user_name}
                  </Link>
                </div>
                <div
                  onClick={() =>
                    router.push(
                      `${pathname}/${el.post_title}_${el.post_uuid}`
                        .replaceAll(" ", "-")
                        .toLowerCase()
                    )
                  }
                >
                  <div className="mt-1 text-ellipsis">
                    <span className="text-md font-bold ">{el.post_title}</span>
                  </div>
                  <div className="flex items-center justify-start gap-2">
                    <span className="text-sm text-gray-500">
                      {el.post_created_time}
                    </span>
                    {/* &#x2022;
                    <span className="text-sm text-gray-500">
                      {"el.readTime"}
                    </span> */}
                  </div>
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
