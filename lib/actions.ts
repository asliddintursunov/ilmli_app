"use server";

import { cookies } from "next/headers";

export async function setAccessToken(access_token: string) {
  cookies().set("access_token", access_token, {
    httpOnly: true,
    secure: false,
    maxAge: 60 * 60,
  });
}

export async function getAccessToken() {
  const access_token = cookies().get("access_token");
  return access_token;
}

export async function removeAccessToken() {
  cookies().delete("access_token");
}

export async function setUsernameCookie(username: string) {
  cookies().set("username", username, {
    maxAge: 60 * 60,
  });
}

export async function getUsernameCookie() {
  const username = cookies().get("username");
  return username;
}
