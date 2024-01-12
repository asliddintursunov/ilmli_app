"use client";
import { ThemeContext } from "@/context/ThemeContext";
import { useContext, useEffect, useRef, useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";

export default function ToggleMood() {
  const { changeTheme }: any = useContext(ThemeContext);
  const [theme, setTheme] = useState<string>("winter");
  const [scrollTop, setScrollTop] = useState<boolean>(false);
  const scrollUpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    changeTheme(theme);
  }, [theme, changeTheme]);
  const toggleMode = function () {
    setTheme(theme === "dark" ? "winter" : "dark");
    changeTheme(theme === "dark" ? "winter" : "dark");
  };
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
    <div
      className="flex gap-2 items-center w-fit justify-between"
      ref={scrollUpRef}
    >
      <label className="flex cursor-pointer gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={toggleMode}
          className="toggle theme-controller"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </label>
      {scrollTop && (
        <button
          className="btn btn-square bg-yellow-500 text-white btn-sm fixed bottom-10 right-10"
          onClick={() => {
            scrollUpRef.current?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <FaArrowCircleUp />
        </button>
      )}
    </div>
  );
}
