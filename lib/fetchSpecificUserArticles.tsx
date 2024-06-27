import { baseURL } from "@/utils";
import { getAccessToken } from "./actions";

export default async function fetchSpecificUserArticles(
  username: string,
  offset: number
) {
  const access_token = await getAccessToken();
  const API = `${baseURL}/user/${username}/articles?offset=${offset}`;

  try {
    const response = await fetch(API, {
      cache: "no-store",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token?.value}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `User with ${username} not exists!. API request failed with status ${response.status} at fetchSpecificUserArticles`
      );
    }

    return await response.json()
  } catch (error: any) {
    console.error("Error fetching fetch user data:", error);
    throw new Error(error.message);
  }
}
