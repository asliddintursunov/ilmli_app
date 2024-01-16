"use client";
import { useEffect, useRef, useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";

export default function ScrollToTop() {
  const [scrollTop, setScrollTop] = useState<boolean>(false);
  const scrollUpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScrollUp = () => {
      const { scrollTop } = document.documentElement;
      scrollTop >= 1200 ? setScrollTop(true) : setScrollTop(false);
    };
    window.addEventListener("scroll", handleScrollUp);

    return () => {
      window.removeEventListener("scroll", handleScrollUp);
    };
  });
  return (
    <div ref={scrollUpRef} className="absolute top-0 left-0">
      {scrollTop && (
        <button
          className="btn btn-square bg-yellow-500 text-white btn-md md:btn-sm fixed md:bottom-10 md:right-10 bottom-5 right-5"
          onClick={() => {
            scrollUpRef.current?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <FaArrowCircleUp className="text-lg md:text-sm" />
        </button>
      )}
    </div>
  );
}
