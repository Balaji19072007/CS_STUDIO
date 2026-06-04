const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const practiceProblemController = require('../controllers/practiceProblemController');

router.get('/:problemId', practiceProblemController.getPracticeProblem);
router.post('/:problemId/run', authMiddleware, practiceProblemController.runPracticeProblem);
router.post('/:problemId/submit', authMiddleware, practiceProblemController.submitPracticeProblem);

module.exports = router;
