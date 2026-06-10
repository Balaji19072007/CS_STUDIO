require('dotenv').config();
const { supabase } = require('../config/supabase');

async function testSignup() {
  console.log('Testing Supabase Signup...');
  const start = Date.now();
  
  const { data, error } = await supabase.auth.signUp({
    email: 'test_timeout_1234@example.com',
    password: 'password123',
    options: {
      data: { first_name: 'Test', last_name: 'User', username: 'testuser1234' }
    }
  });

  const duration = Date.now() - start;
  console.log(`Signup took ${duration}ms`);
  
  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log('Success:', data.user?.id);
  }
}

testSignup();
