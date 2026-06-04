require('dotenv').config({ path: '../.env' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function updateChallenge() {
    const topicId = 'c-p2-t1';

    // Delete existing challenge
    console.log(`Deleting existing challenge for ${topicId}...`);
    await supabase.from('course_challenges').delete().eq('topic_id', topicId);

    const challengeData = {
        course_id: 'c-programming',
        topic_id: topicId,
        topic_name: 'Variables and Data Types',
        title: 'Mastery Challenge',
        description: 'Write a C program that declares variables of different basic data types and displays their values.',
        input_format: 'No input required.',
        output_format: 'Age = 20\nHeight = 5.8\nSalary = 25000.50\nGrade = A',
        hints: 'Declare variables using int, float, double, and char, then display their values using the appropriate format specifiers.',
        reference_output: 'Age = 20\nHeight = 5.8\nSalary = 25000.50\nGrade = A',
        solution_code: `#include <stdio.h>\n\nint main()\n{\n    int age = 20;\n    float height = 5.8;\n    double salary = 25000.50;\n    char grade = 'A';\n\n    printf("Age = %d\\n", age);\n    printf("Height = %.1f\\n", height);\n    printf("Salary = %.2lf\\n", salary);\n    printf("Grade = %c\\n", grade);\n\n    return 0;\n}`
    };

    console.log(`Inserting new challenge for ${topicId}...`);
    const { data, error } = await supabase
        .from('course_challenges')
        .insert(challengeData)
        .select('*');

    if (error) {
        console.error('Error updating challenge:', error);
    } else {
        console.log('Successfully updated challenge:', JSON.stringify(data, null, 2));
    }
}

updateChallenge();
