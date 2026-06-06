async function testSignup() {
  try {
    const res = await fetch('http://localhost:5000/api/auth/session/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test_user_' + Date.now() + '@csstudio.com',
        password: 'TestPassword123!',
        firstName: 'Test',
        lastName: 'User',
      })
    });
    const data = await res.json();
    console.log('Signup Status:', res.status, data);
  } catch (err) {
    console.error('Signup Error:', err);
  }
}

async function testLogin() {
    try {
        const res = await fetch('http://localhost:5000/api/auth/session/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: 'admin@csstudio.com',
            password: 'Admin123!',
          })
        });
        const data = await res.json();
        console.log('Login Status:', res.status, data);
      } catch (err) {
        console.error('Login Error:', err);
      }
}

testSignup();
testLogin();
