"use client";
import { usePathname } from "next/navigation";
import TravelPayoutSearchBar from "./TravelpayoutSearchBar";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MoveRight } from "lucide-react";
import path from "path";
type PageSection<T> = {
  heading: string;
  subHeading?: string;
  data: T[];
};
type CommonPageProps<T = unknown> = {
  title: string;
  subtitle?: string;
  image?: string;
  trend?: string;
  subTrend?: string;
  url?: string;
  trendData?: {
    id: number;
    name: string;
    location: string;
    price: string;
    rating: string;
    image: string;
  }[];
  pageData?: PageSection<T>;
};



export default function CommonPage<T>({
  title,
  subtitle,
  image,
  trend,
  subTrend,
  trendData = [],
  pageData,
  url,
}: CommonPageProps<T>) {
  const pathname = usePathname();
  console.log(pathname, "page pathname");
  return (
    <div className="w-full bg-white flex flex-col  items-center justify-center">
      {/* Hero Section */}
      {image ? (
        <div className="relative w-full">
          <img
            src={image}
            alt={title}
            className="w-full h-130 object-cover"
          />

          <div className="absolute " />

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

    { url && <TravelPayoutSearchBar url={url} />}
    { trend && <>
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
                    <Card className="transition-all duration-300 shadow-sm hover:-translate-y-1 p-2 cursor-pointer">

                      {/* Image */}
                      <CardContent className=" flex flex-col gap-4 p-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="block h-47.5 w-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
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
                        <div className="flex flex-col gap-1">
                          <div>
                            <h3 className="text-lg font-semibold tracking-tight line-clamp-1">
                              {item.name}
                            </h3>

                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {item.location}
                            </p>
                          </div>

                          {/* Price + Button */}
                          <div className="flex items-end justify-between">
                            <div className="flex flex-col">


                              <div className="flex items-end gap-1">
                                <span className="text-xl font-bold">
                                  {item.price}
                                </span>

                                <span className="mb-0.5 text-xs text-muted-foreground">
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


      <div className="bg-[#EEE9DF] w-full flex mt-20 justify-center items-center flex-col gap-2 py-10 px-4 text-center">
        <h3 className="font-bold text-5xl">{pageData?.heading}</h3>
        <p className="text-gray-500 my-3">{pageData?.subHeading}</p>

        <div className=" w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-6 justify-items-center">
          {
            pageData?.data?.map((item) => {
              return (
                <div key={item.id} className="bg-white w-[80%]  m-2 p-4 rounded-lg  flex items-center justify-between">
                  {pathname === "/flights" && (
                    <>
                      <span>  {item.form} </span>
                      <MoveRight size={16} className="inline-block text-gray-400" />
                      <span> {item.to}</span>
                      <span className="text-gray-400 text-xs">
                        From {item.price}
                      </span>
                    </>)}

                  {(pathname === "/vacations" || pathname === "/hotels") && (
                    <div className="flex flex-col">
                      <span className="font-bold">{item.city}</span>
                      <span className="text-gray-400">{item.package}</span>
                    </div>
                  )}
                </div>
              )
            })
          }
        </div>
      </div></>}
    </div>
  );
}