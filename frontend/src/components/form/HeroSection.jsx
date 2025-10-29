import { FaUpload, FaUser, FaBriefcase, FaQuoteRight } from 'react-icons/fa';
import { useState } from 'react';

const HeroSection = ({ data, updateData, errors }) => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateData('hero', { ...data.hero, profileImage: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (field, value) => {
    updateData('hero', { ...data.hero, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Hero Section</h3>
        <p className="text-slate-600">Make a great first impression</p>
      </div>

      {/* Profile Image Upload */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          <FaUser className="inline mr-2" />
          Profile Image *
        </label>
        <div className="flex items-center gap-6">
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="profileImage"
            />
            <label
              htmlFor="profileImage"
              className="cursor-pointer flex items-center justify-center w-32 h-32 border-4 border-dashed border-slate-300 rounded-full hover:border-yellow-400 transition-all"
            >
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full rounded-full object-cover" />
              ) : (
                <FaUpload className="text-4xl text-slate-400" />
              )}
            </label>
          </div>
          <div className="flex-1">
            <p className="text-sm text-slate-600 mb-2">Upload your professional photo</p>
            <button
              type="button"
              onClick={() => document.getElementById('profileImage').click()}
              className="btn-secondary text-sm"
            >
              Choose File
            </button>
          </div>
        </div>
        {errors.heroImage && <p className="text-red-500 text-sm mt-1">{errors.heroImage}</p>}
      </div>

      {/* Name */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Full Name *
        </label>
        <input
          type="text"
          value={data.hero.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="John Doe"
          className="input-field"
        />
        {errors.heroName && <p className="text-red-500 text-sm mt-1">{errors.heroName}</p>}
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          <FaBriefcase className="inline mr-2" />
          Professional Title *
        </label>
        <input
          type="text"
          value={data.hero.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Full Stack Developer"
          className="input-field"
        />
        {errors.heroTitle && <p className="text-red-500 text-sm mt-1">{errors.heroTitle}</p>}
      </div>

      {/* Tagline */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          <FaQuoteRight className="inline mr-2" />
          Tagline (Optional)
        </label>
        <input
          type="text"
          value={data.hero.tagline}
          onChange={(e) => handleChange('tagline', e.target.value)}
          placeholder="Crafting Digital Experiences"
          className="input-field"
        />
      </div>
    </div>
  );
};

export default HeroSection;
