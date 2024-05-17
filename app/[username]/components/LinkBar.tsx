"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Params = {
  username: string;
};

function LinkBar({ username }: Params) {
  const pathname = usePathname();
  return (
    <div className="relative flex gap-8 my-6 border-gray-200">
      <Link
        href={`/@${username}/home`}
        className={clsx(
          "text-gray-600 hover:text-black  underline-offset-[19px] z-10",
          pathname === `/@${username}/home` && "underline text-black"
        )}
      >
        Home
      </Link>
      <Link
        href={`/@${username}/about`}
        className={clsx(
          "text-gray-600 hover:text-black  underline-offset-[19px] z-10",
          pathname === `/@${username}/about` && "underline text-black"
        )}
      >
        About
      </Link>
      <div className="absolute h-[1px] w-full bg-gray-200 -bottom-3" />
    </div>
  );
}

export default LinkBar;
