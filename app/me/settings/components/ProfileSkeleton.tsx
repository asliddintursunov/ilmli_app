export default function ProfileSkeleton() {
  return (
    <main className="flex flex-col md:flex-row justify-between items-stretch max-w-[1240px] mx-auto">
      <aside className="flex-[3] flex flex-col gap-y-2 xs:gap-y-6 p-4 border-b border-gray-300 md:border-none">
        <div className="w-full flex justify-between items-start">
          <div className="skeleton h-[150px] w-[150px] rounded-full" />
        </div>
        <div className="w-full flex flex-col xs:flex-row gap-2 justify-between">
          <div className="skeleton h-10 rounded-md w-full" />
          <div className="skeleton h-10 rounded-md w-full" />
        </div>
        <div className="w-full flex flex-col xs:flex-row gap-2 justify-between">
          <div className="skeleton h-10 rounded-md w-full" />
          <div className="skeleton h-10 rounded-md w-full" />
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="skeleton rounded-md h-40 w-full" />
          <div className="skeleton h-14 rounded-md w-full mt-4" />
        </div>
      </aside>
      <aside className="flex-1 p-4">
        <ul className="flex flex-col gap-4">
          {[1, 2, 3, 4, 5].map((e) => {
            return <div key={e} className="skeleton rounded-md w-full h-8" />;
          })}
        </ul>
      </aside>
    </main>
  );
}
