"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { supabase, type Database } from "@/lib/supabase/client"
import { BookOpen, Users, Clock } from "lucide-react"

type AcademicInfo = Database["public"]["Tables"]["academic_info"]["Row"]

export function AcademicsSection() {
  const [subjects, setSubjects] = useState<AcademicInfo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSubjects() {
      try {
        const { data, error } = await supabase
          .from("academic_info")
          .select("*")
          .order("is_core_subject", { ascending: false })
          .order("subject_name")

        if (error) throw error
        setSubjects(data || [])
      } catch (error) {
        console.error("Error fetching subjects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSubjects()
  }, [])

  const coreSubjects = subjects.filter((subject) => subject.is_core_subject)
  const electiveSubjects = subjects.filter((subject) => !subject.is_core_subject)

  if (loading) {
    return (
      <section id="academics" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Loading academics...</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="academics" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif font-bold text-3xl lg:text-4xl text-gray-900 mb-4">Academic Programs</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our comprehensive curriculum follows the Kenyan 8-4-4 system, preparing students for KCSE examinations and
            beyond.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Core Subjects */}
          <div>
            <h3 className="font-serif font-bold text-2xl text-gray-900 mb-6 flex items-center">
              <BookOpen className="h-6 w-6 text-blue-600 mr-3" />
              Core Subjects
            </h3>
            <div className="space-y-4">
              {coreSubjects.map((subject) => (
                <Card key={subject.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{subject.subject_name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-gray-600 text-sm">{subject.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {subject.grade_levels.map((level) => (
                        <Badge key={level} variant="secondary" className="text-xs">
                          {level}
                        </Badge>
                      ))}
                    </div>
                    {subject.teacher_name && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        {subject.teacher_name}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Elective Subjects */}
          <div>
            <h3 className="font-serif font-bold text-2xl text-gray-900 mb-6 flex items-center">
              <Clock className="h-6 w-6 text-green-600 mr-3" />
              Elective Subjects
            </h3>
            <div className="space-y-4">
              {electiveSubjects.map((subject) => (
                <Card key={subject.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{subject.subject_name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-gray-600 text-sm">{subject.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {subject.grade_levels.map((level) => (
                        <Badge key={level} variant="outline" className="text-xs">
                          {level}
                        </Badge>
                      ))}
                    </div>
                    {subject.teacher_name && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        {subject.teacher_name}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
