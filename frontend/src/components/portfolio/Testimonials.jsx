import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const Testimonials = ({ data }) => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">
            Client <span className="text-yellow-400">Testimonials</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data?.testimonials?.map((testimonial) => (
            <div
              key={testimonial._id}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all"
            >
              <FaQuoteLeft className="text-yellow-400 text-4xl mb-4" />
              <p className="text-slate-200 mb-6 italic">"{testimonial.quote}"</p>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 w-4 h-4" />
                ))}
              </div>
              <p className="font-bold text-yellow-400">{testimonial.client}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
