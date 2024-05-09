import { baseURL } from "@/utils";

export default async function fetchTrendingOnIlmli() {
  const API = `${baseURL}/gettrendings`;
  try {
    const response = await fetch(API, { cache: "no-store" });
    if(!response.ok){
      throw new Error("Error fetching trendings on Ilmli");
    }
    return response.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
}
