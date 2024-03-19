"use client";
import { useState } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { Editor } from "primereact/editor";

export default function PrimeReactEditor() {
  const [value, setValue] = useState<string>("<p><br></p>");

  const handleSend = function () {
    console.log(value);
  };
  const handleClear = function () {
    setValue("Cleared");
  };

  return (
    <main>
      <Editor
        value={value}
        onTextChange={(e: any) => setValue(e.htmlValue)}
        style={{
          minHeight: "320px",
          display: "flex",
          justifyContent: "center",
          cursor: "text",
        }}
        placeholder="Enter text here..."
      />
      <br />
      <button className="btn btn-primary mx-2" onClick={handleSend}>
        Send
      </button>
      <button className="btn btn-error" onClick={handleClear}>
        Clear All
      </button>
      <div className="flex flex-col items-center justify-center">
        <span>________</span>
        {/* {value} */}
        <span>________</span>
        {/* <div dangerouslySetInnerHTML={{ __html: value }} /> */}
        <span>________</span>
      </div>
    </main>
  );
}
