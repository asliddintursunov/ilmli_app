import { baseURL } from "@/utils";

export default async function fetchArticles(offset: number) {
  const API = `${baseURL}/getarticles?offset=${offset}`;

  try {
    const response = await fetch(API, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Error fetching articles");
    }
    return response.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
}
