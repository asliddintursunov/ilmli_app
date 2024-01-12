"use client";

import getNextTenProduct from "@/lib/getNextTenProduct";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  data: Product[];
};

export default function InfiniteScrollPage({ data }: Props) {
  const [element, setElement] = useState<Product[]>(data);
  const [offset, setOffset] = useState<number>(10);
  const [pending, setPending] = useState<boolean>(false);
  const elementsContainer = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (typeof IntersectionObserver !== "undefined") {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              observer!.unobserve(entry.target);
              if (
                element[element.length - 1].id.toString() === entry.target.id &&
                offset < 70
              ) {
                offset < 70 - 10 ? setPending(true) : setPending(false);

                console.log(
                  "%c Fetch more list items!",
                  "color:red; font-size:40px;"
                );

                // Next 10 products is fetched here
                const productsData: Promise<Product[]> = getNextTenProduct(
                  10,
                  offset
                );
                productsData.then((res: Product[]): void => {
                  setElement((prev: Product[]): Product[] => [...prev, ...res]);
                  setOffset((prev: number): number => prev + 10);
                });
                // Next 10 products is fetched here
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
  }, [element, offset]);

  return (
    <div className="flex-1 mx-1">
      <div className="pb-10">
        <ul className="mt-4 flex flex-col gap-2" ref={elementsContainer}>
          {element.map((el, index) => (
            <li
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
                  <span className="font-bold text-sm">
                    {el?.category?.name}
                  </span>
                </div>
                <div className="flex flex-col items-start justify-start gap-1">
                  <h2 className="font-bold text-xl">{el.title}</h2>
                  <p className="text-sm text-gray-600">{el.description}</p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <span className="text-sm text-gray-500">
                    {el?.category?.creationAt}
                  </span>
                  &#x2022;
                  <span className="text-sm text-gray-500">{el.price}</span>
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
