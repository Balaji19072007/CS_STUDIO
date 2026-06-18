const { supabase } = require('../config/supabase');

async function resetAccountsAndCreateAdmin() {
    try {
        console.log('Fetching all users...');
        let allUsers = [];
        let page = 1;
        let hasNextPage = true;

        while (hasNextPage) {
            const { data: { users }, error } = await supabase.auth.admin.listUsers({
                page: page,
                perPage: 1000
            });

            if (error) {
                throw error;
            }

            if (users && users.length > 0) {
                allUsers = allUsers.concat(users);
                page++;
            } else {
                hasNextPage = false;
            }
        }

        console.log(`Found ${allUsers.length} users. Deleting...`);

        for (const user of allUsers) {
            console.log(`Deleting user: ${user.email} (${user.id})`);
            const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id);
            if (deleteError) {
                console.error(`Failed to delete user ${user.id}:`, deleteError);
            }
            // Optional: Also explicitly delete from public.users if cascade doesn't cover it
            await supabase.from('users').delete().eq('id', user.id);
        }

        console.log('All previous users deleted.');

        console.log('Creating admin user...');
        const adminEmail = 'admin@csstudio.com';
        const adminPassword = 'Admin123!';

        const { data: adminData, error: createError } = await supabase.auth.admin.createUser({
            email: adminEmail,
            password: adminPassword,
            email_confirm: true,
            user_metadata: {
                first_name: 'System',
                last_name: 'Admin',
                username: 'admin'
            }
        });

        if (createError) {
            throw createError;
        }

        const adminId = adminData.user.id;
        console.log(`Admin user created with ID: ${adminId}`);

        // Update role in public.users
        console.log('Setting admin role in public.users table...');
        
        // Wait a few seconds to let Supabase trigger create the row in public.users if there is a trigger
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const { error: updateError } = await supabase
            .from('users')
            .update({ 
                role: 'admin',
                first_name: 'System',
                last_name: 'Admin',
                username: 'admin'
            })
            .eq('id', adminId);

        if (updateError) {
            // It's possible the trigger doesn't exist, try to insert
            console.warn('Update failed, attempting insert into public.users...', updateError.message);
            const { error: insertError } = await supabase.from('users').insert([{
                id: adminId,
                email: adminEmail,
                role: 'admin',
                first_name: 'System',
                last_name: 'Admin',
                username: 'admin',
                total_points: 0,
                problems_solved: 0,
                current_streak: 0
            }]);
            
            if (insertError) {
                throw insertError;
            }
            console.log('Successfully inserted admin into public.users');
        } else {
            console.log('Successfully updated admin role in public.users');
        }

        console.log('✅ Admin setup complete.');
        console.log('--------------------------------------------------');
        console.log(`Admin Email: ${adminEmail}`);
        console.log(`Admin Password: ${adminPassword}`);
        console.log('--------------------------------------------------');

    } catch (error) {
        console.error('❌ Error during setup:', error);
    }
}

resetAccountsAndCreateAdmin();
