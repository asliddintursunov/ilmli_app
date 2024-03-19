import { Dispatch, SetStateAction } from "react";

type Props = {
  username: string | undefined;
  setUsername: Dispatch<SetStateAction<string | undefined>>;
  isUserNameValid: boolean | null;
};

function Username({ setUsername, isUserNameValid, username }: Props) {
  return (
    <div className="py-1 flex flex-col">
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        className="auth_input"
        style={{
          borderColor: isUserNameValid === false ? "red" : "",
        }}
        placeholder="User0046"
        value={username}
        onChange={(e) =>
          setUsername(e.target.value)
        }
        required
      />
      {isUserNameValid === false && (
        <span className="text-xs text-red-500">
          Username faqat harflar va raqamlar qabul qila oladi
        </span>
      )}
    </div>
  );
}

export default Username;
