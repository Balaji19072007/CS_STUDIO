const { supabase } = require('../config/supabase');

class User {
    constructor(data) {
        this.id = data.id || null;
        this.firstName = data.first_name || data.firstName;
        this.lastName = data.last_name || data.lastName;
        this.username = data.username;
        this.email = data.email;
        this.photoUrl = data.photo_url || data.photoUrl;
        this.bio = data.bio || '';
        this.totalPoints = data.total_points !== undefined ? data.total_points : (data.totalPoints || 0);
        this.problemsSolved = data.problems_solved !== undefined ? data.problems_solved : (data.problemsSolved || 0);
        this.currentStreak = data.current_streak !== undefined ? data.current_streak : (data.currentStreak || 0);
        this.lastStreakUpdate = data.last_streak_update || data.lastStreakUpdate || new Date().toISOString();
        this.role = data.role || 'user';
        this.averageAccuracy = data.average_accuracy !== undefined ? data.average_accuracy : (data.averageAccuracy || 0);
        this.createdAt = data.created_at || data.createdAt || new Date().toISOString();
        this.updatedAt = data.updated_at || data.updatedAt || new Date().toISOString();
    }

    static async findOne(criteria) {
        try {
            let query = supabase.from('users').select('*');

            if (criteria.email) {
                query = query.eq('email', criteria.email);
            } else if (criteria.username) {
                query = query.eq('username', criteria.username);
            } else {
                return null;
            }

            const { data, error } = await query.single();

            if (error || !data) return null;
            return new User(data);
        } catch (error) {
            console.error('User.findOne error:', error);
            throw error;
        }
    }

    static async findById(id) {
        try {
            if (!id) return null;
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', id)
                .single();

            if (error || !data) return null;
            return new User(data);
        } catch (error) {
            console.error('User.findById error:', error);
            throw error;
        }
    }

    static async getTopUsers(limitCount = 100) {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .gt('total_points', 0)
                .neq('role', 'admin')
                .neq('username', 'admin')
                .order('total_points', { ascending: false })
                .limit(limitCount);

            if (error) throw error;
            return data.map(d => new User(d));
        } catch (error) {
            console.error('User.getTopUsers error:', error);
            return [];
        }
    }

    static async count(criteria = {}) {
        try {
            let query = supabase.from('users').select('*', { count: 'exact', head: true });

            if (criteria.hasSolvedProblems) {
                query = query.gt('problems_solved', 0);
            }

            const { count, error } = await query;
            if (error) throw error;
            return count;
        } catch (error) {
            console.error('User.count error:', error);
            return 0;
        }
    }

    static async countDocuments(criteria = {}) {
        return this.count(criteria);
    }

    async save() {
        try {
            const dbData = {
                first_name: this.firstName,
                last_name: this.lastName,
                username: this.username,
                email: this.email,
                photo_url: this.photoUrl,
                bio: this.bio,
                total_points: this.totalPoints,
                problems_solved: this.problemsSolved,
                current_streak: this.currentStreak,
                last_streak_update: this.lastStreakUpdate,
                role: this.role,
                average_accuracy: this.averageAccuracy,
                updated_at: new Date().toISOString()
            };

            // Remove undefined
            Object.keys(dbData).forEach(key => dbData[key] === undefined && delete dbData[key]);

            if (this.id) {
                const { error } = await supabase
                    .from('users')
                    .update(dbData)
                    .eq('id', this.id);
                if (error) throw error;
            } else {
                // Should theoretically be created by trigger, but for robustness:
                // Note: Inserts into public.users usually require specific permissions or handled by Auth
                // We assume this is mostly for updates or admin scripts.
                const { data, error } = await supabase
                    .from('users')
                    .insert([dbData])
                    .select()
                    .single();

                if (error) throw error;
                if (data) this.id = data.id;
            }
            return this;
        } catch (error) {
            console.error('User.save error:', error);
            throw error;
        }
    }
}

module.exports = User;