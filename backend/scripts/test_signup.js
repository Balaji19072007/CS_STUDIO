const axios = require('axios');
async function run() {
    try {
        const res = await axios.post('https://cs-studio.onrender.com/api/auth/session/signup', {
            email: 'test_server_error_123@example.com',
            password: 'password123',
            firstName: 'Test',
            lastName: 'User',
            username: 'testuser_error_123'
        });
        console.log(res.data);
    } catch (e) {
        if (e.response) {
            console.log(e.response.status, e.response.data);
        } else {
            console.log(e.message);
        }
    }
}
run();
