import Image from "next/image";
import StartReading from "./StartReading";

export default function HeaderContent() {
  const isRegistered = true;
  return (
    <div className="border-b-[1px] border-gray-600 bg-gray-300">
      <div className="w-full flex items-stretch justify-between p-4 max-w-[1440px] mx-auto">
        <div className="flex flex-col justify-center items-start gap-6">
          <h2 className="md:text-3xl sm:text-2xl text-xl font-normal">
            {isRegistered
              ? "Ilmli platfromasi orqali O'zbek tilidagi amaliy bilimlar bazasi yaratilishiga o'z xissangizni qo'sing"
              : "Ilmli platformasida yangi amaliy bilimlarni o'rganing va o'z bilimlaringizni boshqalar bilan ulashing"}
          </h2>
          <StartReading />
        </div>
        <div className="hidden sm:block">
          <div className="w-[250px] h-[250px]grid place-items-center">
            {/* <h1 className="text-white">Qandaydir Gif</h1> */}
            <Image
              src={"/images/Ilmli_image.png"}
              alt="Ilmli image"
              width={250}
              height={250}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
