import NavBarWhite from "@/components/NavBarWhite";
import TagsNavbar from "./components/TagsNavbar";
export default async function TagsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBarWhite />
      <section className="grid place-content-center max-w-[1440px] mx-auto">
        <TagsNavbar />
        {children}
      </section>
    </>
  );
}
