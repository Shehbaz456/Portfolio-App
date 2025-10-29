import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  return (
    <nav
      className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-white/80'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <span className="text-2xl md:text-3xl font-bold text-slate-900">
                Dron<span className="gradient-text">TV</span>
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 group-hover:w-full transition-all duration-300"></div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center justify-center flex-1 px-8">
            <ul className="flex items-center space-x-1">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 group ${
                      location.pathname === item.path
                        ? 'text-yellow-500'
                        : 'text-slate-700 hover:text-yellow-500'
                    }`}
                  >
                    {item.name}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 transform transition-transform duration-300 ${
                        location.pathname === item.path
                          ? 'scale-x-100'
                          : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    ></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-all duration-300"
              aria-label="Toggle theme"
            >
              <div className="relative w-5 h-5">
                <FaSun
                  className={`absolute inset-0 text-yellow-500 transition-all duration-300 ${
                    isDark ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'
                  }`}
                />
                <FaMoon
                  className={`absolute inset-0 text-slate-700 transition-all duration-300 ${
                    isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'
                  }`}
                />
              </div>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-all duration-300"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span className={`absolute top-1 left-0 w-full h-0.5 bg-slate-900 transition-all duration-300 ${isOpen ? 'rotate-45 top-3' : ''}`}></span>
                <span className={`absolute top-3 left-0 w-full h-0.5 bg-slate-900 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
                <span className={`absolute top-5 left-0 w-full h-0.5 bg-slate-900 transition-all duration-300 ${isOpen ? '-rotate-45 top-3' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <ul className="py-4 space-y-1">
            {menuItems.map((item, index) => (
              <li
                key={item.name}
                className="transform transition-all duration-300"
                style={{
                  transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
                  transform: isOpen ? 'translateX(0)' : 'translateX(-20px)',
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <Link
                  to={item.path}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'bg-yellow-50 text-yellow-600'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
