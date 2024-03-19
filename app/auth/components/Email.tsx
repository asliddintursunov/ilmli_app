import { Dispatch, SetStateAction } from "react";
type Props = {
  email?: string;
  setEmail: Dispatch<SetStateAction<string | undefined>>;
  isEmailValid: boolean | null;
};

function Email({ setEmail, isEmailValid, email }: Props) {
  return (
    <div className="py-1 flex flex-col">
      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        className="auth_input"
        style={{
          borderColor: isEmailValid === false ? "red" : "",
        }}
        placeholder="example@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      {isEmailValid === false && (
        <span className="text-xs text-red-500">
          Emailingizni tekshiring, nimadir xato ketti!
        </span>
      )}
    </div>
  );
}

export default Email;
