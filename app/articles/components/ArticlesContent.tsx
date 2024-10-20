import { formatTitleForUrl } from "@/lib/formatTitleForUrl";
import Image from "next/image";
import Link from "next/link";

type Props = {
  props: Article;
};

export default function ArticlesContent({ props }: Props) {
  return (
    <li
      id={props.post_id.toString()}
      key={props.post_id}
      className="relative flex items-stretch justify-between p-2 border-b border-gray-200
            cursor-pointer hover:bg-gray-100/50 transition-all md:h-40"
    >
      <Link
        className="absolute w-full h-full left-0 top-0"
        href={`/tag/${props.post_primary_category}/${formatTitleForUrl(
          `${props.post_title}_${props.post_uuid}`
        )}`}
      />
      <div className="flex-1 flex flex-col items-start justify-start gap-1">
        <div className="flex gap-2 items-start justify-start">
          <Link
            href={`/@${props.user_name}/home`}
            className="h-7 w-7 rounded-full overflow-hidden border border-gray-300"
          >
            <Image
              height={28}
              width={28}
              src={props.user_profile_photo ?? "/images/avatar.png"}
              alt="profile photo"
              className="object-cover h-full w-full"
            />
          </Link>
          <Link
            href={`/@${props.user_name}/home`}
            className="font-bold text-sm hover:underline z-10"
          >
            {props.user_name}
          </Link>
        </div>
        <div className="flex flex-col items-start justify-start gap-1">
          <h2 className="font-bold text-xl">{props.post_title}</h2>
          <p className="text-sm text-gray-600">{props.post_description}</p>
        </div>
        <div className="flex items-center justify-start gap-2">
          <span className="text-sm text-gray-500">
            {props.post_created_time}
          </span>
        </div>
      </div>
      <Image
        alt="flower"
        src={props.post_image ?? "/images/white_flower.jpg"}
        width={160}
        height={120}
        loading="lazy"
        className="object-cover object-center"
      />
    </li>
  );
}
