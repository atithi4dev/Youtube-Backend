import { Router } from "express";
import {
  getAllPublishedVideos,
  deleteVideo,
  getVideoById,
  publishAVideo,
  togglePublishStatus,
  updateVideo,
  getAllOwnVideos,
  progressiveStream,
  adaptiveStream,
} from "../controllers/video.controller.js";
import { verifyJwt } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();

router.route("/published").get(getAllPublishedVideos);

router
  .route("/")
  .get(verifyJwt, getAllOwnVideos)
  .post(
    verifyJwt,
    upload.fields([
      {
        name: "videoFile",
        maxCount: 1,
      },
      {
        name: "thumbnail",
        maxCount: 1,
      },
    ]),
    publishAVideo
  );

router
  .route("/:videoId")
  .get(verifyJwt, getVideoById)
  .delete(verifyJwt, deleteVideo)
  .patch(verifyJwt, upload.single("thumbnail"), updateVideo);

router.route("/stream/:videoId/progressive").get(progressiveStream);
router.route("/stream/:videoId/adaptive").get(adaptiveStream);

router.route("/toggle/publish/:videoId").patch(verifyJwt, togglePublishStatus);

export default router;
