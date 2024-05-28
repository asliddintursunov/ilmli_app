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
    <div className="w-full overflow-y-scroll h-96">
      {categories && (
        <ul>
          {categories.map((e, i) => {
            return (
              <li key={i} className="flex gap-1">
                <input type="checkbox" name={e} />
                <span>{e}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
