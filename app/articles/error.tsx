"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h2 className="text-5xl text-red-500">Something went wrong!</h2>
      <div className="flex items-center justify-center gap-3">
        <button
          className="btn btn-error"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
        <button className="btn btn-primary" onClick={() => router.push("/")}>
          Go to home
        </button>
      </div>
    </div>
  );
}
