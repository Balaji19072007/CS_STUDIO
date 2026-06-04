const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Initialize Supabase client
const supabaseUrl = 'https://hubvhqfxlzwkrvpulkqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnZocWZ4bHp3a3J2cHVsa3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk1NzkxNCwiZXhwIjoyMDg1NTMzOTE0fQ.xDkBbV6dOmu0KGvNTIHxYRHD8IiYCq4brIJ5O4EHAzc'; // Make sure to provide a valid SERVICE ROLE KEY
const supabase = createClient(supabaseUrl, supabaseKey);

const description = `The Student Management System is a menu-driven application used to manage student records efficiently. It allows users to add, view, search, update, and delete student information.

This project simulates how educational institutions manage student data and introduces students to real-world data management concepts.

---

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
* Marks

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

---

**Internal Working**

A structure is used to store student details.

\`\`\`c
struct Student
{
    int roll;
    char name[50];
    float marks;
};
\`\`\`

Multiple records are stored using:

\`\`\`c
struct Student students[100];
\`\`\`

Each operation scans this array and performs the requested action.

---

**Program Flow**

Start
↓
Display Menu
↓
Choose Operation
↓
Add / Search / Update / Delete / Display
↓
Show Result
↓
Return to Menu
↓
Exit

---

**Concepts Used**

* Structures
* Arrays
* Loops
* Functions
* Searching
* Updating Records
* Record Deletion Logic
* Menu Driven Programming

---

**Learning Outcomes**

After completing this project students will be able to:
* Store structured data
* Manage multiple records
* Implement searching algorithms
* Modify existing data
* Delete records safely
* Build menu-driven applications

---

**Real World Applications**

* School Management Systems
* College Portals
* University Databases
* Attendance Systems
* Examination Systems
* Employee Management Systems
* Hospital Record Systems

---

**Future Enhancements**

Students can upgrade this project by adding:
* File Handling
* Login Authentication
* Database Connectivity
* Attendance Tracking
* Grade Calculation
* Result Generation
* GUI Interface
* Web-Based Dashboard

---

**Industry Connection**

Almost every modern software application follows CRUD operations:

Create → Add Student
Read → Display Student
Update → Modify Student
Delete → Remove Student

Mastering this project helps students understand the foundation of most business applications used in industry today.`;

const projectChallenge = {
    id: 189116,
    topic_id: 'c-p18-t6',
    course_id: 'c-programming',
    title: 'Project: Student Management System',
    description: description,
    difficulty: 'Hard',
    language: 'C',
    hints: JSON.stringify([
        "Create a structure to store student information.\\n\\nstruct Student\\n{\\n    int roll;\\n    char name[50];\\n    float marks;\\n};",
        "Store multiple students using an array.\\n\\nstruct Student s[100];",
        "Use a menu-driven approach with a loop.\\n\\nwhile(1)\\n{\\n    // Menu\\n}",
        "Search students using Roll Number.\\n\\nfor(i=0;i<count;i++)\\n{\\n    if(s[i].roll==searchRoll)\\n    {\\n        // Found\\n    }\\n}",
        "For deletion, shift all records one position left.\\n\\nfor(i=index;i<count-1;i++)\\n{\\n    s[i]=s[i+1];\\n}"
    ])
};

async function insertProject() {
    console.log("Upserting Project: Student Management System...");
    
    // First upsert the topic
    const { error: topicError } = await supabase.from('topics').upsert({
        id: 'c-p18-t6',
        phase_id: 'c-phase-18', // Corrected phase ID based on db result!
        title: 'Project: Student Management System',
        order_index: 6
    });
    
    if (topicError) {
        console.error("Error upserting topic:", topicError);
    }
    
    // Now upsert the challenge
    const { error } = await supabase
        .from('course_challenges')
        .upsert({
            id: projectChallenge.id,
            topic_id: projectChallenge.topic_id,
            course_id: projectChallenge.course_id,
            title: projectChallenge.title,
            description: projectChallenge.description,
            difficulty: projectChallenge.difficulty,
            language: projectChallenge.language,
            hints: projectChallenge.hints,
        });
        
    if (error) {
        console.error("Error inserting project challenge:", error);
    } else {
        console.log("Successfully inserted Project: Student Management System!");
    }
}

insertProject();
