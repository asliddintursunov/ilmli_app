"use client";
import { useState } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Editor } from "primereact/editor";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default function QuillEditor() {
  const [value, setValue] = useState<string>("<p><br></p>");

  const handleSend = function () {
    console.log(value);
  };
  const handleClear = function () {
    setValue("<p><br></p>");
    console.log("Clear");
  };

  const convertToMarkdown = function (content: string): string {
    // const markdown = require("markdown").markdown;
    // const html = markdown.toHTML(content);
    // console.log(html);
    console.log(content);

    return "";
  };
  return (
    <main className="flex flex-col items-center">
      <br />
      <div className="card">
        <Editor
          value={value}
          onTextChange={(e: any) => setValue(e.htmlValue)}
          className="min-h-96 max-w-7xl whitespace-pre-wrap"
          placeholder="Start writing your article here..."
        />
      </div>

      <br />
      <div className="flex items-center justify-start gap-3">
        <button className="btn btn-sm btn-primary mx-2" onClick={handleSend}>
          Send
        </button>
        <button className="btn btn-sm btn-error" onClick={handleClear}>
          Clear All
        </button>
        <button
          className="btn btn-sm btn-success"
          onClick={() => convertToMarkdown(value)}
        >
          Post
        </button>
      </div>

      <span>__________</span>
      <ReactMarkdown>{value}</ReactMarkdown>
      <span>__________</span>
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{value}</ReactMarkdown>
      <span>__________</span>
    </main>
  );
}
