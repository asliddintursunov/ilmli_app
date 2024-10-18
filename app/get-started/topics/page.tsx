import InterestsContainer from "./Components/Interests";
export default function Topics() {
  return (
    <main className="flex flex-col items-start justify-center gap-4 font-serif mt-10">
      <h1 className="text-3xl text-center w-full">Nimalarga qiziqasiz?</h1>
      <sub className="text-xl text-center w-full">
        3 ta yokida undanda ko&#39;proq qiziqishlaringizni qo&#39;shing
      </sub>
      <InterestsContainer />
    </main>
  );
}
