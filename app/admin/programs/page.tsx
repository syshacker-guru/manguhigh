import { redirect } from "next/navigation"
import { checkAdminUser } from "@/lib/supabase/admin"
import { createClient } from "@/lib/supabase/server"
import ProgramsManager from "@/components/admin/programs-manager"
import AdminLayout from "@/components/admin/admin-layout"

export default async function ProgramsPage() {
  const { isAdmin } = await checkAdminUser()

  if (!isAdmin) {
    redirect("/admin/login")
  }

  // Fetch all programs
  const supabase = createClient()
  const { data: programs } = await supabase.from("programs").select("*").order("category").order("name")

  return (
    <AdminLayout title="Programs & Clubs" description="Manage school programs, clubs, societies, and tours">
      <ProgramsManager initialPrograms={programs || []} />
    </AdminLayout>
  )
}
