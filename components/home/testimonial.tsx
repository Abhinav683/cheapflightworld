import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircleHeart } from "lucide-react";

const testimonials = [
  {
    text: "We used Genesis for our family holiday and loved how premium everything felt without making the booking process complicated.",
    name: "Daniel Brooks",
    role: "Family vacation",
    avatar: "/images/user1.jpg",
  },
  {
    text: "We used Genesis for our family holiday and loved how premium everything felt without making the booking process complicated.",
    name: "Sarah Lee",
    role: "Solo traveler",
    avatar: "/images/user2.jpg",
  },
  {
    text: "The destination ideas were strong, the pricing was transparent, and the entire page made it easy to commit to the booking.",
    name: "John Carter",
    role: "Business trip",
    avatar: "/images/user3.jpg",
  },
];

export function Testimonial() {
  return (
    <section className="py-20 flex flex-col items-center gap-12">

      {/* Heading */}
      <div className="text-center max-w-2xl">
        <div className="bg-[#EEE9DF] inline-flex items-center gap-2 px-3 py-1 font-semibold rounded-full text-sm">
          <MessageCircleHeart size={16} />
          Traveler stories
        </div>

        <h1 className="font-black text-[2.8rem] leading-tight mt-4">
          What guests love about the <br />
          experience
        </h1>

        <p className="text-[#6B7280] mt-4 text-sm leading-relaxed">
          Social proof adds confidence to the landing page and helps first-time visitors
          feel more secure about booking premium travel with your brand.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6 w-full">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl bg-[#FFFCF7]"
          >
            {/* Text */}
            <span className="text-[#C89B3C] font-black text-[2.5rem]  ">
                “
              </span>
            <p className="text-[#111827] text-sm leading-relaxed ">

              <span >
                {item.text}
              </span>
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 mt-6">
              <Avatar className="w-10 h-10">
                <AvatarImage src={item.avatar} alt={item.name} />
                <AvatarFallback>
                  {item.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>

              <div>
                <h4 className="font-semibold text-black">{item.name}</h4>
                <p className="text-sm text-gray-500">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}