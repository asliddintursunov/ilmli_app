import { baseURL } from "@/utils";

export default async function fetchSpecificUserData(username: string) {
  const API = `${baseURL}/user/${username}`;
  try {
    const response = await fetch(API);
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error fetching fetch specific user data", error);
    throw new Error(error.message);
  }
}
