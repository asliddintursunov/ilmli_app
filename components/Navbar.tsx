"use client";
import Link from "next/link";
import ScrollToTop from "@/components/ScrollToTop";
import Image from "next/image";
import useRouteHandler from "@/hooks/useRouteHandler";

export default function Navbar() {
  const { isLoggedIn, isAuthed } = useRouteHandler();
  return (
    <nav className="navbar max-w-[1440px] mx-auto bg-inherit px-4 sticky top-0 left-0 z-20 ">
      <ScrollToTop />
      <div className="flex-1">
        <Link href={"/"} className="">
          <Image
            src={"/images/Ilmli_logo.png"}
            alt="Ilmli logo"
            width={120}
            height={36}
            className="w-auto h-auto"
          />
        </Link>
      </div>
      <div className="flex-none">
        {/* Mobile Screen */}
        {isLoggedIn === false && (
          <ul className="menu menu-horizontal px-1 sm:hidden block">
            <li className="mr-2">
              <details>
                <summary>More</summary>
                <ul className="bg-base-100 rounded-t-none">
                  <li className="mr-2">
                    <Link href={"/auth/login"}>Hisobga kirish</Link>
                  </li>
                  <li className="mr-2">
                    <Link href={"/auth/register"}>
                      Ro&#39;yxatdan o&#39;tish
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        )}

        {/* Desktop Screen */}
        {isLoggedIn === false && (
          <ul className="menu menu-horizontal px-1 sm:flex hidden">
            <li className="mr-2">
              <Link href={"/auth/login"}>Hisobga kirish</Link>
            </li>
            <li className="mr-2">
              <Link href={"/auth/register"}>Ro&#39;yxatdan o&#39;tish</Link>
            </li>
          </ul>
        )}

        {/* Mobile Screen */}
        {isLoggedIn === true && (
          <ul className="menu menu-horizontal px-1 sm:hidden block">
            <li className="mr-2">
              <details>
                <summary>More</summary>
                <ul className="bg-base-100 rounded-t-none">
                  <li>
                    <Link href={"/articles"}>Hikoyalar</Link>
                  </li>
                  <li>
                    <Link href={"/text-editor"}>
                      {/* {<FaRegPenToSquare className="text-xl text-gray-600" />}{" "} */}
                      Yangi hikoya yozish
                    </Link>
                  </li>
                  <li>
                    <Link href={`/@${isAuthed.logged_in_as}/home`}>Porfil</Link>
                  </li>
                  {/* <li>
                    <Link href={"/smth"}>Smth</Link>
                  </li> */}
                </ul>
              </details>
            </li>
          </ul>
        )}

        {/* Desktop Screen */}
        {isLoggedIn === true && (
          <ul className="menu menu-horizontal px-1 hidden sm:flex">
            <li>
              <Link href={"/articles"}>Hikoyalar</Link>
            </li>
            <li>
              <Link href={"/text-editor"}>
                {/* {<FaRegPenToSquare className="text-xl text-gray-600" />} Yangi */}
                Yangi hikoya yozish
              </Link>
            </li>
            <li>
              <Link href={`/@${isAuthed.logged_in_as}/home`}>Porfil</Link>
            </li>
            {/* <li>
              <Link href={"/smth"}>Smth</Link>
            </li> */}
          </ul>
        )}
      </div>
    </nav>
  );
}
