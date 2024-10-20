import React, { SetStateAction, Dispatch } from "react";

export default function Title({
  title,
  setTitle,
}: {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
}) {
  return (
    <textarea
      className="w-full min-h-16  h-fit text-4xl px-4 outline-none overflow-hidden"
      placeholder="Hikoya sarlavhasi"
      onInput={(e) => {
        setTitle(e.currentTarget.value);
        e.currentTarget.style.height = "auto";
        e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
      }}
      value={title}
    />
  );
}
