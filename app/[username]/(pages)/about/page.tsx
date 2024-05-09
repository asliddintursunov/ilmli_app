export default async function UsernameAboutPage({
  params,
}: {
  params: { username: string };
}) {
  const username = params.username.replaceAll("%40", "");
  console.log("about username:::", username);

  return (
    <div>
      <h1 className="text-4xl">About page content</h1>
    </div>
  );
}
