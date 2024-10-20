import { fetchSpecificUserData } from "@/lib/fetchFunctions";

export default async function UsernameAboutPage({
  params,
}: {
  params: { username: string };
}) {
  const username = params.username.replaceAll("%40", "");
  const bio: string | null = await fetchSpecificUserData(username).then(
    (r) => r.user_bio
  );

  console.log("bio =>", bio);

  return (
    <div className="mt-10">
      <h1 className="text-2xl text-balance font-serif">{bio}</h1>
    </div>
  );
}
