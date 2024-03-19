import { useState } from "react";

type RegExpResultType = {
  username: boolean | null;
  email: boolean | null;
  password: boolean | null;
};

const useRegExpValidation = () => {
  const [regExpResult, setRegExpResult] = useState<RegExpResultType>({
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
    username: string | undefined,
    email: string | undefined,
    password: string | undefined
  ): void => {
    if (email) {
      setRegExpResult((prev) => {
        return {
          ...prev,
          username: regExp.username.test(username!),
          email: regExp.email.test(email!),
          password: regExp.password.test(password!),
        };
      });
    } else {
      setRegExpResult((prev) => {
        return {
          ...prev,
          username: regExp.username.test(username!),
          email: true,
          password: regExp.password.test(password!),
        };
      });
    }
  };

  return {
    regExpResult,
    validateInput,
  };
};

export default useRegExpValidation;
