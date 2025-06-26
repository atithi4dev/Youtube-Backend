// Current MongoDb name
export const DB_NAME = "vidtube";



// TODO : UPDATE THE GIVEN VARIABLES IN WORKER 


// import path from "path";
// import { fileURLToPath } from "url";

// // Get __dirname equivalent in ESM
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Absolute Root (project backend root)
// export const ROOT_DIR = path.resolve(__dirname, "../../");

// // Public Directory (static assets)
// export const PUBLIC_DIR = path.join(ROOT_DIR, "public");

// // Temp Uploads Directory
// export const TEMP_DIR = path.join(PUBLIC_DIR, "temp");

// // Transcoding Output Directory
// export const OUTPUT_DIR = path.join(PUBLIC_DIR, "output");

// // Get video-specific output directory
// export const getVideoOutputDir = (videoId) =>
//   path.join(OUTPUT_DIR, videoId);

// // Get resolution .mp4 path for a video
// export const getMp4ResolutionPath = (videoId, resolution) =>
//   path.join(getVideoOutputDir(videoId), `${resolution}.mp4`);

// // Get HLS directory
// export const getHLSDir = (videoId) =>
//   path.join(getVideoOutputDir(videoId), "hls");

// // Get resolution-specific HLS output folder
// export const getHLSResolutionDir = (videoId, resolution) =>
//   path.join(getHLSDir(videoId), resolution);

// // Get master.m3u8 playlist path
// export const getMasterPlaylistPath = (videoId) =>
//   path.join(getHLSDir(videoId), "master.m3u8");