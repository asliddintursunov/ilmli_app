"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Skeleton from "./Skeleton";
import { getAccessToken } from "@/lib/actions";
import Link from "next/link";
import { baseURL } from "@/utils";

type Props = {
  firstTenArticles: Article[];
};

export default function InfiniteScrollPage({ firstTenArticles }: Props) {
  const [offset, setOffset] = useState<number>(0);
  const [pending, setPending] = useState<boolean>(false);
  const elementsContainer = useRef<HTMLUListElement>(null);
  const [articles, setArticles] = useState<Article[]>([]);

  // Fetch first 10 articles
  useEffect(() => {
    setArticles(firstTenArticles);
    setOffset(10);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchNextTenArticles = async function (offset: number) {
    setPending(true);
    const access_token = await getAccessToken();
    const API = access_token
      ? `${baseURL}/get-interested-articles?offset=${offset}`
      : `${baseURL}/get-articles?offset=${offset}`;
    try {
      const request = await fetch(API, {
        method: "GET",
        cache: "no-store",
        headers: {
          ...(access_token && {
            Authorization: `Bearer ${access_token.value}`,
          }),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!request.ok) {
        const error = await request.json();
        throw new Error(error.message);
      }
      const response = await request.json();
      if (response.articles) {
        setArticles((prev) => [...prev, ...response.articles]);
        setOffset((prev) => prev + 10);
      }
      setPending(false);
    } catch (error: any) {
      setPending(false);
      throw new Error(error.message);
    }
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
                articles[articles.length - 1].post_id.toString() ==
                  entry.target.id &&
                offset < 50
              ) {
                offset < 50 - 10 ? setPending(true) : setPending(false);

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
                id={el.post_id.toString()}
                key={el.post_id}
                className="relative flex items-stretch justify-between p-2 border-b border-gray-200
            cursor-pointer hover:bg-gray-100/50 transition-all md:h-40"
              >
                <Link
                  className="absolute w-full h-full left-0 top-0"
                  href={`/tag/${el.post_primary_category}/${el.post_title}_${el.post_uuid}`
                    .replaceAll(" ", "-")
                    .toLowerCase()}
                />
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
                      href={`/@${el.user_name}/home`}
                      className="font-bold text-sm hover:underline z-10"
                    >
                      {el.user_name}
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
                    {/* &#x2022;
                    <span className="text-sm text-gray-500">
                      {"el.readTime"}
                    </span> */}
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

      {pending && (
        <div className="grid place-content-center w-full">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      )}
    </div>
  );
}
