import { Loader } from "@/components/ui/loader";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-9999 bg-white flex items-center justify-center overflow-hidden">
      <Loader size="xl" />
    </div>
  );
}
