# 📌 N-Movies: Video Streaming Platform

A modern video streaming platform built with the MERN stack, offering a seamless viewing experience with features like video uploading, watching history, bookmarking, and content moderation.

---

## 📖 Description

N-Movies is a free streaming platform that allows users to watch and share videos with zero ads. Users can upload their own content, rate videos, comment, bookmark favorites, and track viewing history. The platform features a robust admin panel for content moderation, user management, and analytics tracking.

This project demonstrates a comprehensive implementation of a video streaming service with a focus on user experience, performance, and content management.

---


## 🌐 Live URL
[N-Movies Frontend](https://n-streaming.vercel.app)
[N-Movies Backend](https://streaming-server-chi.vercel.app)

---

## 🚀 Features

- ✅ User authentication (register/login) with role-based access
- 🔒 Secure password encryption using bcrypt
- 📝 Full CRUD functionality for video content
- 📺 Custom video player with playback controls, picture-in-picture, and fullscreen mode
- 🔍 Search and tag-based filtering
- 💬 Comments system for viewer engagement
- ⭐ Rating system for videos
- 📚 Bookmarking (Watch Later) functionality
- 📊 User and admin dashboards with analytics
- ⚙️ Admin panel for content moderation and user management
- 📜 Video history tracking
- 🔄 Trending videos section based on popularity
- 📁 File uploads for videos and thumbnails
- 🚩 Content reporting system for inappropriate material

---

## 🧑‍💻 Tech Stack

**Frontend:**
- React
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI components
- Redux Toolkit

**Backend:**
- Node.js
- Express.js
- TypeScript

**Database:**
- MongoDB
- Mongoose

**Other:**
- JWT (authentication)
- Bcrypt (password hashing)
- Multer (file uploads)
- HLS.js (video streaming)
- Screenfull (fullscreen API)
- React Hot Toast (notifications)
- Cookies for authentication state

---

## 👥 User Roles

- 👤 **User:** Can register, login, upload videos, comment on videos, rate content, bookmark favorites, and track viewing history
- 👨‍💻 **Admin:** Can manage users (update status, roles, delete), moderate content (approve/reject/delete videos), view reports, access analytics dashboard, and handle all administrative functions

---

## 📷 Screenshots / Demo

> The application includes multiple key sections:
> - Homepage with trending videos
> - Video player with custom controls
> - User dashboard with analytics
> - Admin dashboard for content management
> - Watch history and bookmarks
> - Video upload and management interface


---

## 🛠️ Installation & Usage (Local)


```bash
# Clone the repository
git clone https://github.com/alamin147/streaming-app.git

# Navigate to the backend
cd streaming-app/server
npm install

# Create .env file in the server directory with required environment variables
# Then start the server
npm run dev

# Navigate to the frontend
cd ../client
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🗂️ Project Structure

```
streaming-app/
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/        # Page components
│   │   ├── redux/        # Redux store and slices
│   │   ├── hooks/        # Custom hooks
│   │   └── lib/          # Utility functions
│   └── ...
├── server/               # Express backend
│   ├── src/
│   │   ├── app/
│   │   │   ├── controllers/   # Request handlers
│   │   │   ├── models/        # Database schemas
│   │   │   ├── routes/        # API routes
│   │   │   ├── middlewares/   # Custom middlewares
│   │   │   └── utils/         # Utility functions
│   │   └── server.ts          # Entry point
│   └── uploads/               # Media file storage
├── README.md
└── ...
```

---

## 🔐 Environment Variables

Create a `.env` file in the `server` directory and add the following:

```
JWTSECRET=
MONGO_URI=
CLOUD_FOLDER=
CLOUD_NAME=
CLOUD_API_KEY=
CLOUD_API_SECRET=
CLOUDINARY_URL=
```

---

## 📊 API Documentation

### Authentication Routes
```http
POST /api/v1/auth/signup       - Register a new user
POST /api/v1/auth/signin       - Login user and get token
```

### Video Routes
```http
GET /api/v1/videos/find/:id    - Get a single video
GET /api/v1/videos/random      - Get random videos
GET /api/v1/videos/trend       - Get trending videos
GET /api/v1/videos/tags        - Get videos by tags
GET /api/v1/videos/search      - Search videos by query
POST /api/v1/videos/upload     - Upload a new video (with authentication)
PUT /api/v1/videos/:id         - Update a video (with authentication)
DELETE /api/v1/videos/delete/:id - Delete a video (with authentication)
PUT /api/v1/videos/view/:id    - Add a view to a video
```

### User Interaction Routes
```http
GET /api/v1/videos/comments/:videoId   - Get comments for a video
POST /api/v1/videos/comments           - Add a comment to a video
PATCH /api/v1/videos/ratings/addRating/:videoId - Rate a video
GET /api/v1/videos/watchlater          - Get watch later videos
POST /api/v1/videos/watchlater/:id     - Add/remove video to/from watch later
GET /api/v1/videos/recentVideos        - Get recently watched videos
POST /api/v1/videos/recentVideos       - Add video to recently watched
```

### Report System
```http
POST /api/v1/reports                   - Report a video
GET /api/v1/reports/all                - Get all reports (admin only)
GET /api/v1/reports/:reportId          - Get report details (admin only)
PATCH /api/v1/reports/:reportId/status - Update report status (admin only)
```

### User Dashboard Routes
```http
GET /api/v1/dashboard/user/my-videos           - Get user's videos
PATCH /api/v1/dashboard/user/my-videos/:videoId - Update user's video
DELETE /api/v1/dashboard/user/my-videos/:videoId - Delete user's video
PATCH /api/v1/dashboard/user/edit-profile      - Edit user profile
GET /api/v1/dashboard/user/stats               - Get user stats
GET /api/v1/dashboard/user/recent-uploads      - Get recent uploads
```

### Admin Dashboard Routes
```http
GET /api/v1/dashboard/admin/stats               - Get admin dashboard stats
GET /api/v1/dashboard/admin/all-videos          - Get all videos
GET /api/v1/dashboard/admin/content-distribution - Get content distribution
PATCH /api/v1/dashboard/admin/change-video-status/:videoId - Change video status
DELETE /api/v1/dashboard/admin/delete-video/:videoId - Delete video
GET /api/v1/dashboard/admin/pending-videos      - Get pending videos
PATCH /api/v1/dashboard/admin/approve-video/:id - Approve video
PATCH /api/v1/dashboard/admin/reject-video/:id  - Reject video
```

### User Management (Admin)
```http
GET /api/v1/dashboard/admin/users/all-users     - Get all users
PATCH /api/v1/dashboard/admin/users/update-user-status/:userId - Update user status
PATCH /api/v1/dashboard/admin/users/update-user-role/:userId - Update user role
DELETE /api/v1/dashboard/admin/users/delete-user/:userId - Delete user
```

---
