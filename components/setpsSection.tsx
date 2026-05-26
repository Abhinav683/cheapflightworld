"use client"

import { ReactNode } from "react"

type Step = {
  icon: ReactNode
  title: string
  desc: string
}

type StepsSectionProps = {
  title: string
  subtitle: string
  data: Step[]
}

export default function StepsSection({
  title,
  subtitle,
  data,
}: StepsSectionProps) {
  return (
    <section className="flex flex-col items-center gap-10 py-12">

      {/* Heading */}
      <div className="text-center max-w-2xl">
        <h2 className="font-bold text-4xl md:text-5xl">{title}</h2>
        <p className="text-lg mt-2 text-gray-600">{subtitle}</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center gap-4 p-6"
          >
            <div className="bg-[#EEE9DF] rounded-full p-3">
              {item.icon}
            </div>
            <h3 className="font-semibold text-xl">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}