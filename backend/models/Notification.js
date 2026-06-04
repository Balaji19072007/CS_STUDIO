const { supabase } = require('../config/supabase');

class Notification {
  constructor(data) {
    this.id = data.id || null;
    this._id = this.id;
    this.userId = data.user_id || data.user || data.userId;
    this.user = this.userId;
    this.title = data.title;
    this.message = data.message;
    this.type = data.type || 'system';
    this.link = data.link || '';
    this.isRead = data.is_read !== undefined ? data.is_read : (data.read || false);
    this.read = this.isRead;
    this.important = data.important || false;
    this.data = data.data || {};
    this.createdAt = data.created_at || data.createdAt || new Date().toISOString();
    this.created_at = this.createdAt;
  }

  toJSON() {
    return {
      id: this.id,
      _id: this.id,
      userId: this.userId,
      user: this.userId,
      title: this.title,
      message: this.message,
      type: this.type,
      link: this.link,
      read: this.isRead,
      isRead: this.isRead,
      important: this.important,
      data: this.data,
      createdAt: this.createdAt,
      created_at: this.createdAt,
    };
  }

  static normalizeUpdate(update = {}) {
    const normalized = {};

    if (update.read !== undefined) normalized.is_read = update.read;
    if (update.is_read !== undefined) normalized.is_read = update.is_read;
    if (update.title !== undefined) normalized.title = update.title;
    if (update.message !== undefined) normalized.message = update.message;
    if (update.type !== undefined) normalized.type = update.type;
    if (update.link !== undefined) normalized.link = update.link;
    if (update.important !== undefined) normalized.important = update.important;
    if (update.data !== undefined) normalized.data = update.data;

    return normalized;
  }

  static async getNotifications(userId, options = {}) {
    try {
      let query = supabase
        .from('notifications')
        .select('*', { count: 'exact' })
        .eq('user_id', userId);

      if (options.unreadOnly) {
        query = query.eq('is_read', false);
      }

      query = query.order('created_at', { ascending: false });

      const page = options.page || 1;
      const limitVal = options.limit || 20;
      const start = (page - 1) * limitVal;
      query = query.range(start, start + limitVal - 1);

      const { data, count, error } = await query;
      if (error) throw error;

      const notifications = (data || []).map((row) => new Notification(row));
      return { notifications, total: count || 0 };
    } catch (error) {
      console.error('getNotifications error:', error);
      return { notifications: [], total: 0 };
    }
  }

  static async countDocuments(criteria) {
    try {
      let query = supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true });

      if (criteria.user) query = query.eq('user_id', criteria.user);
      if (criteria.read !== undefined) query = query.eq('is_read', criteria.read);

      const { count, error } = await query;
      if (error) throw error;
      return count || 0;
    } catch (error) {
      console.error('countDocuments error:', error);
      return 0;
    }
  }

  async save() {
    try {
      const dbData = {
        user_id: this.userId,
        title: this.title,
        message: this.message,
        type: this.type,
        link: this.link,
        is_read: this.isRead,
        important: this.important,
        data: this.data,
        created_at: this.createdAt,
      };

      if (this.id) {
        const { data, error } = await supabase
          .from('notifications')
          .update(dbData)
          .eq('id', this.id)
          .select()
          .single();

        if (error) throw error;
        if (data) {
          Object.assign(this, new Notification(data));
        }
      } else {
        const { data, error } = await supabase
          .from('notifications')
          .insert([dbData])
          .select()
          .single();

        if (error) throw error;
        if (data) {
          Object.assign(this, new Notification(data));
        }
      }

      return this;
    } catch (error) {
      console.error('Notification.save error:', error);
      throw error;
    }
  }

  static async findOneAndUpdate(criteria, update) {
    try {
      let query = supabase
        .from('notifications')
        .update(this.normalizeUpdate(update))
        .select()
        .limit(1);

      if (criteria.user) query = query.eq('user_id', criteria.user);
      if (criteria._id) query = query.eq('id', criteria._id);

      const { data, error } = await query;
      if (error) throw error;
      return data && data.length ? new Notification(data[0]) : null;
    } catch (error) {
      console.error('findOneAndUpdate error:', error);
      return null;
    }
  }

  static async updateMany(criteria, update) {
    try {
      let query = supabase
        .from('notifications')
        .update(this.normalizeUpdate(update));

      if (criteria.user) query = query.eq('user_id', criteria.user);
      if (criteria.read !== undefined) query = query.eq('is_read', criteria.read);

      const { error, count } = await query;
      if (error) throw error;
      return { modifiedCount: count || 0 };
    } catch (error) {
      console.error('updateMany error:', error);
      return { modifiedCount: 0 };
    }
  }

  static async findOneAndDelete(criteria) {
    try {
      let query = supabase.from('notifications').delete().select().limit(1);
      if (criteria.user) query = query.eq('user_id', criteria.user);
      if (criteria._id) query = query.eq('id', criteria._id);

      const { data, error } = await query;
      if (error) throw error;
      return data && data.length ? new Notification(data[0]) : null;
    } catch (error) {
      console.error('findOneAndDelete error:', error);
      return null;
    }
  }

  static async deleteMany(criteria) {
    try {
      let query = supabase.from('notifications').delete();
      if (criteria.user) query = query.eq('user_id', criteria.user);

      const { error, count } = await query;
      if (error) throw error;
      return { deletedCount: count || 0 };
    } catch (error) {
      console.error('deleteMany error:', error);
      return { deletedCount: 0 };
    }
  }

  static async insertMany(notifications) {
    try {
      const dbData = notifications.map((notification) => ({
        user_id: notification.userId || notification.user,
        title: notification.title,
        message: notification.message,
        type: notification.type || 'system',
        link: notification.link || '',
        is_read: notification.isRead !== undefined ? notification.isRead : (notification.read || false),
        important: notification.important || false,
        data: notification.data || {},
        created_at: notification.createdAt || new Date().toISOString(),
      }));

      const { data, error } = await supabase
        .from('notifications')
        .insert(dbData)
        .select();

      if (error) throw error;
      return (data || []).map((row) => new Notification(row));
    } catch (error) {
      console.error('Notification.insertMany error:', error);
      throw error;
    }
  }
}

module.exports = Notification;
