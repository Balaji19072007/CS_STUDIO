const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

const challengeData = {
    title: 'Check Positive Number',
    description: 'Write a C program to read a number from the user and check whether it is positive using an if statement.',
    solution_code: '#include <stdio.h>\n\nint main() {\n    int num;\n\n    printf("Enter a number: ");\n    scanf("%d", &num);\n\n    if (num > 0) {\n        printf("The number is positive.\\n");\n    }\n\n    return 0;\n}',
    output_format: 'The number is positive.',
    reference_output: 'Enter a number: The number is positive.',
    hints: JSON.stringify(['Accept a number using scanf()', 'Use an if statement to check if it is greater than zero.', 'Use printf to output the exact message.']),
    difficulty: 'Easy'
};

async function updateChallenge() {
    console.log('Updating Phase 5 Topic 1 DB Challenge...');
    
    const { error: updateError } = await supabase
        .from('course_challenges')
        .update(challengeData)
        .eq('topic_id', 'c-p5-t1');
        
    if (updateError) {
        console.error('Error updating challenge:', updateError);
    } else {
        console.log('Challenge updated successfully in the database.');
    }
}

updateChallenge();
