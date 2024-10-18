import Link from "next/link";
import { MdOutlineFindInPage } from "react-icons/md";
function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-4">
          <MdOutlineFindInPage className="text-red-600 text-2xl mr-2" />
          <h2 className="text-lg font-semibold">Sahifa topilmadi</h2>
        </div>
        <p className="text-gray-600 mb-4">
          Siz izlayotkan sahifa mavjud emas, iltimos qaytadan urunib
          ko&#39;ring.
        </p>
      </div>
      <div className="mt-6">
        <Link
          href="/"
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow transition duration-300"
        >
          Bosh sahifaga qaytish
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
