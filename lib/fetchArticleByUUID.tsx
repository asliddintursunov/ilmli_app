import { baseURL } from "@/utils";

export async function fetchArticleByUUID(post_uuid: string) {
  const API = `${baseURL}/get-post?post_uuid=${post_uuid}`;

  try {
    const response = await fetch(API, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(
        `API request failed with status ${response.status} at fetchArticlesByUUID`
      );
    }
    return response.json();
  } catch (error: any) {
    console.error("Error fetching fetch articles by UUID:", error);
    throw new Error(error.message);
  }
}
