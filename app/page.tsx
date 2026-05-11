import Image from "next/image";
import { HeroSection } from "@/components/home/heroSection";
import { Navbar } from "@/components/home/navbar";
import { Testimonial } from "@/components/home/testimonial";
import { TrustedBy } from "@/components/home/trustedby";
import { Footer } from "@/components/home/footer";
import BookJourneyCard from "@/components/home/bookJourneyCard";
import { PackagesSection } from "@/components/home/packageSection";
import { Destination } from "@/components/home/destination";
import WhyChooseUs from "@/components/home/whyChooseUs";
export default function HomePage() {
  return (
    <main className="w-full overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <TrustedBy/>
      <Destination/>
      <PackagesSection/>
      <WhyChooseUs/>
      <Testimonial/>
      <BookJourneyCard/>
    </main>
  );
}