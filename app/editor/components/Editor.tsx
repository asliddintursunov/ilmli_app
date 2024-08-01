"use client";
import { useState } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Editor } from "primereact/editor";
import { baseURL } from "@/utils";
import Title from "./Title";
import Description from "./Description";
import PostPicture from "./PostPicture";
import PostCategories from "./PostCategories";
import clsx from "clsx";
import { getAccessToken } from "@/lib/actions";
import Toast from "@/components/Toast";
import useToast from "@/hooks/useToast";

export default function PrimeReactEditor() {
  const toast = useToast();
  const [postBody, setPostBody] = useState<string>("");
  const [postTitle, setPostTitle] = useState<string>("");
  const [postDescription, setPostDescription] = useState<string>("");
  const [postImage, setPostImage] = useState<string>("");
  const [postCategories, setPostCategories] = useState<string[]>([]);
  const [primaryCategory, setPrimaryCategory] = useState<string>("");

  const handleSend = async function () {
    const access_token = await getAccessToken().then((res) => res?.value);
    console.log(access_token);

    const new_post = {
      title: postTitle.trim(),
      description: postDescription.trim(),
      categories: postCategories,
      primary_category: primaryCategory.trim(),
      body: postBody,
      image: postImage,
    };
    try {
      const request = await fetch(`${baseURL}/create-post`, {
        method: "POST",
        body: JSON.stringify(new_post),
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if(!request.ok){
        const error = await request.json()
        toast.handleToast(true, error.message, "alert-error");
        return
      }
      const response = await request.json()
      toast.handleToast(true, response.message, "alert-success");
    } catch (error: any) {
      toast.handleToast(true, error.message, "alert-error");
    }
  };

  const handleClear = function () {
    setPostTitle("");
    setPostDescription("");
    setPostBody("");
  };

  const editorStyle = {
    height: "50vh",
    // display: postBody && "flex",
    // justifyContent: postBody && "center",
    cursor: "text",
    fontSize: "16px",
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row items-stretch justify-end gap-2">
          <div className="flex-1 flex flex-col justify-end">
            <Title postTitle={postTitle} setPostTitle={setPostTitle} />
            <Description
              postDescription={postDescription}
              setPostDescription={setPostDescription}
            />
          </div>
          <div className="min-h-max sm:max-h-full">
            <PostPicture postImage={postImage} setPostImage={setPostImage} />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-start justify-between gap-2">
          <div className="flex-1">
            <span className="text-2xl">Body</span>
            <Editor
              value={postBody}
              onTextChange={(e: any) => setPostBody(e.htmlValue)}
              style={editorStyle}
              placeholder="Enter text here..."
              className="max-w-[1115px]"
            />
          </div>
          <PostCategories
            postCategories={postCategories}
            setPostCategories={setPostCategories}
            primaryCategory={primaryCategory}
            setPrimaryCategory={setPrimaryCategory}
          />
        </div>
      </div>

      {/* These buttons below will be removed, they are just for test */}
      <div className="flex items-center gap-2 mt-2">
        <button
          className={clsx(
            "btn btn-primary",
            (postDescription.length > 120 || postTitle.length > 120) &&
              "btn-disabled"
          )}
          onClick={handleSend}
        >
          SEND
        </button>
        <button className="btn btn-secondary" onClick={handleClear}>
          CLEAR
        </button>
      </div>
      {toast.showToast && (
        <Toast toastInfo={toast.toastInfo} toastType={toast.toastType} />
      )}
    </>
  );
}
