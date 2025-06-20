import { Queue } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis();

export const videoQueue = new Queue('video-transcode', {
  connection,
});

