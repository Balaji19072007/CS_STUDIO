require('dotenv').config({ path: 'c:/files/projects/CS studio/backend/.env' });
const { supabase } = require('./config/supabase');

async function check() {
  const { data, error } = await supabase.from('users').select('id, username, role, problems_solved, total_points').eq('role', 'admin');
  console.log('Admin users:', data);
  if (error) console.error(error);
}
check();
