import { Dispatch, SetStateAction, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
type Props = {
  setOpenEditPassword: Dispatch<SetStateAction<boolean>>;
};
export default function EditPassword({ setOpenEditPassword }: Props) {
  const PasswordRegEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})/;
  const [showCurrentPassword, setShowCurrentPassword] =
    useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showReEnteredPassword, setShowReEnteredPassword] =
    useState<boolean>(false);
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-20 px-4">
      <form className="flex flex-col gap-4 pt-8 px-4 h-96 w-96 bg-white rounded-lg z-10">
        {/* {isPasswordValid === false && (
          <span className="text-xs text-red-500">
            Password kamida bitta katta va kichik harf, raqam va belgi hamda
            8-20 ta belgidan iborat bo&#39;lishi kerak
          </span>
        )} */}
        <div>
          <label htmlFor="edit_currentpassword">Hozirgi parol</label>
          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              name="edit_currentpassword"
              id="edit_currentpassword"
              className="ilmli_input"
              placeholder="Hozirgi parol"
              // style={{
              //   borderColor: PasswordRegEx.test() ? "red" : "",
              // }}
            />
            {showCurrentPassword && (
              <FaEyeSlash
                className="auth_fa_eye"
                onClick={() => setShowCurrentPassword(false)}
              />
            )}
            {!showCurrentPassword && (
              <FaEye
                className="auth_fa_eye"
                onClick={() => setShowCurrentPassword(true)}
              />
            )}
          </div>
        </div>
        <div>
          <label htmlFor="edit_newpassword">Yangi parol</label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              name="edit_newpassword"
              id="edit_newpassword"
              className="ilmli_input"
              placeholder="Yangi parol"
              // style={{
              //   borderColor: PasswordRegEx.test() ? "red" : "",
              // }}
            />
            {showNewPassword && (
              <FaEyeSlash
                className="auth_fa_eye"
                onClick={() => setShowNewPassword(false)}
              />
            )}
            {!showNewPassword && (
              <FaEye
                className="auth_fa_eye"
                onClick={() => setShowNewPassword(true)}
              />
            )}
          </div>
        </div>
        <div>
          <label htmlFor="edit_reenternewpassword">
            Yangi parolni tasdiqlash
          </label>
          <div className="relative">
            <input
              type={showReEnteredPassword ? "text" : "password"}
              name="edit_reenternewpassword"
              id="edit_reenternewpassword"
              className="ilmli_input"
              placeholder="Yangi parolni tasdiqlash"
              // style={{
              //   borderColor: PasswordRegEx.test() ? "red" : "",
              // }}
            />
            {showReEnteredPassword && (
              <FaEyeSlash
                className="auth_fa_eye"
                onClick={() => setShowReEnteredPassword(false)}
              />
            )}
            {!showReEnteredPassword && (
              <FaEye
                className="auth_fa_eye"
                onClick={() => setShowReEnteredPassword(true)}
              />
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button className="btn btn-neutral">
            O&#39;zgarishlarni saqlash
          </button>
          <button
            className="btn btn-active"
            onClick={() => setOpenEditPassword(false)}
          >
            Ortga
          </button>
        </div>
      </form>
      <button
        className="fixed top-0 left-0 w-full h-full z-0"
        onClick={() => setOpenEditPassword(false)}
      />
    </div>
  );
}
