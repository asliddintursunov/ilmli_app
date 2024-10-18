import { useState } from "react";

type Props = {
  setInterests: (interests: any) => void;
  setSelectedInterests: (interests: any) => void;
};
function CustomInterestsModal({ setInterests, setSelectedInterests }: Props) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [customInterest, setCustomInterest] = useState<string>("");

  const addCustomInterest = function (interest: string) {
    interest = interest.toLowerCase();
    if (interest !== "") {
      setInterests((prev: string[]) => [...prev, interest.trim()]);
      setSelectedInterests((prev: string[]) => [...prev, interest.trim()]);
    }
    setCustomInterest("");
  };
  return (
    <div className="w-full flex justify-center mb-40">
      {!showModal && (
        <button className="btn" onClick={() => setShowModal((prev) => !prev)}>
          Yangi qiziqish qo&#39;shish
        </button>
      )}
      {showModal && (
        <div
          className={
            "fixed left-0 top-0 w-full h-full flex justify-center items-center backdrop-blur-[2px] bg-black/30 z-20"
          }
        >
          <div className={"modal-box"}>
            <h3 className="font-bold text-lg">
              O&#39;z qiziqishingizni yarating
            </h3>
            <p className="py-4">
              Yangi qiziqish qo&#39;shing va o&#39;z qiziqishingizni yarating.
            </p>
            <div className="modal-action">
              <form method="dialog" className="w-full">
                <input
                  type="text"
                  placeholder="ex: Math"
                  className="input input-bordered w-full"
                  onChange={(e) => setCustomInterest(e.currentTarget.value)}
                  value={customInterest}
                />
                <div className="flex items-center justify-between mt-4">
                  <button
                    className="btn btn-neutral px-6"
                    onClick={() => {
                      addCustomInterest(customInterest);
                      setShowModal((prev) => !prev);
                    }}
                  >
                    Q&#39;shish
                  </button>
                  <button
                    className="btn px-6"
                    onClick={() => setShowModal((prev) => !prev)}
                  >
                    Yopish
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomInterestsModal;
