import { z } from 'zod';
import { validateZod } from '../middleware/validate.middleware.js';

// Base schema for common portfolio fields
const basePortfolioSchema = {
	template: z.enum(['templateA', 'templateB']),
	hero: z.object({
		name: z.string().min(1, 'Hero name is required'),
		title: z.string().min(1, 'Hero title is required'),
		tagline: z.string().optional().nullable(),
		profileImage: z.string().optional().nullable()
	}),
	aboutMe: z
		.object({
			bio: z.string().optional().nullable(),
			email: z.string().email('Invalid aboutMe email').optional().nullable(),
			phone: z.string().optional().nullable(),
			location: z.string().optional().nullable(),
			socials: z.array(z.string()).optional().nullable()
		})
		.optional()
		.nullable(),
	skills: z.array(z.string()).optional().nullable(),
	services: z.array(
		z.object({
			title: z.string().min(1, 'Service title is required'),
			description: z.string().optional().nullable()
		})
	).optional().nullable(),
	portfolio: z
		.array(
			z.object({
				title: z.string().min(1, 'Portfolio title is required'),
				projectImage: z.string().optional().nullable(),
				description: z.string().optional().nullable()
			})
		)
		.length(3, 'Portfolio must contain exactly 3 items'),
	testimonials: z
		.array(
			z.object({
				client: z.string().min(1, 'Testimonial client is required'),
				quote: z.string().min(1, 'Testimonial quote is required')
			})
		)
		.min(1, 'Testimonials must contain at least 1 item')
		.max(3, 'Testimonials can contain at most 3 items'),
	blog: z.array(z.object({ title: z.string().optional().nullable(), summary: z.string().optional().nullable()})).optional().nullable(),
	contact: z.object({
		message: z.string().min(1, 'Contact message is required'),
		email: z.string().email('Invalid contact email'),
		phone: z.string().min(1, 'Contact phone is required')
	})
};

// Create schema for portfolio creation - all fields required
const portfolioSchema = z.object(basePortfolioSchema);

// Create schema for portfolio updates - all fields optional
const portfolioUpdateSchema = z.object({
    template: z.enum(['templateA', 'templateB']).optional(),
    hero: z.object({
        name: z.string().min(1, 'Hero name is required').optional(),
        title: z.string().min(1, 'Hero title is required').optional(),
        tagline: z.string().optional().nullable(),
        profileImage: z.string().optional().nullable()
    }).optional(),
    aboutMe: z.object({
        bio: z.string().optional().nullable(),
        email: z.string().email('Invalid aboutMe email').optional().nullable(),
        phone: z.string().optional().nullable(),
        location: z.string().optional().nullable(),
        socials: z.array(z.string()).optional().nullable()
    }).optional().nullable(),
    skills: z.array(z.string()).optional().nullable(),
    services: z.array(
        z.object({
            title: z.string().min(1, 'Service title is required'),
            description: z.string().optional().nullable()
        })
    ).max(3, 'Services can contain at most 3 items').optional().nullable(),
    portfolio: z.array(
        z.object({
            title: z.string().min(1, 'Portfolio title is required'),
            projectImage: z.string().optional().default(""),
            description: z.string().optional().nullable()
        })
    ).length(3, 'Portfolio must contain exactly 3 items').optional(),
    testimonials: z.array(
        z.object({
            client: z.string().min(1, 'Testimonial client is required'),
            quote: z.string().min(1, 'Testimonial quote is required')
        })
    ).min(1, 'Testimonials must contain at least 1 item')
    .max(3, 'Testimonials can contain at most 3 items')
    .optional(),
    blog: z.array(
        z.object({
            title: z.string().optional().nullable(),
            summary: z.string().optional().nullable()
        })
    ).optional().nullable(),
    contact: z.object({
        message: z.string().min(1, 'Contact message is required').optional(),
        email: z.string().email('Invalid contact email').optional(),
        phone: z.string().min(1, 'Contact phone is required').optional()
    }).optional()
}).refine(data => {
    // Custom refinement to ensure at least one field is provided for update
    return Object.keys(data).length > 0;
}, {
    message: "At least one field must be provided for update"
});

// Export middlewares
export const portfolioValidator = validateZod(portfolioSchema, {
    jsonFields: ['hero', 'aboutMe', 'skills', 'services', 'portfolio', 'testimonials', 'blog', 'contact'],
    requireFiles: { profileImage: 1, projectImage: 3 }
});

export const portfolioUpdateValidator = validateZod(portfolioUpdateSchema, {
    jsonFields: ['hero', 'aboutMe', 'skills', 'services', 'portfolio', 'testimonials', 'blog', 'contact'],
    // Don't set requireFiles for updates - we'll handle file validation in the controller
    requireFiles: {}
});

export default portfolioValidator;

