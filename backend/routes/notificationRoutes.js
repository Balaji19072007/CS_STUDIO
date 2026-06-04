const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Notification = require('../models/Notification');
const NotificationService = require('../util/notificationService');

const serialize = (notification) =>
  notification && notification.toJSON ? notification.toJSON() : notification;

router.get('/', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const unreadOnly = req.query.unreadOnly === 'true';

    const { notifications, total } = await Notification.getNotifications(req.user.id, {
      page,
      limit,
      unreadOnly,
    });

    res.json({
      success: true,
      data: notifications.map(serialize),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({
      success: false,
      msg: 'Server error while fetching notifications',
    });
  }
});

router.get('/unread-count', auth, async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      user: req.user.id,
      read: false,
    });

    res.json({
      success: true,
      count,
    });
  } catch (error) {
    console.error('Error fetching unread count:', error);
    res.status(500).json({
      success: false,
      msg: 'Server error while fetching unread count',
    });
  }
});

router.patch('/mark-all-read', auth, async (req, res) => {
  try {
    const result = await Notification.updateMany(
      { user: req.user.id, read: false },
      { read: true }
    );

    res.json({
      success: true,
      msg: 'All notifications marked as read',
      data: result,
    });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    res.status(500).json({
      success: false,
      msg: 'Server error while marking all notifications as read',
    });
  }
});

router.delete('/clear-all', auth, async (req, res) => {
  try {
    const result = await Notification.deleteMany({ user: req.user.id });

    res.json({
      success: true,
      msg: 'All notifications cleared successfully',
      data: result,
    });
  } catch (error) {
    console.error('Error clearing notifications:', error);
    res.status(500).json({
      success: false,
      msg: 'Server error while clearing notifications',
    });
  }
});

router.post('/test', auth, async (req, res) => {
  try {
    const notification = await NotificationService.sendNotification(req.user.id, {
      title: 'Test Notification',
      message: 'This is a test notification to verify the system is working properly.',
      type: 'system',
      link: '/',
      important: true,
    });

    res.json({
      success: true,
      message: 'Test notification sent successfully',
      data: serialize(notification),
    });
  } catch (error) {
    console.error('Error sending test notification:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending test notification',
      error: error.message,
    });
  }
});

router.patch('/:id/read', auth, async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { read: true }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        msg: 'Notification not found',
      });
    }

    res.json({
      success: true,
      data: serialize(notification),
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({
      success: false,
      msg: 'Server error while marking notification as read',
    });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        msg: 'Notification not found',
      });
    }

    res.json({
      success: true,
      msg: 'Notification deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({
      success: false,
      msg: 'Server error while deleting notification',
    });
  }
});

module.exports = router;
