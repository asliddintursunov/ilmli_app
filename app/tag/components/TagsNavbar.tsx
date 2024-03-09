import { categories } from "@/components/Categories";
import RelatedArticlesButton from "@/components/RelatedArticlesButton";

type Props = {};
function TagsNavbar({}: Props) {
  return (
    <ul className="flex flex-wrap gap-2 my-2">
      {categories.map((category) => (
        <RelatedArticlesButton key={category} category={category} />
      ))}
    </ul>
  );
}

export default TagsNavbar;
