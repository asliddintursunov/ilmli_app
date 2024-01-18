export default async function getRelatedArticles(category: string) {
  const API = "http://localhost:3000/api/getTrendingsByCategory";
  const res = await fetch(`${API}?category=${category}`);
  return res.json();
}
