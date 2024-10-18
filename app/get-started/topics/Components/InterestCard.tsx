import clsx from "clsx";

export default function InterestCard({
  interest,
  selectedInterests,
  handleInterests,
  showMore,
}: {
  interest: string;
  selectedInterests: string[];
  handleInterests: (interest: string) => void;
  showMore: boolean | undefined;
}) {
  return (
    <div
      className={clsx(
        "flex flex-row items-center justify-center gap-2 py-2 px-3 bg-base-200 rounded-full cursor-pointer",
        selectedInterests.includes(interest) ? "border border-gray-500" : "",
        !showMore && "opacity-0 h-0 -z-10"
      )}
    >
      <label
        htmlFor={interest}
        className="cursor-pointer select-none capitalize"
      >
        {interest}
      </label>
      <input
        type="checkbox"
        id={interest}
        className="checkbox checkbox-sm rounded-full"
        checked={selectedInterests.includes(interest)}
        value={interest}
        onChange={(e) => handleInterests(e.currentTarget.value)}
      />
    </div>
  );
}
