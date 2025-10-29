import { FaCheckCircle } from 'react-icons/fa';

const BasicDetails = ({ data, updateData }) => {
  const templates = [
    { id: 'templateA', name: 'Classic', preview: '/template-a.jpg' },
    { id: 'templateB', name: 'Modern', preview: '/template-b.jpg' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Choose Your Template</h3>
        <p className="text-slate-600">Select a template that best represents your style</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => updateData('template', template.id)}
            className={`relative cursor-pointer rounded-xl border-4 transition-all hover:shadow-xl ${
              data.template === template.id
                ? 'border-yellow-400 shadow-lg'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
              <span className="text-4xl font-bold text-slate-400">{template.name}</span>
            </div>
            <div className="p-4 text-center">
              <h4 className="font-bold text-lg">{template.name}</h4>
            </div>
            {data.template === template.id && (
              <div className="absolute top-4 right-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <FaCheckCircle className="text-white" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BasicDetails;
