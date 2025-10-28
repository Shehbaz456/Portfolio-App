import dotenv from "dotenv";
dotenv.config(); 
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // console.log("File uploaded successfully URL:",response.url);

    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.log("Error in file upload :", error);
    // delete file form server
    fs.unlinkSync(localFilePath);
    return null;
  }
};

// const deleteFromCloudinary = async (imageUrl) => {
//   if (!imageUrl) return;
//   try {
//     const urlParts = imageUrl.split("/");
//     const publicIdWithExtension = urlParts.slice(7).join("/"); // skip the domain parts
//     const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, ""); // remove extension

//     const result = await cloudinary.uploader.destroy(publicId);
//     console.log("Deleted from Cloudinary:", result);
//     return result;
//   } catch (error) {
//     console.error("Error deleting image from Cloudinary:", error);
//     return null;
//   }
// };

const deleteFromCloudinary = async (imageUrl) => {
  if (!imageUrl) {
    console.log("No image URL provided");
    return null;
  }

  try {
    // Normalize URL (handle both http and https)
    const normalizedUrl = imageUrl.replace('http://', 'https://');
    
    // Split URL into parts
    const urlParts = normalizedUrl.split("/");
    
    // Find the index of 'upload' in the URL
    const uploadIndex = urlParts.indexOf('upload');
    
    if (uploadIndex === -1) {
      console.error('Invalid Cloudinary URL format:', imageUrl);
      return null;
    }
    
    // Get everything after 'upload'
    let publicIdParts = urlParts.slice(uploadIndex + 1);
    
    // Remove version number if present (e.g., v1761591609)
    if (publicIdParts[0] && publicIdParts[0].match(/^v\d+$/)) {
      publicIdParts = publicIdParts.slice(1);
    }
    
    // Join remaining parts to get public_id with extension
    const publicIdWithExtension = publicIdParts.join("/");
    
    // Remove file extension (.jpg, .png, etc.)
    const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, "");

    // console.log('Attempting to delete from Cloudinary with public_id:', publicId);

    // Delete from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);
    
    // Log result
    if (result.result === 'ok') {
      console.log('✓ Successfully deleted from Cloudinary:', publicId);
    } else if (result.result === 'not found') {
      console.log('⚠ Image not found in Cloudinary:', publicId);
    } else {
      console.log('Cloudinary deletion result:', result);
    }
    
    return result;
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error.message);
    return null;
  }
};


export { uploadOnCloudinary,deleteFromCloudinary };
