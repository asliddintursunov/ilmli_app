"use client";

import Skeleton from "@/components/Skeleton";
import { fetchNextTenArticles } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Props = {
  username: string;
  firstTenUserPosts: HomePageFirstTenUserPosts[];
};
function HomePagePosts({ username, firstTenUserPosts }: Props) {
  const router = useRouter();
  const [offset, setOffset] = useState<number>(10);
  const elementsContainer = useRef<HTMLUListElement>(null);
  const [articles, setArticles] = useState<HomePageFirstTenUserPosts[]>([]);
  const [userStillHasArticle, setUserStillHasArticle] = useState<boolean>(true);

  // Fetching first ten articles
  useEffect(() => {
    setArticles(firstTenUserPosts);
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver !== "undefined") {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.intersectionRatio) {
              observer!.unobserve(entry.target);
              if (
                String(articles[articles?.length - 1].post_id) ==
                  entry.target.id &&
                userStillHasArticle
              ) {
                fetchNextTenArticles(username, offset).then((data) => {
                  setArticles((prev) => [...prev, ...data]);
                  setOffset((prev) => prev + 10);
                  if (data.length < 10) setUserStillHasArticle(false);
                });
              }
            }
          });
        },
        { threshold: 1, rootMargin: "200px" }
      );
      elementsContainer.current?.childNodes.forEach((el) => {
        const htmlEl = el as HTMLLIElement;
        observer!.observe(htmlEl);
      });
      return () => observer.disconnect();
    }
  }, [offset, articles]);

  return (
    <main className="w-full">
      {articles.length > 0 ? (
        <div className="pb-10">
          <ul className="mt-4 flex flex-col gap-2" ref={elementsContainer}>
            {articles.map((el: HomePageFirstTenUserPosts) => (
              <li
                onClick={() =>
                  router.push(
                    `/tag/${el.post_primary_category}/${el.post_title}_${el.post_uuid}`
                      .replaceAll(" ", "-")
                      .toLowerCase()
                  )
                }
                id={el.post_id.toString()}
                key={el.post_id}
                className="flex items-stretch justify-between p-2
            cursor-pointer md:h-40 border-b border-gray-200 hover:bg-gray-100/50 transition-all"
              >
                <div className="flex-1 flex flex-col items-start justify-start gap-1">
                  <div className="flex gap-2 items-start justify-start">
                    <Image
                      src={"/images/avatar.png"}
                      alt="avatar"
                      width={24}
                      height={24}
                      loading="lazy"
                      className="rounded-full border border-gray-600"
                    />
                    <Link
                      href={`/@${el.post_author}/home`}
                      className="font-bold text-sm hover:underline"
                    >
                      {el.post_author}
                    </Link>
                  </div>
                  <div className="flex flex-col items-start justify-start gap-1">
                    <h2 className="font-bold text-xl">{el.post_title}</h2>
                    <p className="text-sm text-gray-600">
                      {el.post_description}
                    </p>
                  </div>
                  <div className="flex items-center justify-start gap-2">
                    <span className="text-sm text-gray-500">
                      {el.post_created_time}
                    </span>
                    &#x2022;
                    <span className="text-sm text-gray-500">
                      {"el.readTime"}
                    </span>
                  </div>
                </div>
                <Image
                  alt="flower"
                  src={el.post_image}
                  width={160}
                  height={120}
                  loading="lazy"
                  className="object-cover object-center"
                />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        [1, 2, 3, 4, 5, 6].map((i) => {
          return <Skeleton key={i} image={true} />;
        })
      )}
      {userStillHasArticle &&
        [1, 2].map((i) => <Skeleton key={i} image={true} />)}
    </main>
  );
}

export default HomePagePosts;
