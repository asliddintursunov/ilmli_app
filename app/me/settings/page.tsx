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
import { useState } from "react";

export default function EditProfile() {
  const [openEditPassword, setOpenEditPassword] = useState<boolean>(false);
  return (
    <div className="max-w-[1240px] mx-auto">
      <h1 className="text-4xl border-b border-gray-600">Setting</h1>
      <br />
      <main className="flex flex-col md:flex-row justify-between items-stretch">
        <aside className="flex-[3] flex flex-col gap-y-2 xs:gap-y-6 p-4 bg-green-300">
          <div className="w-full flex justify-between items-start">
            <EditProfilePicture />
            <h1>Joined day</h1>
          </div>
          <div className="w-full flex flex-col xs:flex-row gap-2 justify-between">
            <EditUsername />
            <EditFullname />
          </div>
          <div className="w-full flex flex-col xs:flex-row gap-2 justify-between">
            <EditEmail />
            <EditTelephoneNumber />
          </div>
          <div className="w-full flex flex-col gap-2">
            <EditBio />
            <EditSocialLinks />
          </div>
          <div className="hidden md:flex flex-col gap-2 items-start">
            <button
              className="btn btn-active"
              onClick={() => setOpenEditPassword(true)}
            >
              Parolni o&#39;zgartirish
            </button>
            <button className="btn btn-neutral">
              O&#39;zgarishlarni saqlash
            </button>
          </div>
        </aside>
        <aside className="flex-1 p-4 bg-red-300">
          <EditInterests />
        </aside>
        <div className="flex md:hidden flex-col gap-2 items-start pl-4">
          <button
            className="btn btn-active"
            onClick={() => setOpenEditPassword(true)}
          >
            Parolni o&#39;zgartirish
          </button>
          <button className="btn btn-neutral">
            O&#39;zgarishlarni saqlash
          </button>
        </div>
      </main>
      {openEditPassword && (
        <EditPassword setOpenEditPassword={setOpenEditPassword} />
      )}
    </div>
  );
}
