import { useParams, useNavigate } from 'react-router-dom';
import { useGetPortfolioByIdQuery, useUpdatePortfolioMutation } from '../app/api/portfolioApi';
import PortfolioFormWrapper from '../components/form/PortfolioFormWrapper';

const EditPortfolioPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading: isFetching } = useGetPortfolioByIdQuery(id);
  const [updatePortfolio, { isLoading: isUpdating }] = useUpdatePortfolioMutation();

  if (isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-yellow-400"></div>
          <p className="mt-4 text-lg text-slate-600">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  const portfolioData = data?.portfolio;

  const initialData = portfolioData ? {
    template: portfolioData.template,
    hero: {
      name: portfolioData.hero.name,
      title: portfolioData.hero.title,
      tagline: portfolioData.hero.tagline || '',
      profileImage: portfolioData.hero.profileImage,
    },
    aboutMe: {
      bio: portfolioData.aboutMe.bio || '',
      email: portfolioData.aboutMe.email,
      phone: portfolioData.aboutMe.phone,
      location: portfolioData.aboutMe.location || '',
      socials: portfolioData.aboutMe.socials || ['', ''],
    },
    skills: portfolioData.skills || [''],
    services: portfolioData.services.length > 0 ? portfolioData.services : [{ title: '', description: '' }],
    portfolio: portfolioData.portfolio.map(p => ({
      title: p.title,
      description: p.description || '',
      projectImage: p.projectImage,
    })),
    testimonials: portfolioData.testimonials.length > 0 ? portfolioData.testimonials : [{ client: '', quote: '' }],
    blog: portfolioData.blog.length > 0 ? portfolioData.blog : [{ title: '', summary: '' }],
    contact: portfolioData.contact,
  } : null;

  const handleSubmit = async (formData) => {
    const formDataToSend = new FormData();

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

    // Add new images if provided
    if (formData.hero.profileImage && typeof formData.hero.profileImage !== 'string') {
      formDataToSend.append('profileImage', formData.hero.profileImage);
    }

    formData.portfolio.forEach((project) => {
      if (project.projectImage && typeof project.projectImage !== 'string') {
        formDataToSend.append('projectImage', project.projectImage);
      }
    });

    try {
      await updatePortfolio({ id, formData: formDataToSend }).unwrap();
      navigate(`/portfolio/${id}`);
    } catch (error) {
      console.error('Error updating portfolio:', error);
    }
  };

  return (
    <PortfolioFormWrapper
      initialData={initialData}
      onSubmit={handleSubmit}
      isLoading={isUpdating}
      submitButtonText="Update Portfolio"
      title="Edit Your Portfolio"
    />
  );
};

export default EditPortfolioPage;
