import Portfolio from '../models/portfolio.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import  ApiError  from '../utils/ApiError.js';
import { uploadOnCloudinary,deleteFromCloudinary } from '../utils/cloudinary.js';

// Helper to safely parse JSON strings
const tryParse = (str) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return str;
  }
};

// Create Portfolio
// const createPortfolio = asyncHandler(async (req, res) => {
//   // Use validated data if present (zod middleware attaches it to req.validatedBody)
//   const data = req.validatedBody || {
//     template: tryParse(req.body.template),
//     hero: tryParse(req.body.hero) || {},
//     aboutMe: tryParse(req.body.aboutMe),
//     skills: tryParse(req.body.skills),
//     services: tryParse(req.body.services),
//     portfolio: tryParse(req.body.portfolio) || [],
//     testimonials: tryParse(req.body.testimonials),
//     blog: tryParse(req.body.blog),
//     contact: tryParse(req.body.contact)
//   };

//   const { template} = data;
//   let portfolio = data.portfolio || [];

//   // Handle profile image
//   if (req.files?.profileImage?.[0]) {
//     const profileImageResult = await uploadOnCloudinary(req.files.profileImage[0].path);
//     if (profileImageResult) {
//       data.hero = data.hero || {};
//       data.hero.profileImage = profileImageResult.secure_url;
//     }
//   }

//   // Handle project images (up to 3)
//   if (req.files?.projectImage) {
//     const projectImageResults = await Promise.all(
//       req.files.projectImage.map(file => uploadOnCloudinary(file.path))
//     );

//     // Ensure portfolio array has exactly 3 items as required by schema
//     while (portfolio.length < 3) {
//       portfolio.push({ title: `Project ${portfolio.length + 1}`, description: '' });
//     }

//     // Map uploaded image URLs to portfolio items
//     projectImageResults.forEach((result, index) => {
//       if (result && index < portfolio.length) {
//         portfolio[index].projectImage = result.secure_url;
//       }
//     });
//   }

//   const newPortfolio = await Portfolio.create({
//     template,
//     hero: data.hero,
//     aboutMe: data.aboutMe,
//     skills: data.skills,
//     services: (data.services || []).slice(0, 3), // Ensure up to 3 services
//     portfolio: (portfolio || []).slice(0, 3), // Ensure exactly 3 items
//     testimonials: data.testimonials,
//     blog: data.blog,
//     contact: data.contact
//   });
//   console.log(newPortfolio);

//   res.status(201).json(new ApiResponse(201, newPortfolio, 'Portfolio Created Successfully'));
// });

const createPortfolio = asyncHandler(async (req, res) => {
  // Parse request body data
  const data = {
    template: tryParse(req.body.template),
    hero: tryParse(req.body.hero) || {},
    aboutMe: tryParse(req.body.aboutMe) || {},
    skills: tryParse(req.body.skills) || [],
    services: tryParse(req.body.services) || [],
    portfolio: tryParse(req.body.portfolio) || [],
    testimonials: tryParse(req.body.testimonials) || [],
    blog: tryParse(req.body.blog) || [],
    contact: tryParse(req.body.contact) || {}
  };

  const { template } = data;
  let portfolio = data.portfolio;

  // Validate required fields
  if (!template) {
    throw new ApiError(400, 'Template is required');
  }

  // ✅ Validate portfolio array has exactly 3 items
  if (!Array.isArray(portfolio) || portfolio.length !== 3) {
    throw new ApiError(400, 'Portfolio must contain exactly 3 project items');
  }

  // Validate each portfolio item has title and description
  portfolio.forEach((item, index) => {
    if (!item.title) {
      throw new ApiError(400, `Portfolio item ${index + 1} must have a title`);
    }
  });

  // ✅ Handle profile image upload
  if (req.files?.profileImage?.[0]) {
    const profileImageResult = await uploadOnCloudinary(req.files.profileImage[0].path);
    if (profileImageResult) {
      data.hero.profileImage = profileImageResult.secure_url;
    }
  }

  // ✅ Handle exactly 3 project images upload
  if (req.files?.projectImage && req.files.projectImage.length === 3) {
    const projectImageResults = await Promise.all(
      req.files.projectImage.map(file => uploadOnCloudinary(file.path))
    );

    // Map uploaded images to portfolio items (1:1 mapping)
    projectImageResults.forEach((result, index) => {
      if (result && result.secure_url) {
        portfolio[index].projectImage = result.secure_url;
      } else {
        throw new ApiError(500, `Failed to upload project image ${index + 1}`);
      }
    });
  } else {
    throw new ApiError(400, 'Exactly 3 project images are required');
  }

  // Create portfolio
  const newPortfolio = await Portfolio.create({
    template,
    hero: data.hero,
    aboutMe: data.aboutMe,
    skills: data.skills,
    services: data.services.slice(0, 3), // Max 3 services
    portfolio: portfolio, // Exactly 3 items with images
    testimonials: data.testimonials,
    blog: data.blog,
    contact: data.contact
  });

  res.status(201).json(
    new ApiResponse(201, newPortfolio, 'Portfolio created successfully')
  );
});


