"use server";

import { baseURL } from "@/utils";
import fetchArticles from "./fetchArticles";
import { cookies } from "next/headers";

export async function fetchServerActionArticles(offset: number) {
  const articles = await fetchArticles(offset);
  return articles["articles"];
}

export async function fetchNextTenArticles(username: string, offset: number) {
  try {
    const access_token = await getAccessToken().then((e) => e?.value)
    const response = await fetch(
      `${baseURL}/user/${username}/articles?offset=${offset}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error: any) {
    return error.message;
  }
}

export async function setAccessToken(access_token: string) {
  cookies().set("access_token", access_token, {
    httpOnly: true,
    secure: false,
    maxAge: 60 * 60
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
    maxAge: 60 * 60
  });
}

export async function getUsernameCookie() {
  const username = cookies().get("username");
  return username;
}
