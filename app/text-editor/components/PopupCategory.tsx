import clsx from "clsx";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";

type Props = {
  Categories: string[];
  setCategories: Dispatch<SetStateAction<string[]>>;
  primaryCategory: string;
  setPrimaryCategory: Dispatch<SetStateAction<string>>;
};

export default function PopupCategory({
  Categories,
  setCategories,
  primaryCategory,
  setPrimaryCategory,
}: Props) {
  const [inputValue, setInputValue] = useState("");

  const handleAddCategory = function (newCategory: string) {
    newCategory = newCategory.slice(0, 30);
    if (Categories.length >= 5) {
      return;
    }

    if (!Categories.includes(newCategory)) {
      setCategories((prev) => [...prev, newCategory]);
      setInputValue("");
    }
  };

  const handleRemoveCategory = (category: string) => {
    if (category === primaryCategory) {
      setPrimaryCategory("");
    }

    setCategories((prev) => prev.filter((e) => e !== category));
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <span>
        5 ta gacha bo&#39;lgan sining hikoyangizga mos keladigan mavzualrni
        qo&#39;shing
      </span>
      <div className="flex flex-row flex-wrap border border-gray-200 gap-1 p-2 bg-gray-100 items-center">
        {Categories.map((e) => (
          <div
            key={e}
            className={clsx(
              "h-10 flex justify-end items-center gap-1 px-2 border border-gray-200 hover:border-gray-400 rounded-sm cursor-pointer transition-all",
              e === primaryCategory ? "text-white bg-green-600" : "bg-white"
            )}
            onClick={() => setPrimaryCategory((prev) => (prev === e ? "" : e))}
          >
            <span>{e}</span>
            <button
              onClick={(event) => {
                event.stopPropagation();
                handleRemoveCategory(e);
              }}
            >
              <RxCross2 />
            </button>
          </div>
        ))}
        <label className="relative">
          <input
            type="text"
            className="outline-none h-10 p-4 rounded-sm bg-inherit"
            placeholder="Kategoriya qo'shish..."
            onChange={(e) => setInputValue(e.currentTarget.value.toLowerCase())}
            value={inputValue}
          />
          {inputValue.trim() && (
            <button className="bg-gray-100 absolute right-0 top-0 h-full grid place-content-center px-2 hover:bg-gray-200 transition-all">
              <GoPlus
                className="text-3xl"
                onClick={() => handleAddCategory(inputValue.trim())}
              />
            </button>
          )}
        </label>
      </div>
      {Categories.length > 0 && primaryCategory === "" && (
        <span className="text-red-500">
          Kamida kategoriyani asosiy sifatida tanlang
        </span>
      )}
    </div>
  );
}
