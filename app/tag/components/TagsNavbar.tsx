import { categories } from "@/components/Categories";
import HeaderContent from "@/components/HeaderContent";
import HeaderSlider from "@/components/HeaderSlider";
import RelatedArticlesButton from "@/components/RelatedArticlesButton";
import { getUserInterests } from "@/lib/fetchFunctions";

type Props = {};
async function TagsNavbar({}: Props) {
  const userInterests: string[] = await getUserInterests();
  return (
    <nav>
      <ul className="flex flex-wrap gap-2 my-2 items-center justify-center">
        <HeaderSlider topics={userInterests} path={undefined} />
      </ul>
    </nav>
  );
}

export default TagsNavbar;
