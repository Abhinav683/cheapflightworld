"use client";
import { Sparkles,MoveLeft , ShieldCheck } from 'lucide-react';
import { useRouter } from "next/navigation";
import { Separator } from '@/components/ui/separator';
export default function FlightCheckoutPage() {
    const router = useRouter();
    return (
        <main className="w-full min-h-screen bg-gray-50 text-slate-900 py-28 flex justify-center">
            <div className='w-[65%] flex gap-8 flex-col ' >
            <button className='cursor-pointer w-fit border flex gap-2 items-center px-2 py-1 rounded-full'
                 onClick={() => router.back()}>

               <MoveLeft size={16}  /> Back to search results</button>
                <div className="w-full max-w-4xl space-y-8 px-4">

                    {/* Heading */}
                    <h1 className="text-3xl font-semibold tracking-tight">
                        Review your flight
                    </h1>

                    {/* Card */}
                    <div className="w-full bg-white rounded-2xl p-6 space-y-6">

                        {/* Tag */}
                        <div className="text-[12px] flex gap-2 rounded-full w-fit px-4 py-1 bg-[#EEE9DF] font-bold">
                            <Sparkles size={16} /> <span>Best price & duration</span>
                        </div>

                        {/* Flight Row */}
                        <div className="flex items-center w-full ">

                            {/* Airline */}
                            <div className="flex items-center gap-4  min-w-[180px]">
                                <div className="w-10 h-10 rounded-md bg-[#EEE9DF] flex items-center justify-center text-sm font-semibold">
                                    BA
                                </div>

                                <div>
                                    <p className="font-semibold">British Airways</p>
                                    <p className="text-xs text-gray-400 tracking-wide">
                                        BA 178 • Economy
                                    </p>
                                </div>
                            </div>

                            {/* Flight Info */}
                            <div className="flex items-center w-full">

                                {/* Departure */}
                                <div className="text-center">
                                    <p className="text-base font-semibold">18:30</p>
                                    <p className="text-xs text-gray-500">JFK</p>
                                </div>

                                {/* Duration */}
                                <div className="flex flex-col items-center flex-1 mx-4">
                                    <p className="text-sm text-gray-600">7h 15m</p>

                                    {/* Line */}
                                    <div className="w-full h-[1px] bg-gray-300 my-1 relative">
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full"></div>
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full"></div>
                                    </div>

                                    <p className="text-xs text-gray-400">Non-stop</p>
                                </div>

                                {/* Arrival */}
                                <div className="text-center">
                                    <p className="text-base font-semibold">06:45</p>
                                    <p className="text-xs text-gray-500">LHR</p>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>
                <div className=" border border-black rounded-2xl shadow-sm p-6 w-[280px]
                 bg-[#EEE9DF] space-y-4 h-fit">

                    {/* Title */}
                    <div className="flex justify-between items-start gap-2 flex-col">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Basic Economy
                        </h3>

                        <div className="text-left">
                            <p className="text-3xl font-bold text-gray-900">$300</p>
                            {/* <p className="text-xs text-gray-500">round trip / person</p> */}
                        </div>
                    </div>

                    <Separator />

                    {/* Features */}
                    <div className="space-y-2 text-sm text-gray-600">
                        <p>• Personal item included</p>
                        <p>• No carry-on bag</p>
                        <p>• No refunds</p>
                    </div>

                </div>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 w-[320px] h-fit space-y-5 self-start">
                {/* Title */}
                <h2 className="text-lg font-semibold">Price Summary</h2>

                {/* Price Rows */}
                <div className="space-y-3 text-sm">

                    <div className="flex justify-between text-gray-600">
                        <span>Flight (1x Adult)</span>
                        <span className="font-medium text-black">$300.00</span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                        <span>Taxes & Fees</span>
                        <span className="font-medium text-black">$70.00</span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                        <span>Fare selected (Basic)</span>
                        <span className="font-medium text-black">$0.00</span>
                    </div>

                </div>

                {/* Divider */}
                <Separator />

                {/* Total */}
                <div className="flex justify-between items-center text-base font-semibold">
                    <span>Total</span>
                    <span className="text-lg">$370.00</span>
                </div>

                {/* Button */}
                <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:opacity-90 transition">
                    Continue to Passenger Details
                </button>

                {/* Security Info */}
                <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                    <ShieldCheck className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                        <p className="text-sm font-medium">Secure Booking</p>
                        <p className="text-xs text-gray-500">
                            Your connection is encrypted and your details are kept safe.
                        </p>
                    </div>
                </div>

            </div>
        </main>
    );
}