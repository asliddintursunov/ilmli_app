type Props = {
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  isPasswordValid: boolean | null;
};
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
function Password({ setUserData, isPasswordValid }: Props) {
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
            borderColor: isPasswordValid === false ? "red" : "",
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
      {isPasswordValid === false && (
        <span className="text-xs text-red-500">
          Password kamida bitta katta va kichik harf, raqam va belgi hamda 8-20
          ta belgidan iborat bo&#39;lishi kerak
        </span>
      )}
    </div>
  );
}

export default Password;
