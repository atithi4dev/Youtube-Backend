import { Worker } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis({
  maxRetriesPerRequest: null
});

const worker = new Worker('video-transcode', async job => {
     return console.log('🎬 Processing video job:', job.id);
}, { connection });


worker.on('completed', job => {
  console.log(`Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed`, err);
});