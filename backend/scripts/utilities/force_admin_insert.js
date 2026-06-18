const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: 'c:/files/projects/CS studio/backend/.env' });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function fixAdmin() {
    console.log("Fetching admin from auth.users...");
    
    // Get the user from auth.users
    const { data: { users }, error: fetchError } = await supabase.auth.admin.listUsers({ page: 1, perPage: 100 });
    const adminUser = users.find(u => u.email === 'admin@csstudio.com');
    
    if (!adminUser) {
        console.log("Admin user not found in auth.users!");
        return;
    }
    
    console.log(`Found admin in auth.users with ID: ${adminUser.id}`);
    
    // Force insert into public.users
    console.log("Upserting into public.users...");
    const { error: upsertError } = await supabase.from('users').upsert({
        id: adminUser.id,
        email: adminUser.email,
        role: 'admin',
        first_name: 'System',
        last_name: 'Admin',
        username: 'admin',
        total_points: 0,
        problems_solved: 0,
        current_streak: 0
    });
    
    if (upsertError) {
        console.error("Upsert failed:", upsertError);
    } else {
        console.log("✅ Successfully inserted/updated admin in public.users");
    }
    
    const { data: verifyData } = await supabase.from('users').select('*').eq('id', adminUser.id);
    console.log("Verification check in public.users:", verifyData);
}

fixAdmin();
