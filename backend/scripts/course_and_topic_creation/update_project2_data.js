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

Mastering this project helps students understand the foundation of most business applications used in industry today.`;

const solution_code = `#include <stdio.h>
#include <string.h>

struct Student
{
    int roll;
    char name[50];
    float marks;
};

int main()
{
    struct Student s[100];

    int count = 0;
    int choice;
    int i;
    int roll;
    int found;

    while(1)
    {
        printf("\\n\\n===== STUDENT MANAGEMENT SYSTEM =====");
        printf("\\n1. Add Student");
        printf("\\n2. Display Students");
        printf("\\n3. Search Student");
        printf("\\n4. Update Student");
        printf("\\n5. Delete Student");
        printf("\\n6. Exit");

        printf("\\n\\nEnter Choice: ");
        scanf("%d",&choice);

        switch(choice)
        {
            case 1:

                printf("\\nEnter Roll Number: ");
                scanf("%d",&s[count].roll);

                printf("Enter Name: ");
                scanf("%s",s[count].name);

                printf("Enter Marks: ");
                scanf("%f",&s[count].marks);

                count++;

                printf("\\nStudent Added Successfully!");
                break;

            case 2:

                if(count==0)
                {
                    printf("\\nNo Records Found!");
                    break;
                }

                printf("\\n\\nRoll No\\tName\\tMarks");

                for(i=0;i<count;i++)
                {
                    printf("\\n%d\\t%s\\t%.2f",
                           s[i].roll,
                           s[i].name,
                           s[i].marks);
                }

                break;

            case 3:

                printf("\\nEnter Roll Number to Search: ");
                scanf("%d",&roll);

                found = 0;

                for(i=0;i<count;i++)
                {
                    if(s[i].roll==roll)
                    {
                        printf("\\nRecord Found");
                        printf("\\nRoll No : %d",s[i].roll);
                        printf("\\nName    : %s",s[i].name);
                        printf("\\nMarks   : %.2f",s[i].marks);

                        found = 1;
                        break;
                    }
                }

                if(found==0)
                {
                    printf("\\nStudent Not Found!");
                }

                break;

            case 4:

                printf("\\nEnter Roll Number to Update: ");
                scanf("%d",&roll);

                found = 0;

                for(i=0;i<count;i++)
                {
                    if(s[i].roll==roll)
                    {
                        printf("Enter New Name: ");
                        scanf("%s",s[i].name);

                        printf("Enter New Marks: ");
                        scanf("%f",&s[i].marks);

                        printf("\\nRecord Updated Successfully!");

                        found = 1;
                        break;
                    }
                }

                if(found==0)
                {
                    printf("\\nStudent Not Found!");
                }

                break;

            case 5:

                printf("\\nEnter Roll Number to Delete: ");
                scanf("%d",&roll);

                found = 0;

                for(i=0;i<count;i++)
                {
                    if(s[i].roll==roll)
                    {
                        int j;

                        for(j=i;j<count-1;j++)
                        {
                            s[j]=s[j+1];
                        }

                        count--;

                        printf("\\nStudent Deleted Successfully!");

                        found = 1;
                        break;
                    }
                }

                if(found==0)
                {
                    printf("\\nStudent Not Found!");
                }

                break;

            case 6:

                printf("\\nThank You!");
                return 0;

            default:

                printf("\\nInvalid Choice!");
        }
    }

    return 0;
}`;

const starter_code = `#include <stdio.h>
#include <string.h>

struct Student
{
    int roll;
    char name[50];
    float marks;
};

int main()
{
    // Initialize variables
    // Build menu loop
    
    return 0;
}`;

const hintsArr = [
    "Create a structure to store student information.\\n\\nstruct Student\\n{\\n    int roll;\\n    char name[50];\\n    float marks;\\n};",
    "Store multiple students using an array.\\n\\nstruct Student s[100];",
    "Use a menu-driven approach with a loop.\\n\\nwhile(1)\\n{\\n    // Menu\\n}",
    "Search students using Roll Number.\\n\\nfor(i=0;i<count;i++)\\n{\\n    if(s[i].roll==searchRoll)\\n    {\\n        // Found\\n    }\\n}",
    "For deletion, shift all records one position left.\\n\\nfor(i=index;i<count-1;i++)\\n{\\n    s[i]=s[i+1];\\n}"
];

// Rebuild fallback object literal as a raw string so it doesn't get messed up when saving to the source file
let fcStr = '{\\n';
fcStr += '        id: 189116,\\n';
fcStr += '        title: "Project: Student Management System",\\n';
fcStr += '        description: ' + JSON.stringify(description) + ',\\n';
fcStr += '        reference_output: "",\\n';
fcStr += '        test_input: "None",\\n';
fcStr += '        test_args: [],\\n';
fcStr += '        starter_code: ' + JSON.stringify(starter_code) + ',\\n';
fcStr += '        solution_code: ' + JSON.stringify(solution_code) + ',\\n';
fcStr += '        hints: ' + JSON.stringify(JSON.stringify(hintsArr)) + ',\\n';
fcStr += '        topic_id: "c-p18-t6",\\n';
fcStr += '        course_id: "c-programming"\\n';
fcStr += '      }';

let content = fs.readFileSync('data/cProgrammingChallengeFallbacks.js', 'utf8');

// Replace in three places where c-p18-t6 exists:

content = content.replace(/case\s+'c-p18-t6':\s+return\s+\{[\s\S]*?course_id:\s*'c-programming'\s*\};/, "case 'c-p18-t6':\n      return " + fcStr + ";");
content = content.replace(/case\s+"Student DB":\s+return\s+\{[\s\S]*?course_id:\s*'c-programming'\s*\};/, 'case "Project: Student Management System":\n      return ' + fcStr + ';');
content = content.replace(/\{\s*id:\s*189116[\s\S]*?course_id:\s*'c-programming'\s*\}/, fcStr);

fs.writeFileSync('data/cProgrammingChallengeFallbacks.js', content);
console.log("Updated cProgrammingChallengeFallbacks.js successfully!");
