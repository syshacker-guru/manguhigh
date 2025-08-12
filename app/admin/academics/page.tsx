import { redirect } from "next/navigation"
import { checkAdminUser } from "@/lib/supabase/admin"
import { createClient } from "@/lib/supabase/server"
import AcademicsManager from "@/components/admin/academics-manager"
import AdminLayout from "@/components/admin/admin-layout"

export default async function AcademicsPage() {
  const { isAdmin } = await checkAdminUser()

  if (!isAdmin) {
    redirect("/admin/login")
  }

  // Fetch all academic subjects
  const supabase = createClient()
  const { data: subjects } = await supabase
    .from("academic_info")
    .select("*")
    .order("is_core_subject", { ascending: false })
    .order("subject_name")

  return (
    <AdminLayout title="Academic Subjects" description="Manage curriculum and academic subjects">
      <AcademicsManager initialSubjects={subjects || []} />
    </AdminLayout>
  )
}
