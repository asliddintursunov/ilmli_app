import { baseURL } from "@/utils";

export default async function fetchProtected(
  access_token: string | null
): Promise<{
  isOk: boolean | null;
  message?: string;
  error?: string;
  logged_in_as?: string;
}> {
  try {
    const res = await fetch(`${baseURL}/protected`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      method: "GET",
    });

    if (res.status !== 200) {
      localStorage.removeItem("access_token");
      const err = await res.json();
      return { isOk: false, error: err.error, message: err.message };
    }

    if (!res.headers.get("Content-Type")?.includes("application/json")) {
      throw new Error("Unexpected response format");
    }

    const data = await res.json();

    return { isOk: true, logged_in_as: data.logged_in_as };
  } catch (error: any) {
    localStorage.removeItem("access_token");
    return { isOk: false, message: error.message, error: error.error };
  }
}
