export default async function getTrendingOnIlmli() {
  const URL = "http://localhost:3000/api/getTrendingArticles";
  const response = await fetch(URL, { cache: "no-store" });
  return response.json();
}
