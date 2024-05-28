import { baseURL } from "@/utils";

export default async function fetchSpecificUserArticles(
  username: string,
  offset: number
) {
  const API = `${baseURL}/user/${username}/articles?offset=${offset}`;
  try {
    const response = await fetch(API, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(
        `User with ${username} not exists!.API request failed with status ${response.status} at fetchSpecificUserArticles`
      );
    }
    return response.json();
  } catch (error: any) {
    console.error("Error fetching fetch user data:", error);
    throw new Error(error.message);
  }
}
