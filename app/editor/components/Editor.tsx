"use client";
import { useState } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Editor } from "primereact/editor";
import { baseURL } from "@/utils";
import Image from "next/image";
import styles from "../style.module.css";
import axios from "axios";
import Title from "./Title";
import Description from "./Description";
import PostPicture from "./PostPicture";
import PostCategory from "./PostCategory";

export default function PrimeReactEditor() {
  const [postBody, setPostBody] = useState<string>("");
  const [postTitle, setPostTitle] = useState<string>("");
  const [postDescription, setPostDescription] = useState<string>("");
  const [postImage, setPostImage] = useState<string>("");
  const [postCategory, setPostCategory] = useState<string[]>([]);

  // The variable below will be removed, it is just for test
  const [post, setPost] = useState<
    | {
        post_body: string;
        post_image: string;
      }
    | undefined
  >(undefined);

  const handleSend = function () {
    const access_token = localStorage.getItem("access_token");
    const postData = {
      title: postTitle,
      description: postDescription,
      category: postCategory,
      body: postBody,
      image: postImage,
    };
    axios
      .post(`${baseURL}/create-post`, postData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => console.log(res))
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
      {/* <div className="flex flex-col sm:flex-row items-stretch gap-2 mb-2 w-full">
        <div className="flex flex-col gap-2 mb-2 flex-1">
          <Title postTitle={postTitle} setPostTitle={setPostTitle} />
          <Description
            postDescription={postDescription}
            setPostDescription={setPostDescription}
          />
        </div>
        <div className="lg:w-96 md:w-80 min-w-64 max-w-full min-h-44 sm:min-h-full">
          <PostPicture postImage={postImage} setPostImage={setPostImage} />
        </div>
      </div>
      <Editor
        value={postBody}
        onTextChange={(e: any) => setPostBody(e.htmlValue)}
        style={editorStyle}
        placeholder="Enter text here..."
      /> */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-2">
        <div className="w-full flex flex-col gap-3.5">
          <Title postTitle={postTitle} setPostTitle={setPostTitle} />
          <Description
            postDescription={postDescription}
            setPostDescription={setPostDescription}
          />
          <div>
            <span className="text-2xl">Body</span>
            <Editor
              value={postBody}
              onTextChange={(e: any) => setPostBody(e.htmlValue)}
              style={editorStyle}
              placeholder="Enter text here..."
              className="max-w-[1115px]"
            />
          </div>
        </div>
        <div className="lg:w-96 md:w-80 min-w-64 w-full flex flex-col gap-3.5">
          <div className="w-full min-h-44 sm:max-h-full">
            <PostPicture postImage={postImage} setPostImage={setPostImage} />
          </div>
          <PostCategory
            postCategory={postCategory}
            setPostCategory={setPostCategory}
          />
        </div>
      </div>

      {/* These buttons below will be removed, they are just for test */}
      <div className="flex items-center gap-2 mt-2">
        <button className="btn btn-primary" onClick={handleSend}>
          SEND
        </button>
        <button className="btn btn-secondary" onClick={handleClear}>
          CLEAR
        </button>
      </div>

      {/* This div below will be removed, it is just for test */}
      <div className="mt-[32px] w-full">
        <button className="btn btn-success" onClick={getPost}>
          GET
        </button>
        {post && (
          <div className="mb-10">
            <div
              className={styles.postContainer}
              dangerouslySetInnerHTML={{ __html: post.post_body }}
            />
            <Image
              src={post.post_image}
              alt="Post Image"
              width={0}
              height={0}
              className="w-96 h-auto"
            />
          </div>
        )}
      </div>
      {/* {postBody} */}
    </>
  );
}
