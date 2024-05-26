import { baseURL } from "@/utils";

export default async function fetchTrendingOnIlmli() {
  const API = `${baseURL}/gettrendings`;
  try {
    const response = await fetch(API, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(
        `API request failed with status ${response.status} at fetchTrendingsOnIlmli`
      );
    }
    return response.json();
  } catch (error: any) {
    console.error("Error fetching fetch trendings on ilmli:", error);
    throw new Error(error.message);
  }
}
