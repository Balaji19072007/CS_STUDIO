const { supabase } = require('../config/supabase');

class Discussion {
    constructor(data) {
        this.id = data.id || null;
        this.title = data.title;
        this.content = data.content;
        this.author = data.author; // This might be a user ID or object, depending on join
        this.tags = data.tags || [];
        this.comments = data.comments || [];
        this.likes = data.likes || [];
        this.views = data.views || 0;
        this.createdAt = data.created_at || data.createdAt || new Date().toISOString();
        this.updatedAt = data.updated_at || data.updatedAt || new Date().toISOString();
    }

    static async find(criteria = {}) {
        try {
            let query = supabase.from('discussions').select('*');
            // Add filters if needed
            const { data, error } = await query;
            if (error) throw error;
            return (data || []).map(d => new Discussion(d));
        } catch (error) {
            console.error('Discussion.find error:', error);
            return [];
        }
    }

    static async findById(id) {
        try {
            const { data, error } = await supabase
                .from('discussions')
                .select('*')
                .eq('id', id)
                .single();
            if (error || !data) return null;
            return new Discussion(data);
        } catch (error) {
            console.error('Discussion.findById error:', error);
            return null;
        }
    }

    static async findByIdAndUpdate(id, update) {
        try {
            // Check if it's a view increment
            if (update.$inc && update.$inc.views) {
                // We'll use RPC for increment or fetch and update
                const { data, error } = await supabase.rpc('increment_discussion_views', { discussion_id: id });
                // Fallback if RPC doesn't exist
                if (error) {
                    const { data: d } = await supabase.from('discussions').select('views').eq('id', id).single();
                    if (d) {
                        await supabase.from('discussions').update({ views: (d.views || 0) + update.$inc.views }).eq('id', id);
                    }
                }
            }
            return this.findById(id);
        } catch (error) {
            console.error('Discussion.findByIdAndUpdate error:', error);
            return null;
        }
    }

    toObject() { return { ...this }; }

    async save() {
        try {
            const dbData = {
                title: this.title,
                content: this.content,
                author: this.author,
                tags: this.tags,
                comments: this.comments,
                likes: this.likes,
                views: this.views,
                updated_at: new Date().toISOString()
            };

            if (this.id) {
                const { error } = await supabase
                    .from('discussions')
                    .update(dbData)
                    .eq('id', this.id);
                if (error) throw error;
            } else {
                const { data, error } = await supabase
                    .from('discussions')
                    .insert([{ ...dbData, created_at: this.createdAt }])
                    .select()
                    .single();
                if (error) throw error;
                if (data) this.id = data.id;
            }
            return this;
        } catch (error) {
            console.error('Discussion.save error:', error);
            throw error;
        }
    }

    async deleteOne() {
        if (this.id) {
            console.log('Attempting to delete discussion:', this.id);
            const { data, error } = await supabase.from('discussions').delete().eq('id', this.id).select();
            if (error) {
                console.error('Error deleting discussion:', error);
                throw error;
            }
            if (!data || data.length === 0) {
                console.error('No rows deleted for discussion:', this.id);
                throw new Error('No rows deleted. Possible RLS or missing ID.');
            }
            console.log('Successfully deleted discussion', data);
        }
    }
}

module.exports = Discussion;

