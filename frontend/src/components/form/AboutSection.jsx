// import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPlus, FaTrash } from 'react-icons/fa';

// const AboutSection = ({ data, updateData, errors }) => {
//   const handleChange = (field, value) => {
//     updateData('aboutMe', { ...data.aboutMe, [field]: value });
//   };

//   const handleSocialChange = (index, value) => {
//     const newSocials = [...data.aboutMe.socials];
//     newSocials[index] = value;
//     handleChange('socials', newSocials);
//   };

//   const addSocial = () => {
//     handleChange('socials', [...data.aboutMe.socials, '']);
//   };

//   const removeSocial = (index) => {
//     const newSocials = data.aboutMe.socials.filter((_, i) => i !== index);
//     handleChange('socials', newSocials);
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h3 className="text-2xl font-bold text-slate-900 mb-2">About Me</h3>
//         <p className="text-slate-600">Tell your story</p>
//       </div>

//       {/* Bio */}
//       <div>
//         <label className="block text-sm font-semibold text-slate-700 mb-2">Bio</label>
//         <textarea
//           value={data.aboutMe.bio}
//           onChange={(e) => handleChange('bio', e.target.value)}
//           placeholder="Tell us about yourself..."
//           rows="5"
//           className="input-field resize-none"
//         />
//       </div>

//       {/* Email */}
//       <div>
//         <label className="block text-sm font-semibold text-slate-700 mb-2">
//           <FaEnvelope className="inline mr-2" />
//           Email *
//         </label>
//         <input
//           type="email"
//           value={data.aboutMe.email}
//           onChange={(e) => handleChange('email', e.target.value)}
//           placeholder="john@example.com"
//           className="input-field"
//         />
//         {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//       </div>

//       {/* Phone */}
//       <div>
//         <label className="block text-sm font-semibold text-slate-700 mb-2">
//           <FaPhone className="inline mr-2" />
//           Phone *
//         </label>
//         <input
//           type="tel"
//           value={data.aboutMe.phone}
//           onChange={(e) => handleChange('phone', e.target.value)}
//           placeholder="+1 234 567 8900"
//           className="input-field"
//         />
//         {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
//       </div>

//       {/* Location */}
//       <div>
//         <label className="block text-sm font-semibold text-slate-700 mb-2">
//           <FaMapMarkerAlt className="inline mr-2" />
//           Location
//         </label>
//         <input
//           type="text"
//           value={data.aboutMe.location}
//           onChange={(e) => handleChange('location', e.target.value)}
//           placeholder="New York, USA"
//           className="input-field"
//         />
//       </div>

//       {/* Social Links */}
//       <div>
//         <div className="flex items-center justify-between mb-3">
//           <label className="block text-sm font-semibold text-slate-700">Social Links</label>
//           <button type="button" onClick={addSocial} className="btn-secondary text-sm">
//             <FaPlus className="inline mr-1" /> Add Link
//           </button>
//         </div>
//         <div className="space-y-3">
//           {data.aboutMe.socials.map((social, index) => (
//             <div key={index} className="flex gap-3">
//               <input
//                 type="url"
//                 value={social}
//                 onChange={(e) => handleSocialChange(index, e.target.value)}
//                 placeholder="https://github.com/username"
//                 className="input-field flex-1"
//               />
//               {data.aboutMe.socials.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => removeSocial(index)}
//                   className="text-red-500 hover:text-red-600"
//                 >
//                   <FaTrash />
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutSection;




// src/components/form/AboutSection.jsx
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPlus, FaTrash } from 'react-icons/fa';

const AboutSection = ({ data, updateData, errors }) => {
  const handleChange = (field, value) => {
    updateData('aboutMe', { 
      ...data.aboutMe, 
      [field]: value 
    });
  };

  const handleSocialChange = (index, value) => {
    const newSocials = [...(data.aboutMe?.socials || ['', ''])];
    newSocials[index] = value;
    handleChange('socials', newSocials);
  };

  const addSocial = () => {
    const currentSocials = data.aboutMe?.socials || ['', ''];
    handleChange('socials', [...currentSocials, '']);
  };

  const removeSocial = (index) => {
    const newSocials = (data.aboutMe?.socials || ['', '']).filter((_, i) => i !== index);
    handleChange('socials', newSocials.length > 0 ? newSocials : ['']);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">About Me</h3>
        <p className="text-slate-600">Tell your story</p>
      </div>

      {/* Bio */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Bio</label>
        <textarea
          value={data.aboutMe?.bio || ''}
          onChange={(e) => handleChange('bio', e.target.value)}
          placeholder="Tell us about yourself..."
          rows="5"
          className="input-field resize-none"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          <FaEnvelope className="inline mr-2" />
          Email *
        </label>
        <input
          type="email"
          value={data.aboutMe?.email || ''}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="john@example.com"
          className="input-field"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          <FaPhone className="inline mr-2" />
          Phone *
        </label>
        <input
          type="tel"
          value={data.aboutMe?.phone || ''}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="+1 234 567 8900"
          className="input-field"
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          <FaMapMarkerAlt className="inline mr-2" />
          Location
        </label>
        <input
          type="text"
          value={data.aboutMe?.location || ''}
          onChange={(e) => handleChange('location', e.target.value)}
          placeholder="New York, USA"
          className="input-field"
        />
      </div>

      {/* Social Links */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-semibold text-slate-700">Social Links</label>
          <button type="button" onClick={addSocial} className="btn-secondary text-sm">
            <FaPlus className="inline mr-1" /> Add Link
          </button>
        </div>
        <div className="space-y-3">
          {(data.aboutMe?.socials || ['', '']).map((social, index) => (
            <div key={index} className="flex gap-3">
              <input
                type="url"
                value={social || ''}
                onChange={(e) => handleSocialChange(index, e.target.value)}
                placeholder="https://github.com/username"
                className="input-field flex-1"
              />
              {(data.aboutMe?.socials || ['']).length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSocial(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  <FaTrash />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
