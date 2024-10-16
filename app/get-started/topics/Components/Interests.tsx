"use client";
type Props = {};
import { useEffect, useState } from "react";
import CustomInterestsModal from "./CustomInterestsModal";
import { baseURL } from "@/utils";
import { useRouter } from "next/navigation";
import Toast from "@/components/Toast";
import useToast from "@/hooks/useToast";
import clsx from "clsx";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { getAccessToken, getUsernameCookie } from "@/lib/actions";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { topics, moreTopics } from "@/components/Categories";
import InterestCard from "./InterestCard";

function GetStartedTopics({}: Props) {
  const router = useRouter();
  const toast = useToast();
  const [username, setUsername] = useState<
    | {
        value: string;
      }
    | RequestCookie
    | undefined
  >({ value: "" });
  const [interests, setInterests] = useState<string[]>(topics);
  const [moreInterests, setMoreInterests] = useState<string[]>(moreTopics);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [showMore, setShowMore] = useState<boolean>(false);

  // This function is used for when the user goes this page, his/her username will be got and used for updating profile data
  useEffect(() => {
    (async () => {
      const result: RequestCookie | undefined = await getUsernameCookie();
      setUsername(result);
    })();
  }, []);

  // This function is used for getting user's profile data if he/she is not new in the platform, otherwise get request will not be sent
  useEffect(() => {
    (async () => {
      const access_token = await getAccessToken().then((r) => r?.value);

      if (!access_token) return;

      try {
        const request = await fetch(`${baseURL}/get_interests`, {
          cache: "no-store",
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        if (!request.ok) {
          const error = await request.json();
          toast.handleToast(true, error.message, "alert-error");
          throw new Error(error.message);
        }
        const response: { message: string; user_interests: string[] } =
          await request.json();
        setSelectedInterests(response.user_interests);
        console.log(response.user_interests);
      } catch (error: any) {
        toast.handleToast(true, error.message, "alert-error");
        throw new Error(error.message);
      }
    })();
  }, []);

  // This function is used for adding, removing user's interests
  const handleInterests = function (interest: string) {
    interest = interest.toLowerCase();
    if (selectedInterests.includes(interest)) {
      setSelectedInterests((prev) => prev.filter((item) => item !== interest));
    } else {
      setSelectedInterests((prev) => [...prev, interest]);
    }
  };

  // This function is used for updating user's profile data using his/her username
  const handleSubmit = async function () {
    console.log("selectedInterests => ", selectedInterests);

    try {
      const request = await fetch(`${baseURL}/set_interests`, {
        method: "POST",
        body: JSON.stringify({
          username: username?.value,
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
      <div className="flex flex-row w-full flex-wrap gap-3 justify-center items-center max-w-96 md:max-w-screen-xmd mx-auto mt-8">
        {selectedInterests.map((interest, index) => {
          if (
            !interests.includes(interest) &&
            !moreInterests.includes(interest)
          ) {
            return (
              <InterestCard
                key={index}
                interest={interest}
                selectedInterests={selectedInterests}
                handleInterests={handleInterests}
                showMore
              />
            );
          }
        })}
        {interests.map((interest, index) => {
          return (
            <InterestCard
              key={index}
              interest={interest}
              selectedInterests={selectedInterests}
              handleInterests={handleInterests}
              showMore
            />
          );
        })}
        {moreInterests.map((interest, index) => {
          return (
            <InterestCard
              key={index}
              interest={interest}
              selectedInterests={selectedInterests}
              handleInterests={handleInterests}
              showMore={showMore}
            />
          );
        })}
      </div>
      <div className="w-full flex justify-center mt-4 ">
        {!showMore && (
          <button
            className="flex items-center gap-2 text-nowrap cursor-pointer hover:underline hover:text-blue-700"
            onClick={() => setShowMore((prev) => !prev)}
          >
            Ko&#39;proq <FaChevronDown />
          </button>
        )}
        {showMore && (
          <button
            className="flex items-center gap-2 text-nowrap cursor-pointer hover:underline hover:text-blue-700"
            onClick={() => setShowMore((prev) => !prev)}
          >
            Kamroq <FaChevronUp />
          </button>
        )}
      </div>
      <CustomInterestsModal
        setInterests={setInterests}
        setSelectedInterests={setSelectedInterests}
      />
      <div className="flex flex-col justify-center items-center fixed bottom-0 left-0 w-full py-8 backdrop-blur-md gap-8">
        <button
          className={clsx(
            "btn rounded-full w-72 md:w-96",
            selectedInterests.length < 3
              ? "btn-disabled"
              : "bg-black text-white hover:bg-gray-900"
          )}
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

export default GetStartedTopics;
