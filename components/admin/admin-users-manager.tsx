"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { supabase, type Database } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Shield, Trash2, UserCheck, UserX } from "lucide-react"

type AdminUser = Database["public"]["Tables"]["admin_users"]["Row"]

interface AdminUsersManagerProps {
  initialAdminUsers: AdminUser[]
}

export default function AdminUsersManager({ initialAdminUsers }: AdminUsersManagerProps) {
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(initialAdminUsers)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleDelete = async (id: string, email: string) => {
    if (!confirm(`Are you sure you want to delete admin user: ${email}?`)) return

    setLoading(true)
    try {
      const { error } = await supabase.from("admin_users").delete().eq("id", id)

      if (error) throw error

      setAdminUsers(adminUsers.filter((user) => user.id !== id))
      toast({
        title: "Success",
        description: "Admin user deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting admin user:", error)
      toast({
        title: "Error",
        description: "Failed to delete admin user. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRoleChange = async (id: string, newRole: "admin" | "super_admin") => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("admin_users")
        .update({ role: newRole, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single()

      if (error) throw error

      setAdminUsers(adminUsers.map((user) => (user.id === id ? data : user)))
      toast({
        title: "Success",
        description: "Admin role updated successfully.",
      })
    } catch (error) {
      console.error("Error updating admin role:", error)
      toast({
        title: "Error",
        description: "Failed to update admin role. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {adminUsers.map((user) => (
          <Card key={user.id}>
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Shield className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{user.full_name}</CardTitle>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={user.role === "super_admin" ? "default" : "secondary"}>
                      {user.role === "super_admin" ? "Super Admin" : "Admin"}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      Created: {new Date(user.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {user.role === "admin" ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRoleChange(user.id, "super_admin")}
                      disabled={loading}
                    >
                      <UserCheck className="h-4 w-4 mr-1" />
                      Promote
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRoleChange(user.id, "admin")}
                      disabled={loading}
                    >
                      <UserX className="h-4 w-4 mr-1" />
                      Demote
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(user.id, user.email)}
                    disabled={loading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {adminUsers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No admin users found.</p>
        </div>
      )}

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Add New Admin Users</h3>
          <p className="text-blue-700 text-sm">
            New admin users can be created using the admin signup page with the proper admin key. Contact the system
            administrator for the admin key.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
