"use client";
import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";
export default function ToggleMood() {
  const { changeTheme }: any = useContext(ThemeContext);

  return (
    <div className="flex gap-2 items-center w-fit justify-between">
      <button
        className="btn btn-active btn-neutral"
        onClick={() => changeTheme("winter")}
      >
        Light
      </button>
      <button className="btn btn-active" onClick={() => changeTheme("dark")}>
        Dark
      </button>
    </div>
  );
}
