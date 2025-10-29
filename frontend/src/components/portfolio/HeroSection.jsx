import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const HeroSection = ({ data }) => {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 to-white py-12 md:py-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left - Image */}
          <div className="order-2 lg:order-1 relative">
            <div className="relative inline-block">
              <img
                src={data?.hero?.profileImage || '/default-avatar.png'}
                alt={data?.hero?.name}
                className="w-full max-w-md mx-auto rounded-3xl shadow-2xl"
              />
              {/* Experience Badge */}
              <div className="absolute bottom-4 left-4 bg-yellow-400 text-slate-900 px-6 py-3 rounded-full shadow-lg">
                <p className="font-bold text-lg">{data?.services?.length || 11}+ Years Experience</p>
              </div>
            </div>
          </div>

          {/* Right - Info */}
          <div className="order-1 lg:order-2">
            <div className="space-y-4">
              {/* Contact Info Cards */}
              <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaEnvelope className="text-white w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="font-semibold text-slate-900">{data?.aboutMe?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaPhone className="text-white w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Call</p>
                  <p className="font-semibold text-slate-900">{data?.aboutMe?.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaMapMarkerAlt className="text-white w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Location</p>
                  <p className="font-semibold text-slate-900">{data?.aboutMe?.location}</p>
                </div>
              </div>
            </div>

            {/* Name and Tagline */}
            <div className="mt-8">
              <h1 className="text-5xl md:text-6xl font-extrabold mb-3">
                <span className="gradient-text">{data?.hero?.name}</span>
              </h1>
              <p className="text-xl text-slate-600 italic">"{data?.hero?.tagline}"</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
