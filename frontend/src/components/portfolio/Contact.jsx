import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = ({ data }) => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-yellow-400 to-amber-400">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            Get In Touch
          </h2>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                <FaEnvelope className="text-white w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="font-semibold text-slate-900">{data?.contact?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                <FaPhone className="text-white w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Phone</p>
                <p className="font-semibold text-slate-900">{data?.contact?.phone}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-6">
            <p className="text-slate-700 italic">"{data?.contact?.message}"</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
