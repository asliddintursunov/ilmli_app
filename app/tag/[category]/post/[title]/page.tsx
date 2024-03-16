import { Metadata } from "next";
export async function generateMetadata({
  params,
}: {
  params: { title: string };
}): Promise<Metadata> {
  var data = params.title.replaceAll("%", " ")
  data = data.replaceAll('-', " ")
  data = data[0].toUpperCase() + data.slice(1, data.length)

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
  const title = params.title.replaceAll("-", " ")
  console.log(params);
  
  
  return (
    <div>
      <h1 className="text-3xl text-center">{title}</h1>
      <br />
      <h3 className="text-xl text-center">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo adipisci
        at architecto, rerum accusantium vitae reprehenderit itaque neque sunt,
        impedit nihil. Consequuntur id odio ab labore maxime perspiciatis nihil
        vero!
      </h3>
    </div>
  );
}

export default page;
