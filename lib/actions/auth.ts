"use server"

import { supabase } from "@/lib/supabase/client"
import { redirect } from "next/navigation"

export async function adminSignIn(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")
  const password = formData.get("password")

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  try {
    const { data: adminData, error: adminError } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", email.toString())
      .eq("password_hash", password.toString()) // In production, this should be hashed
      .single()

    if (adminError || !adminData) {
      return { error: "Invalid email or password" }
    }

    return { success: true, user: adminData }
  } catch (error) {
    console.error("Admin login error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

export async function adminSignUp(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")
  const password = formData.get("password")
  const fullName = formData.get("fullName")
  const adminKey = formData.get("adminKey")

  if (!email || !password || !fullName || !adminKey) {
    return { error: "All fields are required" }
  }

  // Check admin key
  if (adminKey.toString() !== process.env.ADMIN_SIGNUP_KEY) {
    return { error: "Invalid admin key" }
  }

  try {
    const { data, error } = await supabase.from("admin_users").insert([
      {
        email: email.toString(),
        password_hash: password.toString(), // In production, hash this
        full_name: fullName.toString(),
        role: "admin",
      },
    ])

    if (error) {
      return { error: error.message }
    }

    return { success: "Admin account created successfully." }
  } catch (error) {
    console.error("Admin sign up error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

export async function adminSignOut() {
  redirect("/admin/login")
}
