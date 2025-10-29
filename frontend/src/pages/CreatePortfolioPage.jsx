import { useLocation, useNavigate } from 'react-router-dom';
import { useCreatePortfolioMutation } from '../app/api/portfolioApi';
import PortfolioFormWrapper from '../components/form/PortfolioFormWrapper';

const CreatePortfolioPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [createPortfolio, { isLoading }] = useCreatePortfolioMutation();

  // ✅ FIX: Provide complete initialData structure with template from location state
  const initialData = {
    template: location.state?.template || 'templateA',
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

  const handleSubmit = async (formData) => {
    const formDataToSend = new FormData();

    // Add fields as JSON strings
    formDataToSend.append('template', formData.template);
    formDataToSend.append('hero', JSON.stringify({
      name: formData.hero.name,
      title: formData.hero.title,
      tagline: formData.hero.tagline,
    }));
    formDataToSend.append('aboutMe', JSON.stringify(formData.aboutMe));
    formDataToSend.append('skills', JSON.stringify(formData.skills.filter(s => s.trim())));
    formDataToSend.append('services', JSON.stringify(formData.services.filter(s => s.title).slice(0, 3)));
    formDataToSend.append('portfolio', JSON.stringify(
      formData.portfolio.map(p => ({ title: p.title, description: p.description }))
    ));
    formDataToSend.append('testimonials', JSON.stringify(formData.testimonials.filter(t => t.client)));
    formDataToSend.append('blog', JSON.stringify(formData.blog.filter(b => b.title)));
    formDataToSend.append('contact', JSON.stringify(formData.contact));

    // Add images
    if (formData.hero.profileImage) {
      formDataToSend.append('profileImage', formData.hero.profileImage);
    }

    formData.portfolio.forEach((project) => {
      if (project.projectImage) {
        formDataToSend.append('projectImage', project.projectImage);
      }
    });

    try {
      const result = await createPortfolio(formDataToSend).unwrap();
      navigate(`/portfolio/${result.portfolio._id}`);
    } catch (error) {
      console.error('Error creating portfolio:', error);
      alert('Failed to create portfolio: ' + (error.message || 'Unknown error'));
    }
  };

  return (
    <PortfolioFormWrapper
      initialData={initialData}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      submitButtonText="Create Portfolio"
      title="Create Your Portfolio"
    />
  );
};

export default CreatePortfolioPage;
