import { AcademicsSection } from "@/components/academics-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AcademicsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-8 text-blue-900">Academic Programs</h1>
          <AcademicsSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}
