const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const mockStreakLogic = (lastUpdateIso, timezone, mockNowIso) => {
    const now = mockNowIso ? new Date(mockNowIso) : new Date();

    const getDateInTimezone = (date, timeZone) => {
        return new Intl.DateTimeFormat('en-CA', { // YYYY-MM-DD format
            timeZone: timeZone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(date);
    };

    const todayStr = getDateInTimezone(now, timezone);

    let lastStr = null;
    if (lastUpdateIso) {
        const lastUpdateDate = new Date(lastUpdateIso);
        lastStr = getDateInTimezone(lastUpdateDate, timezone);
    }

    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = getDateInTimezone(yesterday, timezone);

    console.log(`\n--- Testing Timezone: ${timezone} ---`);
    console.log(`Mock Now (UTC): ${now.toISOString()}`);
    console.log(`Last Update (UTC): ${lastUpdateIso}`);
    console.log(`Today in ${timezone}: ${todayStr}`);
    console.log(`Last  in ${timezone}: ${lastStr}`);
    console.log(`Yest  in ${timezone}: ${yesterdayStr}`);

    if (lastStr === todayStr) {
        console.log('Result: STREAK ALREADY UPDATED TODAY');
        return 'same_day';
    } else if (lastStr === yesterdayStr) {
        console.log('Result: STREAK CONTINUES (Increment)');
        return 'increment';
    } else {
        console.log('Result: STREAK BROKEN (Reset)');
        return 'reset';
    }
};

// TEST CASES

// 1. Same Day (UTC)
// Now: 2023-10-27T12:00:00Z, Last: 2023-10-27T08:00:00Z, TZ: UTC
mockStreakLogic('2023-10-27T08:00:00Z', 'UTC', '2023-10-27T12:00:00Z');

// 2. Consecutive Day (UTC)
// Now: 2023-10-28T12:00:00Z, Last: 2023-10-27T12:00:00Z, TZ: UTC
mockStreakLogic('2023-10-27T12:00:00Z', 'UTC', '2023-10-28T12:00:00Z');

// 3. Timezone Boundary Case (Asia/Tokyo +9)
// "Yesterday" in Tokyo was 27th. "Today" is 28th.
// User solved at 11 PM on 27th Tokyo time (27th 14:00 UTC)
// User solves at 1 AM on 28th Tokyo time (27th 16:00 UTC) -> Still same UTC day, but new Tokyo day!
// Expected: INCREMENT
mockStreakLogic('2023-10-27T14:00:00Z', 'Asia/Tokyo', '2023-10-27T16:00:00Z');

// 4. Timezone Boundary Case (America/New_York -4)
// "Yesterday" in NY was 27th. "Today" is 28th.
// User solved at 11 PM on 27th NY time (28th 03:00 UTC)
// User solves at 1 AM on 28th NY time (28th 05:00 UTC)
// Expected: INCREMENT
mockStreakLogic('2023-10-28T03:00:00Z', 'America/New_York', '2023-10-28T05:00:00Z');

// 5. Missed a day
mockStreakLogic('2023-10-25T12:00:00Z', 'UTC', '2023-10-27T12:00:00Z');
