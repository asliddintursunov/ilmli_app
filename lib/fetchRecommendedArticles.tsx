import { baseURL } from "@/utils";

export default async function fetchNewestArticles(category: string) {
  const API = `${baseURL}/recommended/${category}`;
  try {
    const res = await fetch(API, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.error("Error fetching related trendings:", error);
  }
}
