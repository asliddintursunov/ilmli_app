export default async function fetchRelatedTrendings(category: string) {
  const API = `http://localhost:3000/api/getRelatedTrendings?category=${category}`;
  const res = await fetch(API, {
    cache: "no-store",
  });
  return res.json();
}
