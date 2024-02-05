export default async function fetchArticles(offset: number) {
  const API = `http://localhost:3000/api/getArticles?offset=${offset}`;

  try {
    const response = await fetch(API, {
      cache: "no-store",
    });
    return response.json();
  } catch (error) {
    console.log("Error fetching articles", error);
  }
}
