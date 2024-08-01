import { Dispatch, SetStateAction } from "react";

type Props = {
  bio: string;
  setBio: Dispatch<SetStateAction<string>>;
  bioValidation: boolean;
};
export default function EditBio({ bio, setBio, bioValidation }: Props) {
  return (
    <div className="w-full">
      <label htmlFor="edit_bio">Bio</label>
      <textarea
        name="edit_bio"
        id="edit_bio"
        className="ilmli_input min-h-40 max-h-80"
        placeholder="bio"
        value={bio}
        onChange={(e) => setBio(e.currentTarget.value)}
        style={{
          borderColor: bioValidation === false ? "red" : "",
        }}
      />
      {bioValidation === false && (
        <span className="text-xs text-red-500">
          Bio 250 tadan oshiq belgi qabul qila olmaydi
        </span>
      )}
    </div>
  );
}
