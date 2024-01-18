export default async function getNextTenArticle(offset: number) {
  const API = `http://localhost:3000/api/getArticles?offset=${offset}`;

  const response = await fetch(API, {
    cache: "no-store",
  });
  return response.json();
}
