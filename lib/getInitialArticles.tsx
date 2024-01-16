export default async function getInitialArticles() {
  const BASE_URL = "https://api.escuelajs.co/api/v1/products?limit=10&offset=0";
  const response = await fetch(BASE_URL, {
    cache: "no-store",
  })
  return response.json();
}
