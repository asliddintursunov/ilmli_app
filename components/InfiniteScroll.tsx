/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import fetchArticles from "@/lib/fetchArticles";
import fetchRelatedArticles from "@/lib/fetchRelatedArticles";
import { getRelatedArticles } from "@/redux/slices/articlesSlice";
import { useAppSelector, AppDispatch } from "@/redux/store";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

export default function InfiniteScrollPage() {
  const dispatch = useDispatch<AppDispatch>();
  const articles: Article[] = useAppSelector((state) => state.articles.value);
  const category: string | null = useAppSelector(
    (state) => state.articles.category
  );

  useEffect(() => {
    console.log(articles);
    if (category === null || category === undefined) {
      console.log("Category undefined ->", category);
    } else {
      console.log("Category ->", category);
    }
    setOffset(10);
  }, [category]);

  const [offset, setOffset] = useState<number>(0);
  const [pending, setPending] = useState<boolean>(false);
  const elementsContainer = useRef<HTMLUListElement>(null);

  // Fetch first 10 articles
  useEffect(() => {
    const getInitialArticles = async function () {
      const articles: Article[] = await fetchArticles(0);
      console.log("Initial articles ->", articles);

      dispatch(
        getRelatedArticles({
          articles,
          category: null,
        })
      );
      setOffset(10);
    };
    getInitialArticles();
  }, []);

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

                if (category === null || category === undefined) {
                  const articlesData: Promise<Article[]> =
                    fetchArticles(offset);
                  articlesData.then((res: Article[]): void => {
                    dispatch(
                      getRelatedArticles({
                        articles: res,
                        category: null,
                      })
                    );
                    setOffset((prev: number): number => prev + 10);
                    console.log("Next 10 articles ->", res);
                  });
                  console.log("Category undefined ->", category);
                } else {
                  console.log("Category ->", category);

                  const articlesData: Promise<Article[]> = fetchRelatedArticles(
                    category,
                    offset
                  );
                  articlesData.then((res: Article[]): void => {
                    dispatch(
                      getRelatedArticles({
                        articles: res,
                        category,
                      })
                    );
                    setOffset((prev: number): number => prev + 10);
                    console.log("Next 10 articles ->", res);
                  });
                }
                // Next 10 articles is fetched here
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
      <div className="pb-10">
        <ul className="mt-4 flex flex-col gap-2" ref={elementsContainer}>
          {articles &&
            articles.map((el: Article) => (
              <li
                id={el.id.toString()}
                key={el.id}
                className="flex items-center justify-between p-2 
            shadow-lg"
              >
                <div className="flex-1 flex flex-col items-start justify-start gap-1">
                  <div className="flex gap-2 items-start justify-start">
                    <span className="bg-slate-800 text-white px-1 rounded-md">
                      <strong>#{el.id}</strong>
                    </span>
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
      {pending && (
        <div className="grid place-content-center w-full">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      )}
    </div>
  );
}
