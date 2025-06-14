import { isValidObjectId } from "mongoose";
import Playlist from "../models/playlist.models.js";
import Video from "../models/video.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";

const getPopulatedPlaylistById = (id) => {
  return Playlist.findById(id)
    .populate("videos")
    .populate("owner", "userName fullName avatar");
};

const checkPlaylistOwnership = (playlist, userId) => {
  if (playlist.owner.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized to perform this action");
  }
};

const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    throw new ApiError(400, "Name and description are required");
  }

  if (name.length < 3 || name.length > 50) {
    throw new ApiError(400, "Name must be between 3 and 50 characters");
  }

  const owner = req.user?._id;

  if (!isValidObjectId(owner)) {
    throw new ApiError(400, "Invalid user ID");
  }

  const playlist = await Playlist.create({
    owner,
    name,
    description,
  });

  res
    .status(201)
    .json(new ApiResponse(playlist, "Playlist created successfully"));
});

const getUserPlaylists = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user ID format");
  }

  const playlists = await Playlist.find({ owner: userId });

  if (!playlists || playlists.length === 0) {
    return res.status(200).json(new ApiResponse([], "No playlists found"));
  }

  res
    .status(200)
    .json(new ApiResponse(playlists, "Playlists retrieved successfully"));
});

const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;

  if (!isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid playlistId format");
  }

  const playlist = await getPopulatedPlaylistById(playlistId);

  if (!playlist) {
    throw new ApiError(404, "Playlist not found");
  }

  res
    .status(200)
    .json(new ApiResponse(playlist, "Playlist retrieved successfully"));
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;

  if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid playlist or video ID format");
  }

  const playlist = await getPopulatedPlaylistById(playlistId);

  if (!playlist) {
    throw new ApiError(404, "Playlist not found");
  }

  checkPlaylistOwnership(playlist, req.user._id);

  const video = await Video.findById(videoId);

  if (!video) throw new ApiError(404, "Video not found");

  const exists = playlist.videos.some(
    (vid) => vid.toString() === videoId.toString()
  );

  if (exists) {
    throw new ApiError(400, "Video already exists in the playlist");
  }

  playlist.videos.push(videoId);

  await playlist.save();

  const updatedPlaylist = await getPopulatedPlaylistById(playlistId);

  res
    .status(200)
    .json(
      new ApiResponse(updatedPlaylist, "Video added to playlist successfully")
    );
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;

  if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid playlist or video ID format");
  }

  const playlist = await getPopulatedPlaylistById(playlistId);

  if (!playlist) {
    throw new ApiError(404, "Playlist not found");
  }

  checkPlaylistOwnership(playlist, req.user._id);

  const video = await Video.findById(videoId);

  if (!video) throw new ApiError(404, "Video not found");

  const videoExists = playlist.videos.some(
    (vid) => vid.toString() === videoId.toString()
  );

  if (!videoExists) {
    throw new ApiError(400, "Video not found in the playlist");
  }

  playlist.videos = playlist.videos.filter(
    (vid) => vid.toString() !== videoId.toString()
  );

  await playlist.save();

  const updatedPlaylist = await getPopulatedPlaylistById(playlistId);

  res
    .status(200)
    .json(
      new ApiResponse(
        updatedPlaylist,
        "Video removed from playlist successfully"
      )
    );
});

const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;

  if (!isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid playlist ID format");
  }

  const playlist = await Playlist.findById(playlistId);

  if (!playlist) {
    throw new ApiError(404, "Playlist not found");
  }

  checkPlaylistOwnership(playlist, req.user._id);

  await Playlist.findByIdAndDelete(playlistId);

  res.status(200).json(new ApiResponse(null, "Playlist deleted successfully"));
});

const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;

  if (!isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid playlist ID format");
  }

  if (!name || !description) {
    throw new ApiError(400, "Name and description are required");
  }

  const playlist = await Playlist.findById(playlistId);

  if (!playlist) {
    throw new ApiError(404, "Playlist not found");
  }

  checkPlaylistOwnership(playlist, req.user._id);

  if (name.length < 3 || name.length > 50) {
    throw new ApiError(400, "Name must be between 3 and 50 characters");
  }

  playlist.name = name;

  playlist.description = description;

  await playlist.save();

  const updatedPlaylist = await getPopulatedPlaylistById(playlistId);

  res
    .status(200)
    .json(new ApiResponse(updatedPlaylist, "Playlist updated successfully"));
});

export {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};
