import { getAccessToken } from "@/lib/actions";
import { baseURL } from "@/utils";
import clsx from "clsx";
import { Dispatch, SetStateAction, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Toast from "@/components/Toast";
import useToast from "@/hooks/useToast";

type Props = {
  setOpenEditPassword: Dispatch<SetStateAction<boolean>>;
};
export default function EditPassword({ setOpenEditPassword }: Props) {
  const toast = useToast();

  const PasswordRegEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})/;
  const [showCurrentPassword, setShowCurrentPassword] =
    useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showReEnteredPassword, setShowReEnteredPassword] =
    useState<boolean>(false);

  const [firstInput, setFirstInput] = useState("");
  const [secondInput, setSecondInput] = useState("");
  const [thirdInput, setThirdInput] = useState("");
  const [isInputValuesValid, setIsInputValuesValid] = useState({
    first: true,
    second: true,
    third: true,
  });

  const changePassword = async () => {
    const newIsInputValuesValid = {
      first: PasswordRegEx.test(firstInput),
      second: PasswordRegEx.test(secondInput),
      third: PasswordRegEx.test(thirdInput),
    };

    setIsInputValuesValid(newIsInputValuesValid);

    if (Object.values(newIsInputValuesValid).includes(false)) return;

    try {
      const access_token = await getAccessToken().then((r) => r?.value);
      if (access_token) {
        const request = await fetch(`${baseURL}/update-password`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            new_password: secondInput,
            old_password: firstInput,
          }),
        });
        if (!request.ok) {
          const error = await request.json();
          toast.handleToast(true, error.message, "alert-error");
          throw new Error(error.message);
        }
        const response = await request.json();
        toast.handleToast(true, response.message, "alert-success");
      }
    } catch (error: any) {
      toast.handleToast(true, error.message, "alert-error");
      throw new Error(error.message);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-20 px-4">
        <form className="flex flex-col gap-4 pt-8 pb-10 px-4 min-h-96 w-96 bg-white rounded-lg z-10">
          <span
            className={clsx(
              "text-xs text-red-500",
              Object.values(isInputValuesValid).includes(false)
                ? "opacity-100"
                : "opacity-0"
            )}
          >
            Password kamida bitta katta va kichik harf, raqam va belgi hamda
            8-20 ta belgidan iborat bo&#39;lishi kerak
          </span>
          <div>
            <label htmlFor="edit_currentpassword">Hozirgi parol</label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                name="edit_currentpassword"
                id="edit_currentpassword"
                className="ilmli_input"
                placeholder="Hozirgi parol"
                value={firstInput}
                onChange={(e) => setFirstInput(e.currentTarget.value)}
                style={{
                  borderColor: !isInputValuesValid.first ? "red" : "",
                }}
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
                value={secondInput}
                onChange={(e) => setSecondInput(e.currentTarget.value)}
                style={{
                  borderColor: !isInputValuesValid.second ? "red" : "",
                }}
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
                value={thirdInput}
                onChange={(e) => setThirdInput(e.currentTarget.value)}
                style={{
                  borderColor: !isInputValuesValid.third ? "red" : "",
                }}
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
            <button
              className="btn btn-neutral"
              type="button"
              onClick={() => changePassword()}
            >
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
      {toast.showToast && (
        <Toast toastType={toast.toastType} toastInfo={toast.toastInfo} />
      )}
    </>
  );
}
