"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Save } from "lucide-react"

interface SchoolInfo {
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
}

interface SchoolInfoFormProps {
  initialData: SchoolInfo | null
}

export default function SchoolInfoForm({ initialData }: SchoolInfoFormProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    school_name: initialData?.school_name || "Mang'uHigh",
    school_motto: initialData?.school_motto || "",
    school_description: initialData?.school_description || "",
    principal_name: initialData?.principal_name || "",
    principal_message: initialData?.principal_message || "",
    contact_email: initialData?.contact_email || "",
    contact_phone: initialData?.contact_phone || "",
    address: initialData?.address || "",
    established_year: initialData?.established_year || "",
    logo_url: initialData?.logo_url || "",
    hero_image_url: initialData?.hero_image_url || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const updateData = {
        ...formData,
        established_year: formData.established_year ? Number.parseInt(formData.established_year.toString()) : null,
        updated_at: new Date().toISOString(),
      }

      let result
      if (initialData) {
        // Update existing record
        result = await supabase.from("school_info").update(updateData).eq("id", initialData.id)
      } else {
        // Insert new record
        result = await supabase.from("school_info").insert([updateData])
      }

      if (result.error) throw result.error

      toast({
        title: "Success",
        description: "School information updated successfully.",
      })
    } catch (error) {
      console.error("Error updating school info:", error)
      toast({
        title: "Error",
        description: "Failed to update school information. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="school_name">School Name</Label>
              <Input
                id="school_name"
                value={formData.school_name}
                onChange={(e) => handleChange("school_name", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="school_motto">School Motto</Label>
              <Input
                id="school_motto"
                value={formData.school_motto}
                onChange={(e) => handleChange("school_motto", e.target.value)}
                placeholder="Excellence Through Knowledge"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="school_description">School Description</Label>
            <Textarea
              id="school_description"
              value={formData.school_description}
              onChange={(e) => handleChange("school_description", e.target.value)}
              rows={4}
              placeholder="Brief description of the school..."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="established_year">Established Year</Label>
              <Input
                id="established_year"
                type="number"
                value={formData.established_year}
                onChange={(e) => handleChange("established_year", e.target.value)}
                placeholder="1985"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="principal_name">Principal Name</Label>
              <Input
                id="principal_name"
                value={formData.principal_name}
                onChange={(e) => handleChange("principal_name", e.target.value)}
                placeholder="Dr. Sarah Wanjiku"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Principal's Message</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="principal_message">Message</Label>
            <Textarea
              id="principal_message"
              value={formData.principal_message}
              onChange={(e) => handleChange("principal_message", e.target.value)}
              rows={6}
              placeholder="Welcome message from the principal..."
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact_email">Email</Label>
              <Input
                id="contact_email"
                type="email"
                value={formData.contact_email}
                onChange={(e) => handleChange("contact_email", e.target.value)}
                placeholder="info@manguhigh.ac.ke"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact_phone">Phone</Label>
              <Input
                id="contact_phone"
                value={formData.contact_phone}
                onChange={(e) => handleChange("contact_phone", e.target.value)}
                placeholder="+254 700 123 456"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              rows={3}
              placeholder="Mang'u Road, Kiambu County, Kenya"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Media</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="logo_url">Logo URL</Label>
            <Input
              id="logo_url"
              value={formData.logo_url}
              onChange={(e) => handleChange("logo_url", e.target.value)}
              placeholder="https://example.com/logo.png"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hero_image_url">Hero Image URL</Label>
            <Input
              id="hero_image_url"
              value={formData.hero_image_url}
              onChange={(e) => handleChange("hero_image_url", e.target.value)}
              placeholder="https://example.com/hero.jpg"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={loading} className="min-w-32">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
