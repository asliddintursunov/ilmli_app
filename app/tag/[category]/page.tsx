import fetchRelatedArticles from "@/lib/fetchRelatedArticles";
import fetchRelatedTrendings from "@/lib/fetchRelatedTrendings";
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
  const data = params.category.replace("%20", " ");
  if (!data) {
    return {
      title: "Not found",
      description: `${data} not found`,
    };
  }
  return {
    title: data,
    description: data,
  };
}

async function page({ params }: { params: { category: string } }) {
  const data = params.category.replace("%20", "").toLowerCase();
  const [trendings, articles]: [Article[], Article[]] = await Promise.all([
    fetchRelatedTrendings(data),
    fetchRelatedArticles(data, 0),
  ]);

  return (
    <div className="mx-2">
      <h1 className="text-4xl md:text-5xl text-center font-semibold">
        {params.category.replace("%20", " ")}
      </h1>
      <Suspense fallback={[1, 2].map(() => Skeleton({ image: true }))}>
        <Recommended recommended={trendings.slice(0, 2)} />
      </Suspense>
      <br />
      <hr />
      <br />
      <Suspense fallback={articles.map(() => Skeleton({ image: true }))}>
        <h3 className="mb-3 text-2xl font-semibold">Latest</h3>
        <Latest latest={articles} />
      </Suspense>
    </div>
  );
}

export default page;
