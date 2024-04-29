import clsx from "clsx";
import { Dispatch, SetStateAction, useState } from "react";
import { FaXmark } from "react-icons/fa6";

type Props = {
  postCategory: string[];
  setPostCategory: Dispatch<SetStateAction<string[]>>;
};

function PostCategory({ postCategory, setPostCategory }: Props) {
  const [value, setValue] = useState("");
  const handleAddCategory = function (newCategory: string) {
    if (postCategory.includes(newCategory))
      alert(`${newCategory} already in categories`);
    else {
      setPostCategory((prev) => [...prev, newCategory]);
      setValue("");
    }
  };
  const handleRemoveCategory = function (category: string) {
    setPostCategory((prev) => prev.filter((e) => e != category));
  };
  return (
    <div className="w-full">
      <span className="text-2xl">Category</span>
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
          onClick={() => handleAddCategory(value)}
        >
          Add
        </button>
      </div>
      <hr />
      {postCategory && (
        <ul className="flex flex-wrap gap-2 max-h-56 md:max-h-[432px] pt-2 overflow-y-auto">
          {postCategory.map((e, i) => {
            return (
              <li
                key={i}
                className="px-3 py-1 border rounded-full cursor-pointer hover:bg-gray-300/50 transition-all relative"
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

export default PostCategory;
