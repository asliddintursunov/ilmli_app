import { Metadata } from "next";
import React from "react";
import LinkBar from "./components/LinkBar";
import Image from "next/image";
import Link from "next/link";
import { fetchSpecificUserData } from "@/lib/fetchFunctions";
import UsernameNotFound from "./not-found";
export const metadata: Metadata = {
  title: "User Fullname",
  description: "Description for User Fullname",
};

type ResType = {
  user_email: string;
  user_fullname: string | null;
  user_id: number;
  user_interests: string[] | null;
  user_name: string;
  user_phone_number: string | null;
  user_profile_photo: string | null;
  user_social_links:
    | {
        platform: string;
        link: string;
      }[]
    | null;
  my_profile: Boolean;
};

export default async function UserProfileLayout({
  children,
  params,
}: {
  params: { username: string };
  children: React.ReactNode;
}) {
  const username = params.username.replaceAll("%40", "");
  const user: ResType = await fetchSpecificUserData(username);
  if (!user) {
    return <UsernameNotFound username={username} />;
  }
  console.log("user.my_profile =>", user.my_profile);
  console.log("user.user_email =>", user.user_email);
  console.log("user.user_fullname =>", user.user_fullname);
  console.log("user.user_name =>", user.user_name);

  return (
    <section className="flex flex-col-reverse md:flex-row justify-between items-start max-w-[1240px] mx-auto mt-8 border-t border-gray-200">
      <aside id="left_content" className="w-full px-8 pt-8">
        <main className="w-full h-fit">
          <div className="w-full">
            <h1 className="text-4xl font-semibold font-serif">
              {user.user_fullname}
            </h1>
          </div>
          <h1>{username}</h1>
          <LinkBar username={username} />
          {children}
        </main>
      </aside>
      <aside
        id="right_content"
        className="flex flex-col w-full md:max-w-96 gap-3 px-8 border-l border-gray-200 md:sticky md:top-0 h-fit md:h-screen pt-8"
      >
        <div className="w-full">
          <Image
            src={user.user_profile_photo ?? "/images/avatar.png"}
            width={88}
            height={88}
            alt="User image"
            className="rounded-full border border-gray-300 object-cover"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h3>{user.user_fullname ?? user.user_name}</h3>
          {user.my_profile && (
            <Link href={`/me/settings`} className="link link-primary">
              Edit profile
            </Link>
          )}
        </div>
        <ul>
          <li>{user.user_email}</li>
          <li>{user.user_name}</li>
        </ul>
      </aside>
    </section>
  );
}
