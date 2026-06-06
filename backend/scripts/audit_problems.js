const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function auditProblems() {
    console.log("Fetching all problems from database...");
    
    let allProblems = [];
    let page = 0;
    const pageSize = 1000;
    let hasMore = true;
    
    while(hasMore) {
        const { data, error } = await supabase
            .from('problems')
            .select('id, title, description, test_cases, difficulty')
            .range(page * pageSize, (page + 1) * pageSize - 1);
            
        if (error) {
            console.error("Error fetching problems:", error);
            return;
        }
        
        if (data.length > 0) {
            allProblems = allProblems.concat(data);
            page++;
        } else {
            hasMore = false;
        }
    }
    
    console.log(`Successfully fetched ${allProblems.length} problems.\n`);
    
    const report = {
        total_problems: allProblems.length,
        missing_tests: [],
        malformed_tests: [],
        generic_descriptions: [],
        too_short_descriptions: [],
    };
    
    // Generic phrases that indicate a non-real-life example
    const genericPhrases = [
        "write a c program",
        "write a program",
        "takes two positive integers",
        "performs a linear search",
        "demonstrate the use of",
        "calculate the sum",
        "print the array",
    ];

    allProblems.forEach(p => {
        // 1. Check Test Cases
        if (!p.test_cases || !Array.isArray(p.test_cases) || p.test_cases.length === 0) {
            report.missing_tests.push({ id: p.id, title: p.title });
        } else {
            let isMalformed = false;
            p.test_cases.forEach(tc => {
                if (tc.input === undefined || tc.expected === undefined) {
                    isMalformed = true;
                }
            });
            if (isMalformed) {
                report.malformed_tests.push({ id: p.id, title: p.title });
            }
        }
        
        // 2. Check Description Quality
        if (!p.description || p.description.trim().length < 80) {
            report.too_short_descriptions.push({ id: p.id, title: p.title });
        } else {
            const descLower = p.description.toLowerCase();
            const isGeneric = genericPhrases.some(phrase => descLower.includes(phrase));
            if (isGeneric) {
                report.generic_descriptions.push({ id: p.id, title: p.title });
            }
        }
    });

    console.log("--- Audit Report ---");
    console.log(`Total Problems: ${report.total_problems}`);
    console.log(`Missing Tests: ${report.missing_tests.length}`);
    console.log(`Malformed Tests: ${report.malformed_tests.length}`);
    console.log(`Too Short Descriptions: ${report.too_short_descriptions.length}`);
    console.log(`Generic Descriptions (needs LeetCode-style rewrite): ${report.generic_descriptions.length}`);
    
    const reportPath = path.join(__dirname, 'problem_audit_report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log(`\nDetailed report saved to: ${reportPath}`);
}

auditProblems();
