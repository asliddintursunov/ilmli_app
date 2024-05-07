import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import { MdErrorOutline } from "react-icons/md";

type Props = {
  postTitle: string;
  setPostTitle: Dispatch<SetStateAction<string>>;
};

function Title({ postTitle, setPostTitle }: Props) {
  return (
    <label className="relative flex flex-col items-start justify-start">
      <span className="text-2xl">Title</span>
      <input
        value={postTitle}
        onChange={(e) => setPostTitle(e.target.value)}
        type="text"
        placeholder="How to spend money correctly?"
        className={"input input-bordered w-full"}
      />
      <i className={clsx("text-end w-full pr-2 text-gray-500", postTitle.length > 120 && "text-red-500")}>
        {postTitle.length}/120
      </i>
      {postTitle.length > 120 && (
        <span className="absolute right-3 bottom-9 text-2xl bg-white pl-1 text-red-500">
          <MdErrorOutline />
        </span>
      )}
    </label>
  );
}

export default Title;
