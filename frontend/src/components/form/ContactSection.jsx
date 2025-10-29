import { FaEnvelope, FaPhone, FaComment } from 'react-icons/fa';

const ContactSection = ({ data, updateData, errors }) => {
  const handleChange = (field, value) => {
    updateData('contact', { ...data.contact, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          <FaComment className="inline mr-2 text-yellow-500" />
          Contact Information
        </h3>
        <p className="text-slate-600">How can people reach you?</p>
      </div>

      {/* Contact Message */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          <FaComment className="inline mr-1" />
          Contact Message *
        </label>
        <textarea
          value={data.contact.message}
          onChange={(e) => handleChange('message', e.target.value)}
          placeholder="e.g., Let's collaborate on building something amazing!"
          rows="4"
          className="input-field resize-none"
        />
        {errors.contactMessage && (
          <p className="text-red-500 text-sm mt-1">{errors.contactMessage}</p>
        )}
      </div>

      {/* Contact Email */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          <FaEnvelope className="inline mr-1" />
          Contact Email *
        </label>
        <input
          type="email"
          value={data.contact.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="contact@example.com"
          className="input-field"
        />
        {errors.contactEmail && (
          <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>
        )}
      </div>

      {/* Contact Phone */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          <FaPhone className="inline mr-1" />
          Contact Phone *
        </label>
        <input
          type="tel"
          value={data.contact.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="+1 234 567 8900"
          className="input-field"
        />
        {errors.contactPhone && (
          <p className="text-red-500 text-sm mt-1">{errors.contactPhone}</p>
        )}
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
        <p className="text-sm text-blue-700">
          <strong>💡 Tip:</strong> This contact information will be displayed in a dedicated contact section on your portfolio.
        </p>
      </div>
    </div>
  );
};

export default ContactSection;
