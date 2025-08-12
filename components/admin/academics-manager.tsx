"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { supabase, type Database } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Plus, Edit, Trash2, Save, X, BookOpen } from "lucide-react"

type AcademicInfo = Database["public"]["Tables"]["academic_info"]["Row"]

interface AcademicsManagerProps {
  initialSubjects: AcademicInfo[]
}

const gradeLevels = ["Form 1", "Form 2", "Form 3", "Form 4"]

export default function AcademicsManager({ initialSubjects }: AcademicsManagerProps) {
  const [subjects, setSubjects] = useState<AcademicInfo[]>(initialSubjects)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    subject_name: "",
    description: "",
    grade_levels: [] as string[],
    teacher_name: "",
    syllabus_url: "",
    is_core_subject: false,
  })

  const resetForm = () => {
    setFormData({
      subject_name: "",
      description: "",
      grade_levels: [],
      teacher_name: "",
      syllabus_url: "",
      is_core_subject: false,
    })
  }

  const handleAdd = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.from("academic_info").insert([formData]).select().single()

      if (error) throw error

      setSubjects([...subjects, data])
      setShowAddForm(false)
      resetForm()
      toast({
        title: "Success",
        description: "Subject added successfully.",
      })
    } catch (error) {
      console.error("Error adding subject:", error)
      toast({
        title: "Error",
        description: "Failed to add subject. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (subject: AcademicInfo) => {
    setFormData({
      subject_name: subject.subject_name,
      description: subject.description || "",
      grade_levels: subject.grade_levels,
      teacher_name: subject.teacher_name || "",
      syllabus_url: subject.syllabus_url || "",
      is_core_subject: subject.is_core_subject,
    })
    setEditingId(subject.id)
  }

  const handleUpdate = async () => {
    if (!editingId) return

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("academic_info")
        .update({ ...formData, updated_at: new Date().toISOString() })
        .eq("id", editingId)
        .select()
        .single()

      if (error) throw error

      setSubjects(subjects.map((s) => (s.id === editingId ? data : s)))
      setEditingId(null)
      resetForm()
      toast({
        title: "Success",
        description: "Subject updated successfully.",
      })
    } catch (error) {
      console.error("Error updating subject:", error)
      toast({
        title: "Error",
        description: "Failed to update subject. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this subject?")) return

    setLoading(true)
    try {
      const { error } = await supabase.from("academic_info").delete().eq("id", id)

      if (error) throw error

      setSubjects(subjects.filter((s) => s.id !== id))
      toast({
        title: "Success",
        description: "Subject deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting subject:", error)
      toast({
        title: "Error",
        description: "Failed to delete subject. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleGradeLevelChange = (level: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, grade_levels: [...formData.grade_levels, level] })
    } else {
      setFormData({ ...formData, grade_levels: formData.grade_levels.filter((l) => l !== level) })
    }
  }

  const SubjectForm = ({ isEditing = false }: { isEditing?: boolean }) => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Subject" : "Add New Subject"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="subject_name">Subject Name</Label>
            <Input
              id="subject_name"
              value={formData.subject_name}
              onChange={(e) => setFormData({ ...formData, subject_name: e.target.value })}
              placeholder="Mathematics"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="teacher_name">Teacher Name</Label>
            <Input
              id="teacher_name"
              value={formData.teacher_name}
              onChange={(e) => setFormData({ ...formData, teacher_name: e.target.value })}
              placeholder="Mr. David Kiprotich"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            placeholder="Brief description of the subject curriculum..."
          />
        </div>

        <div className="space-y-2">
          <Label>Grade Levels</Label>
          <div className="flex flex-wrap gap-4">
            {gradeLevels.map((level) => (
              <div key={level} className="flex items-center space-x-2">
                <Checkbox
                  id={level}
                  checked={formData.grade_levels.includes(level)}
                  onCheckedChange={(checked) => handleGradeLevelChange(level, checked as boolean)}
                />
                <Label htmlFor={level}>{level}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="syllabus_url">Syllabus URL</Label>
          <Input
            id="syllabus_url"
            value={formData.syllabus_url}
            onChange={(e) => setFormData({ ...formData, syllabus_url: e.target.value })}
            placeholder="https://example.com/syllabus.pdf"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="is_core_subject"
            checked={formData.is_core_subject}
            onCheckedChange={(checked) => setFormData({ ...formData, is_core_subject: checked })}
          />
          <Label htmlFor="is_core_subject">Core Subject</Label>
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
          <Button
            type="button"
            onClick={isEditing ? handleUpdate : handleAdd}
            disabled={loading || !formData.subject_name || formData.grade_levels.length === 0}
          >
            <Save className="mr-2 h-4 w-4" />
            {isEditing ? "Update" : "Add"} Subject
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const coreSubjects = subjects.filter((s) => s.is_core_subject)
  const electiveSubjects = subjects.filter((s) => !s.is_core_subject)

  return (
    <div className="space-y-6">
      {!showAddForm && !editingId && (
        <div className="flex justify-end">
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Subject
          </Button>
        </div>
      )}

      {showAddForm && <SubjectForm />}
      {editingId && <SubjectForm isEditing />}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Core Subjects */}
        <div>
          <h3 className="font-serif font-bold text-xl text-gray-900 mb-4 flex items-center">
            <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
            Core Subjects ({coreSubjects.length})
          </h3>
          <div className="space-y-4">
            {coreSubjects.map((subject) => (
              <Card key={subject.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{subject.subject_name}</CardTitle>
                      {subject.teacher_name && <p className="text-sm text-gray-600">Teacher: {subject.teacher_name}</p>}
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(subject)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(subject.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {subject.description && <p className="text-gray-700 text-sm">{subject.description}</p>}
                  <div className="flex flex-wrap gap-2">
                    {subject.grade_levels.map((level) => (
                      <Badge key={level} variant="secondary" className="text-xs">
                        {level}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
            {coreSubjects.length === 0 && <p className="text-gray-500 text-center py-8">No core subjects found.</p>}
          </div>
        </div>

        {/* Elective Subjects */}
        <div>
          <h3 className="font-serif font-bold text-xl text-gray-900 mb-4 flex items-center">
            <BookOpen className="h-5 w-5 text-green-600 mr-2" />
            Elective Subjects ({electiveSubjects.length})
          </h3>
          <div className="space-y-4">
            {electiveSubjects.map((subject) => (
              <Card key={subject.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{subject.subject_name}</CardTitle>
                      {subject.teacher_name && <p className="text-sm text-gray-600">Teacher: {subject.teacher_name}</p>}
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(subject)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(subject.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {subject.description && <p className="text-gray-700 text-sm">{subject.description}</p>}
                  <div className="flex flex-wrap gap-2">
                    {subject.grade_levels.map((level) => (
                      <Badge key={level} variant="outline" className="text-xs">
                        {level}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
            {electiveSubjects.length === 0 && (
              <p className="text-gray-500 text-center py-8">No elective subjects found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
