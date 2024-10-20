import HomePagePosts from "./components/HomePagePosts";
import { fetchSpecificUserArticles } from "@/lib/fetchFunctions";

export default async function UsernameHomePage({
  params,
}: {
  params: { username: string };
}) {
  const username = params.username.replaceAll("%40", "");

  const userPosts: SpecificUserArticle[] = await fetchSpecificUserArticles(
    username,
    0
  );
  const userHasAtLeastOneArticle: boolean = userPosts.length > 0 ? true : false;

  return (
    <div className="flex flex-col gap-4 justify-start items-start">
      <HomePagePosts
        username={username}
        firstTenUserPosts={userPosts}
        userHasAtLeastOneArticle={userHasAtLeastOneArticle}
      />
    </div>
  );
}
