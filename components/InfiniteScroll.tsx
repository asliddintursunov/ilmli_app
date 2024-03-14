"use client";
import fetchArticles from "@/lib/fetchArticles";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Skeleton from "./Skeleton";
import { useRouter } from "next/navigation";

export default function InfiniteScrollPage() {
  const router = useRouter();
  const [offset, setOffset] = useState<number>(0);
  const [pending, setPending] = useState<boolean>(false);
  const elementsContainer = useRef<HTMLUListElement>(null);
  const [articles, setArticles] = useState<Article[]>([]);

  // Fetch first 10 articles
  useEffect(() => {
    const getInitialArticles = async function () {
      const data: Article[] = await fetchArticles(0);
      setArticles(data);
      setOffset(10);
    };
    getInitialArticles();
  }, []);

  const fetchNextTenArticles = function (offset: number) {
    fetchArticles(offset)
      .then((newArticles) => {
        setArticles((prev) => [...prev, ...newArticles]);
        setOffset((prev) => prev + 10);
        setPending(false);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setPending(false);
      });
  };

  // Fetch next 10 articles
  useEffect(() => {
    if (typeof IntersectionObserver !== "undefined") {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              observer!.unobserve(entry.target);
              if (
                articles[articles.length - 1].id.toString() ===
                  entry.target.id &&
                offset < 70
              ) {
                offset < 70 - 10 ? setPending(true) : setPending(false);

                console.log(
                  "%c Fetch more list items!",
                  "color:red; font-size:40px;",
                  offset
                );

                // Next 10 articles is fetched here
                fetchNextTenArticles(offset);
                // Next 10 articles is fetched here
              }
            }
          });
        },
        {
          threshold: 1,
          rootMargin: "200px",
        }
      );
      elementsContainer.current?.childNodes.forEach((el) => {
        const htmlEl = el as HTMLLIElement;
        observer!.observe(htmlEl);
      });
      return () => {
        observer.disconnect();
      };
    }
  }, [offset, articles]);

  return (
    <div className="flex-1 mx-1">
      {articles.length > 0 ? (
        <div className="pb-10">
          <ul className="mt-4 flex flex-col gap-2" ref={elementsContainer}>
            {articles.map((el: Article) => (
              <li
                onClick={() =>
                  router.push(
                    `/tag/${el.category}/post/${el.title
                      .replaceAll(" ", "-")
                      .toLowerCase()}`
                  )
                }
                id={el.id.toString()}
                key={el.id}
                className="flex items-center justify-between p-2 
            shadow-lg"
              >
                <div className="flex-1 flex flex-col items-start justify-start gap-1">
                  <div className="flex gap-2 items-start justify-start">
                    <Image
                      src={"/images/avatar.png"}
                      alt="avatar"
                      width={24}
                      height={24}
                      className="rounded-full border border-gray-600"
                    />
                    <span className="font-bold text-sm">{el.name}</span>
                  </div>
                  <div className="flex flex-col items-start justify-start gap-1">
                    <h2 className="font-bold text-xl">{el.title}</h2>
                    <p className="text-sm text-gray-600">{el.description}</p>
                  </div>
                  <div className="flex items-center justify-start gap-2">
                    <span className="text-sm text-gray-500">{el.posted}</span>
                    &#x2022;
                    <span className="text-sm text-gray-500">{el.readTime}</span>
                  </div>
                </div>
                <Image
                  alt="flower"
                  src={"/images/white_flower.jpg"}
                  width={160}
                  height={120}
                ></Image>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        [1, 2, 3, 4, 5, 6].map((i) => {
          return <Skeleton key={i} image={true} />;
        })
      )}

      {pending && (
        <div className="grid place-content-center w-full">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      )}
    </div>
  );
}
