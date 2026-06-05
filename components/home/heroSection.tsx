 "use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export function HeroSection() {
  const router = useRouter();
  
  return (
    <section className="relative   w-full min-h-screen overflow-hidden">

      <Image
        src="/cropFlight1.png"
        alt="Commercial airplane flying above clouds"
        fill
        priority
        className="object-cover -z-10"
      />

      <div className=" z-10 flex items-center relative bottom-26 justify-center min-h-screen px-4 sm:px-6 lg:px-8">


          <div className="flex flex-col items-center text-center">

            <p className="tracking-[1px] font-inter text-[#42464F] uppercase text-xs sm:text-sm font-semibold">
              WANDERLUST AWAITS
            </p>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl tracking-tight text-[#6A7181] font-semibold leading-none">
              Luxury.
            </h1>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl tracking-tight text-[#1C2534] font-bold leading-none opacity-90">
              Affordable.
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-[#43464D] max-w-md pt-2">
              We believe loyalty you should be rewarded.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 w-full sm:w-auto">

              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-6 sm:px-8 bg-[#D0D4DD] text-black hover:bg-white"
              >
                Explore More
              </Button>

              <Button
                size="lg"
                className="rounded-full px-6 sm:px-8 cursor-pointer"
                >

                Let's Fly
              </Button>

            </div>
          </div>
   

      </div>
    </section>
  );
}