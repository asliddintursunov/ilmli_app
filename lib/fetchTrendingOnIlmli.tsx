export default async function fetchTrendingOnIlmli() {
  const API = "http://localhost:3000/api/getTrendings";
  try {
    const response = await fetch(API, { cache: "no-store" });
    return response.json();
  } catch (error: any) {
    // console.error("Error fetching trendings on Ilmli:", error);
    alert("Function" + error.message);
  }
}
