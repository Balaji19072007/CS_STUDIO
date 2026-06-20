const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
const env = fs.readFileSync(envPath, 'utf-8').split('\n').reduce((acc, line) => {
    const parts = line.split('=');
    if (parts.length >= 2) {
        const key = parts[0].trim();
        const val = parts.slice(1).join('=').trim();
        if (key && !key.startsWith('#')) acc[key] = val;
    }
    return acc;
}, {});

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
    try {
        console.log("Searching for admin user...");
        let { data: users } = await supabase.from('users').select('*').ilike('username', 'admin').limit(1);
        
        if (!users || users.length === 0) {
            console.log("No username='admin' found. Searching by email...");
            const { data: usersByEmail } = await supabase.from('users').select('*').ilike('email', 'admin%').limit(1);
            if (!usersByEmail || usersByEmail.length === 0) {
                return console.log("Admin user not found.");
            }
            users = usersByEmail;
        }

        const adminId = users[0].id;
        console.log("Admin ID:", adminId);

        console.log("Marking problem 26 as solved...");
        const { error: progErr } = await supabase.from('progress').upsert({
            user_id: adminId,
            problem_id: 26,
            status: 'solved',
            best_accuracy: 100,
            time_spent: 120,
            last_submission: new Date().toISOString(),
            solved_at: new Date().toISOString()
        }, { onConflict: 'user_id, problem_id' });

        if (progErr) {
            return console.error("Error updating progress:", progErr);
        }
        console.log("Progress updated successfully!");

        console.log("Updating user stats...");
        const { data: allUserProgress } = await supabase.from('progress')
            .select('best_accuracy, status')
            .eq('user_id', adminId)
            .lt('problem_id', 1001);
            
        if (allUserProgress && allUserProgress.length > 0) {
            let solvedCount = 0;
            let totalPts = 0;
            const sumAcc = allUserProgress.reduce((sum, p) => {
                if (p.status === 'solved') {
                    solvedCount++;
                    totalPts += (p.best_accuracy >= 100) ? 100 : Math.round((p.best_accuracy || 0) * 10);
                }
                return sum + (p.best_accuracy || 0);
            }, 0);
            const avgAcc = sumAcc / allUserProgress.length;
            
            await supabase.from('users').update({ 
                average_accuracy: avgAcc,
                problems_solved: solvedCount,
                total_points: totalPts
            }).eq('id', adminId);
            console.log("User stats updated successfully!");
        }
    } catch (err) {
        console.error("Script error:", err);
    }
}

run();
