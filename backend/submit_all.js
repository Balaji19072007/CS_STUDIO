require('dotenv').config();
const { supabase } = require('./config/supabase');
const problemController = require('./controllers/problemController');
const problemData = require('./util/problemData.json');

async function runAllProblems() {
    console.log("Starting bulk submission of all problems for admin user...");
    const adminUserId = '2e187533-2dc8-46d0-8c13-af57eb9a7a50';
    
    // We run them in batches of 10
    const BATCH_SIZE = 10;
    
    for (let i = 0; i < problemData.length; i += BATCH_SIZE) {
        const batch = problemData.slice(i, i + BATCH_SIZE);
        console.log(`Processing batch ${i/BATCH_SIZE + 1} / ${Math.ceil(problemData.length / BATCH_SIZE)}`);
        
        const promises = batch.map(async (problem) => {
            return new Promise(async (resolve) => {
                let codeToSubmit = problem.solution?.code || '';
                
                // Construct mock req and res
                const req = {
                    user: { id: adminUserId },
                    params: { id: problem.id },
                    body: {
                        code: codeToSubmit,
                        language: problem.language.toLowerCase(),
                        timeSpent: 10,
                        timezone: 'UTC'
                    }
                };
                
                const res = {
                    status: function(code) {
                        this.statusCode = code;
                        return this;
                    },
                    json: function(data) {
                        if(data.success && data.isSolved) {
                            // Perfect
                            console.log(`[PASS] Problem ${problem.id}`);
                        } else {
                            console.log(`[FAIL] Problem ${problem.id} - ${data.message || data.msg}`, data.failureDetails || '');
                        }
                        resolve(data);
                    }
                };
                
                try {
                    await problemController.submitProblem(req, res);
                } catch(err) {
                    console.error(`[ERROR] Problem ${problem.id}:`, err);
                    resolve(null);
                }
            });
        });
        
        await Promise.all(promises);
    }
    
    console.log("All problems processed!");
}

runAllProblems();
