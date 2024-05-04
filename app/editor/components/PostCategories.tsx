import clsx from "clsx";
import { Dispatch, SetStateAction, useState } from "react";
import { FaXmark } from "react-icons/fa6";

type Props = {
  postCategories: string[];
  setPostCategories: Dispatch<SetStateAction<string[]>>;
  primaryCategory: string;
  setPrimaryCategory: Dispatch<SetStateAction<string>>;
};

function PostCategories({
  postCategories,
  setPostCategories,
  primaryCategory,
  setPrimaryCategory,
}: Props) {
  const [value, setValue] = useState("");

  const handleAddCategory = function (newCategory: string) {
    
    if (postCategories.length > 4) {
      alert("Max post category is 5");
      return;
    }

    if (postCategories.includes(newCategory))
      alert(`${newCategory} already in categories`);
    else {
      setPostCategories((prev) => [...prev, newCategory]);
      setValue("");
    }
  };

  const handleRemoveCategory = function (category: string) {
    if (category == primaryCategory) {
      setPrimaryCategory("");
    }
    setPostCategories((prev) => prev.filter((e) => e != category));
  };

  const handleSelectPrimaryCategory = function (category: string) {
    if (primaryCategory == category) setPrimaryCategory("");
    else setPrimaryCategory(category);
  };

  return (
    <div className="w-full">
      <span className="text-2xl">Additional categories</span>
      <div className="flex items-center gap-1 mb-3">
        <input
          type="text"
          placeholder="ex: math"
          className="input input-bordered w-full"
          onChange={(e) => setValue(e.currentTarget.value.toLowerCase())}
          value={value}
        />
        <button
          className={clsx("btn", value.trim().length === 0 && "btn-disabled")}
          onClick={() =>
            handleAddCategory(value.trim())
          }
        >
          Add
        </button>
      </div>
      {primaryCategory == "" && postCategories.length >= 1 && (
        <strong className="text-yellow-500 text-2xl">
          Select one of the categories as primary one!
        </strong>
      )}
      <hr />
      {postCategories && (
        <ul className="flex flex-wrap gap-2 max-h-56 md:max-h-[432px] pt-2 overflow-y-auto">
          {postCategories.map((e, i) => {
            return (
              <li
                onClick={() => handleSelectPrimaryCategory(e)}
                key={i}
                className={clsx(
                  "px-3 py-1 border rounded-full cursor-pointer hover:bg-gray-300/50 transition-all relative",
                  e == primaryCategory &&
                    "bg-sky-500 text-white hover:bg-sky-600"
                )}
              >
                {e}
                <FaXmark
                  className="absolute -top-0.5 -right-0.5 bg-red-400 text-white rounded-full hover:bg-red-600 transition-colors"
                  onClick={() => handleRemoveCategory(e)}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default PostCategories;
