import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export default function FloatingWhatsApp() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const openWhatsApp = () => {
    window.open("https://wa.me/919876543210", "_blank");
  };

  useGSAP(
    () => {
      // Infinite rotation
      gsap.to(rotationRef.current, {
        rotate: 360,
        duration: 10,
        repeat: -1,
        ease: "none",
      });
    },
    { scope: containerRef },
  );

  const handleMouseEnter = () => {
    gsap.to(buttonRef.current, { scale: 1.05, duration: 0.3 });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, { scale: 1, duration: 0.3 });
  };

  return (
    <div
      ref={containerRef}
      className="fixed z-50 transition-all duration-300"
      style={{ bottom: "2rem", right: "2rem" }}
    >
      <div
        ref={buttonRef}
        className="relative cursor-pointer group"
        style={{ width: 128, height: 128 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={openWhatsApp}
      >
        <div ref={rotationRef} className="absolute inset-0">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <path
                id="waCirclePath"
                d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
              />
            </defs>
            <text className="text-[18px] fill-[#25D366] font-medium uppercase tracking-wider">
              <textPath href="#waCirclePath" startOffset="0%">
                CHAT WITH US ON WHATSAPP —
              </textPath>
            </text>
          </svg>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          {/* Glow + white outer ring + green inner circle like footer */}
          <div className="absolute inset-0 rounded-full bg-[#25D366]/30 blur-3xl animate-pulse" />
          <div className="relative w-20 h-20 rounded-full bg-white/90 shadow-2xl flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[#25D366] flex items-center justify-center">
              <WhatsAppIcon className="w-10 h-10" />
            </div>
          </div>
        </div>

        <style>{`@media (min-width: 1024px) {
            .relative.cursor-pointer.group {
              width: 160px !important;
              height: 160px !important;
            }
            .relative.cursor-pointer.group .rounded-full.overflow-hidden {
              width: 96px !important;
              height: 96px !important;
            }
          }`}</style>
      </div>
    </div>
  );
}
