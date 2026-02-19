export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream z-50">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-[#C5A367]/20 rounded-full" />
        <div className="absolute inset-0 border-4 border-[#C5A367] border-t-transparent rounded-full animate-spin" />
      </div>
      <p className="mt-6 text-[#C5A367] font-serif italic tracking-widest animate-pulse">
        Body Mask
      </p>
    </div>
  );
}
