import { Dispatch, SetStateAction } from "react";

type Props = {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  validationResult: boolean | null;
};
export default function EditUsername({
  username,
  setUsername,
  validationResult,
}: Props) {
  return (
    <div className="w-full">
      <label htmlFor="edit_username">Foydalanuvchi nomi</label>
      <input
        type="text"
        name="edit_username"
        id="edit_username"
        className="ilmli_input"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        style={{
          borderColor: validationResult === false ? "red" : "",
        }}
      />
      {validationResult === false && (
        <span className="text-xs text-red-500">
          Username faqat harflar va raqamlar qabul qila oladi
        </span>
      )}
    </div>
  );
}
