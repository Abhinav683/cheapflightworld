"use client";

import { Plane, ShieldCheck, Clock3 ,ChartGantt } from "lucide-react";

export default function WhyChooseUs() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-20">

            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-14">
                <div className="bg-[#EEE9DF] inline-flex items-center gap-2 px-3 py-1 font-semibold rounded-full text-sm">
                    <Plane size={16} />
                    Why travelers choose Aerolink
                </div>

                <h2 className="mt-3 text-[2.5rem] font-black leading-tight text-black">
                    Everything you need to plan beautifully
                </h2>

                <p className="mt-4 text-[#6B7280] text-sm leading-relaxed">
                    From destination discovery to booking confidence, every section is built to help visitors
                    move from inspiration to reservation without friction.
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* LEFT */}
                <div className="bg-[#EEE9DF] rounded-2xl p-6 flex flex-col justify-between">

                    <div>
                        <div className="flex gap-2 items-center">
                    <ChartGantt size={16} />  <p>Simple planning flow</p></div>
                        <h3 className="mt-4 text-4xl font-bold text-black">
                            Plan the full journey in three easy
                            steps                        </h3>

                        <p className="mt-3 text-[#6B7280] text-sm leading-relaxed">
                            From destination discovery to booking confidence, every section is built to help visitors
                            move from inspiration to reservation without friction.
                        </p>
                    </div>

                    {/* 3 boxes */}
                    <div className="grid grid-cols-3 gap-3 mt-6">
                        <div className="bg-white rounded-xl px-4 flex flex-col gap-1 py-2 text-start">
                            <div className="w-8 h-8 flex items-center justify-center bg-[#C89B3C]
                             rounded-full text-white text-sm font-semibold">
                                01
                            </div>                            <p className="font-bold">Choose a place</p>
                            <p className="text-[#6B7280]">Browse destinations,
                                compare vibes, and
                                discover where your next
                                trip should begin.</p>
                        </div>
                        <div className="bg-white rounded-xl px-4 flex flex-col gap-1 py-2 text-start">
                            <div className="w-8 h-8 flex items-center justify-center bg-[#C89B3C] rounded-full text-white text-sm font-semibold">
                                02
                            </div>                            <p className="font-bold">Pick a package</p>
                            <p className="text-[#6B7280]">Browse destinations,
                                Select curated stays, add
                                activities, and lock in an
                                itinerary that fits your
                                pace.</p>
                        </div>
                        <div className="bg-white rounded-xl px-4 flex flex-col gap-1 py-2 text-start">
                            <div className="w-8 h-8 flex items-center justify-center bg-[#C89B3C] rounded-full text-white text-sm font-semibold">
                                03
                            </div>                            <p className="font-bold">Travel with ease"</p>
                            <p className="text-[#6B7280]">Browse destinations,
                                Get confirmations,
                                support, and a polished
                                experience from booking
                                to landing.</p>
                        </div>                    </div>
                </div>

                {/* RIGHT */}
                <div className="grid grid-rows-2 gap-6">

                    {/* Card 1 */}
                    <div className="bg-[#FFFCF7] rounded-2xl p-6 flex flex-col gap-3">
                        <div className="flex items-center justify-between gap-2 font-semibold text-black">
                            <ShieldCheck size={30} className="bg-[#EEE9DF] p-1 rounded text-[#C89B3C]" />
                            <span className="text-[green]">98% satisfaction</span>
                        </div>

                        <p className="font-semibold text-black text-2xl">
                            Trusted booking support
                        </p>

                        <p className="text-[#6B7280] text-sm leading-relaxed">
                            Clear package inclusions, transparent pricing, and travel assistance that
                            keeps the experience calm and dependable.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-[#FFFCF7] rounded-2xl p-6 flex flex-col gap-3">
                        <div className="flex items-center justify-between gap-2 font-semibold text-black">
                            <Clock3 size={30} className="bg-[#EEE9DF] p-1 rounded text-[#C89B3C]" />
                            <span className="text-[green]">24/7 available</span>
                        </div>

                        <p className="font-semibold text-black text-2xl">
                            Fast trip coordination
                        </p>

                        <p className="text-[#6B7280] text-sm leading-relaxed">
                            Flights, stays, and local moments are organized with a simple structure so
                            users can book faster with less hesitation.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}