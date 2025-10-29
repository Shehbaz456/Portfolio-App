import { FaCheckCircle, FaEye } from 'react-icons/fa';

const TemplateCard = ({ template, isSelected, onSelect, onPreview }) => {
  return (
    <div 
      className={`card card-hover relative cursor-pointer transition-all duration-300 ${
        isSelected ? 'ring-4 ring-yellow-400 ring-offset-4' : ''
      }`}
      onClick={() => onSelect(template.id)}
    >
      {/* Selected Badge */}
      {isSelected && (
        <div className="absolute top-4 right-4 z-10 bg-yellow-400 text-slate-900 px-3 py-1 rounded-full flex items-center gap-2 font-semibold shadow-lg">
          <FaCheckCircle className="w-4 h-4" />
          Selected
        </div>
      )}

      {/* Template Preview Image */}
      <div className="relative h-64 md:h-80 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-8">
            <div className={`text-6xl mb-4 ${template.color === 'yellow' ? 'text-yellow-400' : 'text-blue-500'}`}>
              📄
            </div>
            <p className="text-slate-600 font-medium">{template.name}</p>
          </div>
        </div>

        {/* Preview Button Overlay */}
        <div className="absolute inset-0 bg-black/0 hover:bg-black/60 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPreview(template.id);
            }}
            className="btn-primary flex items-center gap-2"
          >
            <FaEye className="w-5 h-5" />
            Preview
          </button>
        </div>
      </div>

      {/* Template Info */}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{template.name}</h3>
        <p className="text-slate-600 mb-4">{template.description}</p>

        {/* Key Features */}
        <div className="space-y-2">
          <p className="font-semibold text-sm text-slate-700 mb-2">Key Features:</p>
          <div className="flex flex-wrap gap-2">
            {template.features.map((feature, index) => (
              <span key={index} className="badge text-xs">
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Select Button */}
        <button
          onClick={() => onSelect(template.id)}
          className={`w-full mt-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
            isSelected
              ? 'bg-yellow-400 text-slate-900'
              : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
          }`}
        >
          {isSelected ? 'Selected' : 'Select Template'}
        </button>
      </div>
    </div>
  );
};

export default TemplateCard;
