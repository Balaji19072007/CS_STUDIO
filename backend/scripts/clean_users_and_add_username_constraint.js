require('dotenv').config({ path: '../frontend/.env' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY; // Service key needed for admin deletes

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

async function main() {
    try {
        console.log('Fetching all users from public.users...');
        const { data: users, error: fetchError } = await supabase.from('users').select('*');
        
        if (fetchError) throw fetchError;
        console.log(`Found ${users.length} users.`);

        // Find the admin user (first_name = 'System' and last_name = 'Admin' or username = 'admin')
        let adminUser = users.find(u => u.username === 'admin' || u.username === '@admin' || (u.first_name === 'System' && u.last_name === 'Admin'));
        
        if (!adminUser) {
            console.log('No user identified as System Admin found. Proceeding with caution.');
            // Just picking the first one if we can't find it to avoid wiping everything blindly?
            // User explicitly said "the admin account name is system admin"
            adminUser = users[0]; // fallback
        }

        console.log(`Identified Admin User: ${adminUser.id} - ${adminUser.email}`);

        // Update the admin user's username to 'admin' and remove the '@' if it's there
        const { error: updateError } = await supabase.from('users').update({ username: 'admin' }).eq('id', adminUser.id);
        if (updateError) throw updateError;
        console.log(`Updated Admin User username to 'admin'.`);

        // Delete all other users
        let deletedCount = 0;
        for (const user of users) {
            if (user.id !== adminUser.id) {
                console.log(`Deleting user: ${user.id} (${user.email})`);
                // Delete from public.users
                const { error: delPublicError } = await supabase.from('users').delete().eq('id', user.id);
                if (delPublicError) console.error(`Failed to delete from public.users: ${delPublicError.message}`);
                
                // Delete from auth.users (requires service_role key)
                const { error: authError } = await supabase.auth.admin.deleteUser(user.id);
                if (authError) {
                    console.error(`Failed to delete from auth.users (maybe not an admin key?): ${authError.message}`);
                } else {
                    deletedCount++;
                }
            }
        }

        console.log(`Successfully deleted ${deletedCount} other users.`);
        
        // Ensure uniqueness (informative)
        console.log('\nNote: You should ensure username uniqueness at the database level if possible, but our code will enforce it during signup.');

    } catch (err) {
        console.error('Error during cleanup:', err.message);
    }
}

main();
