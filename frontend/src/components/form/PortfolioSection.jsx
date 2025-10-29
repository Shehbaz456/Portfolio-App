import { useState } from 'react';
import { FaImage, FaUpload, FaTrash } from 'react-icons/fa';

const PortfolioSection = ({ data, updateData, errors }) => {
  const [previews, setPreviews] = useState([null, null, null]);

  const handleProjectChange = (index, field, value) => {
    const newPortfolio = [...data.portfolio];
    newPortfolio[index][field] = value;
    updateData('portfolio', newPortfolio);
  };

  const handleImageChange = (index, file) => {
    if (file) {
      const newPortfolio = [...data.portfolio];
      newPortfolio[index].projectImage = file;
      updateData('portfolio', newPortfolio);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPreviews = [...previews];
        newPreviews[index] = reader.result;
        setPreviews(newPreviews);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index) => {
    const newPortfolio = [...data.portfolio];
    newPortfolio[index].projectImage = null;
    updateData('portfolio', newPortfolio);
    
    const newPreviews = [...previews];
    newPreviews[index] = null;
    setPreviews(newPreviews);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          <FaImage className="inline mr-2 text-yellow-500" />
          Portfolio Projects
        </h3>
        <p className="text-slate-600">Showcase your best work (Exactly 3 projects required)</p>
      </div>

      <div className="space-y-8">
        {data.portfolio.map((project, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-yellow-400 text-slate-900 rounded-full font-bold">
                {index + 1}
              </div>
              <span className="text-sm text-slate-500">Project {index + 1}</span>
            </div>

            {/* Project Image */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Project Image *
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(index, e.target.files[0])}
                  className="hidden"
                  id={`projectImage${index}`}
                />
                <label
                  htmlFor={`projectImage${index}`}
                  className="cursor-pointer block"
                >
                  {previews[index] || project.projectImage ? (
                    <div className="relative group">
                      <img
                        src={previews[index] || (typeof project.projectImage === 'string' ? project.projectImage : '')}
                        alt={`Project ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <span className="text-white font-semibold">Change Image</span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          removeImage(index);
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ) : (
                    <div className="border-4 border-dashed border-slate-300 rounded-lg h-48 flex flex-col items-center justify-center hover:border-yellow-400 transition-all">
                      <FaUpload className="text-5xl text-slate-400 mb-2" />
                      <p className="text-slate-600 font-medium">Click to upload image</p>
                      <p className="text-slate-400 text-sm mt-1">PNG, JPG up to 5MB</p>
                    </div>
                  )}
                </label>
              </div>
              {errors[`portfolio${index}Image`] && (
                <p className="text-red-500 text-sm mt-1">{errors[`portfolio${index}Image`]}</p>
              )}
            </div>

            {/* Project Title */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Project Title *
              </label>
              <input
                type="text"
                value={project.title}
                onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                placeholder="e.g., E-commerce Platform"
                className="input-field"
              />
              {errors[`portfolio${index}Title`] && (
                <p className="text-red-500 text-sm mt-1">{errors[`portfolio${index}Title`]}</p>
              )}
            </div>

            {/* Project Description */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Description
              </label>
              <textarea
                value={project.description}
                onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                placeholder="Describe the project, technologies used, and your role..."
                rows="4"
                className="input-field resize-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioSection;
