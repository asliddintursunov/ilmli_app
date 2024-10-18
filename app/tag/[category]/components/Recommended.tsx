"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { formatTitleForUrl } from "@/lib/formatTitleForUrl";

type Props = {
  recommended: Article[];
};

function Recommended({ recommended }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const articles: Article[] = recommended;

  return (
    <main className="grid place-content-center mb-4 border-b border-gray-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
        {articles.length > 0 ? (
          articles.map((el: Article) => {
            return (
              <div
                key={el.post_id}
                className="flex flex-col justify-between items-start gap-6 cursor-pointer hover:bg-gray-200/50 transition-all p-4"
              >
                <Image
                  width={500}
                  height={300}
                  src={el.post_image}
                  alt={"el.user_name"}
                  loading="lazy"
                  className="rounded-sm object-cover object-center flex-1"
                  onClick={() =>
                    router.push(
                      `${pathname}/${formatTitleForUrl(
                        `${el.post_title}_${el.post_uuid}`
                      )}`
                    )
                  }
                />
                <div className="flex flex-col items-start gap-2">
                  <div className="flex flex-row items-center justify-start gap-2">
                    <Image
                      src={"/images/avatar.png"}
                      alt="avatar"
                      width={20}
                      height={20}
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
                    className="flex flex-col gap-1 items-start justify-between cursor-pointer"
                  >
                    <span className="text-xl font-bold">{el.post_title}</span>
                    <span>{el.post_title}</span>
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
            <h1>No recommended stories found!</h1>
          </div>
        )}
      </div>
    </main>
  );
}

export default Recommended;
