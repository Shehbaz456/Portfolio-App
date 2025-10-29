const Footer = ({ data }) => {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container-custom">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">
            <span className="gradient-text">{data?.hero?.name}</span>
          </h3>
          <p className="text-slate-400 mb-6">{data?.hero?.title}</p>
          
          <div className="flex justify-center gap-4 mb-6">
            {data?.aboutMe?.socials?.map((social, index) => (
              <a
                key={index}
                href={social}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors"
              >
                <span className="text-slate-900 font-bold">{social.charAt(0).toUpperCase()}</span>
              </a>
            ))}
          </div>

          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} {data?.hero?.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