// Get All Portfolios
const getAllPortfolios = asyncHandler(async (req, res) => {
  const {
    skill,
    role,
    search,
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    order = 'desc'
  } = req.query;

  // Build filter object
  let filter = {};

  if (skill) {
    filter.skills = { $regex: new RegExp(skill, 'i') };
  }

  if (role) {
    filter['hero.title'] = { $regex: new RegExp(role, 'i') };
  }

  if (search) {
    filter.$or = [
      { 'hero.name': { $regex: new RegExp(search, 'i') } },
      { 'hero.title': { $regex: new RegExp(search, 'i') } },
      { 'aboutMe.bio': { $regex: new RegExp(search, 'i') } },
      { skills: { $regex: new RegExp(search, 'i') } }
    ];
  }

  try {
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    if (pageNumber < 1 || limitNumber < 1) {
      throw new ApiError(400, 'Invalid pagination parameters');
    }

    const sortOption = {};
    sortOption[sortBy] = order === 'desc' ? -1 : 1;
    
    const totalResults = await Portfolio.countDocuments(filter);
    const totalPages = Math.ceil(totalResults / limitNumber);

    // Execute query with pagination and sorting
    const portfolios = await Portfolio.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNumber);

    // ✅ CONSISTENT: Pagination metadata in meta field
    const meta = {
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        totalResults,
        totalPages,
        hasNextPage: pageNumber < totalPages,
        hasPrevPage: pageNumber > 1
      }
    };

    return res.status(200).json(
      new ApiResponse(200, portfolios, 'Portfolios fetched successfully', meta)
    );

  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, 'Error fetching portfolios', error.message);
  }
});



// Get All Portfolios
// const getAllPortfolios = asyncHandler(async (req, res) => {
//   const {
//     skill,
//     role,
//     search,
//     page = 1,
//     limit = 10,
//     sortBy = 'createdAt',
//     order = 'desc'
//   } = req.query;

//   // Build filter object
//   let filter = {};

//   // Handle skill filtering with case-insensitive regex
//   if (skill) {
//     filter.skills = { 
//       $regex: new RegExp(skill, 'i')
//     };
//   }

//   // Handle role filtering with case-insensitive regex
//   if (role) {
//     filter['hero.title'] = { 
//       $regex: new RegExp(role, 'i')
//     };
//   }

//   // Add search functionality across multiple fields
//   if (search) {
//     filter.$or = [
//       { 'hero.name': { $regex: new RegExp(search, 'i') } },
//       { 'hero.title': { $regex: new RegExp(search, 'i') } },
//       { 'aboutMe.bio': { $regex: new RegExp(search, 'i') } },
//       { skills: { $regex: new RegExp(search, 'i') } }
//     ];
//   }

