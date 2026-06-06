const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const http = require('http');
const { Server } = require('socket.io');
const rateLimit = require('express-rate-limit');
const { v2: cloudinary } = require('cloudinary');
const multer = require('multer');
const cookieParser = require('cookie-parser');

// --- Supabase Init ---
const { supabase } = require('./config/supabase');

const app = express();
const server = http.createServer(app);

// --- Model Imports ---
// Models are now largely deprecated in favor of direct Supabase queries in controllers
// But we keep them if other parts of code import them, though they might fail if they try to access firebase `db`.
// Ideally, we should remove them or update them. 
// For "minimal code changes" but "production migration", we refactored the controllers. 
// We should ensure `server.js` doesn't crash by importing models that try to connect to Firestore.
// The Controllers (auth, problem) are refactored to NOT use valid Models.

// --- Controller & Route Imports ---
const authRoutes = require('./routes/authRoutes');
const authSessionRoutes = require('./routes/authSessionRoutes');
const googleAuthRoutes = require('./routes/googleAuthRoutes');
const problemRoutes = require('./routes/problemRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const chatRoutes = require('./routes/chatRoutes');
const communityRoutes = require('./routes/communityRoutes');
const progressRoutes = require('./routes/progressRoutes');
const certificateRoutes = require('./routes/certificateRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const courseRoutes = require('./routes/courseRoutes');
const statsRoutes = require('./routes/statsRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const practiceProblemRoutes = require('./routes/practiceProblemRoutes');

// Enable CORS
const allowedOrigins = [
  'http://localhost:5173', 
  'http://localhost:5174', 
  'https://cs-studio.in', 
  'https://www.cs-studio.in',
  'https://cs-studio-ashen.vercel.app',
  'https://cs-studio.onrender.com'
];
if (process.env.FRONTEND_URL) {
  // Strip trailing slash if present
  allowedOrigins.push(process.env.FRONTEND_URL.replace(/\/$/, ''));
}

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    // Strip trailing slash from origin just in case
    const normalizedOrigin = origin.replace(/\/$/, '');
    
    if (allowedOrigins.includes(normalizedOrigin) || normalizedOrigin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked request from origin: ${origin}`);
      // Don't throw an error, just return false so cors middleware handles it gracefully
      // returning false will block the request with a standard CORS response rather than 500
      callback(null, false);
    }
  },
  credentials: true
}));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Debug logging
app.use((req, res, next) => {
  console.log(`📍 ${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Maintenance Mode Middleware
app.use((req, res, next) => {
  if (process.env.MAINTENANCE_MODE === 'true') {
    return res.status(503).json({ success: false, msg: 'Service temporarily unavailable due to maintenance.' });
  }
  next();
});

// Global Rate Limiting
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000, // Limit each IP to 1000 requests per `window` (here, per 15 minutes)
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', globalLimiter);

// Specific Auth Rate Limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, msg: 'Too many auth requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/auth', authLimiter);

// --- CLOUDINARY ---
if (process.env.CLOUDINARY_CLOUD_NAME) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  app.set('cloudinary', cloudinary);
}

// Multer config with limits and file filter
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/webp') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and WEBP are allowed.'));
    }
  }
});
app.set('upload', upload);

// --- API Routes ---
// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/auth/session', authSessionRoutes);
app.use('/api/google-auth', googleAuthRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/course-challenges', require('./routes/courseChallengeRoutes'));
app.use('/api/practice-problems', practiceProblemRoutes);
app.use('/api/admin', require('./routes/adminRoutes'));

// --- Socket.IO Setup ---
const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ["GET", "POST"],
    credentials: true,
  }
});

// Initialize Socket Handler
require('./socket/socketHandler')(io);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    version: 'supabase-migrated-v1',
    cwd: process.cwd()
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ success: false, msg: err.message });
  }
  
  res.status(err.status || 500).json({
    success: false,
    msg: err.message,
    stack: err.stack
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log('✅ Database: Supabase PostgreSQL');
});

// Trigger restart for new routes
module.exports = { app, server, io };
