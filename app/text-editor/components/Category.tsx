import clsx from "clsx";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { AiOutlinePlus } from "react-icons/ai";

type Props = {
  Categories: string[];
  setCategories: Dispatch<SetStateAction<string[]>>;
  primaryCategory: string;
  setPrimaryCategory: Dispatch<SetStateAction<string>>;
};

export default function Category({
  Categories,
  setCategories,
  primaryCategory,
  setPrimaryCategory,
}: Props) {
  const [inputValue, setInputValue] = useState("");
  const [categoryVaidation, setCategoryValidation] = useState("");

  const handleAddCategory = function (newCategory: string) {
    if (Categories.length >= 5) {
      setCategoryValidation("Post kategoriyasi 5 tagacha mumkin.");
      return;
    }

    if (Categories.includes(newCategory)) {
      setCategoryValidation(`"${newCategory}" allaqachon kiritilgan.`);
    } else {
      setCategories((prev) => [...prev, newCategory]);
      setInputValue("");
      setCategoryValidation("");
    }
  };

  const handleRemoveCategory = function (category: string) {
    if (category === primaryCategory) {
      setPrimaryCategory("");
    }
    setCategories((prev) => prev.filter((e) => e !== category));
  };

  const handleSelectPrimaryCategory = function (category: string) {
    setPrimaryCategory((prev) => (prev === category ? "" : category));
  };

  return (
    <>
      <div className="w-full">
        <div className="flex items-start relative">
          <div className="flex flex-col w-full">
            <input
              type="text"
              placeholder="Category"
              className="mx-auto w-full h-[50px] border-2 border-gray-300 bg-gray-100 p-4 rounded-md overflow-x-auto placeholder-[#888] outline-gray-400"
              onChange={(e) =>
                setInputValue(e.currentTarget.value.toLowerCase())
              }
              value={inputValue}
            />
            <div className="flex justify-between items-center w-full">
              <span className="text-xl text-red-500 font-bold font-mono">
                {categoryVaidation ?? ""}
              </span>
              <i className={clsx(inputValue.length > 30 && "text-red-500")}>
                {inputValue.length}/30
              </i>
            </div>
          </div>
          <button
            className={clsx(
              "absolute right-6 top-2 text-2xl p-1 text-white rounded-full transition-all",
              inputValue.trim().length === 0 || inputValue.trim().length > 30
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 hover:pr-8 hover:bg-blue-700"
            )}
            disabled={
              inputValue.trim().length === 0 || inputValue.trim().length > 30
            }
            onClick={() => handleAddCategory(inputValue.trim())}
            aria-label="Add category"
          >
            <AiOutlinePlus />
          </button>
        </div>
        {Categories && Categories.length > 0 && (
          <ul className="flex flex-wrap gap-2 max-h-56 md:max-h-[432px] pt-2 overflow-y-auto">
            {Categories.map((category, index) => (
              <li
                onClick={() => handleSelectPrimaryCategory(category)}
                key={index}
                className={clsx(
                  "pl-5 pr-10 py-2 border rounded-full cursor-pointer transition-all relative",
                  category === primaryCategory
                    ? "bg-sky-500 text-white hover:bg-sky-600"
                    : "bg-gray-200 hover:bg-gray-300"
                )}
              >
                {category}
                <FaXmark
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors text-2xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveCategory(category);
                  }}
                />
              </li>
            ))}
          </ul>
        )}
        {!primaryCategory && Categories.length > 0 && (
          <strong className="text-yellow-500 text-2xl">
            Bitta kategoriyni asosiy sifatida tanlang.
          </strong>
        )}
      </div>
    </>
  );
}
