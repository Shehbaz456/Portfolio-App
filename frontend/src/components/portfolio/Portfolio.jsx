import { useState } from 'react';

const Portfolio = ({ data }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">
            Photo <span className="text-red-500">Gallery</span>
          </h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.portfolio?.map((project) => (
            <div
              key={project._id}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <img
                src={project.projectImage || '/default-project.jpg'}
                alt={project.title}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-sm text-slate-200">{project.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Project Details */}
        {selectedProject && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <div className="bg-white rounded-2xl max-w-4xl w-full p-6" onClick={(e) => e.stopPropagation()}>
              <img
                src={selectedProject.projectImage}
                alt={selectedProject.title}
                className="w-full h-96 object-cover rounded-xl mb-4"
              />
              <h3 className="text-2xl font-bold mb-2">{selectedProject.title}</h3>
              <p className="text-slate-600">{selectedProject.description}</p>
              <button
                onClick={() => setSelectedProject(null)}
                className="mt-4 btn-primary"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