//   try {
//     // Calculate pagination
//     const pageNumber = parseInt(page);
//     const limitNumber = parseInt(limit);
//     const skip = (pageNumber - 1) * limitNumber;

//     if (pageNumber < 1 || limitNumber < 1) {
//       throw new ApiError(400, 'Invalid pagination parameters');
//     }
 
//     const sortOption = {};
//     sortOption[sortBy] = order === 'desc' ? -1 : 1;
//     const totalDocs = await Portfolio.countDocuments(filter);

//     // Execute query with pagination and sorting
//     const filteredData = await Portfolio.find(filter)
//       .sort(sortOption)
//       .skip(skip)
//       .limit(limitNumber);

//     const totalPages = Math.ceil(totalDocs / limitNumber);
//     const hasNextPage = pageNumber < totalPages;
//     const hasPrevPage = pageNumber > 1;

//     return res.status(200).json(new ApiResponse(200, {
//       filteredData,
//       pagination: {
//         currentPage: pageNumber,
//         totalPages,
//         totalResults: totalDocs,
//         hasNextPage,
//         hasPrevPage,
//         limit: limitNumber
//       }
//     }, 'Portfolios fetched successfully'));

//   } catch (error) {
//     if (error instanceof ApiError) {
//       throw error;
//     }
//     throw new ApiError(500, 'Error fetching portfolios', error.message);
//   }
// });

// Get Single Portfolio
const getPortfolioById = asyncHandler(async (req, res) => {
  const portfolio = await Portfolio.findById(req.params.id);
  
  if (!portfolio) {
    throw new ApiError(404, 'Portfolio not found');
  }

  res.status(200).json(
    new ApiResponse(200, portfolio, 'Portfolio fetched successfully')
  );
});

