import { redirect } from "next/navigation"
import { checkAdminUser } from "@/lib/supabase/admin"
import { createClient } from "@/lib/supabase/server"
import NewsEventsManager from "@/components/admin/news-events-manager"
import AdminLayout from "@/components/admin/admin-layout"

export default async function NewsEventsPage() {
  const { isAdmin } = await checkAdminUser()

  if (!isAdmin) {
    redirect("/admin/login")
  }

  // Fetch all news and events
  const supabase = createClient()
  const { data: newsEvents } = await supabase.from("news_events").select("*").order("created_at", { ascending: false })

  return (
    <AdminLayout title="News & Events" description="Create and manage school news, events, and announcements">
      <NewsEventsManager initialNewsEvents={newsEvents || []} />
    </AdminLayout>
  )
}
