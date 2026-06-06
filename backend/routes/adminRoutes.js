const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');
const adminController = require('../controllers/adminController');

router.get('/updates', authMiddleware, isAdmin, adminController.getAdminUpdates);
router.get('/export-users', authMiddleware, isAdmin, adminController.exportUsersCSV);
router.get('/audit-logs', authMiddleware, isAdmin, adminController.getAuditLogs);

module.exports = router;
