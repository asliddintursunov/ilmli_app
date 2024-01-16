import ReactPrimeEditor from "../../components/Editor"
export default function Editor() {
  return (
    <main className="min-h-screen max-w-[1440px] mx-auto px-2">
      <h1 className="text-3xl sm:text-5xl text-center w-full">
        Create your article
      </h1>
      <ReactPrimeEditor />
    </main>
  );
}
