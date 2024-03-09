import PrimeReactEditor from "./components/Editor";
export default function Editor() {
  return (
    <main className="min-h-screen max-w-[1440px] mx-auto px-2">
      <h1 className="text-3xl md:text-5xl text-center">Editor Page</h1>
      <PrimeReactEditor />
    </main>
  );
}
