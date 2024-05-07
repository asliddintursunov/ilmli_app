import { baseURL } from "@/utils";

export default async function fetchNewestArticles(category: string) {
  const params = new URLSearchParams();
  params.append("category", category);
  const API = `${baseURL}/recommended?${params.toString()}`;
  
  try {
    const res = await fetch(API, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.error("Error fetching related trendings:", error);
    return error
  }
}
