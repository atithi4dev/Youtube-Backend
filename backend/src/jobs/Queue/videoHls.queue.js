import { Queue } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis();

export const videoHlsformation = new Queue("video-hls-conversion", { connection });
