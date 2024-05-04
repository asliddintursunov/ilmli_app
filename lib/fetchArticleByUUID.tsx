import { baseURL } from "@/utils";

export async function fetchArticleByUUID(post_uuid: string) {
    const API = `${baseURL}/get-post?post_uuid=${post_uuid}`;
    try {
        const response = await fetch(API, {
            cache: "no-store"
        })
        return response.json()
    } catch (error) {
        console.log("Error fetching articles", error);
    }
}