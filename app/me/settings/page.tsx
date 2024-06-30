"use client";
import EditUsername from "./components/EditUsername";
import EditEmail from "./components/EditEmail";
import EditPassword from "./components/EditPassword";
import EditFullname from "./components/EditFullname";
import EditProfilePicture from "./components/EditProfilePicture";
import EditSocialLinks from "./components/EditSocialLinks";
import EditBio from "./components/EditBio";
import EditTelephoneNumber from "./components/EditTelephoneNumber";
import EditInterests from "./components/EditInterests";
import { useEffect, useState } from "react";
import useAuthValidation from "@/hooks/useAuthValidation";
import { baseURL } from "@/utils";
import { getAccessToken } from "@/lib/actions";
import Toast from "@/components/Toast";
import useToast from "@/hooks/useToast";

export default function EditProfile() {
  const toast = useToast();
  const validation = useAuthValidation();
  const [fishValidation, setFishValidation] = useState<boolean>(true);
  const [bioValidation, setBioValidation] = useState<boolean>(true);

  const [openEditPassword, setOpenEditPassword] = useState<boolean>(false);
  const [initialData, setInitialData] = useState<
    | {
        user_name?: string;
        user_email?: string;
      }
    | undefined
  >(undefined);
  const [profilePhoto, setProfilePhoto] = useState<string | undefined>(
    undefined
  );
  const [username, setUsername] = useState<string>("");
  const [fullname, setFullname] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  const [bio, setBio] = useState<string | undefined>(undefined);
  const [socialLinks, setSocialLinks] = useState<
    { platform: string; link: string }[] | undefined
  >(undefined);
  const [interests, setInterests] = useState<string[]>([]);

  useEffect(() => {
    // checks if username and email are valid or not
    const validationResult = validation.regExpResult;

    // checks if fullname is valid or not
    (fullname?.length ?? 0) >= 40
      ? setFishValidation(false)
      : setFishValidation(true);

    // checks if bio is valid or not
    typeof bio?.length !== "undefined" && bio?.length >= 250
      ? setBioValidation(false)
      : setBioValidation(true);

    if (
      validationResult.username &&
      validationResult.email &&
      (fullname?.length ?? 0) <= 40 &&
      (bio?.length ?? 0) <= 250
    ) {
      const updateProfile = async (data: PostUserData) => {
        const API = `${baseURL}/update-profile`;
        const access_token = await getAccessToken().then((r) => r?.value);
        try {
          const response = await fetch(API, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
            body: JSON.stringify(data),
          });
          if (!response.ok) {
            toast.handleToast(
              true,
              "Ma'lumot yuborishda xatolik",
              "alert-error"
            );
            throw new Error(
              `API request failed with status ${response.status} at User profile`
            );
          }
          return await response.json();
        } catch (error: any) {
          toast.handleToast(true, error.message, "alert-error");
          console.error("Error sending User profile data:", error.message);
          throw new Error(error.message);
        }
      };

      (async () => {
        const data: PostUserData = {
          user_name: initialData?.user_name !== username ? username : undefined,
          user_email: initialData?.user_email !== email ? email : undefined,
          user_fullname: fullname,
          user_phone_number: phoneNumber,
          user_bio: bio,
          user_profile_photo: profilePhoto,
          user_interests: interests,
          user_social_links: socialLinks,
        };
        const response = await updateProfile(data);
        if (response.status === 409) {
          toast.handleToast(true, response.message, "alert-error");
          return;
        }
        toast.handleToast(true, response.message, "alert-success");
      })();
      return;
    }
    console.log("Don't sent to backend");
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validation.regExpResult]);

  useEffect(() => {
    const fetchOwnData = async () => {
      const API = `${baseURL}/self-data`;
      const access_token = await getAccessToken().then((r) => r?.value);
      try {
        const response = await fetch(API, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          method: "GET",
          cache: "no-store",
        });
        if (!response.ok) {
          toast.handleToast(true, "Ma'lumot olishda xatolik", "alert-error");
          throw new Error(
            `API request failed with status ${response.status} at User profile`
          );
        }
        return await response.json();
      } catch (error: any) {
        toast.handleToast(true, "Ma'lumot olishda xatolik", "alert-error");
        console.error("Error fetching User profile data:", error.message);
        throw new Error(error.message);
      }
    };

    (async () => {
      const data: GetUserData = await fetchOwnData();
      setInitialData({
        user_name: data.user_name,
        user_email: data.user_email,
      });

      setUsername(data.user_name);
      setEmail(data.user_email);
      data.user_fullname && setFullname(data.user_fullname);
      data.user_phone_number && setPhoneNumber(data.user_phone_number);
      data.user_profile_photo && setProfilePhoto(data.user_profile_photo);
      data.user_social_links && setSocialLinks(data.user_social_links);
      data.user_interests && setInterests(data.user_interests);
    })();
  }, []);

  return (
    <>
      <div className="max-w-[1240px] mx-auto">
        <main className="flex flex-col md:flex-row justify-between items-stretch">
          <aside className="flex-[3] flex flex-col gap-y-2 xs:gap-y-6 p-4 border-b border-gray-300">
            <div className="w-full flex justify-between items-start">
              <EditProfilePicture
                profilePhoto={profilePhoto}
                setProfilePhoto={setProfilePhoto}
              />
              <h1 className="hidden sm:block">Joined day</h1>
            </div>
            <div className="w-full flex flex-col xs:flex-row gap-2 justify-between">
              <EditUsername
                username={username}
                setUsername={setUsername}
                validationResult={validation.regExpResult.username}
              />
              <EditFullname
                fullname={fullname}
                setFullname={setFullname}
                fishValidation={fishValidation}
              />
            </div>
            <div className="w-full flex flex-col xs:flex-row gap-2 justify-between">
              <EditEmail
                email={email}
                setEmail={setEmail}
                validationResult={validation.regExpResult.email}
              />
              <EditTelephoneNumber
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <EditBio
                bio={bio}
                setBio={setBio}
                bioValidation={bioValidation}
              />
              <EditSocialLinks
                socialLinks={socialLinks}
                setSocialLinks={setSocialLinks}
              />
            </div>
            <div className="hidden md:flex flex-col gap-2 items-start">
              <button
                className="btn btn-active"
                onClick={() => setOpenEditPassword(true)}
              >
                Parolni o&#39;zgartirish
              </button>
              <button
                className="btn btn-neutral"
                onClick={() => {
                  validation.validateInput(username, email, undefined);
                }}
              >
                O&#39;zgarishlarni saqlash
              </button>
            </div>
          </aside>
          <aside className="flex-1 p-4 border-l border-b border-gray-300">
            <EditInterests interests={interests} setInterests={setInterests} />
          </aside>
          <div className="flex md:hidden flex-col gap-2 items-start pl-4 mt-2">
            <button
              className="btn btn-active"
              onClick={() => setOpenEditPassword(true)}
            >
              Parolni o&#39;zgartirish
            </button>
            <button
              className="btn btn-neutral"
              onClick={() => {
                validation.validateInput(username, email, undefined);
              }}
            >
              O&#39;zgarishlarni saqlash
            </button>
          </div>
        </main>
        {openEditPassword && (
          <EditPassword setOpenEditPassword={setOpenEditPassword} />
        )}
      </div>
      {toast.showToast && (
        <Toast toastType={toast.toastType} toastInfo={toast.toastInfo} />
      )}
    </>
  );
}
