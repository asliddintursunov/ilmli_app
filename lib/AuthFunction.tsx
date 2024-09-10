import { baseURL } from "@/utils";

export async function Auth(
  username: string,
  email: string | undefined,
  password: string,
  type: "register" | "login"
) {
  const API =
    type === "register"
      ? `${baseURL}/auth/register`
      : type === "login"
      ? `${baseURL}/auth/login`
      : "";

  const body = JSON.stringify({
    username: username,
    email: email,
    password: password,
  });

  try {
    const request = await fetch(API, {
      method: "POST",
      body: body,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!request.ok) {
      const error = await request.json();
      return {
        error,
        success: false,
      };
    }

    const response = await request.json();
    return {
      response,
      success: true,
    };
  } catch (error: any) {
    return {
      error,
      success: false,
    };
  }
}
