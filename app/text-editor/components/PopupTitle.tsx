import React, { Dispatch, SetStateAction } from 'react'

type Props = {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
};

function PopupTitle({ title, setTitle }: Props) {
  return (
    <div className="w-full border-b border-gray-400 font-serif">
      <input
        type="text"
        className="text-nowrap outline-none w-full"
        value={title.length >= 100 ? title.slice(0, 99) : title}
        onChange={(e) => setTitle(e.currentTarget.value)}
        placeholder="Hikoya sarlavhasini yozing..."
      />
      {title.length >= 100 && (
        <i className="text-gray-600 text-xs font-mono">{title.length}/100</i>
      )}
    </div>
  );
}

export default PopupTitle