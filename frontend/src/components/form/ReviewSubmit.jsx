import { FaCheckCircle, FaUser, FaBriefcase, FaCode, FaImage } from 'react-icons/fa';

const ReviewSubmit = ({ data }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-slate-900 mb-2">
          🎉 Review Your Portfolio
        </h3>
        <p className="text-slate-600">
          Take a moment to review all the information before submitting
        </p>
      </div>

      {/* Hero Section Review */}
      <div className="bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
            <FaUser className="text-white" />
          </div>
          <h4 className="text-lg font-bold text-slate-900">Hero Section</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-500">Name</p>
            <p className="font-semibold">{data.hero.name || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Title</p>
            <p className="font-semibold">{data.hero.title || 'Not provided'}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-slate-500">Tagline</p>
            <p className="font-semibold">{data.hero.tagline || 'Not provided'}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-slate-500">Profile Image</p>
            {data.hero.profileImage ? (
              <div className="mt-2">
                <img
                  src={typeof data.hero.profileImage === 'string' ? data.hero.profileImage : URL.createObjectURL(data.hero.profileImage)}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-yellow-400"
                />
              </div>
            ) : (
              <p className="text-red-500">⚠️ No image uploaded</p>
            )}
          </div>
        </div>
      </div>

      {/* Skills Review */}
      <div className="bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
            <FaCode className="text-white" />
          </div>
          <h4 className="text-lg font-bold text-slate-900">Skills ({data.skills.filter(s => s.trim()).length})</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.skills.filter(s => s.trim()).map((skill, index) => (
            <span key={index} className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Services Review */}
      <div className="bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
            <FaBriefcase className="text-white" />
          </div>
          <h4 className="text-lg font-bold text-slate-900">Services ({data.services.filter(s => s.title).length})</h4>
        </div>
        <div className="space-y-3">
          {data.services.filter(s => s.title).map((service, index) => (
            <div key={index} className="p-3 bg-slate-50 rounded-lg">
              <p className="font-semibold">{service.title}</p>
              <p className="text-sm text-slate-600">{service.description || 'No description'}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Projects Review */}
      <div className="bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
            <FaImage className="text-white" />
          </div>
          <h4 className="text-lg font-bold text-slate-900">Projects (3)</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.portfolio.map((project, index) => (
            <div key={index} className="border-2 border-slate-200 rounded-lg overflow-hidden">
              {project.projectImage ? (
                <img
                  src={typeof project.projectImage === 'string' ? project.projectImage : URL.createObjectURL(project.projectImage)}
                  alt={project.title}
                  className="w-full h-32 object-cover"
                />
              ) : (
                <div className="w-full h-32 bg-slate-200 flex items-center justify-center">
                  <p className="text-slate-500">No image</p>
                </div>
              )}
              <div className="p-3">
                <p className="font-semibold text-sm">{project.title || 'Untitled'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 text-center">
        <FaCheckCircle className="text-5xl text-green-500 mx-auto mb-4" />
        <h4 className="text-xl font-bold text-slate-900 mb-2">Ready to Launch!</h4>
        <p className="text-slate-600">
          Click "Create Portfolio" below to publish your portfolio
        </p>
      </div>
    </div>
  );
};

export default ReviewSubmit;
