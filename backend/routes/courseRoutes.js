const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', courseController.getAllCourses);
router.get('/last-active', authMiddleware, courseController.getLastActiveCourse);
router.get('/enrolled', authMiddleware, courseController.getEnrolledCourses);
router.get('/:courseId', authMiddleware, courseController.getCourseById);
router.get('/:courseId/phases/:phaseId/topics/:topicId', authMiddleware, courseController.getTopicById);

module.exports = router;
