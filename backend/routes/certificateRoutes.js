const express = require('express');
const router = express.Router();
const {
  verifyCertificate,
  verifyCertificatePremium,
  getMyCertificates,
  issueCourseCertificate,
} = require('../controllers/certificateController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/verify/:id', verifyCertificate);
router.post('/verify-premium', verifyCertificatePremium);
router.get('/my-certificates', authMiddleware, getMyCertificates);
router.post('/issue/:courseId', authMiddleware, issueCourseCertificate);

module.exports = router;
