"use client";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Button from "../components/Button";
import Password from "../components/Password";
import Username from "../components/Username";
import SocialAuth from "../components/SocialAuth";
import useAuthValidation from "@/hooks/useAuthValidation";
export default function Login() {
  const { regExpResult, validateInput } = useAuthValidation();
  const [userData, setUserData] = useState<UserData>({
    username: "",
    password: "",
  });

  const SendData = useCallback(() => {
    if (regExpResult.username && regExpResult.password) {
      console.log("Send to server", userData);
    } else {
      console.log("Not valid, do not send to server");
    }
  }, [regExpResult]);

  useEffect(() => {
    SendData();
  }, [SendData]);

  const handleSubmit = function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    validateInput(userData.username, userData.email!, userData.password);
  };
  return (
    <main
      className="max-w-[1440px] mx-auto px-2 grid place-content-center"
      style={{
        height: "calc(100vh - 4rem)",
      }}
    >
      <form action="" className="auth_form" onSubmit={handleSubmit}>
        <h1 className="text-3xl text-center">Have an account?</h1>
        <div className="flex flex-col gap-2 mt-4">
          <Username
            setUserData={setUserData}
            isUserNameValid={regExpResult.username}
          />
          <Password
            setUserData={setUserData}
            isPasswordValid={regExpResult.password}
          />
          <Button authType="signin" />
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-0.5 ">
              <input
                type="checkbox"
                id="remember"
                className="cursor-pointer checkbox checkbox-warning h-5 w-5 rounded-sm"
              />
              <label htmlFor="remember" className="cursor-pointer">
                Remember me
              </label>
            </div>
            <Link href="#" className="link link-primary">
              Forgot password?
            </Link>
          </div>
          <span className="text-center mt-1">-Or Sign In With-</span>
          <SocialAuth />
        </div>
      </form>
    </main>
  );
}
