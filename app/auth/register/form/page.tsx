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

export default function Register() {
  const router = useRouter();
  const { regExpResult, validateInput } = useAuthValidation();
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
          <span className="text-center mt-1">-Or Sign Up With-</span>
          <SocialAuth />
        </div>
      </form>
    </main>
  );
}
