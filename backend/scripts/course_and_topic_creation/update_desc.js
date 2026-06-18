const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

async function updateDesc() {
    const newDescription = `A Calculator is one of the most common applications used daily. It performs mathematical operations such as addition, subtraction, multiplication, and division.

In this project, you will create a command-line calculator using C programming. This project helps beginners understand how user input, conditional statements, and arithmetic operations work together.

### Features
**Addition**: Adds two numbers (e.g., 10 + 20 = 30)  
**Subtraction**: Subtracts one number from another (e.g., 20 - 10 = 10)  
**Multiplication**: (e.g., 5 × 4 = 20)  
**Division**: (e.g., 20 ÷ 5 = 4)

### How the Project Works
1. User enters first number.
2. User enters second number.
3. User selects operation: \`1.Add, 2.Subtract, 3.Multiply, 4.Divide\`
4. Program performs selected operation and prints Result.

**Note**: For division, if the second number is 0, print \`Cannot divide by zero\`. Otherwise, print the result in the format \`Result = X.XX\` (2 decimal places).`;

    const { error } = await supabase
        .from('course_challenges')
        .update({ description: newDescription })
        .eq('id', 18005);
    console.log("Done", error);
}

updateDesc();
