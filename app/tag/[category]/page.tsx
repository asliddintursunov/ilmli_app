import Recommended from "./components/Recommended";
import Newest from "./components/Newest";
import { Metadata } from "next";
import { getAccessToken } from "@/lib/actions";
import { baseURL } from "@/utils";

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  var title = params.category.replaceAll("-", " ");
  title = title[0].toUpperCase() + title.slice(1, title.length);
  if (title) return { title: title, description: title };

  return { title: "Not found", description: `${title} not found` };
}

async function page({ params }: { params: { category: string } }) {
  const category = params.category.replaceAll(" ", "-");

  var heading = category.replace("-", " ");
  heading = heading[0].toUpperCase() + heading.slice(1, heading.length);

  // Fetches newest or recommended articles based on the param type
  const fetch_r_n_articles = async (
    article_cateory: string,
    type: "recommended" | "newest"
  ): Promise<Article[]> => {
    const access_token = await getAccessToken();
    const params = new URLSearchParams();
    params.append("category", article_cateory);
    try {
      var API = undefined;
      type === "recommended"
        ? (API = `${baseURL}/recommended?${params.toString()}`)
        : (API = `${baseURL}/newest?${params.toString()}`);
      const request = await fetch(API, {
        method: "GET",
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${access_token?.value}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!request.ok) {
        const error = await request.json();
        throw new Error(error.message);
      }
      const response = await request.json();
      return response.articles;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const [recommended, newest] = await Promise.all([
    fetch_r_n_articles(category, "recommended"),
    fetch_r_n_articles(category, "newest"),
  ]);

  return (
    <div className="mx-2">
      <h1 className="text-4xl md:text-5xl text-center font-semibold capitalize">
        {heading}
      </h1>
      {recommended.length > 0 ? (
        <>
          <br />
          <hr />
          <br />
          <h1 className="mb-3 text-2xl font-semibold">Recommended stories</h1>
          <Recommended recommended={recommended} />
        </>
      ) : (
        <h1 className="mb-3 text-2xl font-semibold">
          No recommended stories found!
        </h1>
      )}
      {newest.length > 0 ? (
        <>
          <br />
          <hr />
          <br />
          <h3 className="mb-3 text-2xl font-semibold">Newest</h3>
          <Newest newest={newest} />
        </>
      ) : (
        <h1 className="mb-3 text-2xl font-semibold">
          No newest stories found!
        </h1>
      )}
    </div>
  );
}

export default page;
