const { supabase } = require('../config/supabase');

module.exports = async function (req, res, next) {
    if (!req.user || !req.user.id) {
        return res.status(401).json({ success: false, msg: 'User not authenticated in isAdmin' });
    }

    try {
        const { data, error } = await supabase
            .from('users')
            .select('role')
            .eq('id', req.user.id)
            .single();

        if (error) {
            return res.status(403).json({ success: false, msg: 'DB error checking role', error: error.message, userId: req.user.id });
        }
        if (!data) {
            return res.status(403).json({ success: false, msg: 'User not found in public.users', userId: req.user.id });
        }
        if (data.role !== 'admin') {
            return res.status(403).json({ success: false, msg: `Access denied. Role is ${data.role}`, userId: req.user.id });
        }

        next();
    } catch (error) {
        console.error('isAdmin middleware error:', error);
        res.status(500).json({ success: false, msg: 'Server error in isAdmin', error: error.message });
    }
};
