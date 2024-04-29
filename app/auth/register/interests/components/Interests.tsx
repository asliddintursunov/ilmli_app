"use client";
type Props = {};
import { useState } from "react";
import CustomInterestsModal from "./CustomInterestsModal";
import Link from "next/link";
import axios from "axios";
import { baseURL } from "@/utils";
import { useRouter } from "next/navigation";
import { categories } from "@/components/Categories";

function Interests({}: Props) {
  const router = useRouter()
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

  const handleSubmit = function () {
    axios
      .post(`${baseURL}/auth/set_interests`, {
        username: localStorage.getItem("username"),
        interests: selectedInterests,
      })
      .then((res) => {
        alert(res.data)
        router.push("/");
      })
      .catch((err) => console.log(err));
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
    </>
  );
}

export default Interests;
