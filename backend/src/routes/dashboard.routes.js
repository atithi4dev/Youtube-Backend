import { Router } from 'express';
import {
    getChannelStats,
    getChannelVideos,
    getTopVideosByTimeframes
} from "../controllers/dashboard.controller.js"
import {verifyJwt} from "../middlewares/auth.middlewares.js"

const router = Router();

router.use(verifyJwt); // Apply verifyJwt middleware to all routes in this file

router.route("/stats/:channelId").get(getChannelStats);
router.route("/timeframe/:channelId").get(getTopVideosByTimeframes);
router.route("/videos").get(getChannelVideos);

export default router