import Recommended from "./components/Recommended";
import Newest from "./components/Newest";
import { Metadata } from "next";
import { fetchNRarticles } from "@/lib/fetchFunctions";

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

  const [recommended, newest] = await Promise.all([
    fetchNRarticles(category, "recommended"),
    fetchNRarticles(category, "newest"),
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
