import HomePagePosts from "./components/HomePagePosts";
import { getAccessToken } from "@/lib/actions";
import { baseURL } from "@/utils";

export default async function UsernameHomePage({
  params,
}: {
  params: { username: string };
}) {
  const username = params.username.replaceAll("%40", "");

  const fetchSpecificUserArticles = async function (
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
  };

  const userPosts: SpecificUserArticle[] = await fetchSpecificUserArticles(
    username,
    0
  );

  return (
    <div className="flex flex-col gap-4 justify-start items-start">
      <HomePagePosts username={username} firstTenUserPosts={userPosts} />
    </div>
  );
}
