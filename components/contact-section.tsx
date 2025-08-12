"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { supabase, type Database } from "@/lib/supabase/client"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

type SchoolInfo = Database["public"]["Tables"]["school_info"]["Row"]

export function ContactSection() {
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
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif font-bold text-3xl lg:text-4xl text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We welcome inquiries from prospective students and parents. Contact us to learn more about Mang'uHigh and
            schedule a visit to our campus.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <Card className="bg-white border-gray-200 mb-8">
              <CardContent className="p-8">
                <h3 className="font-serif font-bold text-2xl text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Address</p>
                      <p className="text-gray-600">{schoolInfo?.address || "Mang'u Road, Kiambu County, Kenya"}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                      <Phone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <p className="text-gray-600">{schoolInfo?.contact_phone || "+254 700 123 456"}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-gray-600">{schoolInfo?.contact_email || "info@manguhigh.ac.ke"}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Office Hours</p>
                      <p className="text-gray-600">Monday - Friday: 8:00 AM - 5:00 PM</p>
                      <p className="text-gray-600">Saturday: 8:00 AM - 12:00 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Schedule a School Visit
              </Button>
              <Button size="lg" variant="outline" className="w-full bg-transparent">
                Download Admission Forms
              </Button>
            </div>
          </div>

          <div className="relative">
            <img
              src="/kenya-kiambu-county.png"
              alt="Mang'uHigh Campus Location"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            <div className="absolute bottom-6 left-6 bg-white p-4 rounded-lg shadow-lg">
              <p className="text-sm text-gray-600 mb-1">Established</p>
              <p className="font-serif font-bold text-xl text-gray-900">{schoolInfo?.established_year || "1985"}</p>
            </div>
            <div className="absolute top-6 right-6 bg-white p-4 rounded-lg shadow-lg">
              <p className="text-sm text-gray-600 mb-1">Location</p>
              <p className="font-serif font-bold text-lg text-gray-900">Kiambu County</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
