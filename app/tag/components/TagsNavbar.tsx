import { categories } from "@/components/Categories";
import RelatedArticlesButton from "@/components/RelatedArticlesButton";

type Props = {};
function TagsNavbar({}: Props) {
  return (
    <nav>
      <ul className="flex flex-wrap gap-2 my-2 items-center justify-center">
        {categories.map((category) => (
          <RelatedArticlesButton key={category} category={category} />
        ))}
      </ul>
    </nav>
  );
}

export default TagsNavbar;
