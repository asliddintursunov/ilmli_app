import { categories } from "./Categories";
import RelatedArticlesButton from "./RelatedArticlesButton";
export default function Sidebar() {
  return (
    <div className="flex flex-col items-start justify-start gap-4 md:sticky md:left-0 md:top-0 p-5 border-l border-gray-200 md:h-screen pt-10">
      <h1 className="text-xl font-bold">
        Discover more of what matters to you
      </h1>
      <ul className="flex flex-wrap gap-2 md:grid md:grid-cols-2 lg:grid-cols-3 ">
        {categories.map((category) => (
          <RelatedArticlesButton key={category} category={category} />
        ))}
      </ul>
    </div>
  );
}
