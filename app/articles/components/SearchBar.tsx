"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function SearchBar() {
  const router = useRouter();
  const [text, setText] = useState<string>("");
  const [query] = useDebounce(text, 500);

  useEffect(() => {
    if (!query) {
      router.push("/articles");
    } else {
      router.push(`/articles?search=${query}`);
    }
  }, [query, router]);

  return (
    <form className="relative w-full max-w-xl">
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder="Pishirish"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
      </label>
    </form>
  );
}
