import { isValidObjectId } from "mongoose";
import Like from "../models/like.models.js";
import Tweet from "../models/tweet.models.js";
import Comment from "../models/comment.models.js";
import Video from "../models/video.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// video, comment, tweet, likedBy

const likeToggler = async (req, res, targetType, targetId) => {
  if (!targetType || !targetId) {
    throw new ApiError(400, "Target type and ID are required");
  }

  const userId = req.user._id;

  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user ID");
  }

  if (!isValidObjectId(targetId)) {
    throw new ApiError(400, "Invalid target ID");
  }

  const existingLike = await Like.findOne({
    likedBy: userId,
    targetType,
    targetId,
  });

  if (existingLike) {
    await Like.deleteOne({ _id: existingLike._id });

    return res
      .status(200)
      .json(new ApiResponse("Like removed successfully", { liked: false }));
  } else {
    const newLike = await Like.create({
      likedBy: userId,
      targetType,
      targetId,
    });

    return res.status(201).json(
      new ApiResponse("Like added successfully", {
        liked: true,
        like: newLike,
      })
    );
  }
};

const toggleVideoLike = asyncHandler(async (req, res) => {
  const targetExists = await Video.findById(req.body.videoId);

  if (!targetExists) {
    throw new ApiError(404, "Video not found");
  }

  await likeToggler(req, res, "video", req.body.videoId);
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const targetExists = await Comment.findById(req.body.commentId);

  if (!targetExists) {
    throw new ApiError(404, "Comment not found");
  }

  await likeToggler(req, res, "comment", req.body.commentId);
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const targetExists = await Tweet.findById(req.body.tweetId);

  if (!targetExists) {
    throw new ApiError(404, "Tweet not found");
  }

  await likeToggler(req, res, "tweet", req.body.tweetId);
});

const getLikedVideos = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user ID");
  }

  const videos = await Like.find({
    likedBy: userId,
    targetType: "video",
  }).populate("targetId");

  return res
    .status(200)
    .json(new ApiResponse("Liked videos fetched successfully", videos));
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
