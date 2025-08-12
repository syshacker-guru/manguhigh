import { Card, CardContent } from "@/components/ui/card"
import { Users, Award, BookOpen, Heart } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif font-bold text-3xl lg:text-4xl text-gray-900 mb-4">About Mang'uHigh</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Since 1985, we have been committed to providing exceptional education that prepares students for success in
            higher education and life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h3 className="font-serif font-bold text-2xl text-gray-900">Principal's Message</h3>
            <p className="text-gray-700 leading-relaxed">
              "Welcome to Mang'uHigh, where we believe every student has the potential to excel. Our commitment is to
              provide a nurturing environment that fosters academic achievement, character development, and leadership
              skills that will serve our students throughout their lives."
            </p>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                <img src="/professional-african-woman-principal.png" alt="Dr. Sarah Wanjiku" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Dr. Sarah Wanjiku</div>
                <div className="text-sm text-gray-600">Principal</div>
              </div>
            </div>
          </div>

          <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
            <img
              src="/placeholder-hvl7c.png"
              alt="Principal with students"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Academic Excellence</h4>
              <p className="text-sm text-gray-600">Consistently high KCSE performance with comprehensive curriculum</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Character Development</h4>
              <p className="text-sm text-gray-600">Building integrity, leadership, and social responsibility</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Co-curricular Activities</h4>
              <p className="text-sm text-gray-600">Diverse clubs, societies, and sports programs</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Pastoral Care</h4>
              <p className="text-sm text-gray-600">Comprehensive support system for student wellbeing</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
