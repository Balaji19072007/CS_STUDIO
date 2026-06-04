const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

const projectChallenge = {
    id: 18005,
    topic_id: 'c-p18-t5',
    title: 'Project 1: Calculator',
    description: `A Calculator is one of the most common applications used daily. It performs mathematical operations such as addition, subtraction, multiplication, and division.

In this project, students will create a command-line calculator using C programming. This project helps beginners understand how user input, conditional statements, and arithmetic operations work together.

**Real World Usage**

Calculators are used in Mobile Phones, Computers, Banking Software, Billing Systems, Scientific Calculators, and Engineering Applications. Every advanced calculator starts with the same basic logic you will learn in this project.

**Features**

*   **Addition**: Adds two numbers (e.g., 10 + 20 = 30)
*   **Subtraction**: Subtracts one number from another (e.g., 20 - 10 = 10)
*   **Multiplication**: (e.g., 5 × 4 = 20)
*   **Division**: (e.g., 20 ÷ 5 = 4)

---

**How the Project Works**

1.  User enters first number. (e.g., \`10\`)
2.  User enters second number. (e.g., \`5\`)
3.  User selects operation: \`1.Add\`, \`2.Subtract\`, \`3.Multiply\`, \`4.Divide\`
4.  Program performs selected operation.
5.  Result is displayed.

**Problem Statement**

Create a Calculator program that performs Addition, Subtraction, Multiplication, and Division. The user enters two numbers and selects an operation.

**Note:** For division, if the second number is 0, print \`Cannot divide by zero\`. Otherwise, print the result in the format \`Result = X.XX\` (2 decimal places).
`,
    difficulty: 'Medium',
    language: 'C',
    starter_code: `#include <stdio.h>

int main()
{
    float a,b;
    int choice;

    scanf("%f",&a);
    scanf("%f",&b);
    scanf("%d",&choice);

    // Write your logic here

    return 0;
}`,
    solution_code: `#include <stdio.h>

int main()
{
    float a,b;
    int choice;

    printf("Enter First Number: ");
    scanf("%f",&a);

    printf("Enter Second Number: ");
    scanf("%f",&b);

    printf("\\n1.Add");
    printf("\\n2.Subtract");
    printf("\\n3.Multiply");
    printf("\\n4.Divide");

    printf("\\nChoice: ");
    scanf("%d",&choice);

    switch(choice)
    {
        case 1:
            printf("Result = %.2f",a+b);
            break;

        case 2:
            printf("Result = %.2f",a-b);
            break;

        case 3:
            printf("Result = %.2f",a*b);
            break;

        case 4:
            if(b!=0)
                printf("Result = %.2f",a/b);
            else
                printf("Cannot divide by zero");
            break;

        default:
            printf("Invalid Choice");
    }

    return 0;
}`,
    test_input: "10\n5\n1\n",
    reference_output: "Result = 15.00",
    hints: JSON.stringify([
        "Take two numbers from the user.",
        "Display operation choices.",
        "Use switch-case to determine the operation."
    ])
};

async function insertProject() {
    console.log("Upserting Project 1: Calculator...");
    
    // Make sure topic exists in course_topics first
    const { error: topicError } = await supabase.from('course_topics').upsert({
        id: 'c-p18-t5',
        phase_id: 'c-p18',
        title: 'Project 1: Calculator',
        order_index: 5
    });
    
    if (topicError) {
        console.error("Error upserting topic:", topicError);
    }
    
    // Insert challenge
    const { error } = await supabase
        .from('course_challenges')
        .upsert(projectChallenge);
        
    if (error) {
        console.error("Error inserting project challenge:", error);
    } else {
        console.log("Successfully inserted Project 1: Calculator!");
    }
}

insertProject();
