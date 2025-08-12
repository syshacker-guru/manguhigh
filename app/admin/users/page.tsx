import { redirect } from "next/navigation"
import { checkAdminUser } from "@/lib/supabase/admin"
import { createClient } from "@/lib/supabase/server"
import AdminUsersManager from "@/components/admin/admin-users-manager"
import AdminLayout from "@/components/admin/admin-layout"

export default async function AdminUsersPage() {
  const { isAdmin, adminData } = await checkAdminUser()

  if (!isAdmin) {
    redirect("/admin/login")
  }

  // Only super_admin can manage users
  if (adminData?.role !== "super_admin") {
    return (
      <AdminLayout title="Admin Users" description="Manage admin user accounts">
        <div className="text-center py-12">
          <p className="text-gray-500">Access denied. Super admin privileges required.</p>
        </div>
      </AdminLayout>
    )
  }

  // Fetch all admin users
  const supabase = createClient()
  const { data: adminUsers } = await supabase.from("admin_users").select("*").order("created_at", { ascending: false })

  return (
    <AdminLayout title="Admin Users" description="Manage admin user accounts and permissions">
      <AdminUsersManager initialAdminUsers={adminUsers || []} />
    </AdminLayout>
  )
}
