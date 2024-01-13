"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
export default function Editor() {
  const [value, setValue] = useState<string>("<p><br></p>");
  const [article, setArticle] = useState<{}>();
  const [pic, setPic] = useState<string>("");
  const picRegex: RegExp =
    /<img.*?src="(data:image\/[a-zA-Z]+;base64,.*?)".*?>/;
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

  const handleSend = function () {
    const match = picRegex.exec(value);
    console.log(value);
    
    if (match) {
      const pic = match[1];
      setArticle({ pic });
      setPic(pic);
      console.log(match[1]);
    } else {
      console.log("no match");
    }
  };
  const handleClear = function () {
    setValue("<p><br></p>");
  };

  useEffect(() => {
    console.log(pic);
  }, [pic])
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
      <button className="btn btn-sm btn-primary mx-2" onClick={handleSend}>
        Send
      </button>
      <button className="btn btn-sm btn-error" onClick={handleClear}>
        Clear All
      </button>
      {pic && <Image src={pic} alt="Image" width={500} height={400} />}
    </main>
  );
}
