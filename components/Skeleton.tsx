type Props = {
  image?: boolean;
};
export default function Skeleton({ image }: Props) {
  return (
    <li
      className="mt-4 flex flex-col gap-2 min-h-[120px] w-full md:w-[255px] lg:w-[320px] xl:w-[425px]"
      style={{
        width: image ? "100%" : "null",
      }}
    >
      <div
        className="flex items-stretch justify-between p-2 
    shadow-lg gap-2"
      >
        <div
          className="
      flex-col items-start justify-start w-full"
        >
          <div className="flex gap-2 items-start justify-start">
            <div className="skeleton h-8 w-8"/>
            <div className="skeleton w-2/5 rounded-full h-6"/>
          </div>
          <div className="flex flex-col items-start justify-start gap-2 mt-2">
            <div className="skeleton h-6 w-full rounded-full"/>
            {image && <div className="skeleton h-3 w-full rounded-full"/>}
          </div>
          <div className="flex items-center justify-start gap-2 mt-2">
            <div className="skeleton  w-12 h-4 rounded-full"/>
            <div className="skeleton  w-16 h-4 rounded-full"/>
          </div>
        </div>
        {image && <div className="skeleton h-24 w-48 rounded-md"/>}
      </div>
    </li>
  );
}
