import { baseURL } from "@/utils";

export default async function fetchNewestArticles(
  category: string,
  offset?: number
) {
  const params = new URLSearchParams();
  params.append("category", category);
  const API = `${baseURL}/newest?${params.toString()}`;
  try {
    const res = await fetch(API, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Error fetching related articles");
    }

    return res.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
}
