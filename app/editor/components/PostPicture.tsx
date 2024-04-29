import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type Props = {
  postImage: string;
  setPostImage: Dispatch<SetStateAction<string>>;
};

function PostPicture({ postImage, setPostImage }: Props) {
  const handleImageConvertToBase64 = function (event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        const base64String = reader.result;
        setPostImage(base64String);
      } else {
        alert("Unexpected file type. Only images supported.");
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <label className="min-h-44 flex flex-col justify-start relative cursor-pointer">
      {postImage ? (
        <Image
          src={postImage}
          alt="Post Image"
          width={0}
          height={0}
          sizes="100vw"
          className="absolute bottom-0 left-0 object-cover object-center w-full max-h-[148px] sm:min-h-36 border rounded-md"
        />
      ) : (
        <div className="absolute bottom-0 left-0 w-full min-h-44 sm:min-h-36 grid place-content-center input input-bordered bg-gray-100">
          Update image
        </div>
      )}
      <span className="text-2xl">Article picture</span>
      <input
        onChange={(file) => handleImageConvertToBase64(file)}
        type="file"
        // className="lg:w-96 md:w-80 w-64 min-w-full min-h-44 sm:min-h-36 flex flex-col justify-start opacity-0 cursor-pointer"
        className="w-full h-full flex flex-col justify-start opacity-0"
      />
    </label>
  );
}

export default PostPicture;
