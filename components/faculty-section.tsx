import { Card, CardContent } from "@/components/ui/card"

const faculty = [
  {
    name: "Dr. Sarah Chen",
    role: "Head of School",
    bio: "Leading with 20 years of educational excellence and a passion for student-centered learning.",
    image: "/asian-woman-educator-smiling.png",
  },
  {
    name: "Michael Rodriguez",
    role: "Science Department Head",
    bio: "Inspiring the next generation of scientists through hands-on discovery and real-world applications.",
    image: "/placeholder-9lkj1.png",
  },
  {
    name: "Emma Thompson",
    role: "Arts & Literature",
    bio: "Nurturing creativity and critical thinking through the power of storytelling and artistic expression.",
    image: "/young-teacher-supplies.png",
  },
  {
    name: "David Park",
    role: "Mathematics",
    bio: "Making math accessible and exciting through innovative teaching methods and real-world problem solving.",
    image: "/asian-math-teacher.png",
  },
]

export function FacultySection() {
  return (
    <section id="faculty" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif font-bold text-4xl md:text-5xl text-slate-900 mb-6">
            Meet the Educators Who Inspire Every Day
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Our dedicated faculty brings passion, expertise, and genuine care to every classroom interaction.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {faculty.map((member, index) => (
            <Card key={index} className="bg-white hover:shadow-lg transition-all duration-300 border-slate-200 group">
              <CardContent className="p-6">
                <div className="relative mb-4 overflow-hidden rounded-lg">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-serif font-bold text-xl text-slate-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-slate-600 text-sm leading-relaxed">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
