import Skeleton from "@/components/Skeleton";
import React from "react";
type Props = {};

export default function loading({}: Props) {
  return (
    <main className="max-w-[1280px] mx-auto">
      <div className="skeleton h-14 w-full rounded-none shadow-md mb-4" />
      <div className="w-full flex justify-center items-center gap-2 mx-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((e, i) => (
          <div key={i} className="skeleton h-10 w-20 rounded-full" />
        ))}
      </div>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((e, i) => (
        <Skeleton key={i} image={true} />
      ))}
    </main>
  );
}
