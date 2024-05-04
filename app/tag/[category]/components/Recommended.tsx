"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  recommended: { recommended: Article[] };
};

function Recommended({ recommended }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const articles: Article[] = recommended.recommended;

  return (
    <main className="grid place-content-center">
      <br />
      <hr />
      <br />
      <h1 className="text-2xl">Recommended stories</h1>
      <br />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
        {articles &&
          articles.map((el: Article) => {
            return (
              <div
                onClick={() =>
                  router.push(
                    `${pathname}/${el.post_title}_${el.post_uuid}`
                      .replaceAll(" ", "-")
                  )
                }
                key={el.post_id}
                className="flex flex-col justify-between items-start gap-6 cursor-pointer"
              >
                <Image
                  width={500}
                  height={300}
                  src={el.post_image}
                  alt={"el.user_name"}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="rounded-sm"
                />
                <div className="flex flex-col items-start gap-2">
                  <div className="flex flex-row items-center justify-start gap-2">
                    <Image
                      src={"/images/avatar.png"}
                      alt="avatar"
                      width={20}
                      height={20}
                      className="rounded-full border border-gray-600"
                    />
                    <span className="font-medium text-sm">{el.user_name}</span>
                  </div>
                  <div className="flex flex-col gap-1 items-start justify-between cursor-pointer">
                    <span className="text-xl font-bold">{el.post_title}</span>
                    <span>{el.post_title}</span>
                    <div className="flex items-center justify-start gap-2">
                      <span className="text-sm text-gray-500">
                        {el.post_created_time}
                      </span>
                      &#x2022;
                      <span className="text-sm text-gray-500">
                        {"el.readTime"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </main>
  );
}

export default Recommended;
