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
import styles from "../style.module.css";

export default function PrimeReactEditor() {
  const [postBody, setPostBody] = useState<string>("");
  const [postTitle, setPostTitle] = useState<string>("");
  const [postDescription, setPostDescription] = useState<string>("");

  // The variable below will be removed, it is just for test
  const [post, setPost] = useState<string>("");

  const handleSend = function () {
    const postData = {
      title: `<h1>${postTitle}</h1>`,
      description: `<h2>${postDescription}</h2>`,
      body: postBody,
    };
    axios
      .post(`${baseURL}/create-post`, postData)
      .then((res) => setPost(res.data))
      .catch((err) => console.error(err));
  };

  const handleClear = function () {
    setPostTitle("");
    setPostDescription("");
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

  const editorStyle = {
    height: "50vh",
    display: postBody && "flex",
    justifyContent: postBody && "center",
    cursor: "text",
    fontSize: "16px",
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
        style={editorStyle}
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
        {post && (
          <div
            className={styles.postContainer}
            dangerouslySetInnerHTML={{ __html: post }}
          />
        )}
      </div>
      {/* {postBody} */}
    </>
  );
}
