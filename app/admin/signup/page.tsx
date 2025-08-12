import { isSupabaseConfigured } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { checkAdminUser } from "@/lib/supabase/admin"
import AdminSignUpForm from "@/components/admin-signup-form"

export default async function AdminSignUpPage() {
  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Connect Supabase to get started</h1>
      </div>
    )
  }

  // Check if user is already logged in as admin
  const { isAdmin } = await checkAdminUser()

  if (isAdmin) {
    redirect("/admin")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <AdminSignUpForm />
    </div>
  )
}
