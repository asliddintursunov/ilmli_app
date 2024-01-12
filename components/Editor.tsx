"use client";

import dynamic from "next/dynamic";
import { useState, useMemo, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.snow.css";
export default function Editor() {
  const [value, setValue] = useState<string>("");
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // Text formatting
    [{ header: [1, 2, 3, 4, 5, 6, false] }], // Headings
    ["blockquote", "code-block"], // Block elements
    [{ list: "ordered" }, { list: "bullet" }], // Lists
    [{ indent: "-1" }, { indent: "+1" }], // Indentation
    [{ color: [] }, { background: [] }], // Text color and background
    ["link", "image", "video"], // Hyperlinks, images, and videos
  ];

  useEffect(() => {
    console.log(value);
  }, [value]);
  return (
    <main>
      <ReactQuill
        value={value}
        onChange={setValue}
        modules={{ toolbar: toolbarOptions }}
        theme="snow"
        className="min-h-48 md:min-h-64 border border-gray-400"
      />
      <br />
      <button
        className="btn btn-sm btn-primary mx-2"
        onClick={() => {
          console.log(value);
        }}
      >
        Send
      </button>
      <button
        className="btn btn-sm btn-error"
        onClick={() => {
          setValue("");
        }}
      >
        Clear All
      </button>
    </main>
  );
}
