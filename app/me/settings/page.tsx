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
      <main className="flex justify-between items-start">
        <aside className="flex-[3] flex flex-col bg-green-300 gap-y-6 max-h-screen">
          <div>
            <EditProfilePicture />
          </div>
          <div className="w-full flex gap-2 justify-between">
            <EditUsername />
            <EditFullname />
          </div>
          <div className="w-full flex gap-2 justify-between">
            <EditEmail />
            <EditTelephoneNumber />
          </div>
          <div className="w-full flex flex-col gap-2">
            <EditBio />
            <EditSocialLinks />
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setOpenEditPassword((prev) => !prev)}
          >
            Edit password
          </button>
        </aside>
        <aside className="flex-1 bg-red-300">
          <EditInterests />
        </aside>
      </main>
      {openEditPassword && (
        <EditPassword setOpenEditPassword={setOpenEditPassword} />
      )}
    </div>
  );
}
