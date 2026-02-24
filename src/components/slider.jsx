"use client"

import { useState, useEffect } from "react"
import { getTestimonials } from "@/lib/dal"

export default function Slider() {
  const [testimonials, setTestimonials] = useState([])
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    async function fetchData() {
      const data = await getTestimonials()
      setTestimonials(data)
    }
    fetchData()
  }, [])

  if (!testimonials.length) return null

  const total = testimonials.length
  const prev = () => setCurrent((current - 1 + total) % total)
  const next = () => setCurrent((current + 1) % total)

  const t = testimonials[current]

  return (
    <section className="relative w-full max-w-4xl mx-auto my-10 p-6 bg-[url('/assets/detsigerkunderne.jpg')] bg-cover  gap-10 rounded shadow flex flex-col items-center">
        <h1 className="bold text-3xl w-[15ch] text-center">Det siger vores kunder om os</h1>
      <p className="text-center italic text-lg">"{t.content}"</p>
      <p className="mt-4 font-bold">- {t.name}</p>
      <p>{t.occupation}</p>

        <div className="flex gap-4">
            <div className=" arrow" onClick={prev}>
            &#10094;
            </div>
            <div className="  arrow" onClick={next}>
            &#10095;
            </div>
        </div>
    </section>
  )
}