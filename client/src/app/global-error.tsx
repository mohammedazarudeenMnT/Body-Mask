"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="min-h-screen flex items-center justify-center bg-cream font-sans">
        <div className="text-center p-6">
          <h2 className="text-4xl font-serif text-gray-900 mb-4">
            Critical Error
          </h2>
          <p className="text-gray-600 mb-8">
            A critical error occurred. Please refresh the page.
          </p>
          <button
            onClick={() => reset()}
            className="px-8 py-3 bg-[#C5A367] text-white font-bold rounded-lg hover:bg-[#B69357] transition-colors shadow-xl"
          >
            Refresh App
          </button>
        </div>
      </body>
    </html>
  );
}
