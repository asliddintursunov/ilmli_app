import { Dispatch, SetStateAction } from "react";

type Props = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  validationResult: boolean | null;
};
export default function EditEmail({
  email,
  setEmail,
  validationResult,
}: Props) {
  return (
    <div className="w-full">
      <label htmlFor="edit_email">Email</label>
      <input
        type="email"
        name="edit_email"
        id="edit_email"
        className="auth_input"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
        style={{
          borderColor: validationResult === false ? "red" : "",
        }}
      />
      {validationResult === false && (
        <span className="text-xs text-red-500">
          Emailingizni tekshiring, nimadir xato ketti!
        </span>
      )}
    </div>
  );
}
