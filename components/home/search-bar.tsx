"use client";

import { MapPin, CalendarDays, Users ,ArrowRightLeft } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

function FloatingInput({
  label,
  icon: Icon,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  icon: any;
  type?: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  const [focus, setFocus] = useState(false);

  // ✅ FIX: date inputs should always float
  const isActive = focus || value || type === "date";

  return (
    <div className="relative flex items-center gap-3  w-full px-4 py-3 rounded-[1.5rem] cursor-text bg-[#F7F5F1]">
      <Icon className="w-5 h-5 text-gray-500" />

      <div className="relative w-full ">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className="w-full bg-transparent outline-none text-sm pt-4"
        />

        <label
          className={`absolute left-0 transition-all duration-200 ease-in-out pointer-events-none
            ${
              isActive
                ? "top-0 text-xs text-gray-500"
                : "top-1/2 -translate-y-1/2 text-sm text-gray-400"
            }
          `}
        >
          {label}
        </label>
      </div>
    </div>
  );
}

export default function SearchBar() {
  const [tripType, setTripType] = useState<"round" | "oneway">("round");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departure, setDeparture] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async () => {
    if (!from || !to || !departure) {
      alert("Please fill in all required fields");
      return;
    }

    if (!/^[A-Z]{3}$/.test(from.toUpperCase()) || !/^[A-Z]{3}$/.test(to.toUpperCase())) {
      alert("Please enter valid 3-letter airport codes (e.g., JFK, LAX, LHR)");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/flights/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin: from,
          destination: to,
          date: departure,
        }),
      });
      console.log("Search response:", response);
      const data = await response.json();

      if (response.ok) {
        router.push(`/flights?from=${from}&to=${to}&date=${departure}`);
      } else {
        alert(`Search failed: ${data.details || data.error}`);
      }
    } catch (error) {
      console.error("Search error:", error);
      alert("Error searching for flights");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-[1.5rem]  border p-2 flex flex-col gap-2">

      {/* ✅ RADIO TOGGLE (REAL FEEL) */}
      <div className="flex gap-4 px-3 py-1 ">

        {/* Round Trip */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="trip"
            checked={tripType === "round"}
            onChange={() => setTripType("round")}
            className="hidden"
          />

          {/* Custom radio UI */}
          <div
            className={`w-4 h-4 rounded-full border flex items-center justify-center
              ${tripType === "round" ? "border-black" : "border-gray-400"}
            `}
          >
            {tripType === "round" && (
              <div className="w-2 h-2 bg-black rounded-full" />
            )}
          </div>

          <span className="text-sm font-medium">Round Trip</span>
        </label>

        {/* One Way */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="trip"
            checked={tripType === "oneway"}
            onChange={() => setTripType("oneway")}
            className="hidden"
          />

          <div
            className={`w-4 h-4 rounded-full border flex items-center justify-center
              ${tripType === "oneway" ? "border-black" : "border-gray-400"}
            `}
          >
            {tripType === "oneway" && (
              <div className="w-2 h-2 bg-black rounded-full" />
            )}
          </div>

          <span className="text-sm font-medium">One Way</span>
        </label>
      </div>

      {/* ✅ SEARCH BAR */}
      <div className="flex flex-col gap-2 md:flex-row items-center  rounded-[2xl]
       overflow-hidden">

        <FloatingInput label="From (3-letter code)" icon={MapPin} value={from} onChange={setFrom} />
        <div className="rounded-full">
          <ArrowRightLeft className=" bg-black rounded-full  text-white p-1" />
        </div>
        <FloatingInput label="To (3-letter code)" icon={MapPin} value={to} onChange={setTo} />

        <FloatingInput label="Departure" icon={CalendarDays} type="date" value={departure} onChange={setDeparture} />

        {tripType === "round" && (
          <FloatingInput label="Return" icon={CalendarDays} type="date" />
        )}

        <FloatingInput label="Travellers" icon={Users} />

        <button 
          onClick={handleSearch}
          disabled={loading}
          className="bg-black text-white px-6 py-3 m-2 rounded-full hover:bg-gray-800 transition disabled:opacity-50">
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
    </div>
  );
}