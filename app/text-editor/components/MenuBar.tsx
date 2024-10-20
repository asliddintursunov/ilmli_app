import { BubbleMenu } from "@tiptap/react";
import clsx from "clsx";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional for styling
import styles from "../css/style.module.css"

import { useCallback } from "react";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaLink,
  FaHeading,
  FaArrowUp,
  FaArrowDown,
  FaQuoteLeft,
  FaCode
} from "react-icons/fa";

export default function MenuBar({ editor }: { editor: any }) {
  const toggleLink = useCallback(() => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "" && editor !== null) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    if (editor !== null) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  }, [editor]);

  if (!editor) return null;

  const isImageSelected = editor.isActive("image");

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 50 }}
      className={`${isImageSelected} ${styles.slide_top}`}
    >
      <div className="flex items-center justify-start divide-x-2">
        {!isImageSelected && (
          <div className="flex mb-4 pr-2">
            <Tippy content="Bold">
              <button
                className={clsx(
                  "flex gap-2 items-center justify-center px-2 py-1 font-light",
                  editor.isActive("bold") ? "text-sky-500" : ""
                )}
                onClick={() => editor.commands.toggleBold()}
              >
                <FaBold />
              </button>
            </Tippy>
            <Tippy content="Italic">
              <button
                className={clsx(
                  "flex gap-2 items-center justify-center px-2 py-1 font-light",
                  editor.isActive("italic") ? "text-sky-500" : ""
                )}
                onClick={() => editor.commands.toggleItalic()}
              >
                <FaItalic />
              </button>
            </Tippy>
            <Tippy content="Underline">
              <button
                className={clsx(
                  "flex gap-2 items-center justify-center px-2 py-1 font-light",
                  editor.isActive("underline") ? "text-sky-500" : ""
                )}
                onClick={() => editor.commands.toggleUnderline()}
              >
                <FaUnderline />
              </button>
            </Tippy>
            <Tippy content="Link">
              <button
                className={clsx(
                  "flex gap-2 items-center justify-center px-2 py-1 font-light"
                )}
                onClick={toggleLink}
              >
                <FaLink />
              </button>
            </Tippy>
          </div>
        )}
        {!isImageSelected && (
          <div className="flex mb-4 pl-2">
            <Tippy content="Heading 1">
              <button
                className={clsx(
                  "flex items-center justify-center px-2 py-1 text-lg font-light",
                  editor.isActive("heading", { level: 1 }) ? "text-sky-500" : ""
                )}
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
              >
                <FaHeading />
                <FaArrowUp />
              </button>
            </Tippy>
            <Tippy content="Heading 6">
              <button
                className={clsx(
                  "flex items-center justify-center px-2 py-1 text-xs",
                  editor.isActive("heading", { level: 6 }) ? "text-sky-500" : ""
                )}
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 6 }).run()
                }
              >
                <FaHeading />
                <FaArrowDown />
              </button>
            </Tippy>
            <Tippy content="Blockquote">
              <button
                className={clsx(
                  "flex items-center justify-center px-2 py-1",
                  editor.isActive("blockquote") ? "text-sky-500" : ""
                )}
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
              >
                <FaQuoteLeft />
              </button>
            </Tippy>
            <Tippy content="Codeblock">
              <button
                className={clsx(
                  "flex items-center justify-center px-2 text-xl py-1",
                  editor.isActive("codeBlock") ? "text-sky-500" : ""
                )}
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .toggleCodeBlock({ language: "typescript" })
                    .run()
                }
              >
                <FaCode />
              </button>
            </Tippy>
          </div>
        )}
      </div>
    </BubbleMenu>
  );
}
