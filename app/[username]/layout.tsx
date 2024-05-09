import { Metadata } from "next";
import React from "react";
import LinkBar from "./components/LinkBar";
import Image from "next/image";

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
    <section className="flex justify-between items-start max-w-[1240px] mx-auto">
      <aside id="left_content" className="bg-red-400 w-full">
        <h1 className="text-4xl">Some left content</h1>
        <br />
        <hr />
        <main className="w-full h-fit bg-green-500">
          <div className="w-full">
            <h1 className="text-4xl font-semibold font-serif">User Fullname</h1>
          </div>
          <LinkBar username={username} />
          {children}
        </main>
      </aside>
      <aside id="right_content" className="bg-yellow-400 w-full md:max-w-96">
        <h1 className="text-4xl">Some right content</h1>
        <br />
        <hr />
        <div className="w-full">
          <Image
            src={"/images/avatar.png"}
            width={88}
            height={88}
            alt="User image"
            className="rounded-full border-2 border-blue-900"
          />
        </div>
      </aside>
    </section>
  );
}
