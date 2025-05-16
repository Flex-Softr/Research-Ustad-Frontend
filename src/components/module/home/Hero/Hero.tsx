"use client";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative w-full lg:h-screen h-full  overflow-hidden border ">
      {/* Carousel */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent className="h-full">
          {/* Slide 1 */}
          <CarouselItem className="h-full">
            <Image
              src="/Cover 1.png"
              width={1920}
              height={1080}
              alt="Slide 1"
              className="w-full h-full object-contain"
            />
          </CarouselItem>

          {/* Slide 2 */}
          <CarouselItem className="h-full">
            <Image
              src="/Cover 2.png"
              width={1920}
              height={1080}
              alt="Slide 2"
              className="w-full h-full object-contain"
            />
          </CarouselItem>

          {/* Slide 3 */}
          <CarouselItem className="h-full">
            <Image
              src="/Cover 3.png"
              width={1920}
              height={1080}
              alt="Slide 3"
              className="w-full h-full object-contain"
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Hero;
