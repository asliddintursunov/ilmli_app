import clsx from "clsx";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { GrAdd } from "react-icons/gr";

type Props = {
  socialLinks: { platform: string; link: string }[] | undefined;
  setSocialLinks: Dispatch<
    SetStateAction<{ platform: string; link: string }[] | undefined>
  >;
};

export default function EditSocialLinks({
  socialLinks,
  setSocialLinks,
}: Props) {
  const [openAddSocialLinksModal, setOpenAddSocialLinksModal] =
    useState<boolean>(false);
  const [newPlatformName, setNewPlatformName] = useState<string>("");
  const [newPlatformLink, setNewPlatformLink] = useState<string>("");

  return (
    <>
      <div>
        <span>Ijtimoiy tarmoqlar</span>
        <div className="w-full flex items-center justify-between border p-4 ilmli_input">
          <div className="w-full flex items-center justify-start gap-4 flex-wrap">
            {socialLinks?.length ? (
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
              })
            ) : (
              <span>Ijtimoiy tarmoqlar qo&#39;shilmagan</span>
            )}
          </div>
          <div>
            <button
              className="text-white bg-blue-600 p-1.5 rounded-full hover:pr-8 hover:bg-blue-700 transition-all"
              onClick={() => setOpenAddSocialLinksModal(true)}
            >
              <GrAdd />
            </button>
          </div>
        </div>
      </div>
      {openAddSocialLinksModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-20 px-4">
          <div className="flex flex-col gap-4 pt-8 px-4 h-72 w-96 bg-white rounded-lg z-10">
            <div className="w-full">
              <label htmlFor="social_platform_name">Platforma nomi</label>
              <input
                type="text"
                name="social_platform_name"
                id="social_platform_name"
                className="ilmli_input"
                placeholder="Instagram"
                value={newPlatformName}
                onChange={(e) => setNewPlatformName(e.currentTarget.value)}
              />
            </div>
            <div className="w-full">
              <label htmlFor="social_platform_link">
                Platforma uchun manzil
              </label>
              <input
                type="text"
                name="social_platform_link"
                id="social_platform_link"
                className="ilmli_input"
                placeholder="https://www.instagram.com/"
                value={newPlatformLink}
                onChange={(e) => setNewPlatformLink(e.currentTarget.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className={clsx(
                  "btn cursor-pointer",
                  newPlatformName && newPlatformLink
                    ? "btn-neutral"
                    : "btn-disabled"
                )}
                onClick={() => {
                  setSocialLinks((prev) => [
                    ...(prev ?? []),
                    { platform: newPlatformName, link: newPlatformLink },
                  ]);
                  setOpenAddSocialLinksModal(false);
                  setNewPlatformName("");
                  setNewPlatformLink("");
                }}
              >
                Qo&#39;shish
              </button>
              <button
                className="btn btn-active cursor-pointer"
                onClick={() => {
                  setOpenAddSocialLinksModal(false);
                  setNewPlatformName("");
                  setNewPlatformLink("");
                }}
              >
                Ortga
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
