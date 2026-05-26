"use client"
import CommonPage from "@/components/commonPage"
import { Car,MapPin ,Key  } from "lucide-react";
import StepsSection from "@/components/setpsSection";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
export default function CarRentalPage() {
  const guides = [
    {
      category: "Tips & Tricks",
      title: "Road Trip Essentials",
      desc: "Discover our curated packing lists, navigation tips, and advice for long scenic drives across the country.",
      img: "/carRentalImage2.png",
    },
    {
      category: "Regulations",
      title: "Driving Rules & Laws",
      desc: "Learn essential driving rules, documentation, and local regulations before your journey.",
      img: "/carRentalImage1.png",
    },
    {
      category: "Essentials",
      title: "Trip Preparation",
      desc: "Everything you need for a smooth road trip — from must-have gear to safety tips.",
      img: "/carRentalImage2.png",
    },
    {
      category: "International",
      title: "Driving Abroad",
      desc: "Navigating foreign roads and understanding local laws. A complete guide to renting and driving safely abroad.",
      img: "/carRentalImage1.png",
    },
  ]
  const cars = [
    {
      category: "Compact & Economy",
      title: "Perfect for city driving",
      seats: "4 Seats",
      transmission: "Manual",
      price: "$45 / day",
      img: "https://www-asia.nissan-cdn.net/content/dam/Nissan/in/vehicles/NissanIntelligentChoice/4-Website-Page-1500x664-241224.jpg.ximg.l_full_m.smart.jpg",
    },
    {
      category: "Premium SUV",
      title: "Spacious for family trips",
      seats: "7 Seats",
      transmission: "Automatic",
      price: "$85 / day",
      img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b",
    },
    {
      category: "Luxury Sedan",
      title: "For business & comfort",
      seats: "5 Seats",
      transmission: "Automatic",
      price: "$120 / day",
      img: "https://hips.hearstapps.com/hmg-prod/images/23cc1afc-c03c-4f77-868f-f44144d4167c.jpg?w=768&width=768&q=75&format=webp",
    },
    {
      category: "Convertible",
      title: "Perfect for scenic routes",
      seats: "2 Seats",
      transmission: "Automatic",
      price: "$150 / day",
      img: "https://images.unsplash.com/photo-1502877338535-766e1452684a",
    },
  ]
   const stepsData = [
    {
      icon: <Car size={32} />,
      title: "Choose your car",
      desc: "Browse our extensive premium fleet and select the perfect vehicle for your journey and travel style.",
    },
    {
      icon: <MapPin size={32} />,
      title: "Book instantly",
      desc: "Select a convenient pick-up point from our global network of rental hubs, including major airports and city centers.",
    },
    {
      icon: <Key size={32} />,
      title: "Enjoy ride",
      desc: "Complete a quick check-in process, grab your keys,and start your adventure with absolute peace of mind.",
    },
  ]
  return (

    <main className="w-full flex justify-center items-center flex-col ">
      <CommonPage
        title="Premium Car Rentals"
        subtitle="Hit the road with our diverse fleet. From economy cars to luxury SUVs."
        image="https://www.traveltoindia.org/car_rental_images/car-rental-in-india-banner-1750315717.webp"
        url="https://tpemb.com/content?trs=528777&shmarker=728095.728095&locale=en&default_pick_up_location=Delhi&powered_by=false&border_radius=23&plain=true&color_background=%23ffffff&color_button=%23000000ff&promo_id=5472&campaign_id=57"

      />

        <div className="w-full py-16 flex flex-col items-center gap-10">

        {/* Heading */}
        <div className="text-center max-w-2xl">
          <h2 className="text-4xl font-bold">
            Cars we're offering for rentals
          </h2>
          <p className="text-gray-600 mt-2">
            Discover the perfect ride for your next journey.
          </p>
        </div>

        {/* Carousel */}
        <Carousel className="w-full max-w-6xl">
          <CarouselContent className="-ml-4">

            {cars.map((car, index) => (
              <CarouselItem
                key={index}
                className="pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <div className="bg-[#FFFCF7] rounded-2xl overflow-hidden ">

                  {/* Image */}
                  <div className="h-48 overflow-hidden">
                    <img
                      src={`${car.img}?auto=format&fit=crop&w=800&q=80`}
                      alt={car.category}
                      className="w-full h-full object-cover rounded-lg transition duration-500 hover:scale-110"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col gap-1.5">

                    {/* Category */}
                    <span className="bg-[#EEE9DF] text-xs px-3 py-1 rounded-full w-fit font-medium">
                      {car.category}
                    </span>

                    {/* Title */}
                    <h3 className="font-semibold text-lg">
                      {car.title}
                    </h3>

                    {/* Features */}
                    <div className="text-sm text-gray-600 flex justify-between">
                      <span>{car.seats}</span>
                      <span>{car.transmission}</span>
                    </div>

                    {/* Price */}
                    <div className="mt-2 font-bold text-lg">
                      {car.price}
                    </div>

                  </div>
                </div>
              </CarouselItem>
            ))}

          </CarouselContent>

          {/* Controls */}
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="w-full py-12 flex flex-col items-center gap-8">

        {/* Heading */}
        <div className="text-center max-w-2xl">
          <h2 className="text-4xl font-bold">
            Guides to our car rentals
          </h2>
          <p className="text-gray-600 mt-2">
            Everything you need to know before hitting the open road.
          </p>
        </div>

        {/* Carousel */}
        <Carousel className="w-full max-w-6xl">
          <CarouselContent className="-ml-4">

            {guides.map((item, index) => (
              <CarouselItem
                key={index}
                className="pl-4 md:basis-1/1 lg:basis-1/2"
              >
                <div className="bg-[#FFFCF7] rounded-2xl overflow-hidden flex flex-col md:flex-row h-full">

                  {/* LEFT: TEXT */}
                  <div className="flex flex-col justify-between p-6 w-full md:w-1/2">

                    <div className="space-y-3">

                      {/* Category */}
                      <span className="inline-block bg-[#EEE9DF] text-black text-xs px-3 py-1 rounded-full font-medium">
                        {item.category}
                      </span>

                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-semibold">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    {/* Button */}
                    <button className="mt-6 w-fit text-black font-medium hover:underline flex items-center gap-2 group">
                      Read Guide
                      <span className="transition group-hover:translate-x-1">
                        →
                      </span>
                    </button>

                  </div>

                  {/* RIGHT: IMAGE */}
                  <div className="w-full md:w-1/2 h-[200px] md:h-auto overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                </div>
              </CarouselItem>
            ))}

          </CarouselContent>

          {/* Arrows */}
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <StepsSection
      title="Steps for car rentals"
      subtitle="Fast, simple, and digital process"
      data={stepsData}
    />
    </main>
  );
}
