import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { FaCheck, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Navbar from '../Navbar';

// Import form steps
import BasicDetails from './BasicDetails';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import SkillsSection from './SkillsSection';
import ServicesSection from './ServicesSection';
import PortfolioSection from './PortfolioSection';
import TestimonialsSection from './TestimonialsSection';
import BlogSection from './BlogSection';
import ContactSection from './ContactSection';
import ReviewSubmit from './ReviewSubmit';

const FORM_STEPS = [
  { id: 1, title: 'Template', component: BasicDetails },
  { id: 2, title: 'Hero', component: HeroSection },
  { id: 3, title: 'About Me', component: AboutSection },
  { id: 4, title: 'Skills', component: SkillsSection },
  { id: 5, title: 'Services', component: ServicesSection },
  { id: 6, title: 'Projects', component: PortfolioSection },
  { id: 7, title: 'Testimonials', component: TestimonialsSection },
  { id: 8, title: 'Blog', component: BlogSection },
  { id: 9, title: 'Contact', component: ContactSection },
  { id: 10, title: 'Review', component: ReviewSubmit },
];

// Default form structure
const DEFAULT_FORM_DATA = {
  template: 'templateA',
  hero: { name: '', title: '', tagline: '', profileImage: null },
  aboutMe: { bio: '', email: '', phone: '', location: '', socials: ['', ''] },
  skills: [''],
  services: [{ title: '', description: '' }],
  portfolio: [
    { title: '', description: '', projectImage: null },
    { title: '', description: '', projectImage: null },
    { title: '', description: '', projectImage: null },
  ],
  testimonials: [{ client: '', quote: '' }],
  blog: [{ title: '', summary: '' }],
  contact: { message: '', email: '', phone: '' },
};

const PortfolioFormWrapper = ({ 
  initialData = null, 
  onSubmit, 
  isLoading, 
  submitButtonText = 'Create Portfolio',
  title = 'Create Your Portfolio'
}) => {
//   const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  
  // ✅ FIX: Initialize state once with merged data (no useEffect override)
  const [formData, setFormData] = useState(() => {
    if (initialData) {
      return {
        template: initialData.template || DEFAULT_FORM_DATA.template,
        hero: { 
          ...DEFAULT_FORM_DATA.hero, 
          ...initialData.hero 
        },
        aboutMe: { 
          ...DEFAULT_FORM_DATA.aboutMe, 
          ...initialData.aboutMe,
          socials: initialData.aboutMe?.socials?.length > 0 
            ? initialData.aboutMe.socials 
            : DEFAULT_FORM_DATA.aboutMe.socials
        },
        skills: initialData.skills?.length > 0 
          ? initialData.skills 
          : DEFAULT_FORM_DATA.skills,
        services: initialData.services?.length > 0 
          ? initialData.services 
          : DEFAULT_FORM_DATA.services,
        portfolio: initialData.portfolio?.length > 0 
          ? initialData.portfolio 
          : DEFAULT_FORM_DATA.portfolio,
        testimonials: initialData.testimonials?.length > 0 
          ? initialData.testimonials 
          : DEFAULT_FORM_DATA.testimonials,
        blog: initialData.blog?.length > 0 
          ? initialData.blog 
          : DEFAULT_FORM_DATA.blog,
        contact: { 
          ...DEFAULT_FORM_DATA.contact, 
          ...initialData.contact 
        },
      };
    }
    return DEFAULT_FORM_DATA;
  });

  const [errors, setErrors] = useState({});

  // ✅ REMOVED problematic useEffect that was overriding user input

  const updateFormData = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.template) newErrors.template = 'Please select a template';
        break;
      case 2:
        if (!formData.hero?.name) newErrors.heroName = 'Name is required';
        if (!formData.hero?.title) newErrors.heroTitle = 'Title is required';
        break;
      case 3:
        if (!formData.aboutMe?.email) newErrors.email = 'Email is required';
        if (!formData.aboutMe?.phone) newErrors.phone = 'Phone is required';
        break;
      case 6:
        formData.portfolio?.forEach((project, index) => {
          if (!project.title) newErrors[`portfolio${index}Title`] = `Project ${index + 1} title is required`;
        });
        break;
      case 9:
        if (!formData.contact?.email) newErrors.contactEmail = 'Contact email is required';
        if (!formData.contact?.phone) newErrors.contactPhone = 'Contact phone is required';
        if (!formData.contact?.message) newErrors.contactMessage = 'Contact message is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < FORM_STEPS.length) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const CurrentStepComponent = FORM_STEPS[currentStep - 1].component;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Progress Bar */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
              <span className="text-sm font-semibold text-slate-600">
                Step {currentStep} of {FORM_STEPS.length}
              </span>
            </div>

            {/* Progress Steps */}
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                {FORM_STEPS.map((step) => (
                  <div key={step.id} className="flex flex-col items-center relative z-10">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                        currentStep > step.id
                          ? 'bg-green-500 text-white'
                          : currentStep === step.id
                          ? 'bg-yellow-400 text-slate-900'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {currentStep > step.id ? <FaCheck /> : step.id}
                    </div>
                    <span className="text-xs mt-2 font-medium hidden md:block text-center">
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>

              {/* Progress Line */}
              <div className="absolute top-5 left-0 w-full h-1 bg-slate-200 -z-0">
                <div
                  className="h-full bg-yellow-400 transition-all duration-300"
                  style={{ width: `${((currentStep - 1) / (FORM_STEPS.length - 1)) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <CurrentStepComponent
              data={formData}
              updateData={updateFormData}
              errors={errors}
            />

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
              >
                <FaArrowLeft />
                Previous
              </button>

              {currentStep === FORM_STEPS.length ? (
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  {isLoading ? 'Saving...' : submitButtonText}
                  <FaCheck />
                </button>
              ) : (
                <button onClick={handleNext} className="btn-primary inline-flex items-center gap-2">
                  Next
                  <FaArrowRight />
                </button>
              )}
            </div>

            {errors.submit && (
              <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {errors.submit}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioFormWrapper;
