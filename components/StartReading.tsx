"use client";
import React from "react";
const data = require("@/database/article.json");
const trending = require("@/database/trending.json");
// import data from "@/database/article.json";
// import trending from "@/database/trending.json";

type Props = {};

function StartReading({}: Props) {
  const articles = data["article"];
  const handleClick = () => {
    console.log(articles);
    console.log(trending);
  };
  return (
    <div>
      <button
        onClick={handleClick}
        className="btn btn-neutral rounded-full px-4 md:px-8 text-sm md:text-xl"
      >
        O&apos;qishni boshlash
      </button>
    </div>
  );
}

export default StartReading;
