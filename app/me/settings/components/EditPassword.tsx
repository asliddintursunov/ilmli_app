import { Dispatch, SetStateAction } from "react";

type Props = {
  setOpenEditPassword: Dispatch<SetStateAction<boolean>>;
};
export default function EditPassword({ setOpenEditPassword }: Props) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-20">
      <div className="h-96 w-96 bg-white rounded-lg z-10"></div>
      <button
        className="fixed top-0 left-0 w-full h-full z-0"
        onClick={() => setOpenEditPassword((prev) => !prev)}
      />
    </div>
  );
}
