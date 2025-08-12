"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { supabase, type Database } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Plus, Edit, Trash2, Save, X } from "lucide-react"

type Program = Database["public"]["Tables"]["programs"]["Row"]

interface ProgramsManagerProps {
  initialPrograms: Program[]
}

const categories = [
  { value: "club", label: "Club" },
  { value: "society", label: "Society" },
  { value: "tour", label: "Tour" },
  { value: "academic", label: "Academic" },
  { value: "sports", label: "Sports" },
  { value: "other", label: "Other" },
]

export default function ProgramsManager({ initialPrograms }: ProgramsManagerProps) {
  const [programs, setPrograms] = useState<Program[]>(initialPrograms)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    category: "club" as Program["category"],
    description: "",
    image_url: "",
    meeting_schedule: "",
    teacher_in_charge: "",
    requirements: "",
    is_active: true,
  })

  const resetForm = () => {
    setFormData({
      name: "",
      category: "club",
      description: "",
      image_url: "",
      meeting_schedule: "",
      teacher_in_charge: "",
      requirements: "",
      is_active: true,
    })
  }

  const handleAdd = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.from("programs").insert([formData]).select().single()

      if (error) throw error

      setPrograms([...programs, data])
      setShowAddForm(false)
      resetForm()
      toast({
        title: "Success",
        description: "Program added successfully.",
      })
    } catch (error) {
      console.error("Error adding program:", error)
      toast({
        title: "Error",
        description: "Failed to add program. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (program: Program) => {
    setFormData({
      name: program.name,
      category: program.category,
      description: program.description || "",
      image_url: program.image_url || "",
      meeting_schedule: program.meeting_schedule || "",
      teacher_in_charge: program.teacher_in_charge || "",
      requirements: program.requirements || "",
      is_active: program.is_active,
    })
    setEditingId(program.id)
  }

  const handleUpdate = async () => {
    if (!editingId) return

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("programs")
        .update({ ...formData, updated_at: new Date().toISOString() })
        .eq("id", editingId)
        .select()
        .single()

      if (error) throw error

      setPrograms(programs.map((p) => (p.id === editingId ? data : p)))
      setEditingId(null)
      resetForm()
      toast({
        title: "Success",
        description: "Program updated successfully.",
      })
    } catch (error) {
      console.error("Error updating program:", error)
      toast({
        title: "Error",
        description: "Failed to update program. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this program?")) return

    setLoading(true)
    try {
      const { error } = await supabase.from("programs").delete().eq("id", id)

      if (error) throw error

      setPrograms(programs.filter((p) => p.id !== id))
      toast({
        title: "Success",
        description: "Program deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting program:", error)
      toast({
        title: "Error",
        description: "Failed to delete program. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const ProgramForm = ({ isEditing = false }: { isEditing?: boolean }) => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Program" : "Add New Program"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Program Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Coding Club"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value as Program["category"] })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            placeholder="Brief description of the program..."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="teacher_in_charge">Teacher in Charge</Label>
            <Input
              id="teacher_in_charge"
              value={formData.teacher_in_charge}
              onChange={(e) => setFormData({ ...formData, teacher_in_charge: e.target.value })}
              placeholder="Mr. John Kamau"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="meeting_schedule">Meeting Schedule</Label>
            <Input
              id="meeting_schedule"
              value={formData.meeting_schedule}
              onChange={(e) => setFormData({ ...formData, meeting_schedule: e.target.value })}
              placeholder="Tuesdays 3:30-5:00 PM"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="requirements">Requirements</Label>
          <Textarea
            id="requirements"
            value={formData.requirements}
            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
            rows={2}
            placeholder="Any requirements or prerequisites..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image_url">Image URL</Label>
          <Input
            id="image_url"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="is_active"
            checked={formData.is_active}
            onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
          />
          <Label htmlFor="is_active">Active</Label>
        </div>

        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              if (isEditing) {
                setEditingId(null)
              } else {
                setShowAddForm(false)
              }
              resetForm()
            }}
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button type="button" onClick={isEditing ? handleUpdate : handleAdd} disabled={loading || !formData.name}>
            <Save className="mr-2 h-4 w-4" />
            {isEditing ? "Update" : "Add"} Program
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {!showAddForm && !editingId && (
        <div className="flex justify-end">
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Program
          </Button>
        </div>
      )}

      {showAddForm && <ProgramForm />}
      {editingId && <ProgramForm isEditing />}

      <div className="grid gap-4">
        {programs.map((program) => (
          <Card key={program.id}>
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CardTitle className="text-lg">{program.name}</CardTitle>
                    <Badge variant={program.is_active ? "default" : "secondary"}>
                      {program.is_active ? "Active" : "Inactive"}
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {program.category}
                    </Badge>
                  </div>
                  {program.teacher_in_charge && (
                    <p className="text-sm text-gray-600">Teacher: {program.teacher_in_charge}</p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(program)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(program.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {program.description && <p className="text-gray-700">{program.description}</p>}
              {program.meeting_schedule && (
                <p className="text-sm text-gray-600">
                  <strong>Schedule:</strong> {program.meeting_schedule}
                </p>
              )}
              {program.requirements && (
                <p className="text-sm text-gray-600">
                  <strong>Requirements:</strong> {program.requirements}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {programs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No programs found. Add your first program to get started.</p>
        </div>
      )}
    </div>
  )
}
