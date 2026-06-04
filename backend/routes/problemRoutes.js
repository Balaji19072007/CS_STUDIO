// problemRoutes.js
const express = require('express');
const router = express.Router();
const problemController = require('../controllers/problemController');
const authMiddleware = require('../middleware/authMiddleware'); // NEW: Import auth middleware
const optionalAuthMiddleware = require('../middleware/optionalAuthMiddleware');

// @route   GET /api/problems
// Use optional auth to populate req.user if token exists
router.get('/', optionalAuthMiddleware, problemController.getProblems);

// @route   GET /api/problems/daily
router.get('/daily', optionalAuthMiddleware, problemController.getDailyProblem);

// @route   GET /api/problems/recommended
router.get('/recommended', authMiddleware, problemController.getRecommendedProblems);

// @route   GET /api/problems/:id
router.get('/:id', optionalAuthMiddleware, problemController.getProblemById);

// @route   GET /api/problems/:id/test-cases
router.get('/:id/test-cases', problemController.getProblemTestCases);

// @route   GET /api/problems/:id/progress
// Get user progress for a problem
router.get('/:id/progress', authMiddleware, problemController.getProblemProgress);

// --- NEW PROTECTED ROUTES (Requires authentication) ---

// @route   POST /api/problems/:id/run-tests
// Runs the user code against all test cases and returns results (Run All button)
router.post('/:id/run-tests', authMiddleware, problemController.runTestCases);

// @route   POST /api/problems/:id/submit
// Final submission: validates, updates progress status to 'solved', and updates user stats (Submit button)
router.post('/:id/submit', authMiddleware, problemController.submitProblem);

// @route   POST /api/problems/:id/progress
// Update user progress for a problem
router.post('/:id/progress', authMiddleware, problemController.updateProgress);

// Timer routes
router.post('/:id/start-timer', authMiddleware, problemController.startProblemTimer);
router.post('/:id/stop-timer', authMiddleware, problemController.stopProblemTimer);
router.get('/:id/timer', authMiddleware, problemController.getProblemTimer);

module.exports = router;
