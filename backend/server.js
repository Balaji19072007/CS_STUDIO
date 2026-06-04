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
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug logging
app.use((req, res, next) => {
  console.log(`📍 ${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Rate Limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.',
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

const upload = multer({ storage: multer.memoryStorage() });
app.set('upload', upload);

// --- API Routes ---
// --- API Routes ---
app.use('/api/auth', authRoutes);
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

// --- Socket.IO Setup ---
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:5174'],
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

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`✅ Database: Supabase PostgreSQL`);
});
// Trigger restart for new routes
module.exports = { app, server, io };
