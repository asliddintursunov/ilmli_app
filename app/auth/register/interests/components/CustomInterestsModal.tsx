import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

type Props = {
  setInterests: (interests: any) => void;
};
function CustomInterestsModal({ setInterests }: Props) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [customInterest, setCustomInterest] = useState<string>("");

  const closeModal = function () {
    setOpenModal(false);
  };
  const addCustomInterest = function (interest: string) {
    if (interest !== "") {
      setInterests((prev: string[]) => [...prev, interest.trim()]);
    }
  };
  return (
    <>
      <button
        className="btn btn-primary rounded-full mb-10"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        Add Custom Interests
      </button>
      {openModal && (
        <div className="flex justify-center items-center fixed top-0 left-0 w-full h-screen bg-black/30">
          <div className="relative rounded-sm bg-white px-5 py-3">
            <h3 className="text-lg font-bold">
              Add your custom interest here.
            </h3>
            <input
              type="text"
              placeholder="ex: Soccer"
              className="input input-bordered w-full max-w-xs my-3"
              onChange={(e) => setCustomInterest(e.currentTarget.value)}
            />
            <button
              className="absolute top-0 right-0 p-2 bg-red-600 border-none text-white rounded-sm"
              onClick={closeModal}
            >
              <RxCross2 />
            </button>
            <button
              className="mt-2 px-5 py-2 bg-blue-700 rounded-full border-none text-white font-semibold"
              onClick={() => {
                closeModal();
                addCustomInterest(customInterest);
              }}
            >
              Add
            </button>
          </div>
          <button
            className="fixed top-0 left-0 w-full h-screen opacity-0 -z-10 cursor-default"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}

export default CustomInterestsModal;
