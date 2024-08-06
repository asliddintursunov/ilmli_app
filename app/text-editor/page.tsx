"use client";

import { ChangeEvent, useCallback, useEffect, useState } from "react";

import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Blockquote from "@tiptap/extension-blockquote";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Placeholder from "@tiptap/extension-placeholder";
import ImageResize from "tiptap-extension-resize-image";
import CodeBlock from "@tiptap/extension-code-block";
import { useEditor, EditorContent } from "@tiptap/react";
import SideBarOptions from "./components/SidebarOptions";
import MenuBar from "./components/MenuBar";
import { AiOutlinePlus } from "react-icons/ai";
import styles from "./css/style.module.css";
import Toast from "@/components/Toast";
import useToast from "@/hooks/useToast";

import Title from "./components/Title";
import Description from "./components/Description";
import Category from "./components/Category";
import MainImage from "./components/MainImage";
import { baseURL } from "@/utils";
import { getAccessToken } from "@/lib/actions";

export default function TextEditor() {
  const toast = useToast();
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [lastPTag, setLastPTag] = useState<string | null>(null);
  const [showSideBarOptions, setShowSideBarOptions] = useState(false);
  const [codeblockActive, setCodeblockActive] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [Categories, setCategories] = useState<string[]>([]);
  const [primaryCategory, setPrimaryCategory] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [isPostValid, setIsPostValid] = useState<boolean | null>(null);

  const extensions = [
    StarterKit,
    Document,
    Paragraph,
    Text,
    Blockquote,
    Underline,
    Link,
    Heading.configure({
      levels: [1, 6],
    }),
    HorizontalRule,
    Placeholder.configure({
      placeholder: "Matnni yozing…",
      emptyEditorClass: "is-editor-empty",
    }),
    Placeholder,
    Image.configure({
      allowBase64: true,
    }),
    ImageResize,
    CodeBlock.configure({
      HTMLAttributes: {
        class: "code-block",
      },
    }),
  ];
  const editorProps = {
    attributes: {
      class: "outline-none border-none focus:outline-none focus:border-none ",
    },
  };
  const editor = useEditor({
    extensions,
    content: "",
    editorProps,
    autofocus: true,
  });
  const handleSeeContent = () => {
    if (editor) {
      const content = editor.getHTML();
      setHtmlContent(content);
    }
  };

  const addHorizontalRule = useCallback(() => {
    if (editor) {
      editor.chain().focus().setHorizontalRule().run();
    }
  }, [editor]);

  const addImage = useCallback(
    (imageFile: ChangeEvent<HTMLInputElement> | any) => {
      const file = imageFile.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          const base64String = reader.result;

          if (base64String && editor) {
            addHorizontalRule();
            editor.chain().focus().setImage({ src: base64String }).run();
            addHorizontalRule();
          }
        } else
          toast.handleToast(
            true,
            "Notanish fayl, faqat rasmlar qabul qilinadi",
            "alert-warning"
          );
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    },
    [editor]
  );

  const addCodeBlock = useCallback(() => {
    if (editor) {
      editor.chain().focus().setCodeBlock({ language: "typescript" }).run();
      setCodeblockActive(true);
    }
  }, [editor]);

  const handleShowSideBarOptions = (content: string | null): void => {
    const matches = content?.match(/<p>.*?<\/p>/g);
    const lastP_Tag = matches ? matches[matches.length - 1] : null;
    setLastPTag(lastP_Tag);
  };

  const handleSend = async function () {
    const access_token = await getAccessToken().then((res) => res?.value);
    const new_post = {
      title: title.trim(),
      description: description.trim(),
      categories: Categories,
      primary_category: primaryCategory.trim(),
      body: htmlContent,
      image: image,
    };

    const post_values = Object.values(new_post);
    if (post_values.includes("") || post_values.includes([])) {
      toast.handleToast(
        true,
        "Barcha qiymatlarni to'ldirishingiz kerak",
        "alert-warning"
      );
      return;
    }
    setIsPostValid(true);
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

      if (!request.ok) {
        const error = await request.json();
        toast.handleToast(true, error.message, "alert-error");
        return;
      }
      const response = await request.json();
      toast.handleToast(true, response.message, "alert-success");
    } catch (error: any) {
      toast.handleToast(true, error.message, "alert-error");
    }
  };

  useEffect(() => {
    handleSeeContent();
    handleShowSideBarOptions(htmlContent);
  });

  return (
    <>
      <div className="p-4 mt-10 max-w-5xl mx-auto relative flex flex-col justify-center gap-4">
        <Title title={title} setTitle={setTitle} />
        <Description
          description={description}
          setDescription={setDescription}
        />
        <div className="w-full flex flex-col md:flex-row gap-4 md:items-start">
          <Category
            Categories={Categories}
            primaryCategory={primaryCategory}
            setCategories={setCategories}
            setPrimaryCategory={setPrimaryCategory}
          />
          <MainImage image={image} setImage={setImage} />
        </div>
        {lastPTag == "<p></p>" && (
          <div className="flex justify-start items-center gap-8 absolute left-5 xmd:left-[-40px] bottom-3 z-10">
            <button
              className={`flex gap-2 items-center justify-center p-2 text-slate-500 border-slate-600 text-xl border rounded-full ${
                showSideBarOptions
                  ? `${styles.sidebar_options_rotate}`
                  : undefined
              }`}
              onClick={() => setShowSideBarOptions(!showSideBarOptions)}
            >
              <AiOutlinePlus />
            </button>
            {showSideBarOptions && (
              <SideBarOptions
                addImage={addImage}
                addHorizontalRule={addHorizontalRule}
                addCodeBlock={addCodeBlock}
              />
            )}
          </div>
        )}
        <EditorContent editor={editor} className={styles.tiptap} />
        <MenuBar editor={editor} />
        {toast.showToast && (
          <Toast toastInfo={toast.toastInfo} toastType={toast.toastType} />
        )}
        {htmlContent?.slice(-6) === "</pre>" && (
          <div className="w-full flex justify-end">
            <pre className="bg-yellow-100 p-2 rounded-md overflow-x-auto text-end w-fit">
              Chiqish uchun 3 marotaba &#34;Enter&#34; ni bosing
            </pre>
          </div>
        )}
      </div>
      {isPostValid === false && (
        <div className="flex w-full justify-center gap-4">
          <span className="text-lg">
            Barcha qiymatlarni toldirishin kk ukam
          </span>
        </div>
      )}
      <div className="flex w-full justify-center gap-4">
        <button className="btn btn-primary" onClick={() => handleSend()}>
          Send content
        </button>
      </div>
      <div className="pb-60" />
    </>
  );
}
