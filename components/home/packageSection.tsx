import { Star ,Plane  } from "lucide-react";

const packages = [
  {
    title: "Santorini Getaway",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    rating: 4.9,
    description:
      "4 nights in a sea-view suite, private sunset cruise, airport pickup, and curated island dining recommendations.",
    price: "$1,480",
  },
  {
    title: "Kyoto Discovery",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    rating: 4.8,
    description:
      "Cultural walks, ryokan stay, tea ceremony booking, and flexible day plans for temples, gardens, and food streets.",
    price: "$1,220",
  },
  {
    title: "Swiss Alps Retreat",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    rating: 5.0,
    description:
      "Panoramic rail journey, chalet accommodation, alpine breakfast, and concierge support from arrival to departure.",
    price: "$1,960",
  },
  
];

export function PackagesSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="bg-[#EEE9DF] inline-flex items-center gap-2 px-3 py-1 font-semibold rounded-full text-sm">
          <Plane  size={16} />
          Traveler stories
        </div>
          <h2 className="mt-3 text-[2.8rem] font-black leading-tight text-black">
            Popular packages for your <br /> next escape
          </h2>

          <p className="mt-4 text-[#6B7280] text-sm leading-relaxed">
            Handpicked itineraries designed for couples, families, and solo travelers who want premium
            stays, smooth transfers, and memorable local experiences.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((item, index) => (
            <div
              key={index}
              className="bg-[#FFFCF7] rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-6 flex flex-col justify-between h-full">
                {/* Title + Rating */}
                <div>
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg text-black">
                      {item.title}
                    </h3>

                    <div className="flex bg-[#EEE9DF] p-1.5 rounded-2xl items-center gap-1 text-sm font-semibold">
                      <Star
                        className="text-[#C89B3C] fill-[#C89B3C]"
                        size={16}
                      />
                      {item.rating}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-sm text-[#6B7280] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom */}
                <div className="mt-6 flex justify-between items-end">
                  <div className="flex items-center gap-1">
                    <p className="text-lg font-bold text-black">
                      {item.price}
                    </p>
                    <p className="text-sm text-[#6B7280]">per person</p>
                  </div>

                  <button className="px-4 py-2 cursor-pointer rounded-full bg-black text-white sm font-semibold">
                    View package
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}