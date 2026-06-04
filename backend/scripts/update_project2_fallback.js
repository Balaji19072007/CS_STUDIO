const fs = require('fs');

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

Mastering this project helps students understand the foundation of most business applications used in industry today.
`;

let content = fs.readFileSync('data/cProgrammingChallengeFallbacks.js', 'utf8');

// Replace in three places where c-p18-t6 exists:

const fallbackChallenge = `{
        id: 189116,
        title: "Project: Student Management System",
        description: \`${description.replace(/`/g, '\\`')}\`,
        reference_output: "",
        test_input: "None",
        test_args: [],
        starter_code: "",
        solution_code: "",
        hints: "[]",
        topic_id: 'c-p18-t6',
        course_id: 'c-programming'
      }`;

// Pattern 1: case 'c-p18-t6'
content = content.replace(/case\s+'c-p18-t6':\s+return\s+\{[\s\S]*?course_id:\s*'c-programming'\s*\};/, "case 'c-p18-t6':\n      return " + fallbackChallenge + ";");

// Pattern 2: case "Student DB" -> case "Project: Student Management System"
content = content.replace(/case\s+"Student DB":\s+return\s+\{[\s\S]*?course_id:\s*'c-programming'\s*\};/, "case \"Project: Student Management System\":\n      return " + fallbackChallenge + ";");

// Pattern 3: The array of fallbackChallenges where id: 189116 is present
content = content.replace(/\{\s*id:\s*189116[\s\S]*?course_id:\s*'c-programming'\s*\}/, fallbackChallenge);

fs.writeFileSync('data/cProgrammingChallengeFallbacks.js', content);
console.log("Updated cProgrammingChallengeFallbacks.js with Project 2");
