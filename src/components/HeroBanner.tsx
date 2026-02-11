import Image from "next/image";

interface HeroBannerProps {
  imageSrc: string;
  imageAlt: string;
}

const HeroBanner = ({ imageSrc, imageAlt }: HeroBannerProps) => {
  return (
    <section className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px] overflow-hidden bg-white pt-24 md:pt-0">
      <div className="relative w-full h-full">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>
    </section>
  );
};

export default HeroBanner;
