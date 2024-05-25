import Toast from "@/components/Toast";
import useToast from "@/hooks/useToast";
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
  const toast = useToast();
  const [inputValue, setInputValue] = useState("");

  const handleAddCategory = function (newCategory: string) {
    if (postCategories.length > 4) {
      toast.handleToast(true, "Max post category is 5", "alert-warning");
      return;
    }

    if (postCategories.includes(newCategory))
      toast.handleToast(
        true,
        newCategory + " already in categories",
        "alert-warning"
      );
    else {
      setPostCategories((prev) => [...prev, newCategory]);
      setInputValue("");
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
    <>
      <div className="w-full sm:min-w-[316px] sm:max-w-min">
        <span className="text-2xl">Additional categories</span>
        <br />
        <div className="flex items-start gap-1 mb-3">
          <div className="flex flex-col w-full">
            <input
              type="text"
              placeholder="ex: math"
              className="input input-bordered w-full"
              onChange={(e) =>
                setInputValue(e.currentTarget.value.toLowerCase())
              }
              value={inputValue}
            />
            <i
              className={clsx(
                "text-end",
                inputValue.length > 30 && "text-red-500"
              )}
            >
              {inputValue.length}/30
            </i>
          </div>
          <button
            className={clsx(
              "btn",
              (inputValue.trim().length === 0 ||
                inputValue.trim().length > 30) &&
                "btn-disabled",
              inputValue
            )}
            onClick={() => handleAddCategory(inputValue.trim())}
          >
            Add
          </button>
        </div>
        {primaryCategory == "" && postCategories.length >= 1 && (
          <strong className="text-yellow-500 text-2xl">
            Select one of the categories as primary one!
          </strong>
        )}
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
      {toast.showToast && (
        <Toast toastInfo={toast.toastInfo} toastType={toast.toastType} />
      )}
    </>
  );
}

export default PostCategories;
