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

                const productsData: Promise<Product[]> = getNextTenProduct(
                  10,
                  offset
                );
                productsData.then((res) => {
                  setElement((prev) => [...prev, ...res]);
                  setOffset((prev) => prev + 10);
                });
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
    <>
      <div>
        <h1 className="text-3xl font-bold">Infinite Scroll</h1>
        <div className="ml-3 pb-10">
          <ul
            className="max-w-[320px] mt-4 flex flex-col gap-2"
            ref={elementsContainer}
          >
            {element.map((el, index) => (
              <li
                id={el.id.toString()}
                key={el.id}
                className="flex items-start justify-start px-4 py-2 
            gap-2 shadow-lg"
              >
                <Image
                  alt={el.title}
                  src={el.images[0]}
                  width={160}
                  height={120}
                />
                <div className="flex justify-between items-start ">
                  <div className="flex flex-col items-start justify-start  gap-4">
                    <h3 className="underline">{el.title}</h3>
                    <span>{el.category.name}</span>
                  </div>
                  <span className="text-blue-600 underline">${el.price}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {pending && (
        <div className="grid place-content-center w-full">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      )}
    </>
  );
}
