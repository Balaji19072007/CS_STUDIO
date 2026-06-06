const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: 'c:/files/projects/CS studio/backend/.env' });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkAdmin() {
  const { data, error } = await supabase.from('users').select('id, email, role').eq('email', 'admin@csstudio.com');
  console.log('Admin user:', data);
  if (error) console.error('Error:', error);
}

checkAdmin();
