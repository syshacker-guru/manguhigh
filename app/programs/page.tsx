import { ProgramsSection } from "@/components/programs-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-8 text-blue-900">Programs & Activities</h1>
          <ProgramsSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}
