import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.models.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    throw new ApiError(400, `All fields are required.`);
  }

  const { userName, email, fullName, password } = req.body;

  // Validation
  ["fullName", "userName", "email", "password"].forEach((field) => {
    if (!req.body[field]?.trim()) {
      throw new ApiError(400, `All fields are required.`);
    }
  });

  const existingUser = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (existingUser) {
    throw new ApiError(400, "User already exists with this username or email");
  }

  // Upload Avatar and Cover Image on Cloudinary

  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  let avatar;
  try {
    avatar = await uploadOnCloudinary(avatarLocalPath);
    console.log("Avatar uploaded successfully:", avatar);
  } catch (error) {
    console.error("Error uploading avatar:", error);
    throw new ApiError(500, "Failed to upload avatar image");
  }

  let coverImage;
  try {
    coverImage = await uploadOnCloudinary(coverImageLocalPath);
    console.log("coverImage uploaded successfully:", avatar);
  } catch (error) {
    console.error("Error uploading coverImage:", error);
    throw new ApiError(500, "Failed to upload coverImage image");
  }

  // Create User
  try {
    const user = await User.create({
      fullName,
      userName: userName.toLowerCase(),
      email,
      password,
      avatar: avatar?.url,
      coverImage: coverImage?.url || null,
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      throw new ApiError(500, "User creation failed");
    }

    return res
      .status(201)
      .json(new ApiResponse(201, createdUser, "User registered successfully"));
  
    } catch (error) {
    console.error("User Creation Failed:", error);
    if(avatar){
      await deleteFromCloudinary(avatar.public_id);
    }
    if(coverImage){
      await deleteFromCloudinary(coverImage.public_id);
    }
    throw new ApiError(500, "User creation failed also image being upload deleted");
  }



});

export { registerUser };
