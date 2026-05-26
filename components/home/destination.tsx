"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";

export function Destination() {
  const images = [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    "https://images.unsplash.com/photo-1493558103817-58b2924bce98",
    "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <section className="py-16 flex flex-col items-center gap-12">
      
      {/* Heading */}
      <div className="text-center max-w-2xl">
        <h1 className="font-black text-5xl leading-tight">
          Escape to Top <br /> Vacation Destinations
        </h1>
        <p className="text-muted-foreground mt-4">
          Discover the world's most popular vacation spots.
        </p>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden w-full max-w-6xl" ref={emblaRef}>
        <div className="flex">
          {images.map((img, index) => {
            const isActive = index === selectedIndex;

            return (
              <div
                key={index}
                className="flex-[0_0_80%] sm:flex-[0_0_50%] md:flex-[0_0_33.33%] px-3"
              >
                <div
                  className={`relative h-[420px] rounded-3xl overflow-hidden transition-all duration-500
                  ${isActive ? "scale-100 opacity-100" : "scale-90 opacity-60"}`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-5 left-5 text-white">
                    <h3 className="text-xl font-semibold">
                      Destination {index + 1}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}