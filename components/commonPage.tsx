"use client";

import SearchBar from "./home/search-bar";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

type CommonPageProps = {
  title: string;
  subtitle?: string;
  image?: string;
  trend?: string;
  subTrend?: string;
  trendData?: Array<{
    id: number;
    name: string;
    location: string;
    price: string;
    rating: string;
    image: string;
  }>;
};

export default function CommonPage({
  title,
  subtitle,
  image,
  trend,
  subTrend,
  trendData = [],
}: CommonPageProps) {
  return (
    <div className="w-full bg-white flex flex-col items-center justify-center">
      {/* Hero Section */}
      {image ? (
        <div className="relative w-full">
          <img
            src={image}
            alt={title}
            className="w-full h-[520px] object-cover"
          />

          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
            <h1 className="text-4xl sm:text-5xl font-bold">{title}</h1>

            {subtitle && (
              <p className="mt-4 max-w-2xl text-sm sm:text-base text-white/90">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-10">
          <h1 className="text-4xl font-bold">{title}</h1>

          {subtitle && (
            <p className="text-muted-foreground mt-3 max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Search Bar */}
      <div className="relative -mt-16 z-20 w-full flex justify-center px-4">
        <SearchBar />
      </div>

      {/* Trending Section */}
      {trendData.length > 0 && (
        <section className="w-full max-w-7xl px-4 py-12">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold">
              {trend}
            </h2>

            {subTrend && (
              <p className="text-muted-foreground mt-2">
                {subTrend}
              </p>
            )}
          </div>
 <Carousel className="w-full  ">
      <CarouselContent className="-ml-1">
        {trendData.map((item) => (
         <CarouselItem
  key={item.id}
  className="basis-[85%] sm:basis-1/2 lg:basis-1/4"
>
  <div className="p-1 h-full">
    <Card className="transition-all duration-300 hover:-translate-y-1 p-2 cursor-pointer">
      
      {/* Image */}
      <CardContent className=" flex flex-col gap-4 p-0">
          <img
            src={item.image}
            alt={item.name}
            className="block h-[190px] w-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
          />

          {/* Rating */}
          <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 shadow-sm backdrop-blur">
            <Star
              size={12}
              fill="black"
              className="text-black"
            />

            <span className="text-xs font-semibold">
              {item.rating}
            </span>
          </div>

        {/* Content */}
        <div className="flex flex-col gap-2">
          <div>
            <h3 className="text-lg font-semibold tracking-tight line-clamp-1">
              {item.name}
            </h3>

            <p className="text-sm text-muted-foreground line-clamp-1">
              {item.location}
            </p>
          </div>

          {/* Price + Button */}
          <div className="mt-2 flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] text-muted-foreground">
                Starting from
              </span>

              <div className="flex items-end gap-1">
                <span className="text-xl font-bold">
                  {item.price}
                </span>

                <span className="mb-[2px] text-xs text-muted-foreground">
                  / night
                </span>
              </div>
            </div>

          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
        
        </section>
      )}
    </div>
  );
}