import Link from "next/link";
import ToggleMode from "./ToggleMode";
export default function Navbar() {
  const isRegistered = false;
  return (
    <nav className="navbar bg-base-100 px-4 border-b-2 border-gray-600  sticky top-0 left-0 z-10">
      <div className="flex-1">
        <Link href={"/"} className="btn btn-ghost text-3xl">
          Ilmli
        </Link>
      </div>
      <div className="flex-none">
        {/* Mobile Screen */}
        {!isRegistered && (
          <ul className="menu menu-horizontal px-1 sm:hidden block">
            <li className="mr-2">
              <details>
                <summary>More</summary>
                <ul className="bg-base-100 rounded-t-none">
                  <li className="mr-2">
                    <Link href={"/auth/login"}>Login</Link>
                  </li>
                  <li className="mr-2">
                    <Link href={"/auth/register"}>Register</Link>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        )}

        {/* Desktop Screen */}
        {!isRegistered && (
          <ul className="menu menu-horizontal px-1 sm:flex hidden">
            <li className="mr-2">
              <Link href={"/auth/login"}>Login</Link>
            </li>
            <li className="mr-2">
              <Link href={"/auth/register"}>Register</Link>
            </li>
          </ul>
        )}

        {/* Mobile Screen */}
        {isRegistered && (
          <ul className="menu menu-horizontal px-1 sm:hidden block">
            <li className="mr-2">
              <details>
                <summary>More</summary>
                <ul className="bg-base-100 rounded-t-none">
                  <li>
                    <Link href={"/articles"}>Articles</Link>
                  </li>
                  <li>
                    <Link href={"/editor"}>Editor</Link>
                  </li>
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

        {/* Desktop Screen */}
        {isRegistered && (
          <ul className="menu menu-horizontal px-1 hidden sm:flex">
            <li>
              <Link href={"/articles"}>Articles</Link>
            </li>
            <li>
              <Link href={"/editor"}>Editor</Link>
            </li>
            <li>
              <Link href={"/profile"}>Profile</Link>
            </li>
            <li>
              <Link href={"/"}>Smth</Link>
            </li>
          </ul>
        )}
        <div>
          <ToggleMode />
        </div>
      </div>
    </nav>
  );
}