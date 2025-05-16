"use client";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
// import Autoplay from "embla-carousel-autoplay";

import Image from "next/image";


const Hero = () => {
  return (
    <div  style={{backgroundImage:'url("/hro.png")',backgroundRepeat:"no-repeat",backgroundSize:'cover'}}  className="w-full relative border-b-[15px] border-r-[15px]  border-[#bc986b] overflow-hidden">
      {/* Carousel */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        // plugins={[
        //   Autoplay({
        //     delay: 5000,
        //   }),
        // ]}
      >
        <CarouselContent className="h-[calc(100vh-86px)] relative">
          <CarouselItem className="relative">
            <Image
              src="/hro.png"
              width={1980}
              height={400}
              alt="Slide 1"
              className="w-full h-full  object-fill"
            />
            {/* <div className="absolute right-10 bottom-0 h-[600px] z-20 transform translate-y-10 animate-slideIn">
              <Image
                src="/prof.png"
                width={400}
                height={400}
                alt="Profile 1"
                className="w-full h-full object-cover rounded-lg "
              />
            </div> */}
          </CarouselItem>
          {/* <CarouselItem className="relative">
            <Image
              src="/hro.png"
              width={1920}
              height={400}
              alt="Slide 2"
              className="w-full h-full "
            />
            <div className="absolute right-10 bottom-0 h-[600px] z-20 transform translate-y-10 animate-slideIn">
              <Image
                src="/a_sir.png"
                width={400}
                height={400}
                alt="Profile 2"
                className="w-full h-full object-cover rounded-lg "
              />
            </div>
          </CarouselItem> */}
        </CarouselContent>
      </Carousel>

      {/* Content Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent text-white z-10">
        <div className="container sm:w-[90%] mx-auto h-full flex flex-col justify-center items-center sm:items-start text-center sm:text-left px-4 space-y-6">
          <div  className="space-y-4 animate-fadeIn">
            <h2 className="text-[36px] sm:text-[48px] lg:text-[56px] font-extrabold leading-tight tracking-tight">
              Enhance Your Learning Journey <br />
              <span className="text-[#bc986b]">Unlock Your Potential</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-[#eee] leading-relaxed">
              Discover expert courses and resources to boost your skills.
              Transform your career  <br /> with practical and actionable knowledge.
            </p>
            <Button className="bg-[#bc986b]  hover:bg-yellow-400 px-6 py-3 text-sm sm:text-base lg:text-lg rounded-md shadow-md transform hover:scale-105 transition-all duration-200">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
