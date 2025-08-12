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
import { Plus, Edit, Trash2, Save, X, Calendar, Star, Megaphone } from "lucide-react"

type NewsEvent = Database["public"]["Tables"]["news_events"]["Row"]

interface NewsEventsManagerProps {
  initialNewsEvents: NewsEvent[]
}

const types = [
  { value: "news", label: "News", icon: Star },
  { value: "event", label: "Event", icon: Calendar },
  { value: "announcement", label: "Announcement", icon: Megaphone },
]

export default function NewsEventsManager({ initialNewsEvents }: NewsEventsManagerProps) {
  const [newsEvents, setNewsEvents] = useState<NewsEvent[]>(initialNewsEvents)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "news" as NewsEvent["type"],
    image_url: "",
    event_date: "",
    is_published: false,
  })

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      type: "news",
      image_url: "",
      event_date: "",
      is_published: false,
    })
  }

  const handleAdd = async () => {
    setLoading(true)
    try {
      const insertData = {
        ...formData,
        event_date: formData.event_date ? new Date(formData.event_date).toISOString() : null,
      }

      const { data, error } = await supabase.from("news_events").insert([insertData]).select().single()

      if (error) throw error

      setNewsEvents([data, ...newsEvents])
      setShowAddForm(false)
      resetForm()
      toast({
        title: "Success",
        description: "Item added successfully.",
      })
    } catch (error) {
      console.error("Error adding news/event:", error)
      toast({
        title: "Error",
        description: "Failed to add item. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (item: NewsEvent) => {
    setFormData({
      title: item.title,
      content: item.content,
      type: item.type,
      image_url: item.image_url || "",
      event_date: item.event_date ? new Date(item.event_date).toISOString().slice(0, 16) : "",
      is_published: item.is_published,
    })
    setEditingId(item.id)
  }

  const handleUpdate = async () => {
    if (!editingId) return

    setLoading(true)
    try {
      const updateData = {
        ...formData,
        event_date: formData.event_date ? new Date(formData.event_date).toISOString() : null,
        updated_at: new Date().toISOString(),
      }

      const { data, error } = await supabase
        .from("news_events")
        .update(updateData)
        .eq("id", editingId)
        .select()
        .single()

      if (error) throw error

      setNewsEvents(newsEvents.map((item) => (item.id === editingId ? data : item)))
      setEditingId(null)
      resetForm()
      toast({
        title: "Success",
        description: "Item updated successfully.",
      })
    } catch (error) {
      console.error("Error updating news/event:", error)
      toast({
        title: "Error",
        description: "Failed to update item. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return

    setLoading(true)
    try {
      const { error } = await supabase.from("news_events").delete().eq("id", id)

      if (error) throw error

      setNewsEvents(newsEvents.filter((item) => item.id !== id))
      toast({
        title: "Success",
        description: "Item deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting news/event:", error)
      toast({
        title: "Error",
        description: "Failed to delete item. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const NewsEventForm = ({ isEditing = false }: { isEditing?: boolean }) => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Item" : "Add New Item"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter title..."
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value as NewsEvent["type"] })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {types.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={6}
            placeholder="Enter the full content..."
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="event_date">Event Date (optional)</Label>
            <Input
              id="event_date"
              type="datetime-local"
              value={formData.event_date}
              onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
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
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="is_published"
            checked={formData.is_published}
            onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
          />
          <Label htmlFor="is_published">Published</Label>
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
            disabled={loading || !formData.title || !formData.content}
          >
            <Save className="mr-2 h-4 w-4" />
            {isEditing ? "Update" : "Add"} Item
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
            Add News/Event
          </Button>
        </div>
      )}

      {showAddForm && <NewsEventForm />}
      {editingId && <NewsEventForm isEditing />}

      <div className="grid gap-4">
        {newsEvents.map((item) => {
          const typeConfig = types.find((t) => t.value === item.type)
          const IconComponent = typeConfig?.icon || Star
          const eventDate = item.event_date ? new Date(item.event_date) : null
          const createdDate = new Date(item.created_at)

          return (
            <Card key={item.id}>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <IconComponent className="h-5 w-5 text-gray-600" />
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <Badge variant={item.is_published ? "default" : "secondary"}>
                        {item.is_published ? "Published" : "Draft"}
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {item.type}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Created: {createdDate.toLocaleDateString()}</span>
                      {eventDate && <span>Event: {eventDate.toLocaleDateString()}</span>}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 line-clamp-3">{item.content}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {newsEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No news or events found. Add your first item to get started.</p>
        </div>
      )}
    </div>
  )
}
