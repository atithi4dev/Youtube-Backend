[WebSocket Server]
  ⮕ subscribes to `video-progress:*`
  ⮕ sends updates to the right connected frontend clients

[Backend (Express)]
  ⮕ upload videos on s3 from `worker:*`
  ⮕ correct the videos controller based on new architecture of `s3:*`
  ⮕ update Cloudinary files and functions to `s3:*`
