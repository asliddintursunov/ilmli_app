"use client";

import getNextTenProduct from "@/lib/getNextTenProduct";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
  data: Product[];
};

export default function InfiniteScrollPage({ data }: Props) {
  const [element, setElement] = useState<Product[]>(data);
  const [offset, setOffset] = useState<number>(10);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollHeight, scrollTop, clientHeight } =
        document.documentElement;

      if (scrollHeight - scrollTop === clientHeight) {
        console.log("%c Fetch more list items!", "color:red; font-size:40px;");
        const productsData: Promise<Product[]> = getNextTenProduct(10, offset);
        productsData.then((res) => {
          setElement((prev) => [...prev, ...res]);
          setOffset((prev) => prev + 10);
        });
        return;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  return (
    <div className="ml-3 pb-10">
      <h1 className="text-3xl font-bold">Infinite Scroll</h1>
      <ul className="max-w-[320px] mt-4 flex flex-col gap-2">
        {element.map((el, index) => (
          <li
            key={el.id}
            className="flex items-start justify-start px-4 py-2 
            gap-2 shadow-lg"
          >
            <Image alt={el.title} src={el.images[0]} width={160} height={120} />
            <div className="flex justify-between items-start ">
              <div className="flex flex-col items-start justify-start  gap-4">
                <h3 className="underline">{el.title}</h3>
                <span>{el.category.name}</span>
              </div>
              <span className="text-blue-600 underline">{el.price}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
