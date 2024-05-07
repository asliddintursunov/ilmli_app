import Link from "next/link";
import { CiFaceFrown } from "react-icons/ci";
import { FaRegHandPointRight } from "react-icons/fa";
function NotFound() {
  return (
    <div className="w-screen h-screen grid place-content-center">
      <div className="flex justify-center items-center text-yellow-500 font-bold gap-4">
        <h1 className="text-4xl">Page not found</h1>
        <span className="text-5xl">
          <CiFaceFrown />
        </span>
      </div>
      <div className="flex items-center justify-start gap-4">
        <span className="text-3xl link-primary">
          <FaRegHandPointRight />
        </span>
        <Link href={"/"} className="underline link link-primary text-2xl">
          Go to home page
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
