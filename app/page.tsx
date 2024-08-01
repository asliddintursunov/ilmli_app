import InfiniteScroll from "@/components/InfiniteScroll";
import Sidebar from "@/components/Sidebar";
import Trendings from "@/components/Trendings";
import HeaderContent from "@/components/HeaderContent";
import { getAccessToken } from "@/lib/actions";
import { baseURL } from "@/utils";

export const runtime = "edge";

export default async function Home() {
  // fetching first ten articles using server action function on home page
  const fetchFirstTenArticles = async (
    offset: number
  ): Promise<Article[] | null | undefined> => {
    "use server";

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
  };

  // fetching trending articles on home page
  const fetchTrendingArticles = async (): Promise<
    Article[] | null | undefined
  > => {
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
  };

  const [trendings, articles]: [
    Article[] | undefined | null,
    Article[] | undefined | null
  ] = await Promise.all([fetchTrendingArticles(), fetchFirstTenArticles(0)]);

  return (
    <>
      <main className="flex min-h-screen flex-col">
        <HeaderContent />
        <br />
        <br />
        <div className="flex flex-col gap-4 md:gap-6 max-w-[1440px] mx-auto">
          <Trendings trendings={trendings ? trendings : []} />
          <div className="flex flex-col-reverse md:flex-row  justify-start items-start gap-6 md:gap-16 relative border-t border-gray-200">
            <InfiniteScroll firstTenArticles={articles ? articles : []} />
            <Sidebar />
          </div>
        </div>
      </main>
    </>
  );
}
