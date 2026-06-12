const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabase');
const authMiddleware = require('../middleware/authMiddleware');
const xss = require('xss');

// Helper to hydrate author details
const hydrateAuthor = async (authorId) => {
    try {
        if (!authorId) return null;
        const { data: user } = await supabase
            .from('users')
            .select('id, first_name, last_name, username, photo_url')
            .eq('id', authorId)
            .single();
        if (!user) return { _id: authorId, username: 'Unknown User' };
        return {
            _id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            username: user.username,
            photoUrl: user.photo_url
        };
    } catch (err) {
        return { _id: authorId, username: 'Unknown User' };
    }
};

// @route   GET /api/community
// @desc    Get all discussions
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { data: discussions, error } = await supabase
            .from('discussions')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        const enrichedDiscussions = await Promise.all((discussions || []).map(async (discussion) => {
            discussion.author = await hydrateAuthor(discussion.author);
            return discussion;
        }));

        res.json(enrichedDiscussions || []);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/community/:id
// @desc    Get discussion by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        // Increment views
        await supabase.rpc('increment_discussion_views', { discussion_id: req.params.id });

        const { data: discussion, error } = await supabase
            .from('discussions')
            .select('*')
            .eq('id', req.params.id)
            .single();

        if (error || !discussion) {
            return res.status(404).json({ msg: 'Discussion not found' });
        }

        discussion.author = await hydrateAuthor(discussion.author);

        if (discussion.comments) {
            discussion.comments = await Promise.all((discussion.comments || []).map(async (comment) => {
                comment.author = await hydrateAuthor(comment.author);
                return comment;
            }));
        }

        res.json(discussion);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/community
// @desc    Create a discussion
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { title, content, tags } = req.body;

        const sanitizedTitle = xss(title?.trim().substring(0, 200) || '');
        const sanitizedContent = xss(content?.trim() || '');
        const sanitizedTags = (tags || []).map(t => xss(t?.trim().substring(0, 50) || '')).filter(Boolean);

        if (!sanitizedTitle || !sanitizedContent) {
            return res.status(400).json({ msg: 'Title and content are required' });
        }

        const { data: discussion, error } = await supabase
            .from('discussions')
            .insert({
                title: sanitizedTitle,
                content: sanitizedContent,
                tags: sanitizedTags,
                author: req.user.id,
                comments: [],
                likes: [],
                views: 0,
            })
            .select()
            .single();

        if (error) throw error;

        discussion.author = await hydrateAuthor(req.user.id);

        res.json(discussion);
    } catch (err) {
        console.error('❌ Error creating discussion:', err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/community/:id/comment
// @desc    Comment on a discussion
// @access  Private
router.post('/:id/comment', authMiddleware, async (req, res) => {
    try {
        const user = req.user;
        const sanitizedContent = xss(req.body.content?.trim() || '');
        if (!sanitizedContent) {
            return res.status(400).json({ msg: 'Comment content is required' });
        }

        const { data: current, error: fetchError } = await supabase
            .from('discussions')
            .select('comments')
            .eq('id', req.params.id)
            .single();

        if (fetchError || !current) {
            return res.status(404).json({ msg: 'Discussion not found' });
        }

        const newComment = {
            content: sanitizedContent,
            author: user.id,
            createdAt: new Date().toISOString(),
        };

        const comments = [newComment, ...(current.comments || [])];

        const { data: updated, error: updateError } = await supabase
            .from('discussions')
            .update({ comments })
            .eq('id', req.params.id)
            .select()
            .single();

        if (updateError) throw updateError;

        const latestComments = await Promise.all((updated.comments || []).map(async (c) => {
            c.author = await hydrateAuthor(c.author);
            return c;
        }));

        res.json(latestComments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/community/:id/like
// @desc    Like a discussion
// @access  Private
router.put('/:id/like', authMiddleware, async (req, res) => {
    try {
        const { data: current, error: fetchError } = await supabase
            .from('discussions')
            .select('likes')
            .eq('id', req.params.id)
            .single();

        if (fetchError || !current) {
            return res.status(404).json({ msg: 'Discussion not found' });
        }

        const userId = req.user.id;
        let likes = current.likes || [];
        if (likes.includes(userId)) {
            likes = likes.filter(id => id !== userId);
        } else {
            likes = [userId, ...likes];
        }

        const { data: updated, error: updateError } = await supabase
            .from('discussions')
            .update({ likes })
            .eq('id', req.params.id)
            .select('likes')
            .single();

        if (updateError) throw updateError;

        res.json(updated.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/community/:id
// @desc    Delete a discussion
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const { data: discussion, error: fetchError } = await supabase
            .from('discussions')
            .select('id, author')
            .eq('id', req.params.id)
            .single();

        if (fetchError || !discussion) {
            return res.status(404).json({ msg: 'Discussion not found' });
        }

        if (discussion.author !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await supabase.from('discussions').delete().eq('id', req.params.id);

        res.json({ msg: 'Discussion removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
