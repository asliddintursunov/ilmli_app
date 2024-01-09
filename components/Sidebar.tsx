export default function Sidebar() {
  const categories: string[] = [
    "Programming",
    "Data Science",
    "Technology",
    "Self Improvement",
    "Writing",
    "Relatioships",
    "Machine Learning",
    "Productivity",
    "Politics",
  ];

  return (
    <div className="flex flex-col items-start justify-start gap-4 md:sticky md:left-0 md:top-20 p-5">
      <h1 className="text-xl font-bold">
        Discover more of what matters to you
      </h1>
      <ul className="flex flex-wrap gap-2 md:grid md:grid-cols-2 lg:grid-cols-3 ">
        {categories.map((category) => (
          <li
            key={category}
            className="grid place-content-center text-sm sm:text-md cursor-pointer py-2 px-3 rounded-full bg-slate-400/10 hover:bg-slate-700/20 transition-all"
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
