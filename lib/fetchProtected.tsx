import { baseURL } from "@/utils";

export default async function fetchProtected(access_token: string | null) {
  try {
    const res = await fetch(`${baseURL}/protected`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (res.status == 200) return true;
    localStorage.removeItem("access_token");
    return false;
  } catch (error) {
    localStorage.removeItem("access_token");
    return false;
  }
}
