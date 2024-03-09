import { Metadata } from "next";
export async function generateMetadata({
  params,
}: {
  params: { title: string };
}): Promise<Metadata> {
  const data = params.title.replaceAll("%20", " ");

  if (!data) {
    return {
      title: "Not found",
      description: `${data} not found`,
    };
  }
  return {
    title: data,
    description: data,
  };
}
function page({ params }: { params: { title: string } }) {
  return (
    <div>
      <h1 className="text-3xl">{params.title.replaceAll("%20", " ")}</h1>
    </div>
  );
}

export default page;
