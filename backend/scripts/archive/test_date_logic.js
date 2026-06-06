const now = new Date();
const timeZone = 'Asia/Kolkata';

// Function from controller
const getStartOfYear = (date, timeZone) => {
    const dateStr = new Intl.DateTimeFormat('en-CA', { timeZone }).format(date); // YYYY-MM-DD
    const [y, m, d] = dateStr.split('-').map(Number);
    const localDate = new Date(Date.UTC(y, m - 1, d));
    const startOfYear = new Date(Date.UTC(y, 0, 1));
    return Math.floor((localDate - startOfYear) / (1000 * 60 * 60 * 24));
};

console.log('Now (Server):', now.toISOString());
console.log('Timezone:', timeZone);
const dayOfYear = getStartOfYear(now, timeZone);
console.log('Day of Year (Asia/Kolkata):', dayOfYear);

const dayOfYearUTC = getStartOfYear(now, 'UTC');
console.log('Day of Year (UTC):', dayOfYearUTC);

// Test boundary?
const yesterday = new Date();
yesterday.setHours(yesterday.getHours() - 24);
console.log('Yesterday Index:', getStartOfYear(yesterday, timeZone));
