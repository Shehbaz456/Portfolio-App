import { FaTimes, FaCheckCircle } from 'react-icons/fa';

const TemplatePreview = ({ template, onClose, onSelect }) => {
  if (!template) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex justify-between items-center z-10">
          <div>
            <h2 className="text-2xl font-bold">{template.name}</h2>
            <p className="text-slate-600">{template.description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>

        {/* Preview Content */}
        <div className="p-6">
          <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl h-96 flex items-center justify-center mb-6">
            <div className="text-center">
              <div className={`text-8xl mb-4 ${template.color === 'yellow' ? 'text-yellow-400' : 'text-blue-500'}`}>
                📄
              </div>
              <p className="text-slate-600 text-lg">Template Preview</p>
            </div>
          </div>

          {/* Features List */}
          <div className="mb-6">
            <h3 className="font-bold text-lg mb-3">Included Features:</h3>
            <div className="grid grid-cols-2 gap-3">
              {template.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500 w-5 h-5 shrink-0" />
                  <span className="text-slate-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 p-6 flex gap-4">
          <button
            onClick={onClose}
            className="btn-outline flex-1"
          >
            Cancel
          </button>
          <button
            onClick={onSelect}
            className="btn-primary flex-1"
          >
            Use This Template
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreview;
