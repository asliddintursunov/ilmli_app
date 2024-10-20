import React, { Dispatch, SetStateAction } from 'react'

type Props = {
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
};

function PopupDescription({ description, setDescription }: Props) {
  return (
    <div className="w-full border-b border-gray-400 mt-4 font-serif">
      <input
        type="text"
        className="outline-none w-full"
        value={
          description.length >= 100 ? description.slice(0, 99) : description
        }
        onChange={(e) => setDescription(e.currentTarget.value)}
        placeholder="Hikoya haqida yozing..."
      />
      {description.length >= 100 && (
        <i className="text-gray-600 text-xs font-mono">
          {description.length}/100
        </i>
      )}
    </div>
  );
}

export default PopupDescription