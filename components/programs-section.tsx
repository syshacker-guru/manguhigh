"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { supabase, type Database } from "@/lib/supabase/client"
import { Users, Clock, MapPin } from "lucide-react"

type Program = Database["public"]["Tables"]["programs"]["Row"]

const categoryColors = {
  club: "bg-blue-100 text-blue-800",
  society: "bg-purple-100 text-purple-800",
  tour: "bg-green-100 text-green-800",
  academic: "bg-orange-100 text-orange-800",
  sports: "bg-red-100 text-red-800",
  other: "bg-gray-100 text-gray-800",
}

export function ProgramsSection() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPrograms() {
      try {
        const { data, error } = await supabase
          .from("programs")
          .select("*")
          .eq("is_active", true)
          .order("category")
          .order("name")

        if (error) throw error
        setPrograms(data || [])
      } catch (error) {
        console.error("Error fetching programs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPrograms()
  }, [])

  const clubsAndSocieties = programs.filter((p) => p.category === "club" || p.category === "society")
  const tours = programs.filter((p) => p.category === "tour")
  const otherPrograms = programs.filter((p) => !["club", "society", "tour"].includes(p.category))

  if (loading) {
    return (
      <section id="programs" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Loading programs...</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="programs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif font-bold text-3xl lg:text-4xl text-gray-900 mb-4">Co-Curricular Programs</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Beyond academics, we offer diverse programs to develop well-rounded students with leadership skills,
            creativity, and global perspectives.
          </p>
        </div>

        {/* Clubs and Societies */}
        {clubsAndSocieties.length > 0 && (
          <div className="mb-16">
            <h3 className="font-serif font-bold text-2xl text-gray-900 mb-8 flex items-center">
              <Users className="h-6 w-6 text-blue-600 mr-3" />
              Clubs & Societies
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clubsAndSocieties.map((program) => (
                <Card key={program.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-lg">{program.name}</CardTitle>
                      <Badge className={categoryColors[program.category] || categoryColors.other}>
                        {program.category}
                      </Badge>
                    </div>
                    {program.teacher_in_charge && (
                      <p className="text-sm text-gray-600">Teacher: {program.teacher_in_charge}</p>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {program.description && (
                      <CardDescription className="text-gray-700">{program.description}</CardDescription>
                    )}
                    {program.meeting_schedule && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        {program.meeting_schedule}
                      </div>
                    )}
                    {program.requirements && (
                      <p className="text-sm text-gray-600">
                        <strong>Requirements:</strong> {program.requirements}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Tours */}
        {tours.length > 0 && (
          <div className="mb-16">
            <h3 className="font-serif font-bold text-2xl text-gray-900 mb-8 flex items-center">
              <MapPin className="h-6 w-6 text-green-600 mr-3" />
              Educational Tours
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {tours.map((program) => (
                <Card key={program.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-lg">{program.name}</CardTitle>
                      <Badge className={categoryColors[program.category] || categoryColors.other}>
                        {program.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {program.description && (
                      <CardDescription className="text-gray-700">{program.description}</CardDescription>
                    )}
                    {program.requirements && (
                      <p className="text-sm text-gray-600">
                        <strong>Requirements:</strong> {program.requirements}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Other Programs */}
        {otherPrograms.length > 0 && (
          <div>
            <h3 className="font-serif font-bold text-2xl text-gray-900 mb-8">Other Programs</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherPrograms.map((program) => (
                <Card key={program.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-lg">{program.name}</CardTitle>
                      <Badge className={categoryColors[program.category] || categoryColors.other}>
                        {program.category}
                      </Badge>
                    </div>
                    {program.teacher_in_charge && (
                      <p className="text-sm text-gray-600">Teacher: {program.teacher_in_charge}</p>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {program.description && (
                      <CardDescription className="text-gray-700">{program.description}</CardDescription>
                    )}
                    {program.meeting_schedule && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        {program.meeting_schedule}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {programs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No programs available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  )
}
