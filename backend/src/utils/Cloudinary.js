import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

// Configuration Of Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "images",
    });
    console.log("File uploaded on cloudinary File src:", response.url);

    // Once the file is uploaded, delete it from the local storage
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

const uploadVideoOnCloudinary = async (localFilePath) => {
  try {
    const response = await cloudinary.uploader.upload_large(localFilePath, {
      resource_type: "video",
      chunk_size: 6 * 1024 * 1024,
      folder: "videos",
    });
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log("File deleted from Cloudinary:", result);
  } catch (error) {
    console.error("Error deleting file from Cloudinary:", error);
    return null;
  }
};

const deleteVideoFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "video",
    });
    console.log("Video deleted from Cloudinary:", result);
  } catch (error) {
    console.error("Error deleting video from Cloudinary:", error);
    return null;
  }
};

export {
  uploadOnCloudinary,
  uploadVideoOnCloudinary,
  deleteFromCloudinary,
  deleteVideoFromCloudinary,
};
