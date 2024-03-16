import { baseURL } from "@/utils";

export default async function fetchNewestArticles(
  category: string,
  offset: number
) {
  const API = `${baseURL}/newest/${category}`;
  try {
    const res = await fetch(API, {
      cache: "no-store",
    });

    return res.json();
  } catch (error) {
    console.error("Error fetching related articles:", error);
  }
}
