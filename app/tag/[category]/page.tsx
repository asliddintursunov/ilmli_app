import fetchNewestArticles from "@/lib/fetchNewestArticles";
import fetchRecommendedArticles from "@/lib/fetchRecommendedArticles";
import Recommended from "./components/Recommended";
import Newest from "./components/Newest";
import { Suspense } from "react";
import Skeleton from "@/components/Skeleton";
import { Metadata } from "next";

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

  const recommendedData = await fetchRecommendedArticles(category);
  const newestData = await fetchNewestArticles(category);

  const [recommended, newest]: [
    { recommended: Article[] },
    { newest: Article[] }
  ] = await Promise.all([recommendedData, newestData]);

  return (
    <div className="mx-2">
      <h1 className="text-4xl md:text-5xl text-center font-semibold">
        {heading}
      </h1>
      <Suspense fallback={[1, 2].map(() => Skeleton({ image: true }))}>
        <Recommended recommended={recommended} />
      </Suspense>
      <br />
      <hr />
      <br />
      <Suspense fallback={newest.newest.map(() => Skeleton({ image: true }))}>
        <h3 className="mb-3 text-2xl font-semibold">Newest</h3>
        <Newest newest={newest} />
      </Suspense>
    </div>
  );
}

export default page;
