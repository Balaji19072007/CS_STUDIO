require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

(async () => {
  for (const tbl of ['courses', 'course_phases', 'course_topics', 'phases', 'topics', 'problems', 'progress', 'users', 'subscriptions', 'user_progress', 'user_course_progress']) {
    const { data, error, count } = await supabase
      .from(tbl)
      .select('*', { count: 'exact', head: true });
    if (error) {
      console.log(`${tbl}: ERROR ${error.message}`);
    } else {
      console.log(`${tbl}: ${count} rows`);
    }
  }
  process.exit(0);
})();
