import { Dispatch, SetStateAction } from "react";
type Props = {
  postTitle: string;
  setPostTitle: Dispatch<SetStateAction<string>>;
};

function Title({postTitle, setPostTitle}: Props) {
  return (
    <label className="flex flex-col items-start justify-start">
      <span className="text-2xl">Title</span>
      <input
        value={postTitle}
        onChange={(e) => setPostTitle(e.target.value)}
        type="text"
        placeholder="How to spend money correctly?"
        className="input input-bordered w-full"
      />
    </label>
  );
}

export default Title;
