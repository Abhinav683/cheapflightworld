import CommonPage from "@/components/commonPage";
  const trendData = [
    {
      id:1,
      name: "The Grand Resort",
      location: "Maldives",
      price: "$450",
      rating: "4.8/5",
      image: "/hotel.jpg",
    },
    {
      id:2,
      name: "Oceanview Suites",
      location: "Bali",
      price: "$300",
      rating: "4.6/5",
      image: "/hotel.jpg",
    },
    {
      id:3,
      name: "The Grand Resort",
      location: "Maldives",
      price: "$450",
      rating: "4.8/5",
      image: "/hotel.jpg",
    },
    {
      id:4,
      name: "Oceanview Suites",
      location: "Bali",
      price: "$300",
      rating: "4.6/5",
      image: "/hotel.jpg",
    },
  ];

    const pageData = {
      heading:"Top destinations for hotels",
      subHeading:"Explore our most popular hotel destinations, loved by our premium members.",
      data:[
    {
      id:1,
      city :"Paris, France",
    package:"1,240 properties"
    },
    {
      id:2,
      city :"Rome, Italy",
    package:"980 properties"
    },
    {
      id:3,
      city :"Paris, France",
    package:"1,150 properties"
    },

    {
      id:4,
      city :"Rome, Italy",
    package:"890 properties"
    },
      {
      id:5,
      city :"Paris, France",
    package:"840 properties"
    },
    {
      id:6,
      city :"Rome, Italy",
    package:"620 properties"
    },
  ]
    
    };

export default function HotelsPage() {
  return (
        <main className="min-h-[calc(100vh-8rem)] w-full text-slate-900  ">
            <CommonPage
              title="Discover your dream vacation"
              subtitle="Curated packages, immersive experiences, and unforgettable journeys."
              image="/hotel.jpg"
              trend="Top trending hotels"
              subTrend="The most sought-after properties by our premium members."
              trendData={trendData}
              pageData={pageData}
            />
        </main>
      );
    }
    
  
