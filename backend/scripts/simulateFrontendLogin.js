const axios = require('axios');

async function simulateFrontendLogin() {
    try {
        const response = await axios.post('http://127.0.0.1:5000/api/auth/session/login', {
            email: 'admin@csstudio.com',
            password: 'Admin123!',
            captchaToken: 'dummy_token'
        });
        console.log('Login Success:', response.data);
    } catch (error) {
        if (error.response) {
            console.error('Login Failed with status:', error.response.status);
            console.error('Response data:', error.response.data);
        } else {
            console.error('Login Request Error:', error.message);
        }
    }
}

simulateFrontendLogin();
