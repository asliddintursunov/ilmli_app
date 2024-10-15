"use client";
type Props = {};
import { useState } from "react";
import CustomInterestsModal from "./CustomInterestsModal";
import Link from "next/link";
import axios from "axios";
import { baseURL } from "@/utils";
import { useRouter } from "next/navigation";
import { categories } from "@/components/Categories";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Toast from "@/components/Toast";
import useToast from "@/hooks/useToast";
import clsx from "clsx";

function Interests({}: Props) {
  const router = useRouter();
  const toast = useToast();

  const newUserUsername = useSelector(
    (state: RootState) => state.getNewRegisteredUserUsernameSlice.username
  );
  const [interests, setInterests] = useState<string[]>(categories);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const handleInterests = function (interest: string) {
    const data: string = interest.replaceAll(" ", "").toLowerCase();
    if (selectedInterests.includes(data)) {
      setSelectedInterests((prev) =>
        prev.filter((item) => item.replaceAll(" ", "").toLowerCase() !== data)
      );
    } else {
      setSelectedInterests((prev) => [...prev, data]);
    }
  };

  const handleSubmit = async function () {
    try {
      const request = await fetch(`${baseURL}/auth/set_interests`, {
        method: "POST",
        body: JSON.stringify({
          username: newUserUsername,
          interests: selectedInterests,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!request.ok) {
        const error = await request.json();
        toast.handleToast(true, error.message, "alert-error");
        throw new Error(error.message);
      }

      const response = await request.json();
      toast.handleToast(true, response.message, "alert-success");

      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/");
    } catch (error: any) {
      toast.handleToast(true, error.message, "alert-error");
      throw new Error(error.message);
    }
  };
  return (
    <>
      <div className="flex flex-row w-full flex-wrap gap-2 mt-2 justify-center items-center max-w-96 md:max-w-screen-xmd mx-auto mt-8">
        {interests.map((interest, index) => {
          return (
            <div
              key={index}
              className="flex flex-row items-center justify-center gap-2 py-2 px-3 bg-base-200 rounded-full cursor-pointer"
            >
              <label htmlFor={interest} className="cursor-pointer select-none">
                {interest}
              </label>
              <input
                type="checkbox"
                id={interest}
                className="checkbox checkbox-sm rounded-full"
                value={interest}
                onChange={(e) => handleInterests(e.currentTarget.value)}
              />
            </div>
          );
        })}
      </div>
      {/* <CustomInterestsModal setInterests={setInterests} /> */}
      {/* <Link href={"/"} className="btn rounded-full">
        O&#39;tkazib yuborish
      </Link> */}
      <div className="fixed bottom-0 left-0 w-full flex justify-center items-center py-8">
        <button
          className={clsx("btn rounded-full w-72 md:w-96", selectedInterests.length < 3 ? "btn-disabled" : "bg-black text-white hover:bg-gray-900")}
          onClick={() => handleSubmit()}
        >
          Davom etish
        </button>
      </div>
      {toast.showToast && (
        <Toast toastType={toast.toastType} toastInfo={toast.toastInfo} />
      )}
    </>
  );
}

export default Interests;
