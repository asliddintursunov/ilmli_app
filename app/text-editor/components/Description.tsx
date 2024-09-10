import clsx from "clsx";
import React, { SetStateAction, Dispatch } from "react";
import { MdErrorOutline } from "react-icons/md";

export default function Description({
  description,
  setDescription,
}: {
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="relative flex flex-col items-start justify-start">
      <input
        type="text"
        className="mx-auto w-full h-[70px] border-2 border-gray-300 bg-gray-100 p-4 rounded-md overflow-x-auto placeholder-[#888] outline-gray-400"
        value={description}
        placeholder="Description"
        onChange={(e) => setDescription(e.currentTarget.value)}
      />
      <i
        className={clsx(
          "text-end w-full pr-2 text-gray-500",
          description.length > 120 && "text-red-500"
        )}
      >
        {description.length}/120
      </i>
      {description.length > 120 && (
        <span className="absolute right-3 bottom-11 text-2xl bg-gray-100 pl-1 text-red-500">
          <MdErrorOutline />
        </span>
      )}
    </div>
  );
}
