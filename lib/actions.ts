"use server";

import fetchArticles from "./fetchArticles";

export async function fetchServerActionArticles(offset: number) {
  const articles = await fetchArticles(offset);
  return articles["articles"];
}
