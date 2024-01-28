export default async function fetchRelatedArticles(
  category: string,
  offset: number
) {
  const API = `http://localhost:3000/api/getRelatedArticles?offset=${offset}&category=${category}`;
  try {
    const res = await fetch(API, {
      cache: "no-store",
    });

    return res.json();
  } catch (error) {
    console.error("Error fetching related articles:", error);
  }
}
