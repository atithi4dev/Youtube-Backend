import { Router } from 'express';
import {
    getSubscribedChannels,
    getUserChannelSubscribers,
    toggleSubscription,
} from "../controllers/subscription.controller.js"
import {verifyJwt} from "../middlewares/auth.middlewares.js"

const router = Router();
router.use(verifyJwt); 

router
    .route("/u/:subscriberId")
    .get(getSubscribedChannels)
    

router.route("/c/:channelId")
    .get(getUserChannelSubscribers)
    .post(toggleSubscription);;

export default router