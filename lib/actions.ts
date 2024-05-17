"use server";

import { baseURL } from "@/utils";
import fetchArticles from "./fetchArticles";

export async function fetchServerActionArticles(offset: number) {
  const articles = await fetchArticles(offset);
  return articles["articles"];
}

export async function fetchNextTenArticles(username: string, offset: number) {
  try {
    const response = await fetch(
      `${baseURL}/user/${username}?offset=${offset}`
    );
    const data = await response.json();
    return data;
  } catch (error: any) {
    return error.message;
  }
};