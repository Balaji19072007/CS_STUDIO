// backend/util/notificationService.js
const { supabase } = require('../config/supabase');
const socketHandler = require('../socket/socketHandler');

class NotificationService {
  static async sendNotification(userId, notificationData) {
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
          data: notificationData.data || {},
        })
        .select()
        .single();

      if (error) throw error;

      await this.emitRealTimeNotification(userId, notification);

      console.log(`Notification sent to user ${userId}: ${notificationData.title}`);
      return notification;
    } catch (error) {
      console.error('Error sending notification:', error);
      throw error;
    }
  }

  static async emitRealTimeNotification(userId, notification) {
    try {
      if (socketHandler.emitToUser(userId, 'new-notification', notification)) {
        console.log(`Real-time notification emitted to user-${userId}`);
        return true;
      }
      console.error('Socket.IO instance not available');
      return false;
    } catch (error) {
      console.error('Error emitting real-time notification:', error);
      return false;
    }
  }

  static async sendBulkNotifications(userIds, notificationData) {
    try {
      const notifications = userIds.map((userId) => ({
        user_id: userId,
        title: notificationData.title,
        message: notificationData.message,
        type: notificationData.type || 'system',
        link: notificationData.link || '',
        important: notificationData.important || false,
        data: notificationData.data || {},
      }));

      const { data: result, error } = await supabase
        .from('notifications')
        .insert(notifications)
        .select();

      if (error) throw error;

      for (let i = 0; i < (result || []).length; i += 1) {
        await this.emitRealTimeNotification(userIds[i], result[i]);
      }

      console.log(`Bulk notifications sent to ${userIds.length} users: ${notificationData.title}`);
      return result;
    } catch (error) {
      console.error('Error sending bulk notifications:', error);
      throw error;
    }
  }

  static async sendCourseCompletion(userId, courseName, courseId) {
    return this.sendNotification(userId, {
      title: 'Course Completed!',
      message: `Congratulations! You've successfully completed "${courseName}"`,
      type: 'course',
      link: `/courses/${courseId}`,
      important: true,
      data: { courseName, courseId },
    });
  }

  static async sendProgressMilestone(userId, milestone, points) {
    return this.sendNotification(userId, {
      title: 'Progress Milestone!',
      message: `Amazing! You've reached ${milestone} and earned ${points} points!`,
      type: 'progress',
      link: '/my-progress',
      data: { milestone, points },
    });
  }

  static async sendNewChallenge(userId, challengeName, challengeId) {
    return this.sendNotification(userId, {
      title: 'New Challenge Available!',
      message: `A new challenge "${challengeName}" is waiting for you!`,
      type: 'challenge',
      link: `/problems/${challengeId}`,
      data: { challengeName, challengeId },
    });
  }

  static async sendAchievementUnlocked(userId, achievementName, description) {
    return this.sendNotification(userId, {
      title: 'Achievement Unlocked!',
      message: `You unlocked "${achievementName}": ${description}`,
      type: 'achievement',
      link: '/my-progress',
      important: true,
      data: { achievementName, description },
    });
  }

  static async sendProblemSolved(userId, problemName, difficulty, points) {
    return this.sendNotification(userId, {
      title: 'Problem Solved!',
      message: `Great job! You solved "${problemName}" (${difficulty}) and earned ${points} points`,
      type: 'progress',
      link: '/problems',
      data: { problemName, difficulty, points },
    });
  }

  static async sendStreakMilestone(userId, streakDays) {
    return this.sendNotification(userId, {
      title: 'Streak Milestone!',
      message: `You're on fire! ${streakDays}-day coding streak! Keep it up!`,
      type: 'progress',
      link: '/my-progress',
      data: { streakDays },
    });
  }

  static async sendSystemAnnouncement(userId, title, message, link = '') {
    return this.sendNotification(userId, {
      title: `System: ${title}`,
      message,
      type: 'system',
      link,
      important: true,
    });
  }

  static async sendCommunityNotification(userId, interactionType, userName, postId) {
    const messages = {
      like: 'liked your post',
      comment: 'commented on your post',
      follow: 'started following you',
      mention: 'mentioned you in a post',
    };

    return this.sendNotification(userId, {
      title: 'Community Update',
      message: `${userName} ${messages[interactionType] || 'interacted with your content'}`,
      type: 'community',
      link: `/community/post/${postId}`,
      data: { interactionType, userName, postId },
    });
  }
}

module.exports = NotificationService;
