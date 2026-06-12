const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { supabase } = require('../config/supabase');
const NotificationService = require('../util/notificationService');

router.get('/', auth, async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
    const unreadOnly = req.query.unreadOnly === 'true';

    let query = supabase
      .from('notifications')
      .select('*', { count: 'exact' })
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (unreadOnly) query = query.eq('is_read', false);

    const { data: notifications, count, error } = await query;

    if (error) throw error;

    res.json({
      success: true,
      data: notifications || [],
      pagination: { page, limit, total: count || 0, pages: Math.ceil((count || 0) / limit) },
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ success: false, msg: 'Server error while fetching notifications' });
  }
});

router.get('/unread-count', auth, async (req, res) => {
  try {
    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', req.user.id)
      .eq('is_read', false);

    if (error) throw error;

    res.json({ success: true, count: count || 0 });
  } catch (error) {
    console.error('Error fetching unread count:', error);
    res.status(500).json({ success: false, msg: 'Server error while fetching unread count' });
  }
});

router.patch('/mark-all-read', auth, async (req, res) => {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', req.user.id)
      .eq('is_read', false);

    if (error) throw error;

    res.json({ success: true, msg: 'All notifications marked as read' });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    res.status(500).json({ success: false, msg: 'Server error while marking all notifications as read' });
  }
});

router.delete('/clear-all', auth, async (req, res) => {
  try {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('user_id', req.user.id);

    if (error) throw error;

    res.json({ success: true, msg: 'All notifications cleared successfully' });
  } catch (error) {
    console.error('Error clearing notifications:', error);
    res.status(500).json({ success: false, msg: 'Server error while clearing notifications' });
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

    res.json({ success: true, message: 'Test notification sent successfully', data: notification });
  } catch (error) {
    console.error('Error sending test notification:', error);
    res.status(500).json({ success: false, message: 'Error sending test notification', error: error.message });
  }
});

router.patch('/:id/read', auth, async (req, res) => {
  try {
    const { data: notification, error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .select()
      .single();

    if (error || !notification) {
      return res.status(404).json({ success: false, msg: 'Notification not found' });
    }

    res.json({ success: true, data: notification });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ success: false, msg: 'Server error while marking notification as read' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const { data: notification, error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .select()
      .single();

    if (error || !notification) {
      return res.status(404).json({ success: false, msg: 'Notification not found' });
    }

    res.json({ success: true, msg: 'Notification deleted successfully' });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({ success: false, msg: 'Server error while deleting notification' });
  }
});

module.exports = router;
