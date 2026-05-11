import CommonPage from "@/components/commonPage";
export default function VacationPage() {
  return (
    <main className="min-h-[calc(100vh-8rem)] w-full text-slate-900  ">
        <CommonPage
          title="Discover your dream vacation"
          subtitle="Curated packages, immersive experiences, and unforgettable journeys."
          image="/vacation.jpg"
        />
    </main>
  );
}
