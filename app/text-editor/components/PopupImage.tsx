import useToast from "@/hooks/useToast";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type Props = {
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
};

export default function PopupImage({ image, setImage }: Props) {
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
    <div className="relative w-full h-80 bg-gray-100 flex justify-center items-center p-2 text-balance z-20">
      {image ? (
        <Image
          src={image}
          alt="Post Image"
          width={250}
          height={600}
          // sizes=""
          className="w-full h-full custom-980:w-[440px] custom-980:h-[170px] object-contain"
        />
      ) : (
        <div className="bg-gray-100">Rasm uchun joy</div>
      )}
      <input
        onChange={(file) => handleImageConvertToBase64(file)}
        type="file"
        className="absolute left-0 top-0 w-full h-full flex flex-col justify-start opacity-0 cursor-pointer"
      />
    </div>
  );
}
