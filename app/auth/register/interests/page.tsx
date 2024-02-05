import InterestsContainer from "./components/Interests";
export default function Interests() {
  return (
    <main className="flex flex-col items-start justify-center gap-2">
      <h1 className="text-3xl text-start">
        Choose your <br /> interests
      </h1>
      <sub className="text-2xl">Get better article, posts reccomendations</sub>
      <InterestsContainer />
    </main>
  );
}
