const { supabase } = require('../config/supabase');

exports.getAdminUpdates = async (req, res) => {
    try {
        // Fetch recent users
        const { data: recentUsers, error: usersError } = await supabase
            .from('users')
            .select('id, username, email, created_at, role')
            .order('created_at', { ascending: false })
            .limit(10);
            
        // Fetch recent progress
        const { data: recentProgress, error: progressError } = await supabase
            .from('user_progress')
            .select('id, user_id, topic_id, updated_at')
            .order('updated_at', { ascending: false })
            .limit(10);

        // Fetch counts
        const { count: totalUsers } = await supabase.from('users').select('*', { count: 'exact', head: true });
        
        // Count total completed problems (just an example of an aggregate metric, this depends on schema)
        // If 'problems' table exists, we can count total problems.
        const { count: totalProblems } = await supabase.from('problems').select('*', { count: 'exact', head: true }).limit(1);

        res.json({
            success: true,
            data: {
                recentUsers: recentUsers || [],
                recentProgress: recentProgress || [],
                stats: {
                    totalUsers: totalUsers || 0,
                    totalProblems: totalProblems || 0
                }
            }
        });
    } catch (error) {
        console.error('getAdminUpdates error:', error);
        res.status(500).json({ success: false, msg: 'Server Error' });
    }
};

exports.exportUsersCSV = async (req, res) => {
    try {
        const { data: users, error } = await supabase.from('users').select('*');
        if (error) throw error;
        
        await exports.logAdminAction(req.user.id, 'EXPORT_USERS', null, { rowsExported: users.length });

        const header = Object.keys(users[0] || {}).join(',') + '\n';
        const rows = users.map(user => Object.values(user).map(val => `"${val}"`).join(',')).join('\n');
        
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=\"users_export.csv\"');
        res.status(200).send(header + rows);
    } catch (error) {
        console.error('Export CSV error:', error);
        res.status(500).json({ success: false, msg: 'Export failed' });
    }
};

exports.getAuditLogs = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('audit_logs')
            .select(`
                id, action, target_id, details, created_at,
                admin:admin_id ( email, username )
            `)
            .order('created_at', { ascending: false })
            .limit(50);
            
        if (error) throw error;
        res.json({ success: true, data });
    } catch (error) {
        console.error('getAuditLogs error:', error);
        res.status(500).json({ success: false, msg: 'Server Error' });
    }
};

exports.logAdminAction = async (adminId, action, targetId, details) => {
    try {
        await supabase.from('audit_logs').insert([{
            admin_id: adminId,
            action,
            target_id: targetId,
            details
        }]);
    } catch (error) {
        console.error('Failed to log admin action:', error.message);
    }
};
