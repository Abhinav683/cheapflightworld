// import Flight from "@/components/flight/flight";
// import FlightFilter from "@/components/flight/filter";

// interface FlightsSearchParams {
//   from?: string;
//   to?: string;
//   date?: string;
// }
// // const pageData = [
// //   {
// //     id:1,
// //     form :"New York (JFK)",
// //     to: "Los Angeles (LAX)",
// //     price: "$350",
// //   },
// //   {
// //     id:2,
// //     form :"Chicago (ORD)",
// //     to: "Miami (MIA)",
// //     price: "$250",
// //   },
// //   {
// //     id:3,
// //     form :"New York (JFK)",
// //     to: "Los Angeles (LAX)",
// //     price: "$350",
// //   },
// //   {
// //     id:4,
// //     form :"Chicago (ORD)",
// //     to: "Miami (MIA)",
// //     price: "$250",
// //   },
// //     {
// //     id:5,
// //     form :"New York (JFK)",
// //     to: "Los Angeles (LAX)",
// //     price: "$350",
// //   },
// //   {
// //     id:6,
// //     form :"Chicago (ORD)",
// //     to: "Miami (MIA)",
// //     price: "$250",
// //     },
// //     {
// //     id:7,
// //     form :"New York (JFK)",
// //     to: "Los Angeles (LAX)",
// //     price: "$350",
// //   },
// //   {
// //     id:8,
// //     form :"Chicago (ORD)",
// //     to: "Miami (MIA)",
// //     price: "$250",

// //     },
// //     {
// //     id:9,
// //     form :"New York (JFK)",
// //     to: "Los Angeles (LAX)",
// //     price: "$350",
// //     }
// // ];
// export default async function FlightsPage({
//   searchParams,
// }: {
//   searchParams?: FlightsSearchParams;
// }) {
//   const params = await searchParams;

//   const from = params?.from?.toUpperCase() || "";
//   const to = params?.to?.toUpperCase() || "";
//   const date = params?.date || "your selected date";

//   return (
//       <div className="w-full h-[100vh] bg-[#F7F5F1] gap-10 flex flex-row justify-center items-start">
//   <div className="w-[80%] bg-[#F7F5F1] m:0 gap-14 flex flex-row relative top-10 lg:top-24 justify-center  items-start mt-10">


//     <div className="hidden md:block ">
//       <FlightFilter />
//     </div>

//     <Flight searchParams={searchParams} />
    
//   </div>
// </div>
//   );
// }


