import { baseURL } from "@/utils";

export default async function fetchNewestArticles(category: string) {
  const params = new URLSearchParams();
  params.append("category", category);
  const API = `${baseURL}/recommended?${params.toString()}`;
  
  try {
    const res = await fetch(API, {
      cache: "no-store",
    });
    if(!res.ok){
      throw new Error(
        `API request failed with status ${res.status} at fetchRecommendedArticles`
      );
    }
    return res.json();
  } catch (error: any) {
    console.error("Error fetching fetch recommended articles:", error);
    throw new Error(error.message)
  }
}
