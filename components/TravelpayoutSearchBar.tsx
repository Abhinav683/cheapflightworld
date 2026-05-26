"use client"

import { useEffect, useState } from "react"

export default function TravelPayoutSearchBar({ url }: { url?: string }) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const container = document.getElementById("widget")

        if (container) {
            container.innerHTML = "" // prevent duplicate scripts

            const script = document.createElement("script")
            script.src = url || ""
            script.charset = "utf-8"
            script.async = true

            script.onload = () => {
                setLoading(false)
            }

            container.appendChild(script)
        }
    }, [url])

    return (
        <main className="w-full">
            <div className="max-w-full bg-white relative top-8">

                {/* Skeleton */}
                {loading && (
                    <div className="animate-pulse p-6 space-y-4 bg-gray-100 relative bottom-20 w-[80%] mx-auto">

                        {/* Row 1 */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="h-12 bg-gray-200 rounded-xl" />
                            <div className="h-12 bg-gray-200 rounded-xl" />
                        </div>

                        {/* Row 2 */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex gap-2">
                                <div className="h-12 bg-gray-200 rounded-xl w-1/2" />
                                <div className="h-12 bg-gray-200 rounded-xl w-1/2" />
                            </div>

                            <div className="flex gap-2">
                                <div className="h-12 bg-gray-200 rounded-xl w-1/2" />
                                <div className="h-12 bg-gray-200 rounded-xl w-1/2" />
                            </div>
                        </div>

                        {/* Button */}

                    </div>
                )}
                {/* Widget */}
                <div id="widget" className={`${loading ? "hidden" : "block"} relative bottom-20 w-[80%] mx-auto`}
                />           
                 </div>
        </main>
    )

}