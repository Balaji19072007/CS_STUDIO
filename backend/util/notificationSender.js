const { supabase } = require('../config/supabase');

class NotificationSender {
  static async sendToUser(userId, notificationData) {
    try {
      const { data: notification, error } = await supabase
        .from('notifications')
        .insert({
          user_id: userId,
          title: notificationData.title,
          message: notificationData.message,
          type: notificationData.type || 'system',
          link: notificationData.link || '',
          important: notificationData.important || false,
        })
        .select()
        .single();

      if (error) throw error;

      try {
        const socketService = require('./socketService');
        socketService.emitToUser(userId, 'new_notification', notification);
      } catch (e) {
        // socket emission is optional
      }

      return notification;
    } catch (error) {
      console.error('Error sending notification to user:', error);
      throw error;
    }
  }

  static async sendToUsers(userIds, notificationData) {
    try {
      const notifications = userIds.map(userId => ({
        user_id: userId,
        title: notificationData.title,
        message: notificationData.message,
        type: notificationData.type || 'system',
        link: notificationData.link || '',
        important: notificationData.important || false,
      }));

      const { data: result, error } = await supabase
        .from('notifications')
        .insert(notifications)
        .select();

      if (error) throw error;

      return result;
    } catch (error) {
      console.error('Error sending notifications to users:', error);
      throw error;
    }
  }

  static async sendAchievement(userId, achievementData) {
    return this.sendToUser(userId, {
      title: 'Achievement Unlocked!',
      message: `You've earned the "${achievementData.name}" achievement!`,
      type: 'achievement',
      link: '/profile/achievements',
      important: true
    });
  }
}

module.exports = NotificationSender;