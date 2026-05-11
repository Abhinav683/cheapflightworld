import CommonPage from "@/components/commonPage";
export default function CarRentalPage() {
  return (
    <main className="min-h-[calc(100vh-8rem)] w-full bg-slate-50 text-slate-900 py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-3xl bg-white p-10 shadow-sm border border-slate-200">
        <CommonPage
          title="Car Rental"
          subtitle="Rent a car for your next trip with ease."
          image="/car-rental.jpg"
        />
      </div>
    </main>
  );
}
  