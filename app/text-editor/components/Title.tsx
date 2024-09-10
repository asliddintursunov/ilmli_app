import clsx from "clsx";
import React, { SetStateAction, Dispatch } from "react";
import { MdErrorOutline } from "react-icons/md";

export default function Title({
  title,
  setTitle,
}: {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="relative flex flex-col items-start justify-start">
      <input
        type="text"
        className="mx-auto w-full h-[50px] border-2 border-gray-300 bg-gray-100 p-4 rounded-md overflow-x-auto placeholder-[#888] outline-gray-400"
        value={title}
        placeholder="Title"
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <i
        className={clsx(
          "text-end w-full pr-2 text-gray-500",
          title.length > 120 && "text-red-500"
        )}
      >
        {title.length}/120
      </i>
      {title.length > 120 && (
        <span className="absolute right-3 bottom-9 text-2xl bg-gray-100 pl-1 text-red-500">
          <MdErrorOutline />
        </span>
      )}
    </div>
  );
}
