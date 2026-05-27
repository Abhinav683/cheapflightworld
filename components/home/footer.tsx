import Link from "next/link"; 

export function Footer() {
  return (
    <footer className="w-full bg-white border-t p-2">
      <div className="w-full px-4 sm:px-6 lg:px-10 py-14">
        
         <div className="flex flex-wrap justify-between gap-y-10 gap-x-6">
          
           <div className="w-full sm:w-[48%] lg:w-[28%]">
            <h2 className="text-2xl font-bold text-black">
              CheapFlightWorld
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#6B7280]">
              Genesis creates premium travel journeys with refined
              planning, memorable stays, and a smooth booking
              experience built for modern explorers.
            </p>
          </div>

           <div className="min-w-[140px]">
            <h3 className="font-semibold text-black mb-4">
              Company
            </h3>

            <ul className="space-y-3 text-sm text-gray-500">
              <Link href="/about" className="hover:text-black cursor-pointer transition">
                About
              </Link>
              
              <li className="hover:text-black cursor-pointer transition">
                Careers
              </li>

               <Link href="/blog" className="hover:text-black cursor-pointer transition">
                Blog
              </Link>

              <li className="hover:text-black cursor-pointer transition">
                Press
              </li>
            </ul>
          </div>

           <div className="min-w-[140px]">
            <h3 className="font-semibold text-black mb-4">
              Destinations
            </h3>

            <ul className="space-y-3 text-sm text-gray-500">
              <li className="hover:text-black cursor-pointer transition">
                Dubai
              </li>

              <li className="hover:text-black cursor-pointer transition">
                New York
              </li>

              <li className="hover:text-black cursor-pointer transition">
                Paris
              </li>

              <li className="hover:text-black cursor-pointer transition">
                Tokyo
              </li>
            </ul>
          </div>

           <div className="min-w-[140px]">
            <h3 className="font-semibold text-black mb-4">
              Support
            </h3>

            <ul className="space-y-3 text-sm text-gray-500">
              <li className="hover:text-black cursor-pointer transition">
                Help Center
              </li>

              <li className="hover:text-black cursor-pointer transition">
                Contact Us
              </li>

              <li className="hover:text-black cursor-pointer transition">
                Refund Policy
              </li>

              <li className="hover:text-black cursor-pointer transition">
                Cancellation
              </li>
            </ul>
          </div>

           <div className="min-w-35">
            <h3 className="font-semibold text-black mb-4">
              Resources
            </h3>

            <ul className="space-y-3 text-sm text-gray-500">
              <li className="hover:text-black cursor-pointer transition">
                Travel Guide
              </li>

              <li className="hover:text-black cursor-pointer transition">
                Offers
              </li>

              <Link href="/faq" className="hover:text-black cursor-pointer transition">
                FAQs
              </Link>

              <li className="hover:text-black cursor-pointer transition">
                Terms
              </li>
            </ul>
          </div>
        </div>

         <div className="mt-12 border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <p className="text-sm text-gray-400 text-center md:text-left">
            © 2026 CheapFlightWorld. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-gray-400">
            <span className="hover:text-black cursor-pointer transition">
              Privacy
            </span>

            <span className="hover:text-black cursor-pointer transition">
              Terms
            </span>

            <span className="hover:text-black cursor-pointer transition">
              Cookies
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}