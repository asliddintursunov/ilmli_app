"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Button from "../../components/Button";
import Password from "../../components/Password";
import Username from "../../components/Username";
import Email from "../../components/Email";
import SocialAuth from "../../components/SocialAuth";
import useAuthValidation from "@/hooks/useAuthValidation";
import { useRouter } from "next/navigation";
export default function Register() {
  const router = useRouter();
  const { regExpResult, validateInput } = useAuthValidation();
  const [isChecked, setIsChecked] = useState<boolean | undefined>(undefined);
  const [userData, setUserData] = useState<UserData>({
    username: "",
    email: "",
    password: "",
  });
  const SendData = useCallback(() => {
    if (regExpResult.username && regExpResult.email && regExpResult.password) {
      console.log("Send to server", userData);
      router.push("/auth/register/interests");
    } else {
      console.log("Not valid, do not send to server");
    }
  }, [regExpResult]);

  useEffect(() => {
    SendData();
  }, [SendData]);

  const handleSubmit = function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isChecked) {
      setIsChecked(false);
      return;
    }

    validateInput(userData.username, userData.email, userData.password);
  };
  return (
    <main
      className="grid place-content-center"
      style={{
        height: "calc(100vh - 4rem)",
      }}
    >
      <Link href={"/auth/register/interests"} className="btn btn-secondary mb-2">
        Interests
      </Link>
      <form action="" className="auth_form" onSubmit={handleSubmit}>
        <h1 className="text-3xl text-center">No account yet?</h1>
        <div className="flex flex-col gap-2 mt-4">
          <Username
            setUserData={setUserData}
            isUserNameValid={regExpResult.username}
          />
          <Email setUserData={setUserData} isEmailValid={regExpResult.email} />
          <Password
            setUserData={setUserData}
            isPasswordValid={regExpResult.password}
          />
          <Button authType="signup" />
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-0.5 ">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) =>
                  e.target.checked ? setIsChecked(true) : setIsChecked(false)
                }
                id="remember"
                className="cursor-pointer checkbox checkbox-warning h-5 w-5 rounded-sm"
              />
              <label htmlFor="remember" className="cursor-pointer">
                I agree to the{" "}
                <Link href="#" className="link link-primary">
                  terms and conditions
                </Link>
              </label>
            </div>
          </div>
          <span className="text-center mt-1">-Or Sign Up With-</span>
          <SocialAuth />
        </div>
      </form>
      {isChecked === false && (
        <div className="toast toast-top toast-end mt-16">
          <div className="alert alert-error">
            <span>Please agree to the terms and conditions.</span>
          </div>
        </div>
      )}
    </main>
  );
}
