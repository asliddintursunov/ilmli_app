import Toast from "@/components/Toast";
import useToast from "@/hooks/useToast";
import clsx from "clsx";
import { Dispatch, SetStateAction, useState } from "react";
type Props = {
  interests: string[];
  setInterests: Dispatch<SetStateAction<string[]>>;
  selectedInterests: string[] | undefined;
  setSelectedInterests: Dispatch<SetStateAction<string[] | undefined>>;
};
export default function EditInterests({
  interests,
  setInterests,
  selectedInterests,
  setSelectedInterests,
}: Props) {
  const toast = useToast();
  const [openAddInterestsModal, setOpenAddInterestsModal] =
    useState<boolean>(false);
  const [newInterest, setNewInterest] = useState<string>("");

  const handleAddInterest = () => {
    const value = newInterest.toLowerCase().trim().replace(/\s+/g, "-");
    if (interests.includes(value.toLowerCase())) {
      toast.handleToast(
        true,
        `${value} allaqachon qiziqishlarga qo'shilgan.`,
        "alert-error"
      );
      return;
    }
    setNewInterest("");
    setOpenAddInterestsModal(false);
    setInterests((prev) => [...prev, value]);
  };

  const handleCheckInterest = function (value: string) {
    const data: string = value.replaceAll(" ", "").toLowerCase();
    if ((selectedInterests || []).includes(data)) {
      setSelectedInterests((prev) =>
        (prev || []).filter(
          (item) => item.replaceAll(" ", "").toLowerCase() !== data
        )
      );
    } else {
      setSelectedInterests((prev) => [...(prev || []), data]);
    }
  };

  return (
    <>
      <div>
        <span>Foydalanuvchining qiziqishlari</span>
        <div className="w-full overflow-y-scroll max-h-96 md:max-h-[682px]">
          {interests.length ? (
            <ul className="flex flex-col gap-0.5">
              {interests.map((el, index) => {
                return (
                  <li
                    key={index}
                    className="flex flex-row items-center justify-start gap-2 py-1 px-2 bg-base-100 rounded-xl border-2 border-gray-500/40"
                  >
                    <input
                      type="checkbox"
                      id={el}
                      className="checkbox checkbox-md"
                      value={el}
                      onChange={(e) =>
                        handleCheckInterest(e.currentTarget.value)
                      }
                    />
                    <label htmlFor={el} className="capitalize cursor-pointer">
                      {el}
                    </label>
                  </li>
                );
              })}
            </ul>
          ) : (
            <span className="text-2xl">Qiziqishlar hozircha mavjud emas</span>
          )}
        </div>
      </div>
      {interests.length ? (
        <button
          type="button"
          className="btn btn-active mt-2"
          onClick={() => setOpenAddInterestsModal(true)}
        >
          Boshqa qiziqish qo&#39;shish
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-active mt-2"
          onClick={() => setOpenAddInterestsModal(true)}
        >
          Yangi qiziqish qo&#39;shish
        </button>
      )}
      {openAddInterestsModal && (
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-20 px-4">
            <form className="flex flex-col gap-4 pt-8 px-4 h-52 w-96 bg-white rounded-lg z-10">
              <div className="w-full">
                <label htmlFor="custom_interest">Qiziqish nomi</label>
                <input
                  type="text"
                  name="custom_interest"
                  id="custom_interest"
                  className="ilmli_input"
                  placeholder="Artificial Intelligence"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.currentTarget.value)}
                />
                <span className="">{newInterest.length}/30</span>
              </div>
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  className={clsx(
                    "btn btn-neutral",
                    newInterest.length > 30 && "btn-disabled"
                  )}
                  onClick={() => handleAddInterest()}
                >
                  Qiziqishni qo&#39;shish
                </button>
                <button
                  className="btn btn-active"
                  type="button"
                  onClick={() => {
                    setNewInterest("");
                    setOpenAddInterestsModal(false);
                  }}
                >
                  Ortga
                </button>
              </div>
            </form>
            <button
              type="button"
              className="fixed top-0 left-0 w-full h-full z-0"
              onClick={() => {
                setNewInterest("");
                setOpenAddInterestsModal(false);
              }}
            />
          </div>
          {toast.showToast && (
            <Toast toastType={toast.toastType} toastInfo={toast.toastInfo} />
          )}
        </>
      )}
    </>
  );
}
