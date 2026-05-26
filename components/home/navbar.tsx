"use client";

import { Plane, Menu, X ,Bed,TreePalm  ,CarFront ,Repeat } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    // { name: "Flights", href: "/flights" , logo :<Plane size={16}/> },
    { name: "Hotels", href: "/hotels" , logo :<Bed size={16}/> },
    { name: "Vacations", href: "/vacations" , logo :<TreePalm size={16}/> },
    { name: "Car rental", href: "/car-rental" , logo :<CarFront size={16}/> },
    { name: "Transfers", href: "/transfers" , logo :<Repeat  size={16}/> },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 w-full z-50 px-4 sm:px-6 lg:px-12 py-4 transition-all duration-300 ${
        scrolled
          ? "bg-white/50 backdrop-blur-lg shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-evenly gap-[20%] max-w-7xl mx-auto">

        {/* Logo */}
        <div
          className="font-bold text-lg sm:text-2xl whitespace-nowrap  flex-shrink-0  cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Plane className="inline-block mr-2 bg-[#EEE9DF] rounded-full p-1.5" size={30} />
          CheapflightWorld
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 lg:gap-8 text-sm lg:text-base">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex whitespace-nowrap  flex-shrink-0 items-center gap-1.5 transition-colors ${
                    isActive
                      ? "text-black font-semibold "
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                    {item.logo && <span>{item.logo}</span>}
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <button className="bg-black whitespace-nowrap rounded-full
         text-white px-5 py-2 cursor-pointer text-sm sm:text-base shadow-none" 
          >
          Let's Fly
        </button>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-4 mx-2">
          <ul className="flex flex-col gap-4 text-sm">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center whitespace-nowrap  flex-shrink-0  gap-1.5 ${
                      isActive
                        ? "text-black font-semibold"
                        : "text-gray-500"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}