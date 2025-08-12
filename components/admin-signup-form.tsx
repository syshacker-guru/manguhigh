"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Shield, AlertCircle } from "lucide-react"
import Link from "next/link"
import { adminSignUp } from "@/lib/actions/auth"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-medium rounded-lg h-[60px]"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Creating account...
        </>
      ) : (
        "Create Admin Account"
      )}
    </Button>
  )
}

export default function AdminSignUpForm() {
  const [state, formAction] = useActionState(adminSignUp, null)

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center space-y-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
          <Shield className="h-8 w-8 text-blue-600" />
        </div>
        <div>
          <CardTitle className="text-2xl font-serif font-bold text-gray-900">Create Admin Account</CardTitle>
          <p className="text-gray-600 mt-2">Set up admin access for Mang'uHigh</p>
        </div>
      </CardHeader>

      <CardContent>
        <form action={formAction} className="space-y-6">
          {state?.error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-start">
              <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              {state.error}
            </div>
          )}

          {state?.success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
              {state.success}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <Input id="fullName" name="fullName" type="text" placeholder="Your full name" required className="h-12" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@manguhigh.ac.ke"
                required
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input id="password" name="password" type="password" required className="h-12" />
            </div>
            <div className="space-y-2">
              <label htmlFor="adminKey" className="block text-sm font-medium text-gray-700">
                Admin Key
              </label>
              <Input
                id="adminKey"
                name="adminKey"
                type="password"
                placeholder="Contact school administration for key"
                required
                className="h-12"
              />
              <p className="text-xs text-gray-500">
                This key is required to create admin accounts. Contact the school administration to obtain it.
              </p>
            </div>
          </div>

          <SubmitButton />

          <div className="text-center text-sm text-gray-600">
            Already have an admin account?{" "}
            <Link href="/admin/login" className="text-blue-600 hover:underline font-medium">
              Sign in here
            </Link>
          </div>

          <div className="text-center">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
              ← Back to main site
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
