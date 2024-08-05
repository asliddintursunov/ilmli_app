import useToast from "@/hooks/useToast";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type Props = {
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
};

export default function MainImage({ image, setImage }: Props) {
  const toast = useToast();
  const handleImageConvertToBase64 = function (event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        const base64String = reader.result;
        setImage(base64String);
      } else
        toast.handleToast(
          true,
          "Unexpected file type. Only images supported.",
          "alert-warning"
        );
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative min-w-full md:min-w-72 min-h-40">
      {image ? (
        <Image
          src={image}
          alt="Post Image"
          width={0}
          height={0}
          sizes="100vw"
          className="md:w-72 w-full max-h-40 object-cover object-center border rounded-md"
        />
      ) : (
        <div className="md:w-72 w-full min-h-40 grid place-content-center input input-bordered bg-gray-100">
          Update image
        </div>
      )}
      <input
        onChange={(file) => handleImageConvertToBase64(file)}
        type="file"
        className="absolute left-0 top-0 w-full h-full flex flex-col justify-start opacity-0 cursor-pointer"
      />
    </div>
  );
}
