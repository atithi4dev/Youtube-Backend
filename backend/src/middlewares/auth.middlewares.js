import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "express-async-handler";

export const verifyJwt = asyncHandler(async (req, res, next) => {
     const token = req.cookies.accessToken || req.header("Authorization").replace("Bearer ", "");
     if(!token) {
          throw new ApiError(401, "Unauthorized");
     }
     try {
          const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
          const user = await User.findById(decodedToken?.id).select("-password -refreshToken");
          if(!user){
               throw new ApiError(401, "Unauthorized");
          }
          req.user = user;
          next();
     } catch (error) {
          throw new ApiError(401, error?.message ||"Invalid access token");
     }
})
