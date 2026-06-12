const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const Sentry = require('@sentry/node');
const { validateEnv } = require('./util/envValidation');

// Validate required environment variables
validateEnv();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { v2: cloudinary } = require('cloudinary');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const logger = require('./util/logger');
const { cache } = require('./util/cache');

// --- Supabase Init ---
const { supabase } = require('./config/supabase');

const app = express();
app.set('trust proxy', 1); // Trust the Render reverse proxy for rate limit
const server = http.createServer(app);

// Initialize Sentry in production
if (process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN) {
  let profilingIntegration;
  try {
    const { nodeProfilingIntegration } = require('@sentry/profiling-node');
    profilingIntegration = nodeProfilingIntegration();
  } catch (e) {
    // Profiling not available for this platform; skip
  }
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    integrations: profilingIntegration ? [profilingIntegration] : [],
    tracesSampleRate: 0.1,
    profilesSampleRate: 0.1,
  });
  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
}



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

// Security: Helmet for secure HTTP headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: process.env.NODE_ENV === 'production' ? {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https://challenges.cloudflare.com'],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com', 'https://cdnjs.cloudflare.com'],
      imgSrc: ["'self'", 'data:', 'blob:', 'https://res.cloudinary.com', 'https://*.supabase.co'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      connectSrc: ["'self'", 'https://*.supabase.co', 'https://api.openai.com', 'https://challenges.cloudflare.com'],
      frameSrc: ["'self'", 'https://challenges.cloudflare.com'],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  } : false,
}));

// Compress all responses
app.use(compression());

// Add X-Response-Time header
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    try { res.setHeader('X-Response-Time', `${duration}ms`); } catch (_) {}
    if (duration > 1000) {
      logger.warn('Slow response', { url: req.originalUrl, method: req.method, duration: `${duration}ms` });
    }
  });
  next();
});

// HTTPS redirect in production
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https' && req.headers.host !== 'localhost') {
      return res.redirect(301, `https://${req.headers.host}${req.url}`);
    }
    next();
  });
}

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
    
    if (allowedOrigins.includes(normalizedOrigin)) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked request from origin: ${origin}`);
      // Don't throw an error, just return false so cors middleware handles it gracefully
      // returning false will block the request with a standard CORS response rather than 500
      callback(null, false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token', 'Cache-Control', 'Pragma']
}));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET || 'cs-studio-secret'));

// Structured request logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`, { ip: req.ip, origin: req.get('origin') });
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

// Code Execution Rate Limiting
const executionLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 20,
  message: { success: false, msg: 'Too many code execution requests, please slow down.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/problems', executionLimiter);
app.use('/api/course-challenges', executionLimiter);
app.use('/api/practice-problems', executionLimiter);

// Community Rate Limiting
const communityLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: { success: false, msg: 'Too many community requests, please slow down.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/community', communityLimiter);

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
app.get('/api/health', async (req, res) => {
  const checks = {};

  // Database connectivity
  try {
    const { count, error } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .limit(1);
    checks.database = { status: error ? 'error' : 'ok', error: error?.message || null };
  } catch (e) {
    checks.database = { status: 'error', error: e.message };
  }

  const allOk = Object.values(checks).every(c => c.status === 'ok');

  res.status(allOk ? 200 : 503).json({
    status: allOk ? 'ok' : 'degraded',
    timestamp: new Date().toISOString(),
    version: 'v1.1.0',
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    checks,
  });
});

// Sentry error handler (must be before global handler)
if (process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN) {
  app.use(Sentry.Handlers.errorHandler());
}

// Global Error Handler
app.use((err, req, res, next) => {
  logger.error('Unhandled Error', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    url: req.originalUrl,
    method: req.method
  });
  
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ success: false, msg: err.message });
  }
  
  res.status(err.status || 500).json({
    success: false,
    msg: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log('✅ Database: Supabase PostgreSQL');
});

// Trigger restart for new routes
module.exports = { app, server, io };
