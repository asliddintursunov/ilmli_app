import { baseURL } from "@/utils";

export default async function fetchArticles(offset: number) {
  const API = `${baseURL}/getarticles?offset=${offset}`;
  
  try {
    const response = await fetch(API, {
      cache: "no-store",
    });
    return response.json();
  } catch (error) {
    console.log("Error fetching articles", error);
  }
}
