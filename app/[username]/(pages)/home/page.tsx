import fetchUserData from "@/lib/fetchUserData";
export default async function UsernameHomePage({
  params,
}: {
  params: { username: string };
}) {
  const username = params.username.replaceAll("%40", "");
  const userData: UserDataType = await fetchUserData(username);
  return (
    <div>
      <h1 className="text-4xl pb-4 border-b-2 border-b-gray-700">
        Home page content
      </h1>
      <div className="flex flex-col gap-4 justify-start items-start">
        <span>username: {userData.user_name}</span>
        <span>email: {userData.user_email}</span>
        {userData.user_interests && (
          <ul>
            Interests:
            {userData.user_interests.map((el, index) => (
              <li key={index}>{el}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
