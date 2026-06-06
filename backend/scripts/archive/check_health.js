const http = require('http');

const req = http.get('http://localhost:5000/api/health', (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        console.log('Health Check Response:', data);
    });
});

req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});
