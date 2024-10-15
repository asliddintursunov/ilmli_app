import Link from "next/link";
import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { MdOutlineFindInPage } from "react-icons/md";
const RelatedArticleNotFound = ({ topic }: { topic: string }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-red-500 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <MdOutlineFindInPage className="text-red-600 text-2xl" />
          </svg>
          <h2 className="text-lg font-semibold">
            {topic} mavzusidagi hikoya topilmadi
          </h2>
        </div>
        <p className="text-gray-600 mb-4">
          Biz siz izlayotkan mavzudagi hikoyani topa olmadik. Iltimos siz
          birinchi bo&#39;lib bunday hokiya yozing, yokida boshqa hikoya izlang.
        </p>
      </div>
      <div className="mt-6">
        <Link
          href="/"
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow transition duration-300"
        >
          Bosh sahifaga qaytish
        </Link>
      </div>
    </div>
  );
};

export default RelatedArticleNotFound;
