import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator";
import { Gem, Earth, ShieldCheck, Leaf } from "lucide-react";
const stats = [
  { label: "Users", value: "1M+" },
  { label: "Customer Reached", value: "120" },
  { label: "Happy Tavellers", value: "50K" }
]

const values = [
  {
    title: "Refined Luxury",
    desc: "We curate only the most exceptional properties and premium services to ensure absolute comfort.",
    logo: <Gem />
  },
  {
    title: "Unwavering Trust",
    desc: "Reliability is our cornerstone. We manage every detail so you can travel with complete peace of mind.",
    logo: <ShieldCheck />
  },
  {
    title: "Global Expertise",
    desc: "Our on-the-ground partners around the world unlock exclusive access to hidden gems and authentic cultures.",
    logo: <Earth />
  },
  {
    title: "Sustainable Travel",
    desc: "We are committed to preserving the beauty of our planet by partnering with eco-conscious providers.",
    logo: <Leaf />
  },
]
export default function AboutPage() {
  return (
    <div className="w-full flex flex-col items-center">

      <section className="w-full bg-[#F7F5F1] py-20 flex flex-col items-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Elevating Your Journey
        </h1>
        <p className="mt-6 max-w-2xl text-muted-foreground text-lg">
          We believe that travel is more than just reaching a destination. It's
          about the extraordinary moments curated along the way.
        </p>
      </section>

      <section className="max-w-6xl w-full py-20 px-6 grid md:grid-cols-2 gap-12 items-center">

        <div className="relative w-full rounded-2xl overflow-hidden">
          <img
            src="about.jpg"
            alt="travel"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="bg-[#EEE9DF] text-[#333] px-4 py-2 my-4 w-fit  rounded-full">Our Story</span>
          <h2 className="text-3xl font-bold font-serif mb-4">Redefining the art of global
            exploration.</h2>
          <p className="text-muted-foreground leading-relaxed text-gray-900">
            Founded on a passion for impeccable service and unparalleled experiences, Genesis
            Travel was created to bridge the gap between ordinary trips and extraordinary
            journeys. From our humble beginnings coordinating bespoke European tours, we have
            grown into a premier global travel partner.
          </p>

          <p className="text-muted-foreground leading-relaxed text-gray-900">
            Our dedicated team of travel artisans works tirelessly to source the finest
            accommodations, the most seamless transfers, and exclusively tailored itineraries
            that cater to the discerning modern explorer.
          </p>

          <Separator className="my-3" />


          <div className="grid grid-cols-2 mt-3 md:grid-cols-3 gap-6">
            {stats.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-between justify-between w-full"
              >
                <p className="text-2xl font-bold ">{item.value}</p>
                <p className="text-muted-foreground whitespace-nowrap">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>



      <section className="max-w-6xl w-full py-20 px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold text-cente">
            Our Core Values
          </h2>
          <p className="text-sm text-muted-foreground">
            The principles that guide every itinerary we craft and every service we provide.
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {values.map((value, i) => (
            <Card key={i} className="rounded-2xl  border-none shadow-sm">
              <CardContent className="px-4 flex flex-col gap-1">

                <div className="bg-[#EEE9DF]  text-[#ffc01d] w-fit p-1 rounded-lg ">
                  {value.logo}
                </div>

                <h3 className="font-semibold text-lg">
                  {value.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.desc}
                </p>

              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="w-full  flex justify-center items-center ">
        <div className="w-[80%] flex flex-col gap-8">
          <div>

            <h2 className="text-3xl font-semibold">
              Meet the Leadership
            </h2>
            <p>The visionaries dedicated to perfecting your travel experience.</p>
          </div>
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((_, i) => (
              <div className=" text-center">
                <img
                  src="/hotel.jpg"
                  alt="team"
                  className="object-cover rounded-lg"
                />
                <h3 className="font-semibold text-2xl my-1">John Doe</h3>
                <p className="text-muted-foreground text-sm">
                  Product Designer
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 text-center px-6">
        <h2 className="text-3xl font-semibold mb-4">
          Ready to explore the world?
        </h2>
        <p className="text-muted-foreground mb-6">
          Book flights and start your journey today.
        </p>
        <Button size="lg" className="rounded-full px-8">
          Get Started
        </Button>
      </section>

    </div>
  )
}