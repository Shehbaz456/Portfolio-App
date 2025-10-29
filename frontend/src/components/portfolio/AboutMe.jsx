const AboutMe = ({ data }) => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="text-red-500">Me</span>
            </h2>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              {data?.aboutMe?.bio}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-500">{data?.services?.length || 11}+</p>
                <p className="text-sm text-slate-600 mt-1">Years Experience</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-500">{data?.portfolio?.length * 40 || 120}</p>
                <p className="text-sm text-slate-600 mt-1">Projects</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-500">{data?.skills?.length || 15}</p>
                <p className="text-sm text-slate-600 mt-1">Skills</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-500">4.8</p>
                <p className="text-sm text-slate-600 mt-1">Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
