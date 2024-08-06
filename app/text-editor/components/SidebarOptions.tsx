import { FaImage, FaRulerHorizontal, FaCode } from "react-icons/fa";
import styles from "../css/style.module.css";
import { ChangeEvent } from "react";
import Tippy from "@tippyjs/react";

export default function SideBarOptions({
  addImage,
  addHorizontalRule,
  addCodeBlock,
}: {
  addImage: (imageFile: ChangeEvent<HTMLInputElement>) => void;
  addHorizontalRule: () => void;
  addCodeBlock: () => void;
}) {
  return (
    <div
      className={`flex items-center justify-start gap-2 z-10 ${styles.sidebar_options_bubblemenu} bg-white`}
    >
      {/* Existing buttons */}
      <Tippy content="image">
        <button className="relative flex gap-2 items-center justify-center p-2 text-green-500 border-green-600 text-xl border rounded-full cursor-pointer">
          <input
            type="file"
            className="absolute left-0 top-0 w-9 h-9 rounded-full cursor-pointer opacity-0"
            onChange={(file) => addImage(file)}
          />
          <FaImage />
        </button>
      </Tippy>
      <Tippy content="horizontal">
        <button
          onClick={addHorizontalRule}
          className="flex gap-2 items-center justify-center p-2 text-green-500 border-green-600 text-xl border rounded-full"
        >
          <FaRulerHorizontal />
        </button>
      </Tippy>
      <Tippy content="codeblock">
        <button
          onClick={addCodeBlock}
          className="flex gap-2 items-center justify-center p-2 text-green-500 border-green-600 text-xl border rounded-full"
        >
          <FaCode />
        </button>
      </Tippy>
    </div>
  );
}
