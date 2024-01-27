type Props = {
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  RegExp: boolean | null;
};
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
function Password({ setUserData, RegExp }: Props) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className="py-1 flex flex-col">
      <label htmlFor="password">Password</label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          className="auth_input pr-8"
          style={{
            borderColor: RegExp === false ? "red" : "",
          }}
          placeholder="Password01"
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, password: e.target.value }))
          }
          required
        />
        {!showPassword && (
          <FaEye
            className="auth_fa_eye"
            onClick={() => setShowPassword((prev) => !prev)}
          />
        )}
        {showPassword && (
          <FaEyeSlash
            className="auth_fa_eye"
            onClick={() => setShowPassword((prev) => !prev)}
          />
        )}
      </div>
      {RegExp === false && (
        <span className="text-xs text-red-500">
          Password must contain at least one capitalcase and lowercase letter,
          number and character and be 8 to 20 characters long
        </span>
      )}
    </div>
  );
}

export default Password;
