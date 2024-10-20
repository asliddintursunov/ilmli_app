import { getUsernameCookie } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { FaRegPenToSquare } from "react-icons/fa6";
import { fetchSpecificUserData } from "@/lib/fetchFunctions";

export default async function ArticlesNavBar() {
  const username = await getUsernameCookie().then((r) => r?.value);
  var user_image: string = "";

  if (username) {
    user_image = await fetchSpecificUserData(username).then(
      (r) => r.user_profile_photo
    );
  }

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
        <SearchBar />
        <div className="flex items-center gap-10">
          <Link
            href={"/text-editor"}
            className="flex items-center gap-2 text-base text-gray-600 hover:text-black"
          >
            <FaRegPenToSquare className="text-base" />
            Hikoya yozish
          </Link>
          <Link
            href={`/@${username}/home`}
            className="h-10 w-10 rounded-full overflow-hidden border border-gray-300"
          >
            <Image
              height={40}
              width={40}
              src={user_image ?? "/images/avatar.png"}
              alt="profile photo"
              className="object-cover h-full w-full"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
