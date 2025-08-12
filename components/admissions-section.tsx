import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const steps = [
  {
    step: "01",
    title: "Schedule a Visit",
    description: "Tour our campus and meet our community. See firsthand what makes Oakwood special.",
  },
  {
    step: "02",
    title: "Submit Application",
    description: "Complete our straightforward application process. We're here to help every step of the way.",
  },
  {
    step: "03",
    title: "Student Interview",
    description: "A friendly conversation to get to know your child and their interests and goals.",
  },
  {
    step: "04",
    title: "Welcome to Oakwood",
    description: "Join our community and begin an exciting educational journey together.",
  },
]

export function AdmissionsSection() {
  return (
    <section id="admissions" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif font-bold text-4xl md:text-5xl text-slate-900 mb-6">
            Your Path to Oakwood Academy
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Starting your journey with us is simple. We're here to guide you through every step of the admissions
            process.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => (
            <Card key={index} className="text-center border-slate-200 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-serif font-bold text-xl">{step.step}</span>
                </div>
                <CardTitle className="font-serif text-xl text-slate-900">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-slate-50 rounded-lg p-8 text-center">
          <h3 className="font-serif font-bold text-2xl text-slate-900 mb-4">Ready to Begin?</h3>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto leading-relaxed">
            Applications for the 2024-2025 school year are now open. Early application is encouraged as spaces are
            limited.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
              Start Application
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-300 text-slate-700 hover:bg-slate-100 px-8 bg-transparent"
            >
              Download Brochure
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
