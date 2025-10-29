const Skills = ({ data }) => {
  const skillCategories = [
    {
      id: 1,
      title: 'Drone Training',
      icon: '🚁',
      skills: data?.skills?.slice(0, 4) || []
    },
    {
      id: 2,
      title: 'Aerospace Expertise',
      icon: '✈️',
      skills: data?.skills?.slice(4, 8) || []
    },
    {
      id: 3,
      title: 'Professional Skills',
      icon: '💼',
      skills: data?.skills?.slice(8, 12) || []
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">
            My <span className="text-red-500">Skills</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.id}
              className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-2xl">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{category.title}</h3>
              </div>

              {/* Skills with Progress Bars */}
              <div className="space-y-4">
                {category.skills.map((skill, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700">{skill}</span>
                      <span className="text-sm font-semibold text-slate-900">
                        {85 + (idx * 3)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${85 + (idx * 3)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
