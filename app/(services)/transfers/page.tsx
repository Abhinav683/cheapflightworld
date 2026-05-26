// "use client"
// import CommonPage from "@/components/commonPage"
// import { useEffect } from "react"
// export default function TransferPage() {
//   useEffect(() => {
//     const container = document.getElementById("transfer-widget")

//     // Prevent adding script twice
//     if (container && container.childElementCount === 0) {
//       const script = document.createElement("script")
//       script.src = "https://tpemb.com/content?currency=USD&trs=528499&shmarker=728095&locale=en&from=delhi&to=mumbai&country=India&powered_by=false&transfer_options_limit=20&transfer_options=MCR&disable_currency_selector=false&hide_form_extras=true&hide_external_links=true&campaign_id=1&promo_id=3879"
//       script.charset = "utf-8"
//       script.async = true
//       container.appendChild(script)
//     }
//   }, [])
//   return (

//     <main className="w-full flex justify-center items-center flex-col ">
//       <CommonPage
//         title="Seamless Airport Transfers"
//         subtitle="Start and end your journey with our reliable and comfortable transfer services."
//         image="https://www.taxi-airporttransfer-tirol.com/view/uploads/6547925b8d84c169918933950.webp"
//         trend="Where you can find airport taxi"
//         subTrend="We operate in major airports worldwide to ensure a seamless connection."
//       />
//       <div
//         id="transfer-widget"
//         className="rounded-2xl shadow-lg w-full relative bottom-55"
//       />
//     </main>
//   );
// }


"use client"
import CommonPage from "@/components/commonPage"
import { useEffect } from "react"
import StepsSection from "@/components/setpsSection";
import { CalendarClock ,UserCheck  ,Map   } from "lucide-react";
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
const trendData = [
  {
    id: 1,
    name: "The Grand Resort",
    location: "Maldives",
    price: "$450",
    rating: "4.8/5",
    image: "/hotel.jpg",
  },
  {
    id: 2,
    name: "Oceanview Suites",
    location: "Bali",
    price: "$300",
    rating: "4.6/5",
    image: "/hotel.jpg",
  },
  {
    id: 3,
    name: "The Grand Resort",
    location: "Maldives",
    price: "$450",
    rating: "4.8/5",
    image: "/hotel.jpg",
  },
  {
    id: 4,
    name: "Oceanview Suites",
    location: "Bali",
    price: "$300",
    rating: "4.6/5",
    image: "/hotel.jpg",
  },
];

const pageData = {
  heading: "Top destinations for hotels",
  subHeading: "Explore our most popular hotel destinations, loved by our premium members.",
  data: [
    {
      id: 1,
      city: "Paris, France",
      package: "1,240 properties"
    },
    {
      id: 2,
      city: "Rome, Italy",
      package: "980 properties"
    },
    {
      id: 3,
      city: "Paris, France",
      package: "1,150 properties"
    },

    {
      id: 4,
      city: "Rome, Italy",
      package: "890 properties"
    },
    {
      id: 5,
      city: "Paris, France",
      package: "840 properties"
    },
    {
      id: 6,
      city: "Rome, Italy",
      package: "620 properties"
    },
  ]

};
   const stepsData = [
    {
      icon: <CalendarClock size={32} />,
      title: "Choose your car",
      desc: "Browse our extensive premium fleet and select the perfect vehicle for your journey and travel style.",
    },
    {
      icon: <UserCheck size={32} />,
      title: "Book instantly",
      desc: "Select a convenient pick-up point from our global network of rental hubs, including major airports and city centers.",
    },
    {
      icon: <Map size={32} />,
      title: "Enjoy ride",
      desc: "Complete a quick check-in process, grab your keys,and start your adventure with absolute peace of mind.",
    },
  ] 

  const airports = [
    {
      city: "London",
      codes: "LHR, LGW, STN",
      image:
        "https://www.visitlondon.com/-/media/images/london/visit/general-london/london-panoramic-1280x720.jpg?rev=7c120e60feb14b52be2d1cfb71f54d25&mw=800&hash=E5BAE754E72DDA45F26625BAA7BE6678",
    },
    {
      city: "New York",
      codes: "JFK, EWR, LGA",
      image:
        "https://www.flightgift.com/media/wp/FG/2023/12/shutterstock_248799484-scaled.webp",
    },
    {
      city: "Paris",
      codes: "CDG, ORY",
      image:
        "https://res.klook.com/image/upload/fl_lossy.progressive,q_60/Mobile/City/swox6wjsl5ndvkv5jvum.jpg",
    },
    {
      city: "Dubai",
      codes: "DXB, DWC",
      image:
        "https://saishishirtours.in/wp-content/uploads/2024/12/The-Dubai-Museum-of-the-Future.webp",
    },
  ]
export default function TransferPage() {
  return (

    <main className="w-full flex justify-center items-center flex-col">

      <CommonPage
        title="Premium Car Rentals"
        subtitle="Hit the road with our diverse fleet. From economy cars to luxury SUVs."
        image="https://www.taxi-airporttransfer-tirol.com/view/uploads/6547925b8d84c169918933950.webp"

        url="https://tpemb.com/content?currency=USD&trs=528499&shmarker=728095&language=en&from=delhi&to=mumbai&theme=1&powered_by=false&campaign_id=1&promo_id=1486"

      />

   <StepsSection
      title="How does airport transfer work"
      subtitle="A simple, stress-free process from booking to arriving at your destination."
      data={stepsData}
    />
     <section className="py-12 flex flex-col gap-8 items-center">

      {/* Heading */}
      <div className="text-center max-w-2xl">
        <h2 className="text-4xl font-bold">
          Where you can find airport taxi
        </h2>
        <p className="text-gray-600 mt-2">
          We operate in major airports worldwide to ensure a seamless connection.
        </p>
      </div>

      {/* Carousel */}
      <div className="w-full max-w-6xl">
        <Carousel opts={{ align: "start" }} className="w-full">
          
          <CarouselContent>
            {airports.map((item, i) => (
              <CarouselItem
                key={i}
                className="basis-full sm:basis-1/2 md:basis-1/4"
              >
               <div className="w-full h-40 relative rounded-xl overflow-hidden">

  {/* Image */}
  <img
    src={item.image}
    alt={item.city}
    className="object-cover"
  />

  {/* Dark Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />

  {/* Bottom Text */}
  <div className="absolute bottom-2 left-2 right-2 z-20 text-white">
    <p className="font-semibold text-lg">{item.city}</p>
    <p className="text-xs opacity-90">{item.codes}</p>
  </div>

</div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
    </main>
  );
}
