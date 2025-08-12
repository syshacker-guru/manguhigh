import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    quote:
      "Oakwood Academy has been transformative for our daughter. The teachers truly care about each child's individual growth and potential.",
    author: "Jennifer Martinez",
    role: "Parent of 5th Grader",
    image: "/smiling-hispanic-mother-headshot.png",
  },
  {
    quote:
      "The support I received here helped me get into my dream college. The teachers pushed me to think critically and pursue my passions.",
    author: "Alex Chen",
    role: "Class of 2023 Graduate",
    image: "/young-asian-graduate.png",
  },
  {
    quote:
      "As an educator myself, I'm impressed by the innovative teaching methods and genuine commitment to student success at Oakwood.",
    author: "Dr. Robert Williams",
    role: "Parent & University Professor",
    image: "/smiling-black-man-glasses.png",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif font-bold text-4xl md:text-5xl text-slate-900 mb-6">Voices from Our Community</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Hear from the families and students who make Oakwood Academy a special place to learn and grow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border-slate-200 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="text-4xl text-blue-600 mb-4">"</div>
                <p className="text-slate-700 mb-6 leading-relaxed italic">{testimonial.quote}</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="font-semibold text-slate-900">{testimonial.author}</p>
                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
