function loading() {
  return (
    <div className="flex flex-col gap-4 w-full px-2 mx-auto items-center">
      <div className="skeleton h-8 w-52 md:max-w-96 md:w-full text-center"></div>
      <div className="skeleton w-full h-48 md:min-h-96"></div>
      <div className="flex flex-col gap-4 w-full items-start">
        <div className="skeleton h-8 w-40 md:max-w-96"></div>
        <div className="skeleton h-8 w-48 md:max-w-96"></div>
        <div className="skeleton h-5 w-full"></div>
        <div className="skeleton h-5 w-full"></div>
        <div className="skeleton h-5 max-w-screen-sm w-full"></div>
        <div className="skeleton h-5 w-full"></div>
        <div className="skeleton h-5 w-full"></div>
        <div className="skeleton h-5 w-full"></div>
        <div className="skeleton h-5 max-w-screen-sm w-full"></div>
        <div className="skeleton h-5 w-full"></div>
      </div>
    </div>
  );
}

export default loading