// Update Portfolio
const updatePortfolio = asyncHandler(async (req, res) => {
  // Find existing portfolio
  const existingPortfolio = await Portfolio.findById(req.params.id);
  if (!existingPortfolio) {
    throw new ApiError(404, 'Portfolio not found');
  }

  // Parse incoming data
  const data = {
    template: tryParse(req.body.template),
    hero: tryParse(req.body.hero),
    aboutMe: tryParse(req.body.aboutMe),
    skills: tryParse(req.body.skills),
    services: tryParse(req.body.services),
    portfolio: tryParse(req.body.portfolio),
    testimonials: tryParse(req.body.testimonials),
    blog: tryParse(req.body.blog),
    contact: tryParse(req.body.contact)
  };

  // Handle profile image update if provided
  if (req.files?.profileImage?.[0]) {
    const profileImageResult = await uploadOnCloudinary(req.files.profileImage[0].path);
    if (profileImageResult) {
      // Delete old profile image
      if (existingPortfolio.hero?.profileImage) {
        await deleteFromCloudinary(existingPortfolio.hero.profileImage);
      }
      
      data.hero = {
        ...(data.hero || {}),
        ...existingPortfolio.hero,
        profileImage: profileImageResult.secure_url
      };
    }
  } else if (data.hero) {

    // Keep existing profile image if not provided
    data.hero = {
      ...existingPortfolio.hero,
      ...data.hero,
      profileImage: existingPortfolio.hero?.profileImage
    };
  }

  // Handle project images update if provided
  if (req.files?.projectImage?.length > 0) {
    const projectImageResults = await Promise.all(
      req.files.projectImage.map(file => uploadOnCloudinary(file.path))
    );

    const updatedPortfolio = data.portfolio || existingPortfolio.portfolio;

    // Delete old images for the positions being updated
    for (let i = 0; i < req.files.projectImage.length; i++) {
      if (updatedPortfolio[i]?.projectImage) {
        await deleteFromCloudinary(updatedPortfolio[i].projectImage);
      }
    }

    // Use secure_url instead of url
    projectImageResults.forEach((result, index) => {
      if (result && index < updatedPortfolio.length) {
        updatedPortfolio[index] = {
          ...updatedPortfolio[index],
          projectImage: result.secure_url
        };
      }
    });
    data.portfolio = updatedPortfolio;
  } else if (data.portfolio) {
    // If updating portfolio data without new images, preserve existing images
    data.portfolio = data.portfolio.map((item, index) => {
      const existingItem = existingPortfolio.portfolio[index] || {};
      return {
        ...item,
        projectImage: item.projectImage || existingItem.projectImage || ''
      };
    });
  }

  // Create update object with only provided fields
  const updateData = Object.entries(data).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      if (key === 'portfolio') {
        // Special handling for portfolio to preserve existing images
        acc[key] = value.map((item, index) => {
          const existingItem = existingPortfolio.portfolio[index] || {};
          return {
            ...item,
            projectImage: item.projectImage || existingItem.projectImage
          };
        });
      } 
      // Special handling for nested objects
      else if (key === 'hero' || key === 'aboutMe' || key === 'contact') {
        acc[key] = { ...existingPortfolio[key], ...value };
      } else {
        acc[key] = value;
      }
    }
    return acc;
  }, {});

  if (updateData.services) {
    updateData.services = updateData.services.slice(0, 3);
  }

  if (updateData.portfolio) {
    updateData.portfolio = updateData.portfolio.slice(0, 3);
  }

  // Check if email is being updated and if it already exists
  if (updateData.contact?.email && updateData.contact.email !== existingPortfolio.contact.email) {
    const emailExists = await Portfolio.findOne({
      _id: { $ne: req.params.id },
      'contact.email': updateData.contact.email
    });

    if (emailExists) {
      throw new ApiError(400, 'Email already exists in another portfolio');
    }
  }

  // Check if phone is being updated and if it already exists
  if (updateData.contact?.phone && updateData.contact.phone !== existingPortfolio.contact.phone) {
    const phoneExists = await Portfolio.findOne({
      _id: { $ne: req.params.id },
      'contact.phone': updateData.contact.phone
    });

    if (phoneExists) {
      throw new ApiError(400, 'Phone number already exists in another portfolio');
    }
  }

  // Update the portfolio with validated data
  const updatedPortfolio = await Portfolio.findByIdAndUpdate(
    req.params.id,
    { $set: updateData },
    { new: true, runValidators: true }
  );

  if (!updatedPortfolio) {
    throw new ApiError(404, 'Portfolio not found after update');
  }

  res.status(200).json(
    new ApiResponse(200, updatedPortfolio, 'Portfolio updated successfully')
  );
});


// Delete Portfolio
const deletePortfolio = asyncHandler(async (req, res) => {
  const portfolio = await Portfolio.findById(req.params.id);

  if (!portfolio) {
    throw new ApiError(404, 'Portfolio not found');
  }

  const imagesToDelete = [];

  if (portfolio.hero?.profileImage) {
    imagesToDelete.push(portfolio.hero.profileImage);
  }

  if (portfolio.portfolio && Array.isArray(portfolio.portfolio)) {
    portfolio.portfolio.forEach(project => {
      if (project.projectImage) {
        imagesToDelete.push(project.projectImage);
      }
    });
  }

  if (imagesToDelete.length > 0) {
    console.log(`Deleting ${imagesToDelete.length} images from Cloudinary...`);

    const deletePromises = imagesToDelete.map(imageUrl =>
      deleteFromCloudinary(imageUrl).catch(err => {
        console.error(`Failed to delete image: ${imageUrl}`, err);
        return null;
      })
    );

    const results = await Promise.allSettled(deletePromises);
    const successCount = results.filter(r => r.status === 'fulfilled').length;
    console.log(`Successfully deleted ${successCount}/${imagesToDelete.length} images`);
  }

  await Portfolio.findByIdAndDelete(req.params.id);

  res.status(200).json(
    new ApiResponse(200, null, 'Portfolio and associated images deleted successfully')
  );
});

export {
  createPortfolio,
  getAllPortfolios,
  getPortfolioById,
  updatePortfolio,
  deletePortfolio
};
