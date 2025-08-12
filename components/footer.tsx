"use client"

import { useEffect, useState } from "react"
import { supabase, type Database } from "@/lib/supabase/client"
import Link from "next/link"

type SchoolInfo = Database["public"]["Tables"]["school_info"]["Row"]

export function Footer() {
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
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <img src="/mangu-logo.png" alt="Mang'u High School Logo" className="w-8 h-8 object-contain" />
              </div>
              <div>
                <Link href="/" className="font-serif font-bold text-xl hover:text-blue-400 transition-colors">
                  {schoolInfo?.school_name || "Mang'u High School"}
                </Link>
                <p className="text-sm text-gray-400">{schoolInfo?.school_motto || "Jishinde Ushinde"}</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed max-w-md">
              {schoolInfo?.school_description ||
                "Premier secondary school in Kenya dedicated to providing quality education and nurturing future leaders through academic excellence, character development, and community service."}
            </p>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/academics" className="text-gray-300 hover:text-white transition-colors">
                  Academics
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-gray-300 hover:text-white transition-colors">
                  Programs
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-300 hover:text-white transition-colors">
                  News & Events
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-gray-300 hover:text-white transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-300">
              <li>{schoolInfo?.contact_phone || "+254 700 123 456"}</li>
              <li>{schoolInfo?.contact_email || "info@manguhigh.ac.ke"}</li>
              <li className="text-sm">{schoolInfo?.address || "Mang'u Road, Kiambu County, Kenya"}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} {schoolInfo?.school_name || "Mang'u High School"}. All rights reserved.{" "}
            {schoolInfo?.school_motto || "Jishinde Ushinde"}.
          </p>
        </div>
      </div>
    </footer>
  )
}
