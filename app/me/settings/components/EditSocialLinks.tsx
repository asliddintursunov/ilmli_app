import Link from "next/link";

export default function EditSocialLinks() {
  const socialLinks = [
    { platform: "linkedin", link: "http://localhost:3000/me/settings" },
    { platform: "twitter", link: "http://localhost:3000/me/settings" },
    { platform: "instagram", link: "http://localhost:3000/me/settings" },
    { platform: "telegram", link: "http://localhost:3000/me/settings" },
  ];
  return (
    <div className="w-full flex items-center gap-2 border p-4 border-red-600">
      {socialLinks &&
        socialLinks.map((e, i) => {
          return (
            <div key={i}>
              <Link
                href={e.link}
                target="_blank"
                className="hover:underline cursor-pointer"
              >
                {e.platform}
              </Link>
            </div>
          );
        })}
    </div>
  );
}
