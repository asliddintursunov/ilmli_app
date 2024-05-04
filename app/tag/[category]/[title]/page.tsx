import { fetchArticleByUUID } from "@/lib/fetchArticleByUUID";
import { Metadata } from "next";
import Image from "next/image";
import styles from './styles.module.css'
export async function generateMetadata({
  params,
}: {
  params: { title: string };
}): Promise<Metadata> {
  var data = params.title.replaceAll("%", " ");
  data = data.replaceAll("-", " ");
  data = data[0].toUpperCase() + data.slice(1, data.length);

  if (data) return { title: data, description: data };

  return { title: "Not found", description: `${data} not found` };
}
 
async function page({ params }: { params: { title: string } }) {
  const post_uuid = params.title.split("_").reverse()[0];
  const title = params.title
    .slice(0, params.title.lastIndexOf(post_uuid) - 1)
    .replaceAll("-", " ")
  const article: Article = await fetchArticleByUUID(post_uuid);

  return (
    <div>
      <h1 className="text-3xl text-center">{title}</h1>
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
      </div>
    </div>
  );
}

export default page;
