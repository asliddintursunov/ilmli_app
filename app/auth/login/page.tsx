"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Button from "../components/Button";
import Password from "../components/Password";
import Username from "../components/Username";
import SocialAuth from "../components/SocialAuth";
import useAuthValidation from "@/hooks/useAuthValidation";
import { baseURL } from "@/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setAccessToken, setUsernameCookie } from "@/lib/actions";
import Toast from "@/components/Toast";
import useToast from "@/hooks/useToast";

export default function Login() {
  const router = useRouter();
  const toast = useToast();
  const { regExpResult, validateInput } = useAuthValidation();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    const handleLogin = async () => {
      const validationResult = new Set(Object.values(regExpResult));
      if (username && password) {
        if (validationResult.has(false)) return;
        try {
          const res = await axios.post(`${baseURL}/auth/login`, {
            username,
            password,
          });
          await setUsernameCookie(username);
          await setAccessToken(res.data.tokens.access_token);
          router.push("/");
        } catch (err: any) {
          toast.handleToast(true, err.response.data, "alert-error");
        }
      }
    };

    handleLogin();
  }, [regExpResult]);


  const handleSubmit = function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    validateInput(username, undefined, password);
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
            username={username}
            setUsername={setUsername}
            isUserNameValid={regExpResult.username}
          />
          <Password
            password={password}
            setPassword={setPassword}
            isPasswordValid={regExpResult.password}
          />
          <Button authType="signin" />
          {/* <div className="flex items-center justify-end mt-1">
            <Link href="#" className="link link-primary">
              Forgot password?
            </Link>
          </div>
          <span className="text-center mt-1">-Or Sign In With-</span>
          <SocialAuth /> */}
        </div>
      </form>
      {toast.showToast && (
        <Toast toastType={toast.toastType} toastInfo={toast.toastInfo} />
      )}
    </main>
  );
}
