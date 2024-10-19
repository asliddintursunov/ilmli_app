import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { FaRegPenToSquare } from "react-icons/fa6";

type Props = {
  setOpenPopup: Dispatch<SetStateAction<boolean>>;
  title: string;
  description: string;
};

export default function EditorNavbar({
  setOpenPopup,
  title,
  description,
}: Props) {
  const username = "asliddinA1";
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
          <button
            className={clsx(
              "px-3 py-1 text-sm bg-green-600 font-bold text-gray-200 hover:bg-green-700 rounded-full cursor-pointer transition-all",
              (!title || !description) && "btn-disabled bg-green-600/50"
            )}
            onClick={() => setOpenPopup((prev) => !prev)}
          >
            Chop etish
          </button>
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
