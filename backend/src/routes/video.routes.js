import { Router } from 'express';
import {
     getAllPublishedVideos,
    deleteVideo,
    getVideoById,
    publishAVideo,
    togglePublishStatus,
    updateVideo,
    getAllOwnVideos
} from "../controllers/video.conrollers.js"
import {verifyJwt} from "../middlewares/auth.middlewares.js"
import {upload} from "../middlewares/multer.middlewares.js"

const router = Router();
router.use(verifyJwt); 

router
    .route("/")
    .get(getAllOwnVideos)
    .post(
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
router.route('/published').get(getAllPublishedVideos);

router
    .route("/:videoId")
    .get(getVideoById)
    .delete(deleteVideo)
    .patch(upload.single("thumbnail"), updateVideo);

router.route("/toggle/publish/:videoId").patch(togglePublishStatus);

export default router