"use client";
import Image from "next/image";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <div className="grid h-screen place-content-center bg-white px-4">
        <div className="text-center">
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Uh-oh!
          </h1>
          <Image src="/error.svg" alt="Error" width={300} height={300} />
          <p className="mt-4 text-gray-500">
            Something went wrong. Please try again later.
          </p>
        </div>
      </div>
    </div>
  );
}
