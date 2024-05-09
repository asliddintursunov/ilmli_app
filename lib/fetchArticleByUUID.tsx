import { baseURL } from "@/utils";

export async function fetchArticleByUUID(post_uuid: string) {
  const API = `${baseURL}/get-post?post_uuid=${post_uuid}`;
  try {
    const response = await fetch(API, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Error fetching articles");
    }
    return response.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
}
