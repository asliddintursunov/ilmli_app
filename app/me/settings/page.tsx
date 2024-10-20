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
import ProfileSkeleton from "./components/ProfileSkeleton";
import Navbar from "@/components/Navbar";

export default function EditProfile() {
  const toast = useToast();
  const validation = useAuthValidation();
  const [isPending, setIsPending] = useState(false);
  const [fishValidation, setFishValidation] = useState<boolean>(true);
  const [bioValidation, setBioValidation] = useState<boolean>(true);
  const [openEditPassword, setOpenEditPassword] = useState<boolean>(false);
  const [initial_username_and_email, set_initial_username_and_email] =
    useState<{ user_name: string; email: string } | null>(null);

  const [username, setUsername] = useState<string>("");
  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [socialLinks, setSocialLinks] = useState<
    { platform: string; link: string }[]
  >([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [profilePhoto, setProfilePhoto] = useState<string>("");

  // update user profile: PATCH main function
  const updateProfile = async (
    user_profile_data: UserData
  ): Promise<UserData | void> => {
    const access_token = await getAccessToken().then((r) => r?.value);
    try {
      const request = await fetch(`${baseURL}/update-profile`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user_profile_data),
      });
      if (!request.ok) {
        const error = await request.json();
        toast.handleToast(true, error.message, "alert-error");
        throw new Error(error.message);
      }
      const response = await request.json();
      toast.handleToast(true, response.message, "alert-success");
    } catch (error: any) {
      toast.handleToast(true, error.message, "alert-error");
      throw new Error(error.message);
    }
  };

  // fetching user data: GET
  useEffect(() => {
    setIsPending(true);
    (async (): Promise<void> => {
      const access_token = await getAccessToken().then((r) => r?.value);
      try {
        const request = await fetch(`${baseURL}/self-data`, {
          method: "GET",
          cache: "no-store",
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
        const response = await request.json();
        const user_data: UserData = response.user_data;
        console.log(user_data);

        setUsername(user_data.user_name ?? "");
        setEmail(user_data.user_email ?? "");
        setFullname(user_data.user_fullname ?? "");
        setPhoneNumber(user_data.user_phone_number ?? "");
        setBio(user_data.user_bio ?? "");
        setSocialLinks(user_data.user_social_links ?? []);
        setInterests(user_data.user_interests ?? []);
        setProfilePhoto(user_data.user_profile_photo ?? "");
        set_initial_username_and_email({
          user_name: user_data.user_name ?? "",
          email: user_data.user_email ?? "",
        });
        setIsPending(false);
      } catch (error: any) {
        toast.handleToast(true, error.message, "alert-error");
        throw new Error(error.message);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // update user profile: PATCH
  useEffect(() => {
    (async () => {
      // checks if username and email are valid or not
      const validationResult = validation.regExpResult;

      // checks if fullname is valid or not
      if (fullname.length >= 40) {
        setFishValidation(false);
        return;
      }
      setFishValidation(true);

      // checks if bio is valid or not
      if (!typeof bio?.length || bio?.length >= 250) {
        setBioValidation(false);
        return;
      }
      setBioValidation(true);

      console.log(
        validationResult.username,
        validationResult.email,
        fishValidation,
        bioValidation
      );

      if (
        validationResult.username &&
        validationResult.email &&
        fishValidation &&
        bioValidation
      ) {
        const user_profile_data: UserData = {
          user_name:
            username.trim() !== initial_username_and_email?.user_name
              ? username
              : undefined,
          user_email:
            email.trim() !== initial_username_and_email?.email
              ? email
              : undefined,
          user_fullname: fullname,
          user_phone_number: phoneNumber,
          user_bio: bio,
          user_profile_photo: profilePhoto,
          user_interests: interests,
          user_social_links: socialLinks,
        };
        console.log("bio =>", bio);

        updateProfile(user_profile_data);
        return;
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validation.regExpResult]);

  return (
    <>
      {isPending && <ProfileSkeleton />}
      <nav className="border-b-2 border-gray-600 bg-gray-300">
        <Navbar />
      </nav>
      <div className="max-w-[1240px] mx-auto border border-gray-300 pb-4">
        {!isPending && (
          <main className="flex flex-col md:flex-row justify-between items-stretch">
            <aside className="md:w-[1024px] mx-auto flex flex-col gap-y-2 xs:gap-y-6 p-4 ">
              <h1 className="md:hidden block text-nowrap text-end">
                11 July, 2024
              </h1>
              <div className="w-full flex justify-between items-start">
                <EditProfilePicture
                  profilePhoto={profilePhoto}
                  setProfilePhoto={setProfilePhoto}
                />
                <h1 className="hidden md:block text-nowrap text-end">
                  11 July, 2024
                </h1>
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
              <div className="w-full flex flex-row justify-between items-center mt-2 gap-2">
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
          </main>
        )}
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
