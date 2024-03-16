"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  recommended: Article[];
};

function Recommended({ recommended }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <main className="grid place-content-center">
      <br />
      <hr />
      <br />
      <h1 className="text-2xl">Recommended stories</h1>
      <br />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
        {recommended &&
          recommended.map((el: Article) => {
            return (
              <div
                onClick={() =>
                  router.push(
                    `${pathname}/post/${el.title
                      .replaceAll(" ", "-")
                      .toLowerCase()}`
                  )
                }
                key={el.id}
                className="flex flex-col justify-between items-start gap-6 cursor-pointer"
              >
                <Image
                  width={500}
                  height={500}
                  src={"/images/white_flower.jpg"}
                  alt={el.name}
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
                    <span className="font-medium text-sm">{el.name}</span>
                  </div>
                  <div className="flex flex-col gap-1 items-start justify-between cursor-pointer">
                    <span className="text-xl font-bold">{el.title}</span>
                    <span>{el.title}</span>
                    <div className="flex items-center justify-start gap-2">
                      <span className="text-sm text-gray-500">{el.posted}</span>
                      &#x2022;
                      <span className="text-sm text-gray-500">
                        {el.readTime}
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
