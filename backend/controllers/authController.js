// controllers/authController.js
const { supabase } = require('../config/supabase');

/**
 * @desc    Get Current User Profile
 * @route   GET /api/auth/me
 * @access  Private
 */
exports.getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch from public.users table
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Fetch user error:', error.message);
      // If user is in Auth but not in public table (race condition?), try to return basic info
      if (req.user) {
        return res.json({
          id: req.user.id,
          email: req.user.email,
          role: 'user', // Default
          username: req.user.email.split('@')[0]
        });
      }
      return res.status(404).json({ msg: 'User profile not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('Get current user error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

const xss = require('xss');

/**
 * @desc    Update User Profile
 * @route   PUT /api/auth/profile
 * @access  Private
 */
exports.updateProfile = async (req, res) => {
  const { firstName, lastName, bio, removeProfilePicture } = req.body;
  const file = req.file;
  const userId = req.user.id;

  try {
    const updates = {};
    if (firstName !== undefined) updates.first_name = xss(firstName);
    if (lastName !== undefined) updates.last_name = xss(lastName);
    if (bio !== undefined) updates.bio = xss(bio);

    if (removeProfilePicture === 'true') {
      updates.photo_url = '';
      // TODO: Handle cloudinary deletion if needed
    }

    if (file) {
      // Cloudinary upload logic remains similar OR use Supabase Storage
      // For minimal changes, we keep Cloudinary if configured in server.js
      const cloudinary = req.app.get('cloudinary');
      if (cloudinary) {
        const upload = () => new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: `profiles/${userId}` },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(file.buffer);
        });
        const result = await upload();
        updates.photo_url = result.secure_url;
      }
    }

    updates.updated_at = new Date();

    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;

    res.json(data);

  } catch (err) {
    console.error('Update profile error:', err.message);
    res.status(500).json({ msg: 'Server error updating profile' });
  }
};

// Deprecated or Client-Side Handled Endpoints
// We keep them as 405 or simplified responses if frontend still calls them temporarily
// BUT user instructed to replace Firebase with Supabase on frontend, so frontend shouldn't call these for login anymore.

exports.signUpUser = (req, res) => res.status(410).json({ msg: 'Endpoint deprecated. Use Supabase Auth Client.' });
exports.signInUser = (req, res) => res.status(410).json({ msg: 'Endpoint deprecated. Use Supabase Auth Client.' });
exports.sendOTP = (req, res) => res.status(410).json({ msg: 'Endpoint deprecated.' });
exports.verifyOTP = (req, res) => res.status(410).json({ msg: 'Endpoint deprecated.' });
exports.googleAuth = (req, res) => res.status(410).json({ msg: 'Endpoint deprecated. Use Supabase Auth Client.' });