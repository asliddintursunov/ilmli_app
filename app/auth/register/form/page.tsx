"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "../../components/Button";
import Password from "../../components/Password";
import Username from "../../components/Username";
import Email from "../../components/Email";
import SocialAuth from "../../components/SocialAuth";
import useAuthValidation from "@/hooks/useAuthValidation";
import { useRouter } from "next/navigation";
import axios from "axios";
import { baseURL } from "@/utils";

export default function Register() {
  const router = useRouter();
  const { regExpResult, validateInput } = useAuthValidation();
  const [isChecked, setIsChecked] = useState<boolean | undefined>(undefined);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    const validationResult = new Set(Object.values(regExpResult));
    if (username && email && password) {
      if (validationResult.has(false)) return;
      axios
        .post(`${baseURL}/auth/register`, {
          username,
          email,
          password,
        })
        .then((res) => {
          alert(res.data);
          if (res.status === 201) router.push("/auth/register/interests");
        })
        .catch((err) => alert(err.response.data));
    }
  }, [regExpResult]);

  const handleSubmit = function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isChecked) {
      setIsChecked(false);
      return;
    }

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
        <div className="toast toast-top toast-end mt-16 z-10">
          <div className="alert alert-error">
            <span>Please agree to the terms and conditions.</span>
          </div>
        </div>
      )}
    </main>
  );
}
