import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

type Props = {
  setInterests: (interests: any) => void;
};
function CustomInterestsModal({ setInterests }: Props) {
  const [customInterest, setCustomInterest] = useState<string>("");
  const addCustomInterest = function (interest: string) {
    if (interest !== "") {
      setInterests((prev: string[]) => [...prev, interest.trim()]);
    }
    setCustomInterest("")
  };
  return (
    <div>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_1")?.showModal()}
      >
        open modal
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
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
                <button className="btn px-6">Close</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default CustomInterestsModal;
