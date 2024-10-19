import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../css/style.module.css";
import PopupTitle from "./PopupTitle";
import PopupDescription from "./PopupDescription";
import PopupImage from "./PopupImage";
import PopupCategory from "./PopupCategory";
import Toast from "@/components/Toast";
import useToast from "@/hooks/useToast";
import { baseURL } from "@/utils";
import { getAccessToken } from "@/lib/actions";
type Props = {
  setOpenPopup: Dispatch<SetStateAction<boolean>>;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  Categories: string[];
  setCategories: Dispatch<SetStateAction<string[]>>;
  primaryCategory: string;
  setPrimaryCategory: Dispatch<SetStateAction<string>>;
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
  htmlContent: any;
};

export default function Popup({
  setOpenPopup,
  title,
  setTitle,
  description,
  setDescription,
  Categories,
  setCategories,
  primaryCategory,
  setPrimaryCategory,
  image,
  setImage,
  htmlContent,
}: Props) {
  const toast = useToast();
  const [isPostValid, setIsPostValid] = useState<boolean | null>(null);

  const handleSend = async function () {
    const access_token = await getAccessToken().then((res) => res?.value);
    const new_post = {
      title: title.trim(),
      description: description.trim(),
      categories: Categories,
      primary_category: primaryCategory.trim(),
      body: htmlContent,
      image: image,
    };

    const post_values = Object.values(new_post);
    if (post_values.includes("") || post_values.includes([])) {
      setIsPostValid(false);

      toast.handleToast(
        true,
        "Barcha qiymatlarni to'ldirishingiz kerak",
        "alert-warning"
      );
      return;
    }
    setIsPostValid(true);
    try {
      const request = await fetch(`${baseURL}/create-post`, {
        method: "POST",
        body: JSON.stringify(new_post),
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!request.ok) {
        const error = await request.json();
        toast.handleToast(true, error.message, "alert-error");
        return;
      }
      const response = await request.json();
      toast.handleToast(true, response.message, "alert-success");
    } catch (error: any) {
      toast.handleToast(true, error.message, "alert-error");
    }
  };

  return (
    <>
      <div
        className={`fixed left-0 top-0 w-full h-full flex justify-center items-center backdrop-blur-[2px] bg-white z-20 font-sans overflow-auto ${styles.scale_up_bottom}
      `}
      >
        <div className="w-[1040px] flex flex-col custom-980:flex-row gap-4 px-6 py-16 items-stretch relative mt-20 custom-980:mt-0">
          <button
            className="absolute top-2 right-2 cursor-pointer"
            onClick={() => setOpenPopup((prev) => !prev)}
          >
            <RxCross1 className="text-xl" />
          </button>
          <div className="flex-1 w-full h-96 p-6 flex flex-col justify-center items-start gap-3">
            <b>Hikoya haqida</b>
            <PopupImage image={image} setImage={setImage} />
            <div className="w-full flex flex-col justify-center items-center gap-2">
              <PopupTitle title={title} setTitle={setTitle} />
              <PopupDescription
                description={description}
                setDescription={setDescription}
              />
            </div>
            <p className="text-xs text-gray-400">
              {" "}
              <b className="text-gray-600">Eslatma: </b>
              Bu yerdagi o&#39;zgarishlar sizning hikoyangiz Ilmlining asosiy
              ekranida qanday paydo b&#39;lishiga ta&#39;sir qiladi.
            </p>
          </div>
          <div className="flex-1 w-full h-96 p-6 flex flex-col justify-start items-start gap-5">
            <span>Chop etuvchi: User fullname</span>
            <PopupCategory
              Categories={Categories}
              primaryCategory={primaryCategory}
              setCategories={setCategories}
              setPrimaryCategory={setPrimaryCategory}
            />
            <div className="flex flex-row justify-start items-center gap-4 text-sm">
              <button
                className="px-4 py-2 bg-green-600 font-bold text-gray-200 hover:bg-green-700 rounded-full cursor-pointer transition-all"
                onClick={() => handleSend()}
              >
                Chop etish
              </button>
              <button
                className="custom-980:hidden px-4 py-2 bg-transparent font-bold bg-gray-50 hover:bg-gray-200 rounded-full cursor-pointer transition-all"
                onClick={() => setOpenPopup((prev) => !prev)}
              >
                Ortga
              </button>
            </div>
            {isPostValid === false && (
              <span className="text-red-500">
                Barcha qiymatlarni to&#39;ldirganingizga ishonch hosil qiling,
                so&#39;ngra chop eting
              </span>
            )}
          </div>
        </div>
      </div>
      {toast.showToast && (
        <div className="z-50 w-full mx-auto">
          <div className="md:w-96 w-fit mx-auto toast toast-top toast-center z-50 rounded-lg">
            <div className={`alert ${toast.toastType}`}>
              <span className="text-white">{toast.toastInfo}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
