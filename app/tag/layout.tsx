import TagsNavbar from "./components/TagsNavbar";
export default function TagsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grid place-content-center max-w-[1440px] mx-auto">
      <TagsNavbar />
      {children}
    </section>
  );
}
