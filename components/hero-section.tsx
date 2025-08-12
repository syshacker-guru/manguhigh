"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { supabase, type Database } from "@/lib/supabase/client"

type SchoolInfo = Database["public"]["Tables"]["school_info"]["Row"]

export function HeroSection() {
  const [schoolInfo, setSchoolInfo] = useState<SchoolInfo | null>(null)

  useEffect(() => {
    async function fetchSchoolInfo() {
      try {
        const { data, error } = await supabase.from("school_info").select("*").single()
        if (error) throw error
        setSchoolInfo(data)
      } catch (error) {
        console.error("Error fetching school info:", error)
      }
    }

    fetchSchoolInfo()
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gray-50">
      <div className="absolute inset-0">
        <img
          src={schoolInfo?.hero_image_url || "/mangu-admin-block.png"}
          alt="Mang'u High School Administration Block"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/60"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="font-serif font-bold text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight">
          {schoolInfo?.school_name || "Mang'u High School"}
        </h1>
        <p className="text-xl md:text-2xl mb-4 text-blue-100 font-medium">
          {schoolInfo?.school_motto || "Jishinde Ushinde"}
        </p>
        <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
          {schoolInfo?.school_description ||
            "Founded in 1925, Mang'u High School is a premier Catholic national high school in Kenya, renowned for academic excellence and producing distinguished alumni including former President Mwai Kibaki."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
            Explore Our Programs
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3 text-lg bg-transparent"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  )
}
