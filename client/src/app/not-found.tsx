import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-6">
      <div className="text-center">
        <h1 className="text-9xl font-serif text-[#C5A367] mb-4">404</h1>
        <h2 className="text-3xl md:text-5xl font-serif text-gray-900 mb-6">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-10 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link
          href="/"
          className="inline-block px-10 py-4 bg-[#C5A367] text-white font-bold rounded-lg hover:bg-[#B69357] transition-colors shadow-lg"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
