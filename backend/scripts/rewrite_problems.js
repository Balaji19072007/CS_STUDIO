const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

async function rewriteDescriptionWithAI(title, oldDescription) {
    const prompt = `You are an expert curriculum designer for a coding platform like LeetCode or HackerRank.
I have a programming problem that currently has a boring, generic, academic description. 
I need you to rewrite it into a "real-life scenario" story problem.

Current Title: ${title}
Current Description: ${oldDescription}

Instructions:
1. Create a short, engaging 2-3 sentence story that frames the problem in a real-world context (e.g. logistics, game development, finance, data analysis).
2. Clearly state the input constraints and what the expected output represents in the context of the story.
3. Use markdown formatting.
4. Keep it concise.
5. DO NOT output anything other than the new description (no pleasantries, no conversational text).`;

    try {
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { temperature: 0.7 }
            })
        });

        if (response.status === 429) {
            console.error("Rate limit hit! Waiting 30 seconds...");
            await new Promise(r => setTimeout(r, 30000));
            return await rewriteDescriptionWithAI(title, oldDescription); // Retry
        }

        const data = await response.json();
        if (data.error) {
            console.error("Gemini API Error:", data.error.message || data.error);
            return null;
        }
        
        const newDescription = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        return newDescription;
    } catch (err) {
        console.error("Fetch Error:", err.message);
        return null;
    }
}

async function run() {
    const reportPath = path.join(__dirname, 'problem_audit_report.json');
    if (!fs.existsSync(reportPath)) {
        console.error("Audit report not found. Run audit_problems.js first.");
        return;
    }
    
    const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    
    // Combine IDs
    const toRewriteIds = new Set([
        ...report.too_short_descriptions.map(p => p.id),
        ...report.generic_descriptions.map(p => p.id)
    ]);
    
    const idsArray = Array.from(toRewriteIds);
    console.log(`Found ${idsArray.length} problems to rewrite. Starting batch process...`);
    
    let successCount = 0;
    
    // Process in smaller batches to avoid overwhelming the API
    // For demonstration, let's process the first 10, but the script can do all of them
    // If we want to do all, we just loop through idsArray
    
    for (let i = 0; i < idsArray.length; i++) {
        const id = idsArray[i];
        
        // Fetch problem
        const { data: problem, error } = await supabase
            .from('problems')
            .select('id, title, description')
            .eq('id', id)
            .single();
            
        if (error || !problem) {
            console.error(`Failed to fetch problem ${id}`);
            continue;
        }
        
        console.log(`[${i+1}/${idsArray.length}] Rewriting Problem ID ${id}: "${problem.title}"...`);
        
        const newDescription = await rewriteDescriptionWithAI(problem.title, problem.description);
        
        if (newDescription) {
            // Update Supabase
            const { error: updateError } = await supabase
                .from('problems')
                .update({ description: newDescription })
                .eq('id', id);
                
            if (updateError) {
                console.error(`  -> DB Update Failed: ${updateError.message}`);
            } else {
                console.log(`  -> Success!`);
                successCount++;
            }
        } else {
            console.log(`  -> Failed to generate new description.`);
        }
        
        // Sleep for 4.5 seconds to respect 15 requests per minute limit
        await new Promise(resolve => setTimeout(resolve, 4500));
    }
    
    console.log(`\nBatch process complete. Successfully rewritten ${successCount} out of ${idsArray.length} problems.`);
}

run();
