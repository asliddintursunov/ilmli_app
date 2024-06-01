import { Dispatch, SetStateAction } from "react";

type Props = {
  fullname: string | undefined;
  setFullname: Dispatch<SetStateAction<string | undefined>>;
  fishValidation: undefined | boolean;
};
export default function EditFullname({
  fullname,
  setFullname,
  fishValidation,
}: Props) {
  return (
    <div className="w-full">
      <label htmlFor="edit_fullname">F.I.SH</label>
      <input
        type="text"
        name="edit_fullname"
        id="edit_fullname"
        className="ilmli_input"
        placeholder="F.I.SH"
        value={fullname ? fullname : ""}
        onChange={(e) => setFullname(e.currentTarget.value)}
        style={{
          borderColor: fishValidation === false ? "red" : "",
        }}
      />
      {fishValidation === false && (
        <span className="text-xs text-red-500">
          F.I.Sh 40 tadan oshiq belgi qabul qila olmaydi
        </span>
      )}
    </div>
  );
}
