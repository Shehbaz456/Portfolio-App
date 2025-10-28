import mongoose from 'mongoose';

const PortfolioSchema = new mongoose.Schema({
  template: {
    type: String,
    enum: ['templateA', 'templateB'],
    required: true
  },
  hero: {
    name: { type: String, required: true },
    title: { type: String, required: true },
    tagline: { type: String },
    profileImage: { type: String }  // cloudinary image URL
  },
  aboutMe: {
    bio: { type: String },
    email: { type: String },
    phone: { type: String },
    location: { type: String },
    socials: [{ type: String }]
  },
  skills: [{ type: String }],
  services: [
    {
      title: { type: String, required: true },
      description: { type: String }
    },
  ],
  portfolio: {
    type: [
      {
        title: { type: String, required: true },
        projectImage: { type: String },  // portfolio item image URL
        description: { type: String }
      }
    ],
  validate: {
    validator: function (v) {
      return v.length === 3;
    },
      message: 'You must provide exactly 3 services.'
    },
    required: true
  },

  testimonials: {
    type: [
    {
      client: { type: String, required: true },
      quote: { type: String, required: true }
    }

  ],
  validate: {
      validator: function (v) {
        return v.length >= 1 && v.length <= 3;
      },
      message: 'Testimonials must be between 1 and 3.'
    },
  },
  blog: [
    {
      title: { type: String },
      summary: { type: String }
    }
  ],
  contact: {
    message: { type: String , required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
  },
},{ timestamps: true });

PortfolioSchema.index({ 'skills': 1, 'hero.title': 1 });
export default mongoose.model('Portfolio', PortfolioSchema);
