"use client";
import { useState } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Editor } from "primereact/editor";
import Title from "./Title";
import Description from "./Description";
import axios from "axios";
import { baseURL } from "@/utils";

export default function PrimeReactEditor() {
  const [postBody, setPostBody] = useState<string>("");
  const [postTitle, setPostTitle] = useState<string>("");
  const [postDescription, setPostDescription] = useState<string>("");

  // The variable below will be removed, it is just for test
  const [post, setPost] = useState<string>("");

  const handleSend = function () {
    const postData = {
      title: postTitle,
      description: postDescription,
      body: postBody,
    };
    axios
      .post(`${baseURL}/create-post`, postData)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  };

  const handleClear = function () {
    setPostBody("");
  };

  // The function below will be removed, it is just for test
  const getPost = function () {
    axios
      .get(`${baseURL}/get-post`)
      .then((res) => {
        console.log(res.data);
        setPost(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="flex flex-col gap-2 mb-2">
        <Title postTitle={postTitle} setPostTitle={setPostTitle} />
        <Description
          postDescription={postDescription}
          setPostDescription={setPostDescription}
        />
      </div>
      <Editor
        value={postBody}
        onTextChange={(e: any) => setPostBody(e.htmlValue)}
        style={{
          height: "50vh",
          display: postBody && "flex",
          justifyContent: postBody && "center",
          cursor: "text",
        }}
        placeholder="Enter text here..."
      />
      <div className="flex items-center gap-2 mt-2">
        <button className="btn btn-primary" onClick={handleSend}>
          SEND
        </button>
        <button className="btn btn-secondary" onClick={handleClear}>
          CLEAR
        </button>
      </div>
      {/* The div below will be removed, it is just for test */}
      <div className="mt-[32px] w-full">
        <button className="btn btn-success" onClick={getPost}>
          GET
        </button>
        <div dangerouslySetInnerHTML={{ __html: post }} />
      </div>
    </>
  );
}
