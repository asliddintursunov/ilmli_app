import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import { MdErrorOutline } from "react-icons/md";
type Props = {
  postDescription: string;
  setPostDescription: Dispatch<SetStateAction<string>>;
};

function Description({ postDescription, setPostDescription }: Props) {
  return (
    <label className="relative flex flex-col items-start justify-start">
      <span className="text-2xl">Description</span>
      <input
        value={postDescription}
        onChange={(e) => setPostDescription(e.target.value)}
        type="text"
        placeholder="Mastering wise spending habits made easy."
        className="input input-bordered w-full"
      />
      <i
        className={clsx(
          "text-end w-full pr-2 text-gray-500",
          postDescription.length > 120 && "text-red-500"
        )}
      >
        {postDescription.length}/120
      </i>
      {postDescription.length > 120 && (
        <span className="absolute right-3 bottom-9 text-2xl bg-white pl-1 text-red-500">
          <MdErrorOutline />
        </span>
      )}
    </label>
  );
}

export default Description;
