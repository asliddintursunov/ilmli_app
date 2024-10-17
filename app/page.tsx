import InfiniteScroll from "@/components/InfiniteScroll";
import Sidebar from "@/components/Sidebar";
import Trendings from "@/components/Trendings";
import HeaderContent from "@/components/HeaderContent";
import {
  fetchFirstTenArticles,
  fetchTrendingArticles,
} from "@/lib/fetchFunctions";
import { getAccessToken } from "@/lib/actions";
import { baseURL } from "@/utils";
import HeaderSlider from "@/components/HeaderSlider";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const runtime = "edge";

export default async function Home() {
  const getUserInterests = async (): Promise<string[]> => {
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

  const userInterests: string[] = await getUserInterests();

  const [trendings, articles]: [
    Article[] | undefined | null,
    Article[] | undefined | null
  ] = await Promise.all([fetchTrendingArticles(), fetchFirstTenArticles(0)]);

  return (
    <>
      <main className="flex min-h-screen flex-col">
        <HeaderContent />
        {userInterests.length && <HeaderSlider topics={userInterests} />}
        <div className="flex flex-col gap-4 md:gap-6 max-w-[1440px] mx-auto">
          <br />
          <br />
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
