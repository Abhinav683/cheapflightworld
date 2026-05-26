"use client";

import { useEffect, useState } from "react";
import CommonPage from "@/components/commonPage";

export default function VacationPage() {
  const [loading, setLoading] = useState(true);

  const url =
    "https://tpemb.com/content?currency=INR&trs=528499&shmarker=728095.728095&locale=en&city_id=145&category=2&amount=3&powered_by=false&campaign_id=137&promo_id=4497";

  useEffect(() => {
    const container = document.getElementById("widget");

    if (!container) return;

    // 🧹 cleanup before adding script
    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = url;
    script.charset = "utf-8";
    script.async = true;

    script.onload = () => {
      setLoading(false);
    };

    script.onerror = () => {
      console.error("Widget failed to load");
      setLoading(false);
    };

    container.appendChild(script);

    // ✅ cleanup on unmount
    return () => {
      container.innerHTML = "";
    };
  }, [url]);

  const pageData = {
    heading: "Top destinations for vacations",
    subHeading:
      "Explore our most popular vacation destinations, loved by our premium members.",
    data: [
      { id: 1, city: "Paris, France", package: "840 packages" },
      { id: 2, city: "Rome, Italy", package: "620 packages" },
      { id: 3, city: "Bali, Indonesia", package: "500 packages" },
      { id: 4, city: "Dubai, UAE", package: "710 packages" },
      { id: 5, city: "Maldives", package: "300 packages" },
      { id: 6, city: "New York, USA", package: "950 packages" },
    ],
  };

  return (
    <main className="min-h-[calc(100vh-8rem)] w-full text-slate-900">
      <CommonPage
        title="Discover your dream vacation"
        subtitle="Curated packages, immersive experiences, and unforgettable journeys."
        image="/vacation.jpg"
        pageData={pageData}
      />

      {/* ✅ Widget Section */}
      <section className="mt-16 max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">
          Featured Travel Deals
        </h2>

        {loading && (
          <p className="text-gray-500 animate-pulse">
            Loading travel deals...
          </p>
        )}

        <div id="widget" className="w-full min-h-[300px]" />
      </section>
    </main>
  );
}