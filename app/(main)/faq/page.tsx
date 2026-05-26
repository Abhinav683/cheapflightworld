"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Headset } from 'lucide-react';
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion"

const categories = [
    "General",
    "Flights",
    "Hotels",
    "Transfers & Rentals",
    "Bookings & Payments",
    "Cancellations & Refunds",
]

const faqData: any = {
    General: [
        {
            q: "What is Cheapflightworld?",
            a: "Cheapflightworld is a premium travel platform designed to deliver seamless and curated travel experiences. We specialize in flights, luxury stays, and global travel services, ensuring convenience, reliability, and exceptional value for every journey.",
        },
        {
            q: "How do I create an account?",
            a: "You can create an account in just a few steps using your email address. Once registered, you’ll be able to manage bookings, save preferences, and access exclusive travel deals.",
        },
    ],
    Flights: [
        {
            q: "Can I change my flight?",
            a: "Yes, flight modifications are possible depending on the airline’s fare rules and policies. Any applicable change fees or fare differences will be communicated before confirmation.",
        },
    ],
    Hotels: [
        {
            q: "Are hotels refundable?",
            a: "Refund policies vary by property and booking type. Many hotels offer free cancellation within a specified timeframe, while others may have stricter policies. Please review the cancellation terms during booking.",
        },
    ],
    "Transfers & Rentals": [
        {
            q: "Do you provide airport pickup?",
            a: "Yes, we offer reliable airport transfer services across major destinations worldwide. You can pre-book your ride to ensure a smooth and hassle-free arrival experience.",
        },
    ],
    "Bookings & Payments": [
        {
            q: "What payment methods are accepted?",
            a: "We accept a wide range of payment options, including major credit and debit cards, net banking, and select digital wallets, ensuring a secure and convenient checkout experience.",
        },
        {
            q: "Can I pay in installments?",
            a: "Yes, installment payment options are available for select bookings. Eligible reservations can be secured with a deposit, with the remaining balance payable in scheduled installments prior to departure.",
        },
    ],
    "Cancellations & Refunds": [
        {
            q: "How do I cancel my booking?",
            a: "You can cancel your booking directly from your account dashboard. Simply navigate to your bookings section, select the relevant reservation, and follow the cancellation process.",
        },
        {
            q: "How long do refunds take?",
            a: "Refunds are typically processed within 5–10 business days, depending on the payment method and provider. You will receive a confirmation once the refund has been initiated.",
        },
    ],
}

export default function FAQPage() {
    const [active, setActive] = useState("General")

    const scrollToSection = (id: string) => {
        setActive(id)
        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        })
    }

    return (
        <div className="min-h-screen bg-[#F7F5F1] text-black">

            {/* HERO */}
            <div className="text-center py-20 px-4 max-w-3xl mx-auto">
                <h1 className="text-5xl font-bold mb-4 tracking-tight">
                    How can we help?
                </h1>
                <p className="text-gray-600 mb-8">
                    Find answers to commonly asked questions about bookings, flights,
                    stays, and more.
                </p>

                <Input
                    placeholder="Search for answers..."
                    className="bg-white border border-[#EEE9DF] h-12 rounded-full shadow-sm focus-visible:ring-0"
                />
            </div>

            {/* MAIN */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-4 pb-24">

                {/* SIDEBAR */}
                <div className="md:col-span-1">
                    <div className="sticky top-24 space-y-2 p-4 rounded-2xl">

                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => scrollToSection(cat)}
                                className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 
                  ${active === cat
                                        ? "bg-[#EEE9DF] text-black"
                                        : "text-gray-500 hover:bg-[#EEE9DF] hover:text-black"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}

                    </div>
                </div>

                {/* CONTENT */}
                <div className="md:col-span-3 space-y-16">
                    {Object.keys(faqData).map((section) => (
                        <div key={section} id={section} className="scroll-mt-24">

                            <h2 className="text-3xl font-semibold mb-6">
                                {section}
                            </h2>

                            <Accordion type="single" collapsible className="space-y-4">
                                {faqData[section].map((item: any, i: number) => (
                                    <AccordionItem
                                        key={i}
                                        value={`${section}-${i}`}
                                        className="border-b border-[#EEE9DF] pb-5"                  >
                                        <AccordionTrigger className="text-left text-lg">
                                            {item.q}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-gray-600">
                                            {item.a}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>

                        </div>
                    ))}
            <div className="w-full flex justify-center px-4 pb-20">
                <div className="max-w-4xl w-full flex justify-center items-center flex-col bg-white  rounded-2xl p-10 shadow-sm">
                        <Headset size={40} className="text-[#C89B3C] bg-[#EEE9DF] rounded-full p-2"/>
                    <h2 className="text-3xl font-semibold mb-3">
                        Still have questions?
                    </h2>

                    <p className="text-gray-600 text-center max-w-xl mx-auto mb-6">
                        Can't find the answer you're looking for? Our dedicated travel experts are here to help you 24/7.
                    </p>

                    <Button className="bg-black  text-white px-6 py-5 rounded-full hover:opacity-90 transition">
                        Contact Support
                    </Button>

                </div>
            </div>
                </div>

            </div>
        </div>
    )
}