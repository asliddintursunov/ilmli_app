import Image from "next/image";

export default function EditProfilePicture() {
  return (
    <div className="">
      <Image
        width={150}
        height={150}
        alt="profile picture"
        src={"/images/avatar.png"}
        className="rounded-full border border-sky-900"
      />
    </div>
  );
}
