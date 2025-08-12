export function CampusLifeSection() {
  const activities = [
    "Student Government",
    "Drama Club",
    "Science Olympiad",
    "Debate Team",
    "Art Studio",
    "Music Ensemble",
    "Athletics",
    "Community Service",
  ]

  return (
    <section id="campus" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif font-bold text-4xl md:text-5xl text-slate-900 mb-6">
              A Vibrant Community Beyond the Classroom
            </h2>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Learning extends far beyond textbooks. Our students discover their passions, build lasting friendships,
              and develop leadership skills through diverse activities and experiences.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-sky-500 rounded-full mr-3"></div>
                  <span className="text-slate-700 font-medium">{activity}</span>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="font-serif font-bold text-xl text-slate-900 mb-3">Daily Schedule</h3>
              <p className="text-slate-600 leading-relaxed">
                {
                  "Here's exactly what your child's day looks like: structured learning time, creative exploration, collaborative projects, and plenty of opportunities for play and social connection."
                }
              </p>
            </div>
          </div>

          <div className="relative">
            <img
              src="/school-activities-collage.png"
              alt="Campus life activities"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
              <p className="text-sm text-slate-600 mb-1">Student Satisfaction</p>
              <p className="font-serif font-bold text-2xl text-slate-900">98%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
