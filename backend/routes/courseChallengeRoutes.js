const express = require('express');
const router = express.Router();
const courseChallengeController = require('../controllers/courseChallengeController');
const authMiddleware = require('../middleware/authMiddleware');
const optionalAuthMiddleware = require('../middleware/optionalAuthMiddleware');

router.get('/topic/:topicId', optionalAuthMiddleware, courseChallengeController.getChallengeByTopic);
router.get('/:challengeId', optionalAuthMiddleware, courseChallengeController.getChallenge);

router.post('/:challengeId/run', authMiddleware, courseChallengeController.runChallenge);
router.post('/:challengeId/submit', authMiddleware, courseChallengeController.submitChallenge);

module.exports = router;
