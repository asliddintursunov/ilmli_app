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
      const res = await axios.post(`${baseURL}/auth/set_interests`, {
        username: newUserUsername,
        interests: selectedInterests,
      });
      toast.handleToast(true, res.data, "alert-success");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (err: any) {
      toast.handleToast(true, err.response.data, "alert-error");
    }
  };
  return (
    <>
      <div className="flex flex-row w-full flex-wrap gap-2 mt-2">
        {interests.map((interest, index) => {
          return (
            <div
              key={index}
              className="flex flex-row items-center justify-center gap-2 py-1 px-2 bg-base-100 rounded-full border-2 border-gray-500/40"
            >
              <input
                type="checkbox"
                id={interest}
                className="checkbox checkbox-accent"
                value={interest}
                onChange={(e) => handleInterests(e.currentTarget.value)}
              />
              <label htmlFor={interest}>{interest}</label>
            </div>
          );
        })}
      </div>
      <CustomInterestsModal setInterests={setInterests} />
      <Link href={"/"} className="btn btn-accent rounded-full">
        Skip
      </Link>
      <button className="btn btn-success" onClick={() => handleSubmit()}>
        Submit
      </button>
      {toast.showToast && (
        <Toast toastType={toast.toastType} toastInfo={toast.toastInfo} />
      )}
    </>
  );
}

export default Interests;
