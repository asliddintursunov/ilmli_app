export default function Loading() {
  const cards = [1, 2, 3, 4, 5, 6];

  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-6">
      <div className="skeleton w-full min-h-80 rounded-none">
        <div className="flex flex-col justify-start gap-8 items-start" />
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-x-10 sm:gap-x-6 gap-y-4 max-w-[1440px]">
        {cards.map((card) => (
          <div
            key={card}
            className="flex flex-col gap-4 w-96 sm:w-64 md:w-72 lg:w-96 mb-4 shadow-md p-4 rounded-md"
          >
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
        ))}
      </div>
    </main>
  );
}
