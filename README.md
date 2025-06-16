# 🎬 YouTube Backend Clone (yt-backend)

A scalable, modular backend inspired by YouTube. Built with **Node.js**, **Express**, and **MongoDB**, this project powers user-generated content platforms with support for videos, likes, comments, subscriptions, and more.

> ⚙️ Version: **V-0** (Core routes implemented and functional)

---

## 🚀 Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-Backend-black?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-4DB33D?logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-ODM-red?logo=mongoose&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Media_Storage-blue?logo=cloudinary&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-orange?logo=jsonwebtokens&logoColor=white)
![Cookie](https://img.shields.io/badge/Cookie-based%20Auth-lightgrey)
![Multer](https://img.shields.io/badge/Multer-File_Upload-yellow)
![Winston](https://img.shields.io/badge/Winston-Logger-purple)
![dotenv](https://img.shields.io/badge/dotenv-Env_Config-brightgreen)
![CORS](https://img.shields.io/badge/CORS-Cross_Origin-blue)

- **Node.js** + **Express.js** (API and routing)
- **MongoDB** + **Mongoose** (Database and schema modeling)
- **Cloudinary** (Media storage)
- **JWT** + **Cookie-based Auth**
- **Multer** (Media uploads)
- **Winston** (Logging)
- **dotenv**, **CORS**, **morgan**, and more.

---

## ✅ Current Features (V-0)

### 👤 User Module
- Register/Login with avatar and coverImage upload.
- JWT-based secure session with refresh token support.
- Update account details, password, and images.
- Get current user profile and any user's channel profile.
- Fetch watch history and user-specific uploaded videos.

---

### 🎬 Video Module
- Upload videos and thumbnails via `multipart/form-data`.
- Fetch, update (metadata or thumbnail), and delete videos.
- Toggle publish status.
- Get all published videos.

---

### 💬 Comment Module
- Add, update, and delete comments on videos.
- Fetch comments for a specific video.
- Like or unlike a comment.

---

### ❤️ Like System
- Like/unlike:
  - Videos: `/toggle/v/:videoId`
  - Comments: `/toggle/c/:commentId`
  - Tweets: `/toggle/t/:tweetId`
- Get list of liked videos.

---

### 📜 Tweet Module
- Post a tweet, edit it, or delete it.
- Fetch tweets by user.

---

### 📺 Playlist Module
- Create, update, and delete playlists.
- Add or remove videos to/from a playlist.
- Fetch playlists by user or by ID.

---

### 📊 Channel Stats Module
- View channel-level stats (subscribers, views).
- Get all videos under a specific channel.

---

### 🧠 Subscription System
- Subscribe or unsubscribe from any user.
- Fetch all subscribed channels.
- Fetch all subscribers of a channel.

---

### 🧪 Health Check
- Basic API status check at `/api/healthcheck`.

---

## 🔮 Upcoming Features (V-1 and Beyond)

### 🎥 Video Streaming
- Support **byte-range requests** (seeking + partial streaming).
- Add access control for **private videos**.

### 🧠 AI/ML Integration
- Whisper API for **auto-captioning / speech-to-text**.
- NSFW detection before publishing.
- Smart recommendation engine (trending + personalized).

### 🛡️ Advanced Auth
- OAuth2 login (Google, GitHub).
- 2FA (Two-Factor Authentication) via email or OTP.

### 🧩 WebSocket Features
- Live comments.
- Push notifications (likes, comments, new uploads).

### 📈 Analytics & Statistics
- Track user engagement: likes, views, watch time.
- Support for chart rendering (via API).

### 🌐 REST + GraphQL Hybrid
- Add optional **GraphQL** API layer for advanced clients.

### 🗃️ Performance & Caching
- Redis-based caching for popular videos and channels.
- Queue workers (BullMQ) for background processing (uploads, encoding).

### 📁 Upload Optimization
- **Chunked uploads** with resumable support.
- Video **transcoding pipeline** (480p, 720p, 1080p).

### 📂 Smart Playlists
- Add folders or sub-playlists for better user organization.

### 🐳 Deployment & DevOps
- Docker + Docker Compose setup.
- CI/CD pipelines using GitHub Actions.
- k8s manifests for scalable cloud deployment.

---

## 🧩 Roadmap Overview

| Phase  | Features                                                                 | Status     |
|--------|--------------------------------------------------------------------------|------------|
| V-0    | Auth, videos, comments, playlists, likes, tweets, subscriptions          | ✅ Done     |
| V-1    | OAuth, video streaming, WebSockets, analytics                            | 🔄 In Dev   |
| V-2    | AI tools (captioning, moderation), GraphQL, push notifications           | 🧠 Planned  |
| V-3    | DevOps: CI/CD, Docker, Monitoring, Rate limiting, Redis caching          | 🔜 Planned  |

---

## 📂 Folder Structure (Coming Soon)

_A clean architecture layout using modular structure for scalability._

---

## 🧑‍💻 Author

- **Atithi Singh**
- GitHub: [@atithisingh](https://github.com/atithi4dev)
- Portfolio: _Coming Soon_

---

## 📜 License

This project is licensed under the **MIT License**.

---

> This is just the beginning.

>Feature-rich, AI-enhanced, production-grade tooling is being added soon. Stay tuned for V-1.0 releases.

