"use client";

import { motion } from "framer-motion";
import FlyingPlane from "./flyingPlane";
import { useEffect, useState } from "react";
import FlightFilter from "@/components/flight/filter";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Funnel   } from "lucide-react";
import { useRouter } from "next/navigation"; 
interface FlightData {
  id: string;
  airline: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  departureTime: string;
  departureDate: string;
  arrivalTime: string;
  arrivalDate: string;
  totalTime: string;
  price: string;
  logo?: string;
}

interface FlightProps {
  searchParams?: {
    from?: string;
    to?: string;
    date?: string;
  };
}

export default function Flight({ searchParams }: FlightProps) {
  const [flights, setFlights] = useState<FlightData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>("Waiting to fetch flight data...");
  const router = useRouter();
  
  useEffect(() => {
    console.log("Flight component mounted with searchParams:", searchParams);
    setStatusMessage("Flight component mounted");

    const fetchFlights = async () => {
      if (!searchParams?.from || !searchParams?.to || !searchParams?.date) {
        console.log("No search params found, rendering default flight.");
        // Show demo flight if no search params
        setFlights([
          {
            id: "1",
            airline: "Airline A",
            flightNumber: "AA123",
            departure: `${searchParams?.from || "New York"} (JFK)`,
            arrival: `${searchParams?.to || "Los Angeles"} (LAX)`,
            departureTime: "08:00 AM",
            departureDate: searchParams?.date || "2026-07-01",
            arrivalTime: "11:00 AM",
            arrivalDate: searchParams?.date || "2026-07-01",
            totalTime: "6h",
            price: "$300",
          },
        ]);
        setLoading(false);
        return;
      }

      try {
        setStatusMessage("Fetching flight data...");
        const response = await fetch("/api/flights/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            origin: searchParams?.from?.toUpperCase(),
            destination: searchParams?.to,
            date: searchParams?.date,
          }),
        });

        console.log("API Response Status:", response.status, response.ok);
        setStatusMessage(`API response received: ${response.status}`);

        if (!response.ok) {
          const errorBody = await response.text();
          console.error("Fetch failed body:", errorBody);
          throw new Error(`Failed to fetch flights (${response.status})`);
        }

        const data = await response.json();
        console.log("API Response:", data);
        setStatusMessage("Flight data loaded successfully");

        // Transform API response to match our display format
        if (data.offers && Array.isArray(data.offers)) {
          const transformedFlights = data.offers.slice(0, 5).map((offer: any, index: number) => ({
            id: offer.id || String(index),
            airline: offer.slices?.[0]?.segments?.[0]?.operating_carrier?.name || "Airline",
            flightNumber: offer.slices?.[0]?.segments?.[0]?.operating_carrier?.iata_code || "N/A",
            departure: searchParams?.from || "New York",
            arrival: searchParams.to,
            departureTime: offer.slices?.[0]?.departure_at?.split("T")[1]?.slice(0, 5) || "N/A",
            departureDate: searchParams.date,
            arrivalTime: offer.slices?.[0]?.arrival_at?.split("T")[1]?.slice(0, 5) || "N/A",
            arrivalDate: offer.slices?.[0]?.arrival_at?.split("T")[0] || searchParams.date,
            totalTime: calculateDuration(
              offer.slices?.[0]?.departure_at,
              offer.slices?.[0]?.arrival_at
            ),
            price: offer.base_amount ? `$${offer.base_amount}` : "$0",
          }));
          setFlights(transformedFlights.length > 0 ? transformedFlights : [getDefaultFlight(searchParams)]);
        } else {
          setFlights([getDefaultFlight(searchParams)]);
        }
      } catch (err) {
        console.error("Error fetching flights:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch flights");
        setFlights([getDefaultFlight(searchParams)]);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [searchParams]);

  const calculateDuration = (departure: string, arrival: string): string => {
    try {
      const start = new Date(departure);
      const end = new Date(arrival);
      const diffMs = end.getTime() - start.getTime();
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      return `${diffHours}h ${diffMins}m`;
    } catch {
      return "N/A";
    }
  };
  console.log("Flight component rendered with flights:", flights, "loading:", loading, "error:", error);
  return (
<div className="flex-1 flex flex-col">     
          <Sheet >
            <SheetTrigger className="px-4 py-2 text-black lg:hidden">
           <Funnel   /> 
            </SheetTrigger>

            <SheetContent className="w-full">
              <FlightFilter />
            </SheetContent>
          </Sheet>

      {!loading && flights.map((flight) => (
        <div key={flight.id} className="w-full  flex justify-center items-center">
          <div className="w-full max-w-5xl bg-white rounded-2xl shadow-md p-4 
           flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">

            {/* Airline */}
            <div className="flex flex-row md:flex-col items-center gap-3 w-full md:w-auto">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-300 rounded-md flex items-center justify-center">
                <span className="text-xs font-bold">{flight.airline.slice(0, 2)}</span>
              </div>
              <div className="text-center md:text-left">
                <p className="font-semibold text-gray-800 text-sm sm:text-base">{flight.airline}</p>
                <p className="text-xs sm:text-sm text-gray-500">{flight.flightNumber}</p>
              </div>
            </div>

            {/* Departure */}
            <div className="text-center w-full md:w-auto">
              <p className="text-xs sm:text-sm text-gray-500">{flight.departure}</p>
              <p className="text-base sm:text-lg font-semibold">{flight.departureTime}</p>
              <p className="text-[10px] sm:text-xs text-gray-400">{flight.departureDate}</p>
            </div>

            <div></div>

            {/* Flight Path */}
            <div className="flex flex-col justify-start items-center flex-1 w-full">
              <FlyingPlane totalTime={flight.totalTime} />
              <p className="text-[10px] sm:text-xs text-gray-400 mt-2">{flight.totalTime}</p>
              <p className="text-[10px] sm:text-xs text-gray-400">Non-stop</p>
            </div>

            {/* Arrival */}
            <div className="text-center w-full md:w-auto">
              <p className="text-xs sm:text-sm text-gray-500">{flight.arrival}</p>
              <p className="text-base sm:text-lg font-semibold">{flight.arrivalTime}</p>
              <p className="text-[10px] sm:text-xs text-gray-400">{flight.arrivalDate}</p>
            </div>
            <div className="hidden md:block w-px h-[6rem] bg-gray-300" />
     

            {/* Price */}
            <div className="flex flex-col items-center gap-2 w-full md:w-auto">
              <p className="text-lg sm:text-xl font-bold text-gray-800">{flight.price}</p>
              <button className="w-full md:w-auto bg-black text-white px-5 py-2 rounded-full 
              cursor-pointer shadow-lg text-sm sm:text-base hover:bg-gray-800 transition"
              onClick={() => router.push(`flight-checkout`)}>
                Select      
                        </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function getDefaultFlight(searchParams?: { from?: string; to?: string; date?: string }): FlightData {
  return {
    id: "1",
    airline: "Demo Airline",
    flightNumber: "DM001",
    departure: searchParams?.from || "New York",
    arrival: searchParams?.to || "Los Angeles",
    departureTime: "08:00 AM",
    departureDate: searchParams?.date || "2026-07-01",
    arrivalTime: "11:00 AM",
    arrivalDate: searchParams?.date || "2026-07-01",
    totalTime: "6h",
    price: "$300",
  };
}
