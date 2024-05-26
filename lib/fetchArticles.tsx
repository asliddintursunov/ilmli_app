import { baseURL } from "@/utils";

export default async function fetchArticles(offset: number) {
  const API = `${baseURL}/getarticles?offset=${offset}`;

  try {
    const response = await fetch(API, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(
        `API request failed with status ${response.status} at fetchArticles`
      );
    }
    return response.json();
  } catch (error: any) {
    console.error("Error fetching articles:", error);
    throw new Error(error.message); // Or display a user-friendly error message
  }
}
