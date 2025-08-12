"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { supabase, type Database } from "@/lib/supabase/client"
import { Calendar, Clock, Megaphone, Star } from "lucide-react"

type NewsEvent = Database["public"]["Tables"]["news_events"]["Row"]

const typeIcons = {
  news: Star,
  event: Calendar,
  announcement: Megaphone,
}

const typeColors = {
  news: "bg-blue-100 text-blue-600",
  event: "bg-green-100 text-green-600",
  announcement: "bg-orange-100 text-orange-600",
}

export function NewsEventsSection() {
  const [newsEvents, setNewsEvents] = useState<NewsEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNewsEvents() {
      try {
        const { data, error } = await supabase
          .from("news_events")
          .select("*")
          .eq("is_published", true)
          .order("created_at", { ascending: false })
          .limit(6)

        if (error) throw error
        setNewsEvents(data || [])
      } catch (error) {
        console.error("Error fetching news and events:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNewsEvents()
  }, [])

  if (loading) {
    return (
      <section id="news" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Loading news and events...</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="news" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif font-bold text-3xl lg:text-4xl text-gray-900 mb-4">News & Events</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest happenings, achievements, and upcoming events at Mang'uHigh.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsEvents.map((item) => {
            const IconComponent = typeIcons[item.type] || Star
            const colorClass = typeColors[item.type] || typeColors.news
            const eventDate = item.event_date ? new Date(item.event_date) : null
            const createdDate = new Date(item.created_at)

            return (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClass}`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <Badge variant="secondary" className="capitalize">
                      {item.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{item.content}</p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {createdDate.toLocaleDateString()}
                    </div>
                    {eventDate && (
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {eventDate.toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {newsEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No news or events available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  )
}
