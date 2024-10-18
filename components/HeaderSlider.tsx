"use client";
import React, { useState, useRef, useEffect } from "react";
import RelatedArticlesButton from "./RelatedArticlesButton";
import { MdOutlineExplore } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";
import clsx from "clsx";

const HeaderSlider: React.FC<{
  topics: string[];
  path: string | undefined;
}> = ({ topics, path }) => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = 200;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const checkArrows = () => {
    if (sliderRef.current) {
      setShowLeftArrow(sliderRef.current.scrollLeft > 0);
      setShowRightArrow(
        sliderRef.current.scrollLeft <
          sliderRef.current.scrollWidth - sliderRef.current.clientWidth
      );
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("scroll", checkArrows);
      checkArrows();
    }
    return () => {
      if (slider) {
        slider.removeEventListener("scroll", checkArrows);
      }
    };
  }, []);

  return (
    <div className="w-full flex justify-center">
      <div className="relative max-w-[340px] md:max-w-screen-md sm:max-w-screen-sm xs:max-w-screen-xs mx-auto">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r z-10 pointer-events-none"></div>
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-gray-100 shadow-md rounded-full p-2 z-20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}
        <div
          ref={sliderRef}
          className="flex max-w-full overflow-hidden scrollbar-hide space-x-2 py-2 gap-1 items-center justify-start"
        >
          <Link
            href={"/get-started/topics"}
            className="flex items-center py-2 px-3 gap-2 rounded-full text-sm sm:text-md cursor-pointer bg-gray-200 hover:bg-gray-300 transition-all capitalize"
          >
            <MdOutlineExplore className="text-2xl" /> Ko&#39;proq
          </Link>
          {path?.startsWith("/articles") && (
            <button
              className={clsx(
                "grid place-content-center text-sm sm:text-md cursor-pointer py-2 px-3 rounded-full bg-slate-400/10 hover:bg-slate-700/20 transition-all capitalize text-nowrap",
                {
                  "bg-slate-700/20 border border-slate-500 pointer-events-none":
                    path === "/articles?search=",
                }
              )}
              onClick={() => {
                router.push("/articles");
              }}
            >
              Siz uchun
            </button>
          )}
          {topics.map((topic, index) => (
            <RelatedArticlesButton
              category={topic}
              key={index}
              path={path ?? undefined}
            />
          ))}
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l z-10 pointer-events-none"></div>
        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-gray-100 shadow-md rounded-full p-2 z-20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default HeaderSlider;
