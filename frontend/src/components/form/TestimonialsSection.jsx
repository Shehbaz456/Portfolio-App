import { FaQuoteLeft, FaPlus, FaTrash } from 'react-icons/fa';

const TestimonialsSection = ({ data, updateData }) => {
  const handleTestimonialChange = (index, field, value) => {
    const newTestimonials = [...data.testimonials];
    newTestimonials[index] = {
      ...newTestimonials[index],
      [field]: value
    };
    updateData('testimonials', newTestimonials);
  };

  const addTestimonial = () => {
    if (data.testimonials.length < 3) {
      updateData('testimonials', [...data.testimonials, { client: '', quote: '' }]);
    }
  };

  const removeTestimonial = (index) => {
    const newTestimonials = data.testimonials.filter((_, i) => i !== index);
    updateData('testimonials', newTestimonials.length > 0 ? newTestimonials : [{ client: '', quote: '' }]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">
            <FaQuoteLeft className="inline mr-2 text-yellow-500" />
            Client Testimonials
          </h3>
          <p className="text-slate-600">What do your clients say about you? (Maximum 3)</p>
        </div>
        {data.testimonials.length < 3 && (
          <button
            type="button"
            onClick={addTestimonial}
            className="btn-primary"
          >
            <FaPlus className="inline mr-2" />
            Add Testimonial
          </button>
        )}
      </div>

      <div className="space-y-6">
        {data.testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="relative bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
          >
            {/* Remove Button */}
            {data.testimonials.length > 1 && (
              <button
                type="button"
                onClick={() => removeTestimonial(index)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-600 transition-colors"
              >
                <FaTrash />
              </button>
            )}

            <div className="space-y-4">
              <FaQuoteLeft className="text-3xl text-yellow-500" />

              {/* Client Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Client Name *
                </label>
                <input
                  type="text"
                  value={testimonial.client || ''}
                  onChange={(e) => handleTestimonialChange(index, 'client', e.target.value)}
                  placeholder="e.g., John Doe, CEO at Company"
                  className="input-field"
                />
              </div>

              {/* Quote */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Testimonial Quote *
                </label>
                <textarea
                  value={testimonial.quote || ''}
                  onChange={(e) => handleTestimonialChange(index, 'quote', e.target.value)}
                  placeholder="What did the client say about your work?"
                  rows="4"
                  className="input-field resize-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {data.testimonials.length === 0 && (
        <div className="text-center py-12 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
          <FaQuoteLeft className="text-5xl text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 mb-4">No testimonials added yet</p>
          <button type="button" onClick={addTestimonial} className="btn-primary">
            <FaPlus className="inline mr-2" />
            Add Your First Testimonial
          </button>
        </div>
      )}
    </div>
  );
};

export default TestimonialsSection;
