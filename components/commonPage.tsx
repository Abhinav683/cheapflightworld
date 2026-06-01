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
import { Star, MoveRight } from "lucide-react";

type PageItem = {
  id: string | number;
  form?: string;
  to?: string;
  price?: string;
  city?: string;
  package?: string;
};

type PageSection = {
  heading: string;
  subHeading?: string;
  data: PageItem[];
};

type CommonPageProps = {
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
  pageData?: PageSection;
};

export default function CommonPage({
  title,
  subtitle,
  image,
  trend,
  subTrend,
  trendData = [],
  pageData,
  url,
}: CommonPageProps) {
  const pathname = usePathname();

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
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Search Bar */}
      {url && <TravelPayoutSearchBar url={url} />}

      {trend && (
        <>
          {/* Trending Section */}
          {trendData.length > 0 && (
            <section className="w-full max-w-7xl px-4 py-12">
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold">{trend}</h2>

                {subTrend && (
                  <p className="text-muted-foreground mt-2">{subTrend}</p>
                )}
              </div>

              <Carousel className="w-full">
                <CarouselContent className="-ml-1">
                  {trendData.map((item) => (
                    <CarouselItem
                      key={item.id}
                      className="basis-[85%] sm:basis-1/2 lg:basis-1/4"
                    >
                      <div className="p-1 h-full">
                        <Card className="relative p-2 shadow-sm hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                          <CardContent className="flex flex-col gap-4 p-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="block h-48 w-full object-cover rounded-lg"
                            />

                            <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-white px-2 py-1 shadow">
                              <Star
                                size={12}
                                fill="black"
                                className="text-black"
                              />
                              <span className="text-xs font-semibold">
                                {item.rating}
                              </span>
                            </div>

                            <div className="flex flex-col gap-1 px-1">
                              <div>
                                <h3 className="text-lg font-semibold line-clamp-1">
                                  {item.name}
                                </h3>

                                <p className="text-sm text-muted-foreground line-clamp-1">
                                  {item.location}
                                </p>
                              </div>

                              <div className="flex items-end gap-1">
                                <span className="text-xl font-bold">
                                  {item.price}
                                </span>

                                <span className="mb-0.5 text-xs text-muted-foreground">
                                  / night
                                </span>
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

          {/* Page Data Section */}
          {pageData && (
            <div className="bg-[#EEE9DF] w-full flex flex-col items-center gap-2 py-10 px-4 text-center mt-20">
              <h3 className="font-bold text-4xl sm:text-5xl">
                {pageData.heading}
              </h3>

              {pageData.subHeading && (
                <p className="text-gray-500 my-3">{pageData.subHeading}</p>
              )}

              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-6 justify-items-center">
                {pageData.data.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white w-[80%] m-2 p-4 rounded-lg flex items-center justify-between"
                  >
                    {pathname === "/flights" && (
                      <>
                        <span>{item.form}</span>

                        <MoveRight
                          size={16}
                          className="inline-block text-gray-400"
                        />

                        <span>{item.to}</span>

                        <span className="text-gray-400 text-xs">
                          From {item.price}
                        </span>
                      </>
                    )}

                    {(pathname === "/vacations" ||
                      pathname === "/hotels") && (
                      <div className="flex flex-col">
                        <span className="font-bold">{item.city}</span>

                        <span className="text-gray-400">
                          {item.package}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}