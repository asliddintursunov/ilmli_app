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
import {
  FaFacebook,
  FaYoutube,
  FaWhatsapp,
  FaInstagram,
  FaTiktok,
  FaGithub,
  FaLinkedin,
  FaTelegram,
  FaGlobe,
  FaRegUser,
} from "react-icons/fa";
import { MdEmail, MdOutlineMail } from "react-icons/md";
import Navbar from "@/components/Navbar";

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
  const iconMap: any = {
    facebook: <FaFacebook className="text-blue-600 text-2xl" />, // Facebook Blue
    youtube: <FaYoutube className="text-red-600 text-2xl" />, // YouTube Red
    whatsapp: <FaWhatsapp className="text-green-500 text-2xl" />, // WhatsApp Green
    instagram: <FaInstagram className="text-pink-500 text-2xl" />, // Instagram Gradient effect, pinkish
    tiktok: <FaTiktok className="text-black" text-2xl />, // TikTok Black
    github: <FaGithub className="text-gray-800 text-2xl" />, // GitHub Blackish
    linkedin: <FaLinkedin className="text-blue-700 text-2xl" />, // LinkedIn Blue
    telegram: <FaTelegram className="text-blue-400 text-2xl" />, // Telegram Light Blue
  };

  const username = params.username.replaceAll("%40", "");
  const user: ResType = await fetchSpecificUserData(username);
  if (!user) {
    return <UsernameNotFound username={username} />;
  }
  console.log("user.my_profile =>", user.my_profile);
  console.log("user.user_email =>", user.user_email);
  console.log("user.user_fullname =>", user.user_fullname);
  console.log("user.user_name =>", user.user_name);
  console.log("user.social_links", user.user_social_links);

  return (
    <>
      <nav className="border-b-2 border-gray-600 bg-gray-300">
        <Navbar />
      </nav>
      <section className="flex flex-col-reverse md:flex-row justify-between items-start max-w-[1240px] mx-auto mt-8 border-t border-gray-200">
        <aside id="left_content" className="w-full px-8 pt-8">
          <main className="w-full h-fit">
            <div className="w-full">
              <h1 className="hidden md:block text-4xl font-semibold font-serif">
                {user.user_fullname}
              </h1>
            </div>
            <LinkBar username={username} />
            {children}
          </main>
        </aside>
        <aside
          id="right_content"
          className="flex flex-col justify-start items-start w-full md:max-w-96 gap-2 px-8 border-l border-gray-200 md:sticky md:top-0 h-fit md:h-screen pt-8"
        >
          <div className="flex md:flex-col items-center gap-3 justify-center">
            <div className="h-[60px] w-[60px] md:h-[120px] md:w-[120px] rounded-full overflow-hidden border border-gray-300">
              <Image
                src={user.user_profile_photo ?? "/images/avatar.png"}
                width={120}
                height={120}
                alt="User image"
                className="object-cover h-full w-full"
              />
            </div>
            <h3 className="font-bold text-xl font-serif">
              {user.user_fullname ?? user.user_name}
            </h3>
            {user.my_profile && (
              <Link
                href={`/me/settings`}
                className="link link-primary hidden md:block"
              >
                Edit profile
              </Link>
            )}
          </div>
          <ul className="hidden md:flex flex-col gap-2 border-b border-gray-300 py-2">
            <li className="flex items-center gap-2 hover:link hover:link-primary cursor-pointer">
              {" "}
              <MdOutlineMail className="text-gray-600 text-2xl" />{" "}
              {user.user_email}
            </li>
            <li className="flex items-center gap-2">
              {" "}
              <FaRegUser className="text-gray-600 text-2xl" /> {user.user_name}
            </li>
          </ul>
          {user.user_social_links?.length && (
            <ul className="hidden md:flex flex-col gap-2">
              {user.user_social_links.map(
                (item: { link: string; platform: string }, index) => {
                  return (
                    <li
                      key={index}
                      className="flex justify-start items-center gap-2"
                    >
                      {item.platform &&
                        (iconMap[item.platform.toLowerCase()] ?? (
                          <FaGlobe className="text-blue-600 text-2xl" />
                        ))}
                      <Link
                        href={item.link}
                        className=" text-gray-600 hover:link-primary hover:link-hover"
                      >
                        {item.link}
                      </Link>
                    </li>
                  );
                }
              )}
            </ul>
          )}
        </aside>
      </section>
    </>
  );
}
