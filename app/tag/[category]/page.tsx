import fetchNewestArticles from "@/lib/fetchNewestArticles";
import fetchRecommendedArticles from "@/lib/fetchRecommendedArticles";
import Recommended from "./components/Recommended";
import Latest from "./components/Latest";
import { Suspense } from "react";
import Skeleton from "@/components/Skeleton";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  var title = params.category.replaceAll("-", " ");
  title = title[0].toUpperCase() + title.slice(1, title.length)
  if (!title) {
    return {
      title: "Not found",
      description: `${title} not found`,
    };
  }
  return {
    title: title,
    description: title,
  };
}

async function page({ params }: { params: { category: string } }) {
  const category = params.category;
  var heading = params.category.replace("-", " ");
  heading = heading[0].toUpperCase() + heading.slice(1, heading.length)

  const [recommened, latest]: [Article[], Article[]] = await Promise.all([
    fetchRecommendedArticles(category),
    fetchNewestArticles(category, 0),
  ]);
  
  

  return (
    <div className="mx-2">
      <h1 className="text-4xl md:text-5xl text-center font-semibold">
        {heading}
      </h1>
      <Suspense fallback={[1, 2].map(() => Skeleton({ image: true }))}>
        <Recommended recommended={recommened} />
      </Suspense>
      <br />
      <hr />
      <br />
      <Suspense fallback={latest.map(() => Skeleton({ image: true }))}>
        <h3 className="mb-3 text-2xl font-semibold">Latest</h3>
        <Latest latest={latest} />
      </Suspense>
    </div>
  );
}

export default page;
