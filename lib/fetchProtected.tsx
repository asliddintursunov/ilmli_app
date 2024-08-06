import { baseURL } from "@/utils";
import { removeAccessToken } from "./actions";

export default async function fetchProtected(
  access_token: string | undefined
): Promise<{
  isOk: boolean | null;
  message?: string;
  error?: string;
  logged_in_as?: string;
}> {
  try {
    const request = await fetch(`${baseURL}/protected`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!request.ok) {
      removeAccessToken();
      const error = await request.json();
      return { isOk: false, error: error.error, message: error.message };
    }

    if (!request.headers.get("Content-Type")?.includes("application/json")) {
      throw new Error(
        `Unexpected request format. API request failed with status ${request.status} at fetchProtected`
      );
    }

    const response = await request.json();
    return { isOk: true, logged_in_as: response.logged_in_as };
  } catch (error: any) {
    removeAccessToken();
    return { isOk: false, message: error.message, error: error.error };
  }
}
