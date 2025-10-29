import { useState } from 'react';
import { FaPlus, FaTimes, FaCode } from 'react-icons/fa';

const SkillsSection = ({ data, updateData }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddSkill = () => {
    if (inputValue.trim() && !data.skills.includes(inputValue.trim())) {
      updateData('skills', [...data.skills.filter(s => s.trim()), inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemoveSkill = (index) => {
    updateData('skills', data.skills.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const popularSkills = [
    'JavaScript', 'React', 'Node.js', 'Python', 'TypeScript',
    'MongoDB', 'Express', 'Next.js', 'Tailwind CSS', 'Docker',
    'Git', 'AWS', 'PostgreSQL', 'Redux', 'GraphQL'
  ];

  const handlePopularSkillClick = (skill) => {
    if (!data.skills.includes(skill)) {
      updateData('skills', [...data.skills.filter(s => s.trim()), skill]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          <FaCode className="inline mr-2 text-yellow-500" />
          Skills & Technologies
        </h3>
        <p className="text-slate-600">Add your technical skills and expertise</p>
      </div>

      {/* Input Field */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Add Skills
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., React, Node.js, Python"
            className="input-field flex-1"
          />
          <button
            type="button"
            onClick={handleAddSkill}
            disabled={!inputValue.trim()}
            className="btn-primary px-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaPlus className="inline mr-2" />
            Add
          </button>
        </div>
      </div>

      {/* Popular Skills */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-3">
          Quick Add (Popular Skills)
        </label>
        <div className="flex flex-wrap gap-2">
          {popularSkills.map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => handlePopularSkillClick(skill)}
              disabled={data.skills.includes(skill)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                data.skills.includes(skill)
                  ? 'bg-green-100 text-green-700 cursor-not-allowed'
                  : 'bg-slate-100 text-slate-700 hover:bg-yellow-100 hover:text-yellow-700'
              }`}
            >
              {data.skills.includes(skill) ? '✓ ' : '+ '}
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Added Skills */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-3">
          Your Skills ({data.skills.filter(s => s.trim()).length})
        </label>
        {data.skills.filter(s => s.trim()).length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {data.skills.filter(s => s.trim()).map((skill, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-400 text-slate-900 px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(index)}
                  className="text-slate-900 hover:text-red-600 transition-colors"
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
            <FaCode className="text-5xl text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No skills added yet. Start adding your skills above!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsSection;
