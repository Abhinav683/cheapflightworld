

import { HeroSection } from "@/components/home/heroSection"
import { Navbar } from "@/components/home/navbar"
import { Testimonial } from "@/components/home/testimonial"
import BookJourneyCard from "@/components/home/bookJourneyCard"
import { PackagesSection } from "@/components/home/packageSection"
import { Destination } from "@/components/home/destination"
import WhyChooseUs from "@/components/home/whyChooseUs"
import TravelPayoutSearchBar from "@/components/TravelpayoutSearchBar"
import { Footer } from "@/components/home/footer"

export default function HomePage() {

 

  return (
    <main className="w-full overflow-x-hidden">

      <Navbar />
      <HeroSection />
      <TravelPayoutSearchBar url="https://tpemb.com/content?currency=usd&trs=528777&shmarker=728095.728095&locale=en&default_origin=DEL&default_destination=BOM&stops=any&show_hotels=false&powered_by=false&border_radius=23&plain=true&color_button=%23000000ff&color_button_text=%23FFFFFFff&promo_id=3414&campaign_id=111"/>

      {/* TRAVELPAYOUTS FLIGHT WIDGET */}
      <Destination />
      <PackagesSection />
      <WhyChooseUs />
      <Testimonial />
      <BookJourneyCard />
      <Footer />

    </main>
  )    
}
