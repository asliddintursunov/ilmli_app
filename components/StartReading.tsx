"use client";
import React from "react";

type Props = {};

function StartReading({}: Props) {
  const handleClick = () => {
    console.log("Start reading");
  };
  return (
    <div>
      <button
        onClick={handleClick}
        className="btn rounded-full px-4 md:px-8 text-sm md:text-xl text-white border-none" style={{
          backgroundColor: "#4794ff"
        }}
      >
        O&apos;qishni boshlash
      </button>
    </div>
  );
}

export default StartReading;
