import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { AiOutlineUpload } from "react-icons/ai";

type Props = {
  profilePhoto: string;
  setProfilePhoto: Dispatch<SetStateAction<string>>;
};
export default function EditProfilePicture({
  profilePhoto,
  setProfilePhoto,
}: Props) {
  const [error, setError] = useState<boolean>(false);
  const handleImageConvertToBase64 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024);

      if (fileSizeInMB > 2) {
        setError(true);
        setProfilePhoto("");
        return;
      }
      setError(false);

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row items-center md:items-end gap-2 md:gap-0 space-x-4">
      <Image
        width={150}
        height={150}
        alt="profile picture"
        src={profilePhoto ? profilePhoto : "/images/avatar.png"}
        className="rounded-full border border-sky-900 object-contain object-center"
        style={{ maxHeight: "150px", maxWidth: "150px" }}
      />
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageConvertToBase64}
          className="absolute inset-0 w-full h-full opacity-0"
        />
        <button className="btn btn-sm btn-outline btn-primary sm:w-32 w-44">
          Rasm yuklash
        </button>
      </div>
      {error && (
        <p className="text-red-500">
          Rasm hajmi 2 MB dan katta bo&#39;lmasligi kerak.
        </p>
      )}
    </div>
  );
}
