import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCode, FaRocket, FaCheckCircle, FaSearch } from 'react-icons/fa';
import { useGetPortfoliosQuery } from '../app/api/portfolioApi';
import { TEMPLATES } from '../utils/constants';
import TemplateCard from '../components/templates/TemplateCard';
import TemplatePreview from '../components/templates/TemplatePreview';
import ProfileCard from '../components/ProfileCard';
import Navbar from '../components/Navbar';

const HomePage = () => {
  // Template selection state
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  
  // Portfolio filtering and pagination state
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  
  const navigate = useNavigate();

  // ✅ Fetch portfolios with new API structure
  const { data, isLoading, error, isFetching } = useGetPortfoliosQuery({
    page,
    limit: 8,
    search: searchTerm,
    role: selectedRole,
  });

  // Extract portfolios and pagination from response
  const portfolios = data?.portfolios || [];
  const pagination = data?.pagination;

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const handlePreview = (templateId) => {
    setSelectedTemplate(templateId);
    setShowPreview(true);
  };

  const handleContinue = () => {
    if (selectedTemplate) {
      navigate('/portfolio', { state: { template: selectedTemplate } });
    }
  };

  const features = [
    {
      icon: <FaCode className="w-8 h-8" />,
      title: 'Choose Template',
      description: 'Select from professionally designed portfolio templates'
    },
    {
      icon: <FaRocket className="w-8 h-8" />,
      title: 'Fill Details',
      description: 'Complete the multi-section form with your information'
    },
    {
      icon: <FaCheckCircle className="w-8 h-8" />,
      title: 'Generate Portfolio',
      description: 'Get your professional portfolio ready in minutes'
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 md:py-32">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_white_1px,_transparent_1px)] bg-[length:40px_40px]"></div>
          </div>

          <div className="container-custom relative z-10">
            <div className="text-center animate-fade-in-up">
              <div className="inline-block mb-4">
                <span className="badge bg-yellow-400/20 text-yellow-400 border border-yellow-400/30">
                  ✨ Professional Portfolio Generator
                </span>
              </div>
              
              <h1 className="font-extrabold mb-6 leading-tight text-white">
                Build Your <span className="gradient-text">Dream Portfolio</span>
                <br />
                in Minutes
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
                Choose a stunning template, fill in your details, and create a professional portfolio that stands out
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <button 
                  onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-primary"
                >
                  Get Started Free
                </button>
                <button 
                  onClick={() => document.getElementById('professionals')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border-white hover:border-slate-700 text-white border-2 px-6 py-3 rounded-lg hover:bg-white hover:text-slate-900 transition-all duration-300"
                >
                  View Examples
                </button>
              </div>
            </div>
          </div>

          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container-custom">
            <h2 className="section-title">
              How It <span className="gradient-text">Works</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="card card-hover p-8 text-center"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Template Selection Section */}
        <section id="templates" className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-amber-50">
          <div className="container-custom">
            <div className="section-title">
              <h2>
                Choose Your <span className="gradient-text">Template</span>
              </h2>
              <p className="text-slate-600 text-lg mt-4 max-w-2xl mx-auto">
                Select a professional template that best represents your style and customize it to your needs
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {TEMPLATES.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  isSelected={selectedTemplate === template.id}
                  onSelect={handleTemplateSelect}
                  onPreview={handlePreview}
                />
              ))}
            </div>

            {selectedTemplate && (
              <div className="text-center mt-12 animate-fade-in-up">
                <button
                  onClick={handleContinue}
                  className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2"
                >
                  Continue with Selected Template
                  <FaRocket className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Meet Our Professionals Section */}
        <section id="professionals" className="py-16 md:py-24 bg-gradient-to-br from-yellow-400 via-amber-400 to-orange-400">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Meet Our Professionals
              </h2>
              <p className="text-lg text-slate-800">
                Meet the experts shaping the future of drone tech
              </p>
              <div className="w-24 h-1 bg-slate-900 mx-auto mt-4"></div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-5xl mx-auto">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search professionals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-white bg-white/90 backdrop-blur-sm focus:outline-none focus:border-slate-900 transition-all"
                />
              </div>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-6 py-3 rounded-lg border-2 border-white bg-white/90 backdrop-blur-sm focus:outline-none focus:border-slate-900 transition-all"
              >
                <option value="">All Professions</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Full stack Developer">Full stack Developer</option>
                <option value="AI Specialist">AI Specialist</option>
              </select>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-6 py-3 rounded-lg border-2 border-white bg-white/90 backdrop-blur-sm focus:outline-none focus:border-slate-900 transition-all"
              >
                <option value="">All Locations</option>
                <option value="Remote">Remote</option>
                <option value="Miami, FL">Miami, FL</option>
                <option value="Denver, CO">Denver, CO</option>
              </select>
              <button className="btn-secondary px-6 py-3">
                Sort by Name
              </button>
            </div>

            {/* Profile Cards Grid */}
            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
                <p className="mt-4 text-slate-700">Loading professionals...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="bg-red-100 border border-red-400 rounded-lg p-6 inline-block">
                  <p className="text-red-700 font-semibold">Error loading professionals</p>
                  <p className="text-red-600 text-sm mt-2">{error.message || 'Please try again later'}</p>
                </div>
              </div>
            ) : (
              <>
                {/* Show fetching indicator */}
                {isFetching && (
                  <div className="text-center mb-4">
                    <span className="inline-flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full text-sm text-slate-700">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-900"></div>
                      Updating...
                    </span>
                  </div>
                )}

                {/* Portfolio Grid */}
                {portfolios.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {portfolios.map((portfolio, index) => (
                      <div
                        key={portfolio._id}
                        className="animate-fade-in-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <ProfileCard profile={portfolio} showActions={true} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-slate-700 text-lg">No professionals found</p>
                    <p className="text-slate-600 text-sm mt-2">Try adjusting your search filters</p>
                  </div>
                )}

                {/* Pagination */}
                {pagination && pagination.totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
                    <button
                      onClick={() => setPage(page - 1)}
                      disabled={!pagination.hasPrevPage}
                      className="btn-secondary px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <span className="flex items-center px-6 py-2 bg-white rounded-lg font-semibold">
                      Page {pagination.page} of {pagination.totalPages}
                    </span>
                    <button
                      onClick={() => setPage(page + 1)}
                      disabled={!pagination.hasNextPage}
                      className="btn-secondary px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}

            {/* List Your Profile Button */}
            <div className="text-center mt-12">
              <button
                onClick={() => navigate('/portfolio')}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                List your Profile
              </button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-slate-900 text-white">
          <div className="container-custom text-center">
            <h2 className="mb-6">
              Ready to Create Your Portfolio?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have created stunning portfolios with our platform
            </p>
            <button 
              onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary text-lg px-8 py-4"
            >
              Start Building Now
            </button>
          </div>
        </section>

        {/* Template Preview Modal */}
        {showPreview && (
          <TemplatePreview
            template={TEMPLATES.find(t => t.id === selectedTemplate)}
            onClose={() => setShowPreview(false)}
            onSelect={() => {
              setShowPreview(false);
              handleContinue();
            }}
          />
        )}
      </div>
    </>
  );
};

export default HomePage;









