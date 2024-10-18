import Navbar from "@/components/Navbar";
export default function TagsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="border-b-2 border-gray-600 bg-gray-300">
        <Navbar />
      </nav>
      {children}
    </>
  );
}
