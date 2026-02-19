"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center bg-cream px-6 py-20">
      <div className="text-center">
        <h2 className="text-3xl font-serif text-gray-900 mb-4">
          Something went wrong!
        </h2>
        <p className="text-gray-600 mb-8">
          We apologized for the inconvenience. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="px-8 py-3 bg-[#C5A367] text-white font-bold rounded-lg hover:bg-[#B69357] transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
