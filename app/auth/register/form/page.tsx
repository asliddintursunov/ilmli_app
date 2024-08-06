/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Password from "../../components/Password";
import Username from "../../components/Username";
import Email from "../../components/Email";
import SocialAuth from "../../components/SocialAuth";
import useAuthValidation from "@/hooks/useAuthValidation";
import { useRouter } from "next/navigation";
import axios from "axios";
import { baseURL } from "@/utils";
import { getNewRegisteredUsername } from "@/redux/slices/getNewRegisteredUserUsernameSlice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import Toast from "@/components/Toast";
import useToast from "@/hooks/useToast";
import { Auth } from "@/lib/AuthFunction";

export default function Register() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();
  const { regExpResult, validateInput } = useAuthValidation();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    (async () => {
      const validationResult = new Set(Object.values(regExpResult));
      if (username && email && password) {
        if (validationResult.has(false)) return;
        const result = await Auth(username, email, password, "register");

        if (result.success) {
          toast.handleToast(true, result.response.message, "alert-success");
          dispatch(getNewRegisteredUsername(username));
          await new Promise((resolve) => setTimeout(resolve, 1000));
          router.push("/auth/register/interests");
        } else {
          toast.handleToast(true, result.error.message, "alert-error");
        }
      }
    })();
  }, [regExpResult]);

  const handleSubmit = function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    validateInput(username, email, password);
  };
  return (
    <main className="grid place-content-center">
      <form action="POST" className="auth_form" onSubmit={handleSubmit}>
        <h1 className="text-3xl text-center">No account yet?</h1>
        <div className="flex flex-col gap-2 mt-4">
          <Username
            username={username}
            setUsername={setUsername}
            isUserNameValid={regExpResult.username}
          />
          <Email
            email={email}
            setEmail={setEmail}
            isEmailValid={regExpResult.email}
          />
          <Password
            password={password}
            setPassword={setPassword}
            isPasswordValid={regExpResult.password}
          />
          <Button authType="signup" />
          {/* <span className="text-center mt-1">-Or Sign Up With-</span>
          <SocialAuth /> */}
        </div>
      </form>
      {toast.showToast && (
        <Toast toastType={toast.toastType} toastInfo={toast.toastInfo} />
      )}
    </main>
  );
}
