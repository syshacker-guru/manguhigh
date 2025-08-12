"use server"

import { createClient } from "@/lib/supabase/server"
import { checkAdminUser } from "@/lib/supabase/admin"

export async function toggleProgramStatus(programId: string, isActive: boolean) {
  const { isAdmin } = await checkAdminUser()

  if (!isAdmin) {
    return { error: "Unauthorized" }
  }

  const supabase = createClient()

  try {
    const { error } = await supabase
      .from("programs")
      .update({ is_active: isActive, updated_at: new Date().toISOString() })
      .eq("id", programId)

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error("Error updating program status:", error)
    return { error: "Failed to update program status" }
  }
}

export async function toggleNewsEventStatus(newsEventId: string, isPublished: boolean) {
  const { isAdmin } = await checkAdminUser()

  if (!isAdmin) {
    return { error: "Unauthorized" }
  }

  const supabase = createClient()

  try {
    const { error } = await supabase
      .from("news_events")
      .update({ is_published: isPublished, updated_at: new Date().toISOString() })
      .eq("id", newsEventId)

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error("Error updating news/event status:", error)
    return { error: "Failed to update news/event status" }
  }
}
