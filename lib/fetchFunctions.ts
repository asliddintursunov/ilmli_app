"use server";

import { baseURL } from "@/utils";
import { getAccessToken } from "./actions";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export async function fetchFirstTenArticles(
  offset: number
): Promise<Article[] | null | undefined> {
  const access_token = await getAccessToken();
  const API = access_token
    ? `${baseURL}/get-interested-articles?offset=${offset}`
    : `${baseURL}/get-articles?offset=${offset}`;

  try {
    const request = await fetch(API, {
      method: "GET",
      cache: "no-store",
      headers: access_token
        ? {
            Authorization: `Bearer ${access_token.value}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          }
        : undefined,
    });

    if (!request.ok) {
      const error = await request.json();
      throw new Error(
        ` request failed => statsu ${request.status} \n message => ${error.message} \n where => fetching trending articles`
      );
    }
    const response = await request.json();

    return response.articles;
  } catch (error: any) {
    throw new Error(
      ` error => error fetching first ten articles \n message => ${error.message}`
    );
  }
}

export async function fetchTrendingArticles(): Promise<
  Article[] | null | undefined
> {
  try {
    const request = await fetch(`${baseURL}/get-trendings`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!request.ok) {
      const error = await request.json();
      throw new Error(
        ` request failed => statsu ${request.status} \n message => ${error.message} \n where => fetching trending articles`
      );
    }

    const response = await request.json();
    return response.articles;
  } catch (error: any) {
    throw new Error(
      ` error => error fetching trending articles \n message => ${error.message}`
    );
  }
}

// this function fetches newest and recommended articles based on tag user entered
export async function fetchNRarticles(
  article_cateory: string,
  type: "recommended" | "newest"
): Promise<Article[]> {
  const access_token = await getAccessToken();
  const params = new URLSearchParams();
  params.append("category", article_cateory);
  try {
    var API = undefined;
    type === "recommended"
      ? (API = `${baseURL}/recommended?${params.toString()}`)
      : (API = `${baseURL}/newest?${params.toString()}`);
    const request = await fetch(API, {
      method: "GET",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${access_token?.value}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!request.ok) {
      const error = await request.json();
      throw new Error(error.message);
    }
    const response = await request.json();
    return response.articles;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function fetchArticleByUUID(uuid: string): Promise<Article> {
  const access_token = await getAccessToken();
  const params = new URLSearchParams();
  params.append("post_uuid", uuid);

  try {
    const request = await fetch(
      `${baseURL}/get-article-uuid?${params.toString()}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${access_token?.value}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    if (!request.ok) {
      const error = await request.json();
      throw new Error(error.message);
    }
    const response = await request.json();
    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function fetchSpecificUserData(username: string) {
  const access_token = await getAccessToken();
  try {
    const request = await fetch(`${baseURL}/user/${username}`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${access_token?.value}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!request.ok) {
      const error = await request.json();
      console.error("error =>", error);

      throw new Error(`
          ${username} not exists.
          status code: ${request.status}
          message: ${error.message}
        `);
    }

    const response = await request.json();
    return response.user_data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function fetchSpecificUserArticles(
  username: string,
  offset: number
) {
  const access_token = await getAccessToken();
  try {
    const request = await fetch(
      `${baseURL}/user/${username}/articles?offset=${offset}`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${access_token?.value}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (!request.ok) {
      const error = await request.json();
      throw new Error(`
          ${username} not exists.
          status code: ${request.status}
          message: ${error.message}
        `);
    }

    const response = await request.json();
    return response.user_posts;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function fetchNext10Articles(
  username: string | undefined,
  offset: number,
  from: "userhomepage" | "mainhomepage"
) {
  const access_token = await getAccessToken();
  let API: string = "";
  if (from === "mainhomepage") {
    API = access_token
      ? `${baseURL}/get-interested-articles?offset=${offset}`
      : `${baseURL}/get-articles?offset=${offset}`;
  } else if (from === "userhomepage") {
    API = `${baseURL}/user/${username}/articles?offset=${offset}`;
  }

  try {
    const request = await fetch(API, {
      method: "GET",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${access_token?.value}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!request.ok) {
      const error = await request.json();
      return error;
    }
    const response = await request.json();
    return response;
  } catch (error: any) {
    return error;
  }
}

export const getUserInterests = async (): Promise<string[]> => {
  const access_token: RequestCookie | undefined = await getAccessToken();
  if (!access_token) return [];
  try {
    const request = await fetch(`${baseURL}/user-interests`, {
      cache: "no-store",
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token.value}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!request.ok) {
      const error = await request.json();
      throw new Error(`
        Foydalanuvchi qiziqishlarini olishda xatolik.
        status code: ${request.status}
        message: ${error.message}
      `);
    }
    const response = await request.json();
    return response.interests;
  } catch (error) {
    throw new Error("Foydalanuvchi qiziqishlarini olishda xatolik.");
  }
};

export const getArticlesByCategory = async (
  category: string,
  offset: number
) => {
  if (!category) return;
  const params = new URLSearchParams();
  params.append("search", category);
  params.append("offset", String(offset));

  const access_token = await getAccessToken().then((r) => r?.value);
  try {
    const request = await fetch(
      `${baseURL}/articles-by-category?${params.toString()}`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (!request.ok) {
      const error = await request.json();
      throw new Error(`
          article with category ${category} not found.
          status code: ${request.status}
          message: ${error.message}
        `);
    }

    const response = await request.json();
    return response.articles;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getForYouArticles = async () => {
  const access_token = await getAccessToken().then((r) => r?.value)
  try {
    const request = await fetch(`${baseURL}/for-you`, {
      cache: "no-store",
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!request.ok) {
      const error = await request.json();
      throw new Error(`
        For-You article larni olishda xatolik.
        status code: ${request.status}
        message: ${error.message}
      `);
    }
    const response = await request.json();
    return response.articles;
  } catch (error) {
    throw new Error("For-You article larni olishda xatolik.");
  }
}