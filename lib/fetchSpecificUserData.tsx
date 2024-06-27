import { baseURL } from "@/utils";
import { getAccessToken } from "./actions";

export default async function fetchSpecificUserData(username: string) {
  const API = `${baseURL}/user/${username}`;
  const access_token = await getAccessToken();
  try {
    const response = await fetch(API, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${access_token?.value}`,
      },
    });

    return await response.json();
  } catch (error: any) {
    console.error("Error fetching fetch specific user data", error);
    throw new Error(error.message);
  }
}
