export default function EditInterests() {
  const categories: string[] = [
    "programming",
    "data science",
    "technology",
    "self improvement",
    "writing",
    "relationship",
    "machine learning",
    "productivity",
    "politics",
    "programming",
    "data science",
    "technology",
    "self improvement",
    "writing",
    "relationship",
    "machine learning",
    "productivity",
    "politics",
    "programming",
    "data science",
    "technology",
    "self improvement",
    "writing",
    "relationship",
    "machine learning",
    "productivity",
    "politics",
    "programming",
    "data science",
    "technology",
    "self improvement",
    "writing",
    "relationship",
    "machine learning",
    "productivity",
    "politics",
  ];

  return (
    <>
      <div className="w-full overflow-y-scroll max-h-96 md:max-h-screen">
        {categories && (
          <ul className="flex flex-col gap-0.5">
            {categories.map((el, index) => {
              return (
                <li
                  key={index}
                  className="flex flex-row items-center justify-start gap-2 py-1 px-2 bg-base-100 rounded-xl border-2 border-gray-500/40"
                >
                  <input
                    type="checkbox"
                    id={el}
                    className="checkbox checkbox-md"
                    value={el}
                    // onChange={(e) => handleInterests(e.currentTarget.value)}
                  />
                  <label htmlFor={el} className="capitalize">
                    {el}
                  </label>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <button className="btn btn-neutral mt-2">Boshqa qiziqish qo&#39;shish</button>
    </>
  );
}
