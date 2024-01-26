import { useState } from "react";

type RegExpResult = {
  username: boolean | null;
  email: boolean | null;
  password: boolean | null;
};

const useRegExpValidation = () => {
  const [regExpResult, setRegExpResult] = useState<RegExpResult>({
    username: null,
    email: null,
    password: null,
  });

  const regExp = {
    username: /^[a-zA-Z0-9]+([_]?[a-zA-Z0-9])*$/,
    email:
      /^[a-zA-Z0-9]+([_]?[a-zA-Z0-9])*@[a-zA-Z0-9]+([_]?[a-zA-Z0-9])*(\.[a-zA-Z0-9]+([_]?[a-zA-Z0-9])*)+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})/,
  };

  const validateInput = (
    username: string,
    email: string | undefined,
    password: string
  ): void => {
    setRegExpResult((prev) => {
      return {
        ...prev,
        username: regExp.username.test(username),
        email: regExp.email.test(email!),
        password: regExp.password.test(password),
      };
    });
  };

  return {
    regExpResult,
    validateInput,
  };
};

export default useRegExpValidation;
