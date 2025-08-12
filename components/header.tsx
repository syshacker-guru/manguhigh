"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-gray-200">
              <img src="/mangu-logo.png" alt="Mang'u High School Logo" className="w-10 h-10 object-contain" />
            </div>
            <div>
              <Link
                href="/"
                className="font-serif font-bold text-xl text-gray-900 hover:text-blue-600 transition-colors"
              >
                Mang'u High School
              </Link>
              <p className="text-xs text-gray-600 hidden sm:block">Jishinde Ushinde</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              About
            </Link>
            <Link href="/academics" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Academics
            </Link>
            <Link href="/programs" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Programs
            </Link>
            <Link href="/news" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              News
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/admin/login">
              <Button variant="outline" size="sm" className="hidden sm:flex bg-transparent">
                Admin Login
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white hidden sm:flex">Contact Us</Button>
            </Link>

            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-4">
              <Link href="/about" className="block text-gray-700 hover:text-blue-600 font-medium">
                About
              </Link>
              <Link href="/academics" className="block text-gray-700 hover:text-blue-600 font-medium">
                Academics
              </Link>
              <Link href="/programs" className="block text-gray-700 hover:text-blue-600 font-medium">
                Programs
              </Link>
              <Link href="/news" className="block text-gray-700 hover:text-blue-600 font-medium">
                News
              </Link>
              <Link href="/contact" className="block text-gray-700 hover:text-blue-600 font-medium">
                Contact
              </Link>
              <div className="pt-4 space-y-2">
                <Link href="/admin/login" className="block">
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Admin Login
                  </Button>
                </Link>
                <Link href="/contact" className="block">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Contact Us</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
