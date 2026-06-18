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
      .maybeSingle();

    if (error) {
      console.error('Fetch user error:', error.message);
      return res.status(500).json({ msg: 'Server error' });
    }

    if (!user) {
      // User is in Auth but not in public table (Google OAuth first login)
      return res.json({
        id: req.user.id,
        email: req.user.email,
        role: 'user',
        needsUsername: true
      });
    }

    // If user exists but lacks a username OR has a default generated username
    const emailPrefix = user.email ? user.email.split('@')[0].toLowerCase().trim() : '';
    const currentUsername = user.username ? user.username.toLowerCase().trim() : '';
    const isGeneratedUsername = !currentUsername || currentUsername === emailPrefix;
    if (isGeneratedUsername) {
        user.needsUsername = true;
        user.username = ''; // Clear it so frontend doesn't show the auto-generated one
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
  const { firstName, lastName, bio, removeProfilePicture, username } = req.body;
  const file = req.file;
  const userId = req.user.id;

  try {
    const updates = {};
    if (firstName !== undefined) updates.first_name = xss(firstName);
    if (lastName !== undefined) updates.last_name = xss(lastName);
    if (bio !== undefined) updates.bio = xss(bio);

    if (username) {
        const cleanUsername = xss(username);
        // Check if username is already taken by someone else
        const { data: existingUsers } = await supabase
            .from('users')
            .select('id')
            .ilike('username', cleanUsername)
            .neq('id', userId)
            .limit(1);
            
        if (existingUsers && existingUsers.length > 0) {
            return res.status(400).json({ msg: 'Username is already taken' });
        }
        updates.username = cleanUsername;
    }

    if (removeProfilePicture === 'true') {
      updates.photo_url = '';
    }

    if (file) {
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

    // Try to update first
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .maybeSingle();

    if (error) throw error;

    // If no row was updated, it means the user doesn't exist in public.users yet (Google OAuth)
    if (!data) {
        updates.id = userId;
        updates.email = req.user.email;
        updates.role = 'user';
        
        const { data: insertedData, error: insertError } = await supabase
            .from('users')
            .insert([updates])
            .select()
            .single();
            
        if (insertError) throw insertError;
        return res.json(insertedData);
    }

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