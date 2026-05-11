"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function Destination() {
  const images = [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    "https://images.unsplash.com/photo-1493558103817-58b2924bce98",
    "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1",
  ];

  return (
    <section className="py-10 flex flex-col items-center gap-12">
      
      {/* Heading */}
      <div className="text-center max-w-2xl">
        <h1 className="font-black text-4xl leading-tight">
          Escape to Top <br />
          Vacation Destinations
        </h1>

        <p className="text-[#6B7280] mt-4 text-sm leading-relaxed">
          Discover the world's most popular vacation spots, from tropical beaches
          to vibrant cityscapes, perfect for creating unforgettable memories.
        </p>
      </div>

      {/* Carousel */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-6xl"
      >
        <CarouselContent className="-ml-4">
          {images.map((img, index) => (
            <CarouselItem
              key={index}
              className="pl-4 basis-[85%] sm:basis-1/2 md:basis-1/4"
            >
              <div className="h-[360px] rounded-2xl overflow-hidden group">
                <img
                  src={img}
                  alt={`Destination ${index + 1}`}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Buttons */}
        <CarouselPrevious className="left-[-50px]" />
        <CarouselNext className="right-[-50px]" />
      </Carousel>
    </section>
  );
}