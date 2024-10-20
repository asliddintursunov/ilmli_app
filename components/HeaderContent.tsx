import Image from "next/image";
import StartReading from "./StartReading";
import Link from "next/link";

export default function HeaderContent() {
  const isRegistered = true;
  return (
    <div className="bg-gray-300">
      <div className="w-full flex items-stretch justify-between p-4 max-w-[1440px] mx-auto">
        <div className="flex flex-col justify-center items-start gap-6">
          <h2 className="md:text-3xl sm:text-2xl text-xl font-normal">
            {isRegistered
              ? "Ilmli platfromasi orqali O'zbek tilidagi amaliy bilimlar bazasi yaratilishiga o'z xissangizni qo'sing"
              : "Ilmli platformasida yangi amaliy bilimlarni o'rganing va o'z bilimlaringizni boshqalar bilan ulashing"}
          </h2>
          <Link
            href="/articles"
            className="bg-[#4794ff] hover:bg-sky-600 btn rounded-full px-4 md:px-8 text-sm md:text-xl text-white border-none"
          >
            O&apos;qishni boshlash
          </Link>
          {/* <StartReading /> */}
        </div>
        <div className="hidden sm:block">
          <div className="w-[250px] h-[250px]grid place-items-center">
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
