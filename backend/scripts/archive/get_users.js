const { supabase } = require('./config/supabase');

async function run() {
  const { data: users, error } = await supabase.from('users').select('*').limit(5);
  console.log('Users:', users);
}

run();
