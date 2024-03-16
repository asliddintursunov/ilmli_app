import { baseURL } from "@/utils";

export default async function fetchTrendingOnIlmli() {
  const API = `${baseURL}/gettrendings`;
  try {
    const response = await fetch(API, { cache: "no-store" });
    return response.json();
  } catch (error: any) {
    console.error("Error fetching trendings on Ilmli:", error.message);
  }
}
