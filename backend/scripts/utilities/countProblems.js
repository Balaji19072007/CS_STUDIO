const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../util/problemData.json');

try {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    const counts = {};
    data.forEach(p => {
        counts[p.language] = (counts[p.language] || 0) + 1;
    });
    console.log('Total Problems:', data.length);
    console.log('Counts per language:', counts);
} catch (err) {
    console.error(err);
}
