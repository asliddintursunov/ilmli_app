import Toast from "@/components/Toast";
import useToast from "@/hooks/useToast";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type Props = {
  postImage: string;
  setPostImage: Dispatch<SetStateAction<string>>;
};

function PostPicture({ postImage, setPostImage }: Props) {
  const toast = useToast();
  const handleImageConvertToBase64 = function (event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        const base64String = reader.result;
        setPostImage(base64String);
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
    <>
      <label className="min-h-44 flex flex-col justify-start relative cursor-pointer">
        {postImage ? (
          <Image
            src={postImage}
            alt="Post Image"
            width={0}
            height={0}
            sizes="100vw"
            className="absolute -bottom-2 left-0 object-cover object-center w-full max-h-36 sm:min-h-[154px] border rounded-md"
          />
        ) : (
          <div className="absolute sm:-bottom-2 bottom-0 left-0 w-full min-h-36 sm:min-h-[154px] grid place-content-center input input-bordered bg-gray-100">
            Update image
          </div>
        )}
        <span className="text-2xl">Article picture</span>
        <input
          onChange={(file) => handleImageConvertToBase64(file)}
          type="file"
          className="w-full h-full flex flex-col justify-start opacity-0"
        />
      </label>
      {toast.showToast && (
        <Toast toastInfo={toast.toastInfo} toastType={toast.toastType} />
      )}
    </>
  );
}

export default PostPicture;
