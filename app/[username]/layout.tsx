import { Metadata } from "next";
import React from "react";
import LinkBar from "./components/LinkBar";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "User Fullname",
  description: "Description for User Fullname",
};

export default function UserProfileLayout({
  children,
  params,
}: {
  params: { username: string };
  children: React.ReactNode;
}) {
  const username = params.username.replaceAll("%40", "");

  return (
    <section className="flex justify-between items-start max-w-[1240px] mx-auto mt-8 border-t border-gray-200">
      <aside id="left_content" className="w-full px-8 pt-8">
        <main className="w-full h-fit">
          <div className="w-full">
            <h1 className="text-4xl font-semibold font-serif">User Fullname</h1>
          </div>
          <LinkBar username={username} />
          {children}
        </main>
      </aside>
      <aside
        id="right_content"
        className="flex flex-col w-full md:max-w-96 gap-3 px-8 border-l border-gray-200 sticky  top-0 h-screen pt-8"
      >
        <div className="w-full">
          <Image
            src={"/images/avatar.png"}
            width={88}
            height={88}
            alt="User image"
            className="rounded-full border-2 border-blue-900"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h3>Username Fullname</h3>
          <Link href={`/me/settings`} className="link link-primary">
            Edit profile
          </Link>
        </div>
      </aside>
    </section>
  );
}
