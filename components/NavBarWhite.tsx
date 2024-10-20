import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegPenToSquare } from "react-icons/fa6";
import { getUsernameCookie } from "@/lib/actions";
export default async function NavBarWhite() {
  const username = await getUsernameCookie().then((r) => r?.value);
  return (
    <div className="h-16 w-full shadow-md">
      <div className="max-w-[1240px] h-full m-auto flex justify-between items-center text-2xl">
        <Link href={"/"} className="">
          <Image
            src={"/images/Ilmli_logo.png"}
            alt="Ilmli logo"
            width={120}
            height={36}
            className="w-auto h-auto"
          />
        </Link>
        <div className="flex items-center gap-10">
          <Link
            href={"/text-editor"}
            className="flex items-center gap-2 text-base text-gray-600 hover:text-black hover:underline"
          >
            <FaRegPenToSquare className="text-base" />
            Hikoya yozish
          </Link>
          <Link href={`/@${username}/home`}>
            <Image
              height={40}
              width={40}
              src={"/images/avatar.png"}
              alt="profile photo"
              className="rounded-full border border-gray-300"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
