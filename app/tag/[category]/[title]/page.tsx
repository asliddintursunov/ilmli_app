import { Metadata } from "next";
import Image from "next/image";
import styles from "./styles.module.css";
import Link from "next/link";
import { fetchArticleByUUID } from "@/lib/fetchFunctions";

const formatTitleAndUUID = (params: {
  title: string;
}): { uuid: string; title: string } => {
  const uuid = params.title.split("_").reverse()[0];
  let title = params.title.slice(0, params.title.lastIndexOf(uuid) - 1);
  title = title.replaceAll("-", " ");

  return { uuid, title };
};

export async function generateMetadata({
  params,
}: {
  params: { title: string };
}): Promise<Metadata> {
  const { title } = formatTitleAndUUID(params);

  if (title) return { title, description: title };

  return { title: "Not found", description: `${title} not found` };
}

async function page({ params }: { params: { title: string } }) {
  const { title, uuid: post_uuid } = formatTitleAndUUID(params);

  const article: Article = await fetchArticleByUUID(post_uuid);

  return (
    <div>
      <h1 className="text-3xl text-center capitalize">{title}</h1>
      <br />
      <div className="mt-[32px] w-full">
        {article && (
          <div className="mb-10">
            <Image
              src={article.post_image}
              alt="Post Image"
              width={0}
              height={0}
              loading="lazy"
              className="w-full h-full md:w-4/5 my-0 mx-auto"
            />
            <div
              className={styles.postContainer}
              dangerouslySetInnerHTML={{ __html: article.post_body }}
            />
          </div>
        )}
        <ul className="flex flex-row justify-center items-center gap-4 mb-10">
          {article.post_data.post_categories.map(
            (category: string, index: number) => {
              return (
                <Link
                  key={index}
                  href={`/tag/${category}`}
                  className="capitalize grid place-content-center text-sm sm:text-md cursor-pointer py-2 px-3 rounded-full bg-slate-400/10 hover:bg-slate-700/20 transition-all"
                >
                  {category.replaceAll("-", " ")}
                </Link>
              );
            }
          )}
        </ul>
      </div>
    </div>
  );
}

export default page;
