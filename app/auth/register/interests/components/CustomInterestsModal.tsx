import { useState } from "react";

type Props = {
  setInterests: (interests: any) => void;
};
function CustomInterestsModal({ setInterests }: Props) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [customInterest, setCustomInterest] = useState<string>("");
  const addCustomInterest = function (interest: string) {
    if (interest !== "") {
      setInterests((prev: string[]) => [...prev, interest.trim()]);
    }
    setCustomInterest("");
  };
  return (
    <div>
      {!showModal && (
        <button className="btn" onClick={() => setShowModal(true)}>
          open modal
        </button>
      )}
      {showModal && (
        <div
          className={
            "fixed left-0 top-0 w-full h-full flex justify-center items-center backdrop-blur-[2px] bg-black/30 z-20"
          }
        >
          <div className={"modal-box"}>
            <h3 className="font-bold text-lg">Customize your interests</h3>
            <p className="py-4">Add your custom interest here.</p>
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
                    className="btn btn-primary px-6"
                    onClick={() => addCustomInterest(customInterest)}
                  >
                    Add
                  </button>
                  <button
                    className="btn px-6"
                    onClick={() => setShowModal(false)}
                  >
                    Close
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
