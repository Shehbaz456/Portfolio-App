import { FaBriefcase, FaPlus, FaTrash } from 'react-icons/fa';

const ServicesSection = ({ data, updateData }) => {
  const handleServiceChange = (index, field, value) => {
    const newServices = [...data.services];
    newServices[index] = {
      ...newServices[index],
      [field]: value
    };
    updateData('services', newServices);
  };

  const addService = () => {
    if (data.services.length < 3) {
      updateData('services', [...data.services, { title: '', description: '' }]);
    }
  };

  const removeService = (index) => {
    const newServices = data.services.filter((_, i) => i !== index);
    updateData('services', newServices.length > 0 ? newServices : [{ title: '', description: '' }]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">
            <FaBriefcase className="inline mr-2 text-yellow-500" />
            Services Offered
          </h3>
          <p className="text-slate-600">What services do you provide? (Maximum 3)</p>
        </div>
        {data.services.length < 3 && (
          <button
            type="button"
            onClick={addService}
            className="btn-primary"
          >
            <FaPlus className="inline mr-2" />
            Add Service
          </button>
        )}
      </div>

      <div className="space-y-6">
        {data.services.map((service, index) => (
          <div
            key={index}
            className="relative bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
          >
            {/* Remove Button */}
            {data.services.length > 1 && (
              <button
                type="button"
                onClick={() => removeService(index)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-600 transition-colors"
              >
                <FaTrash />
              </button>
            )}

            <div className="space-y-4">
              {/* Service Number Badge */}
              <div className="inline-flex items-center justify-center w-10 h-10 bg-yellow-400 text-slate-900 rounded-full font-bold">
                {index + 1}
              </div>

              {/* Service Title */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Service Title *
                </label>
                <input
                  type="text"
                  value={service.title || ''}
                  onChange={(e) => handleServiceChange(index, 'title', e.target.value)}
                  placeholder="e.g., Full Stack Development"
                  className="input-field"
                />
              </div>

              {/* Service Description */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Description
                </label>
                <textarea
                  value={service.description || ''}
                  onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                  placeholder="Describe what this service includes..."
                  rows="4"
                  className="input-field resize-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {data.services.length === 0 && (
        <div className="text-center py-12 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
          <FaBriefcase className="text-5xl text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 mb-4">No services added yet</p>
          <button type="button" onClick={addService} className="btn-primary">
            <FaPlus className="inline mr-2" />
            Add Your First Service
          </button>
        </div>
      )}
    </div>
  );
};

export default ServicesSection;

