import { redirect } from "next/navigation"
import { checkAdminUser } from "@/lib/supabase/admin"
import { createClient } from "@/lib/supabase/server"
import SchoolInfoForm from "@/components/admin/school-info-form"
import AdminLayout from "@/components/admin/admin-layout"

export default async function SchoolInfoPage() {
  const { isAdmin } = await checkAdminUser()

  if (!isAdmin) {
    redirect("/admin/login")
  }

  // Fetch current school info
  const supabase = createClient()
  const { data: schoolInfo } = await supabase.from("school_info").select("*").single()

  return (
    <AdminLayout title="School Information" description="Update school details and contact information">
      <SchoolInfoForm initialData={schoolInfo} />
    </AdminLayout>
  )
}
