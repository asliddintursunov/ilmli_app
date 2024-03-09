function page({
  params,
}: {
  params: {
    slug: string[];
  };
}) {
  if (params.slug?.length == 2){
    return <h1 className="text-3xl">{params.slug[0]} and {params.slug[1]}</h1>;
  }
  else if(params.slug?.length == 1){
    return <h1 className="text-3xl">{params.slug[0]}</h1>;
  }
  else{
    return <h1 className="text-3xl">Tags</h1>;
  }
}

export default page;
