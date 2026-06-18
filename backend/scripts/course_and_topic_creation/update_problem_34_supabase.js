const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load env
dotenv.config({ path: path.join(__dirname, '../.env') });

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials (SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY)');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const updateProblem34 = async () => {
    try {
        // Read JSON
        const jsonPath = path.join(__dirname, '../util/problemData.json');
        const rawData = fs.readFileSync(jsonPath, 'utf8');
        const problems = JSON.parse(rawData);

        const problem34 = problems.find(p => p.id === 34);
        if (!problem34) {
            console.error('Problem 34 not found in JSON');
            return;
        }

        console.log('Found Problem 34 in JSON. Updating Supabase...');
        console.log('New Test Cases:', JSON.stringify(problem34.testCases, null, 2));

        const { data, error } = await supabase
            .from('problems')
            .update({
                test_cases: problem34.testCases
            })
            .eq('id', 34)
            .select();

        if (error) {
            console.error('Supabase Update Error:', error);
        } else {
            console.log('✅ Supabase updated successfully:', data);
        }

    } catch (err) {
        console.error('Script Error:', err);
    }
};

updateProblem34();
