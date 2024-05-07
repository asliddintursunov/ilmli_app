function loading() {
  const posts: number[] = [1, 2, 3, 4, 5, 6];
  return (
    <main className="flex flex-col items-center justify-between py-3">
      <div
        className="grid grid-cols-1 sm:grid-cols-2 place-content-center gap-4 mt-4"
      >
        {posts.map((post) => (
          <div key={post} className="flex flex-col gap-4 w-96 h-96">
            <div className="skeleton h-52 w-full"></div>
            <div className="skeleton h-6 w-28"></div>
            <div className="skeleton h-6 w-full"></div>
            <div className="skeleton h-6 w-full"></div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default loading;
