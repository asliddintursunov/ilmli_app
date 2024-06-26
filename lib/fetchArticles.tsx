import { baseURL } from "@/utils";
import { getAccessToken } from "./actions";

export default async function fetchArticles(offset: number) {
  const access_token = await getAccessToken();
  const API = access_token
    ? `${baseURL}/get-interested-articles?offset=${offset}`
    : `${baseURL}/getarticles?offset=${offset}`;


  try {
    const response = await fetch(API, {
      cache: "no-store",
      headers: access_token
        ? {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token.value}`,
          }
        : undefined,
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(
        `API request failed with status ${response.status} at fetchArticles`
      );
    }
    return response.json();
  } catch (error: any) {
    console.error("Error fetching articles:", error.message);
    throw new Error(error.message);
  }
}
