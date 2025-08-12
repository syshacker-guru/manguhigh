import type React from "react"
import { Shield, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { adminSignOut } from "@/lib/actions/auth"
import { checkAdminUser } from "@/lib/supabase/admin"
import Link from "next/link"

interface AdminLayoutProps {
  children: React.ReactNode
  title: string
  description?: string
}

export default async function AdminLayout({ children, title, description }: AdminLayoutProps) {
  const { adminData } = await checkAdminUser()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Link href="/admin" className="flex items-center space-x-3 hover:opacity-80">
                <Shield className="h-8 w-8 text-blue-600" />
                <div>
                  <h1 className="font-serif font-bold text-xl text-gray-900">Mang'uHigh Admin</h1>
                  <p className="text-sm text-gray-600">Content Management System</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {adminData?.full_name}</span>
              <form action={adminSignOut}>
                <Button type="submit" variant="outline" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <Link href="/admin" className="hover:text-gray-700">
              Dashboard
            </Link>
            <span>/</span>
            <span className="text-gray-900">{title}</span>
          </div>
          <h2 className="font-serif font-bold text-2xl text-gray-900 mb-2">{title}</h2>
          {description && <p className="text-gray-600">{description}</p>}
        </div>

        {children}
      </main>
    </div>
  )
}
