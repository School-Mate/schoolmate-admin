"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center w-full text-center h-[100vh]">
      <h2 className="text-2xl font-bold text-black dark:text-white">
        {error.message}
      </h2>
      <button
        className="mt-4 px-4 py-2 bg-gray-2 text-black dark:bg-meta-4 dark:text-white rounded-md"
        onClick={() => reset()}
      >
        재시도
      </button>
    </div>
  );
}
