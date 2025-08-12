import { createClient } from "@supabase/supabase-js"
import { createClient as createServerClient } from "@/lib/supabase/server"
import { cache } from "react"

export const checkAdminUser = cache(async () => {
  const supabase = createServerClient()

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return { isAdmin: false, user: null, adminData: null }
    }

    // Check if user exists in admin_users table
    const { data: adminData, error: adminError } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", user.email)
      .single()

    if (adminError || !adminData) {
      return { isAdmin: false, user, adminData: null }
    }

    return { isAdmin: true, user, adminData }
  } catch (error) {
    console.error("Error checking admin status:", error)
    return { isAdmin: false, user: null, adminData: null }
  }
})

// Create admin user in admin_users table (for initial setup)
export async function createAdminUser(email: string, fullName: string, role: "admin" | "super_admin" = "admin") {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("Missing Supabase configuration for admin operations")
    return { success: false, error: "Server configuration error" }
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)

  try {
    const { data, error } = await supabaseAdmin
      .from("admin_users")
      .insert([
        {
          email,
          full_name: fullName,
          role,
          password_hash: "managed_by_supabase_auth", // We use Supabase auth for password management
        },
      ])
      .select()
      .single()

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error("Error creating admin user:", error)
    return { success: false, error }
  }
}
