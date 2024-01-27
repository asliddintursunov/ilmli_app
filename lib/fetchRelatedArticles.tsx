export default async function fetchRelatedArticles(
  category: string,
  offset: number
) {
  const API = `http://localhost:3000/api/getRelatedArticles?offset=${offset}&category=${category}`;
  // const API = `http://localhost:3000/api/getRelatedArticles?category=${category}`
  const res = await fetch(API, {
    cache: "no-store",
  });

  return res.json();
}
