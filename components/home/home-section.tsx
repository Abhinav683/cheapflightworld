import Image from "next/image";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/home/search-bar";
export function HeroSection() {
  return (
    <section className="relative w-full h-screen">

      {/* Background */}
      <Image
        src="/flight.png"
        alt="flight"
        fill
        priority
        className="object-cover"
      />

      {/* Content */}
      <div className="relative z-10 w-full h-[70%] flex flex-col justify-between px-4 sm:px-6 md:px-10 border-300">

        {/* Center */}
        <div className="flex flex-col items-center justify-center text-center flex-1 space-y-4 max-w-2xl mx-auto text-white">

          <p className="tracking-[1px] text-[#42464F] uppercase text-sm font-semibold">
            WANDERLUST AWAITS
          </p>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#6A7181] font-semibold leading-none">
            Luxury.
          </h1>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#1C2534] font-bold leading-none opacity-90">
            Affordable.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#43464D] max-w-md pt-2">
            We believe loyalty you should be rewarded.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
            <Button size="lg" className="rounded-full px-6 sm:px-8">
              Explore More
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-6 sm:px-8 bg-transparent text-white border-white hover:bg-white hover:text-black"
            >
              Let's Fly
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="pb-4 sm:pb-6">
          <SearchBar />
        </div>
      </div>
    </section>
  );
}