const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/user-stats', statsController.getUserStats);

// Protected routes
router.post('/submit-rating', authMiddleware, statsController.submitRating);
router.get('/rating-status', authMiddleware, statsController.checkRatingStatus);
router.post('/start-tracking', authMiddleware, statsController.startUsageTracking);
router.post('/stop-tracking', authMiddleware, statsController.stopUsageTracking);
router.post('/mark-rating-shown', authMiddleware, statsController.markRatingShown);

// Backward compatibility
router.get('/rating-eligibility', authMiddleware, statsController.checkRatingStatus);

// Course rating routes
router.post('/course-rating', authMiddleware, statsController.submitCourseRating);
router.get('/course-rating-status/:courseId', authMiddleware, statsController.checkCourseRatingStatus);

module.exports = router;