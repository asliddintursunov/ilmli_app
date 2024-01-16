export default async function getNextTenArticle(limit: number, offset: number) {
  const BASE_URL = `https://api.escuelajs.co/api/v1/products?limit=${limit}&offset=${offset}`;
  const response = await fetch(BASE_URL, {
    cache: "no-store",
  });
  return response.json();
}