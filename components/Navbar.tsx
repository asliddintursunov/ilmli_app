"use client";
import Link from "next/link";
import ToggleMood from "./ToggleMood";
export default function Navbar() {
  const isRegistered = false;
  return (
    <nav className="navbar bg-base-100 px-4">
      <ToggleMood />
      <div className="flex-1">
        <Link href={"/"} className="btn btn-ghost text-3xl">
          Ilmli
        </Link>
      </div>
      <div className="flex-none">
        {!isRegistered && (
          <ul className="menu menu-horizontal px-1">
            <li className="mr-2">
              <Link href={"/auth/login"}>Login</Link>
            </li>
            <li className="mr-2">
              <Link href={"/auth/register"}>Register</Link>
            </li>
          </ul>
        )}
        {isRegistered && (
          <ul className="menu menu-horizontal px-1">
            <li className="mr-2">
              <Link href={"/articles"}>Articles</Link>
            </li>
            <li className="mr-2">
              <Link href={"/editor"}>Editor</Link>
            </li>
            <li>
              <details>
                <summary>More</summary>
                <ul className="p-2 bg-base-100 rounded-t-none">
                  <li>
                    <Link href={"/profile"}>Profile</Link>
                  </li>
                  <li>
                    <Link href={"/"}>Smth</Link>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
