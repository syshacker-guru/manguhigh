import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProgramsSection } from "@/components/programs-section"
import { AcademicsSection } from "@/components/academics-section"
import { NewsEventsSection } from "@/components/news-events-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <AcademicsSection />
        <ProgramsSection />
        <NewsEventsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
