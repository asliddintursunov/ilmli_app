import { Dispatch, SetStateAction } from "react";
type Props = {
  postDescription: string;
  setPostDescription: Dispatch<SetStateAction<string>>
};

function Description({postDescription, setPostDescription}: Props) {
  return (
    <label className="flex flex-col items-start justify-start">
      <span className="text-2xl">Description</span>
      <input
        value={postDescription}
        onChange={(e) => setPostDescription(e.target.value)}
        type="text"
        placeholder="Mastering wise spending habits made easy."
        className="input input-bordered w-full"
      />
    </label>
  );
}

export default Description;
