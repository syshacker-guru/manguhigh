import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Check if Supabase is properly configured
export const isSupabaseConfigured = supabaseUrl && supabaseAnonKey

// Create a dummy client if not configured to prevent runtime errors
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      from: () => ({
        select: () => ({ data: [], error: null }),
        insert: () => ({ data: null, error: { message: "Supabase not configured" } }),
        update: () => ({ data: null, error: { message: "Supabase not configured" } }),
        delete: () => ({ data: null, error: { message: "Supabase not configured" } }),
      }),
      auth: {
        signInWithPassword: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
        signUp: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
        signOut: () => Promise.resolve({ error: null }),
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      },
    }

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string
          email: string
          full_name: string
          role: "admin" | "super_admin"
          password_hash: string
          created_at: string
          updated_at: string
        }
      }
      school_info: {
        Row: {
          id: string
          school_name: string
          school_motto: string | null
          school_description: string | null
          principal_name: string | null
          principal_message: string | null
          contact_email: string | null
          contact_phone: string | null
          address: string | null
          established_year: number | null
          logo_url: string | null
          hero_image_url: string | null
          updated_at: string
        }
      }
      programs: {
        Row: {
          id: string
          name: string
          category: "club" | "society" | "tour" | "academic" | "sports" | "other"
          description: string | null
          image_url: string | null
          meeting_schedule: string | null
          teacher_in_charge: string | null
          requirements: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
      }
      news_events: {
        Row: {
          id: string
          title: string
          content: string
          type: "news" | "event" | "announcement"
          image_url: string | null
          event_date: string | null
          is_published: boolean
          created_at: string
          updated_at: string
        }
      }
      academic_info: {
        Row: {
          id: string
          subject_name: string
          description: string | null
          grade_levels: string[]
          teacher_name: string | null
          syllabus_url: string | null
          is_core_subject: boolean
          created_at: string
          updated_at: string
        }
      }
    }
  }
}
