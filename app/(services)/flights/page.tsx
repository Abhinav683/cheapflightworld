import Flight from "@/components/flight/flight";
import FlightFilter from "@/components/flight/filter";

interface FlightsSearchParams {
  from?: string;
  to?: string;
  date?: string;
}

export default async function FlightsPage({
  searchParams,
}: {
  searchParams?: FlightsSearchParams;
}) {
  const params = await searchParams;

  const from = params?.from?.toUpperCase() || "";
  const to = params?.to?.toUpperCase() || "";
  const date = params?.date || "your selected date";

  return (
      <div className="w-full h-[100vh] bg-[#F7F5F1] gap-10 flex flex-row justify-center items-start">
  <div className="w-[80%] bg-[#F7F5F1] m:0 gap-14 flex flex-row relative top-10 lg:top-24 justify-center  items-start mt-10">


    <div className="hidden md:block ">
      <FlightFilter />
    </div>

    <Flight searchParams={searchParams} />
    
  </div>
</div>
  );
}
