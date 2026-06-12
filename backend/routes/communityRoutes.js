const express = require('express');
const router = express.Router();
const Discussion = require('../models/Discussion');
const User = require('../models/User'); // Import User model for manual fetching
const authMiddleware = require('../middleware/authMiddleware');
const xss = require('xss');

// Helper to hydrate author details
const hydrateAuthor = async (authorId) => {
    try {
        if (!authorId) return null;
        const user = await User.findById(authorId);
        if (!user) return { _id: authorId, username: 'Unknown User' };
        return {
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            photoUrl: user.photoUrl
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
        // Fetch all discussions
        let discussions = await Discussion.find();

        // Sort by createdAt desc
        discussions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // Manually populate authors
        const enrichedDiscussions = await Promise.all(discussions.map(async (doc) => {
            const discussion = doc.toObject();
            discussion.author = await hydrateAuthor(discussion.author);
            return discussion;
        }));

        res.json(enrichedDiscussions);
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
        const doc = await Discussion.findByIdAndUpdate(
            req.params.id,
            { $inc: { views: 1 } },
            { new: true }
        );

        if (!doc) {
            return res.status(404).json({ msg: 'Discussion not found' });
        }

        const discussion = doc.toObject();
        discussion.author = await hydrateAuthor(discussion.author);

        // Hydrate comments authors
        if (discussion.comments) {
            discussion.comments = await Promise.all(discussion.comments.map(async (comment) => {
                comment.author = await hydrateAuthor(comment.author);
                return comment;
            }));
        }

        res.json(discussion);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Discussion not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/community
// @desc    Create a discussion
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { title, content, tags } = req.body;

        // Sanitize inputs
        const sanitizedTitle = xss(title?.trim().substring(0, 200) || '');
        const sanitizedContent = xss(content?.trim() || '');
        const sanitizedTags = (tags || []).map(t => xss(t?.trim().substring(0, 50) || '')).filter(Boolean);

        if (!sanitizedTitle || !sanitizedContent) {
            return res.status(400).json({ msg: 'Title and content are required' });
        }

        const newDiscussion = new Discussion({
            title: sanitizedTitle,
            content: sanitizedContent,
            tags: sanitizedTags,
            author: req.user.id // Store ID string
        });

        const savedDoc = await newDiscussion.save();
        const discussion = savedDoc.toObject();

        // Populate author from req.user since we have it
        discussion.author = {
            _id: req.user.id,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            username: req.user.username,
            photoUrl: req.user.photoUrl
        };
        // Note: req.user might not have all fields if from JWT, but typically OK for display
        // If JWT is slim, we might want to fetch full user:
        const fullUser = await hydrateAuthor(req.user.id);
        discussion.author = fullUser;

        res.json(discussion);
    } catch (err) {
        console.error('❌ Error creating discussion:', err.message);
        if (err.name === 'ValidationError') {
            return res.status(400).json({ msg: err.message, errors: err.errors });
        }
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/community/:id/comment
// @desc    Comment on a discussion
// @access  Private
router.post('/:id/comment', authMiddleware, async (req, res) => {
    try {
        const user = req.user;
        const discussionDoc = await Discussion.findById(req.params.id);

        if (!discussionDoc) {
            return res.status(404).json({ msg: 'Discussion not found' });
        }

        const sanitizedContent = xss(req.body.content?.trim() || '');
        if (!sanitizedContent) {
            return res.status(400).json({ msg: 'Comment content is required' });
        }

        const newComment = {
            content: sanitizedContent,
            author: user.id
        };

        discussionDoc.comments.unshift(newComment);
        await discussionDoc.save();

        // Return just the comments with populated authors
        // We need to re-fetch or manual populate. Manual is better to avoid populate calls.

        const latestComments = await Promise.all(discussionDoc.comments.map(async (c) => {
            const commentObj = c.toObject();
            commentObj.author = await hydrateAuthor(commentObj.author);
            return commentObj;
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
        const discussion = await Discussion.findById(req.params.id);

        if (!discussion) {
            return res.status(404).json({ msg: 'Discussion not found' });
        }

        // Check if the post has already been liked
        const userId = req.user.id;
        if (discussion.likes.includes(userId)) {
            // Unlike
            const removeIndex = discussion.likes.indexOf(userId);
            discussion.likes.splice(removeIndex, 1);
        } else {
            // Like
            discussion.likes.unshift(userId);
        }

        await discussion.save();

        res.json(discussion.likes);
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
        const discussion = await Discussion.findById(req.params.id);

        if (!discussion) {
            return res.status(404).json({ msg: 'Discussion not found' });
        }

        // Check user
        if (discussion.author !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await discussion.deleteOne();

        res.json({ msg: 'Discussion removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Discussion not found' });
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router;
