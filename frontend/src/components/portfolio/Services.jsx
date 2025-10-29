const Services = ({ data }) => {
  const serviceIcons = ['🚁', '✈️', '📝', '🎯'];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">
            My <span className="text-red-500">Services</span>
          </h2>
          <p className="text-lg text-slate-600 mt-4 max-w-3xl mx-auto">
            Specialized drone and aerospace training programs tailored for individuals, institutions, and researchers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.services?.map((service, index) => (
            <div
              key={service._id}
              className="bg-gradient-to-br from-yellow-400 to-amber-400 rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center text-3xl mb-4">
                {serviceIcons[index % serviceIcons.length]}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-800 mb-4 line-clamp-4">
                {service.description}
              </p>

              {/* Bullet Points */}
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-slate-800">
                  <span className="text-slate-900 font-bold">●</span>
                  <span>Ground School Modules</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-800">
                  <span className="text-slate-900 font-bold">●</span>
                  <span>Scenario-Based Learning</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-800">
                  <span className="text-slate-900 font-bold">●</span>
                  <span>Successful Flight Sessions</span>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
