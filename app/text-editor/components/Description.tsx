import React, { SetStateAction, Dispatch } from "react";

export default function Description({
  description,
  setDescription,
}: {
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
}) {
  return (
    <textarea
      className="w-full min-h-12 h-fit text-2xl px-4 outline-none overflow-hidden"
      placeholder="Hikoya haqida qisqacha ma'lumot"
      onInput={(e) => {
        setDescription(e.currentTarget.value);
        e.currentTarget.style.height = "auto";
        e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
      }}
      value={description}
    />
  );
}
