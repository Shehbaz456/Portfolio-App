import { useParams } from 'react-router-dom';
import { useGetPortfolioByIdQuery } from '../app/api/portfolioApi';
import Navbar from '../components/Navbar';
import HeroSection from '../components/portfolio/HeroSection';
import AboutMe from '../components/portfolio/AboutMe';
import Skills from '../components/portfolio/Skills';
import Services from '../components/portfolio/Services';
import Portfolio from '../components/portfolio/Portfolio';
import Testimonials from '../components/portfolio/Testimonials';
import Blog from '../components/portfolio/Blog';
import Contact from '../components/portfolio/Contact';
import Footer from '../components/portfolio/Footer';

const PortfolioPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetPortfolioByIdQuery(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-yellow-400"></div>
          <p className="mt-4 text-lg text-slate-600">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Portfolio Not Found</h2>
          <p className="text-slate-600">{error.message}</p>
        </div>
      </div>
    );
  }

  const portfolioData = data?.portfolio;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-16 md:pt-20">
        <HeroSection data={portfolioData} />
        <AboutMe data={portfolioData} />
        <Skills data={portfolioData} />
        <Services data={portfolioData} />
        <Portfolio data={portfolioData} />
        <Testimonials data={portfolioData} />
        <Blog data={portfolioData} />
        <Contact data={portfolioData} />
        <Footer data={portfolioData} />
      </div>
    </div>
  );
};

export default PortfolioPage;
