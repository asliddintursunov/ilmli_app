export default async function fetchTrendingOnIlmli() {
  const API = "http://localhost:3000/api/getTrendings";
  const response = await fetch(API, {
    cache: "no-store",
  });
  return response.json();
}
