const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc';
const supabase = createClient(supabaseUrl, supabaseKey);

const project1_desc = `A Calculator is one of the most common applications used daily. It performs mathematical operations such as addition, subtraction, multiplication, and division.

In this project, students will create a command-line calculator using C programming. This project helps beginners understand how user input, conditional statements, and arithmetic operations work together.

---

**Real World Usage**

Calculators are used in Mobile Phones, Computers, Banking Software, Billing Systems, Scientific Calculators, and Engineering Applications. Every advanced calculator starts with the same basic logic you will learn in this project.

---

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

<!-- SPLIT -->

**Problem Statement**

Create a Calculator program that performs Addition, Subtraction, Multiplication, and Division. The user enters two numbers and selects an operation.

**Note:** For division, if the second number is 0, print \`Cannot divide by zero\`. Otherwise, print the result in the format \`Result = X.XX\` (2 decimal places).`;

const project2_desc = `The Student Management System is a menu-driven application used to manage student records efficiently. It allows users to add, view, search, update, and delete student information.

This project simulates how educational institutions manage student data and introduces students to real-world data management concepts.

---

**Features**

**Add Student**

Allows users to enter and store new student records.

Example:

Roll No: 101

Name: Balu

Marks: 95

The record is saved successfully.

**Display Students**

Displays all stored student records in a tabular format.

Example:

Roll No    Name      Marks

101        Balu      95

102        Ram       89

**Search Student**

Users can search for a student using the roll number.

Example:

Enter Roll Number: 101

Record Found

Roll No: 101

Name: Balu

Marks: 95

**Update Student**

Allows modification of existing student details.

Example:

Search Roll Number: 101

Enter New Name: Balu Kumar

Enter New Marks: 98

Record Updated Successfully

**Delete Student**

Removes a student record permanently.

Example:

Enter Roll Number: 101

Student Deleted Successfully

---

**How the Project Works**

**Step 1**

Program starts and creates an array of student structures.

**Step 2**

Menu is displayed.

1. Add Student
2. Display Students
3. Search Student
4. Update Student
5. Delete Student
6. Exit

**Step 3**

User selects an operation.

**Step 4**

Program processes the request.

**Step 5**

Updated records are displayed.

<!-- SPLIT -->

**Problem Statement**

Develop a Student Management System using C programming that performs the following operations:

1. Add Student
2. Display All Students
3. Search Student
4. Update Student Information
5. Delete Student Record
6. Exit Program

Each student record should contain:

* Roll Number
* Name
* Marks`;

const project3_desc = `The Mini Text Editor is a command-line application that allows users to create, read, append, and delete text files. This project introduces file handling in C, a critical skill for interacting with the file system.

---

**Features**

**Create and Write**

Allows users to create a file and write text to it.

**Read File**

Reads and displays the contents of a file.

**Append File**

Adds new text to the end of an existing file.

**Delete File**

Removes a file from the system.

---

**How the Project Works**

**Step 1**
Menu is displayed.

**Step 2**
User selects an operation.

**Step 3**
Program requests the filename and performs the action.

---

**Learning Outcomes**

* Master file handling (\`fopen\`, \`fprintf\`, \`fgets\`, \`fclose\`)
* Understand file pointers
* Manage system files programmatically

<!-- SPLIT -->

**Problem Statement**

Develop a Mini Text Editor using C programming that performs the following operations:

1. Create a New File and Write
2. Read an Existing File
3. Append Text to a File
4. Delete a File
5. Exit`;

async function updateProjectsSplit() {
    console.log("Updating descriptions...");

    const { error: e1 } = await supabase.from('course_challenges').update({ description: project1_desc }).eq('topic_id', 'c-p18-t5');
    if (e1) console.error("Error p1:", e1);

    const { error: e2 } = await supabase.from('course_challenges').update({ description: project2_desc }).eq('topic_id', 'c-p18-t6');
    if (e2) console.error("Error p2:", e2);

    const { error: e3 } = await supabase.from('course_challenges').update({ description: project3_desc }).eq('topic_id', 'c-p18-t7');
    if (e3) console.error("Error p3:", e3);

    console.log("Successfully updated split descriptions!");
}

updateProjectsSplit();
