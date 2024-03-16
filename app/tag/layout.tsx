import TagsNavbar from "./components/TagsNavbar";
export default function TagsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grid place-content-center mx-2">
      <nav className="text-4xl text-center">
        <TagsNavbar />
      </nav>
      {children}
    </section>
  );
}
