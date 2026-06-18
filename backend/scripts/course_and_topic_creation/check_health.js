const axios = require('axios');
async function run() {
    try {
        const res = await axios.get('https://cs-studio.onrender.com/api/health');
        console.log(res.data);
    } catch(e) {
        console.log(e.message);
    }
}
run();
