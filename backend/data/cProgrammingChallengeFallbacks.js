const getFallbackChallengeById = (id) => {
  switch (Number(id)) {
    case 189000:
      return {
        id: 189000,
        title: "Print Hello World",
        description: "Write a program that prints \"Hello, World!\" to the console.",
        reference_output: "Hello, World!",
        test_input: "None",
        test_args: [],
        starter_code: "",
        solution_code: "",
        hints: "Use printf function\\nDon't forget the newline character",
        topic_id: 'c-syntax-rules',
        course_id: 'c-programming'
      };
    case 189005:
      return {
        id: 189005,
        title: "Hello, World!",
        description: "Write a standard 'Hello, World!' program.",
        reference_output: "Hello, World!",
        output_format: "Hello, World!",
        test_input: "None",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello, World!\");\n    return 0;\n}",
        hints: "[]",
        topic_id: 'c-p1-t4',
        course_id: 'c-programming'
      };
    case 189121:
      return {
        id: 189121,
        title: "Mastery Challenge",
        description: "Write a C program to demonstrate the use of type modifiers (short, long, unsigned) by declaring variables and displaying their values.",
        reference_output: "Short Integer = 100\nLong Integer = 100000\nUnsigned Integer = 500",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    short int a = 100;\n    long int b = 100000;\n    unsigned int c = 500;\n\n    printf(\"Short Integer = %d\\n\", a);\n    printf(\"Long Integer = %ld\\n\", b);\n    printf(\"Unsigned Integer = %u\\n\", c);\n\n    return 0;\n}",
        hints: "Use type modifiers with integer data types to change their range and storage capacity.",
        topic_id: 'c-p2-t4',
        course_id: 'c-programming'
      };
    case 189118:
      return {
        id: 189118,
        title: "Mastery Challenge",
        description: "Write a C program that declares variables of different basic data types and displays their values.",
        reference_output: "Age = 20\nHeight = 5.8\nSalary = 25000.50\nGrade = A",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main()\n{\n    int age = 20;\n    float height = 5.8;\n    double salary = 25000.50;\n    char grade = 'A';\n\n    printf(\"Age = %d\\n\", age);\n    printf(\"Height = %.1f\\n\", height);\n    printf(\"Salary = %.2lf\\n\", salary);\n    printf(\"Grade = %c\\n\", grade);\n\n    return 0;\n}",
        hints: "Declare variables using int, float, double, and char, then display their values using the appropriate format specifiers.",
        topic_id: 'c-p2-t1',
        course_id: 'c-programming'
      };
    case 189123:
      return {
        id: 189123,
        title: "Mastery Challenge",
        description: "Write a C program to demonstrate type conversion and type casting by converting an integer value to a float and displaying the result.",
        reference_output: "Integer Value = 10\nFloat Value = 10.00",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int num = 10;\n\n    float result = (float)num;\n\n    printf(\"Integer Value = %d\\n\", num);\n    printf(\"Float Value = %.2f\\n\", result);\n\n    return 0;\n}",
        hints: "Use a type cast to convert one data type into another before performing calculations.",
        topic_id: 'c-p2-t6',
        course_id: 'c-programming'
      };
    case 189127:
      return {
        id: 189127,
        title: "Mastery Challenge",
        description: "Write a C program to compare two integers using relational operators and display the results.",
        reference_output: "a > b  = 0\na < b  = 1\na >= b = 0\na <= b = 1\na == b = 0\na != b = 1",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int a = 10, b = 20;\n\n    printf(\"a > b  = %d\\n\", a > b);\n    printf(\"a < b  = %d\\n\", a < b);\n    printf(\"a >= b = %d\\n\", a >= b);\n    printf(\"a <= b = %d\\n\", a <= b);\n    printf(\"a == b = %d\\n\", a == b);\n    printf(\"a != b = %d\\n\", a != b);\n\n    return 0;\n}",
        hints: "Use relational operators (>, <, >=, <=, ==, !=) to compare two values.",
        topic_id: 'c-p3-t2',
        course_id: 'c-programming'
      };
    case 189130:
      return {
        id: 189130,
        title: "Mastery Challenge",
        description: "Write a C program to demonstrate the use of increment (++) and decrement (--) operators on an integer variable.",
        reference_output: "Initial Value = 10\nAfter Increment = 11\nAfter Decrement = 10",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int a = 10;\n\n    printf(\"Initial Value = %d\\n\", a);\n\n    a++;\n    printf(\"After Increment = %d\\n\", a);\n\n    a--;\n    printf(\"After Decrement = %d\\n\", a);\n\n    return 0;\n}",
        hints: "Use ++ to increase a variable's value by 1 and -- to decrease it by 1.",
        topic_id: 'c-p3-t5',
        course_id: 'c-programming'
      };
    case 189031:
      return {
        id: 189031,
        title: "Leap Year Checker",
        description: "Write a C program to check whether a year entered by the user is a leap year or not using nested if-else statements.",
        reference_output: "Enter a year: Leap Year",
        test_input: "2024",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int year;\n\n    printf(\"Enter a year: \");\n    scanf(\"%d\", &year);\n\n    if (year % 4 == 0) {\n        if (year % 100 == 0) {\n            if (year % 400 == 0) {\n                printf(\"Leap Year\\n\");\n            } else {\n                printf(\"Not a Leap Year\\n\");\n            }\n        } else {\n            printf(\"Leap Year\\n\");\n        }\n    } else {\n        printf(\"Not a Leap Year\\n\");\n    }\n\n    return 0;\n}",
        hints: "[\"A leap year is divisible by 4. If it is divisible by 100, then it must also be divisible by 400.\"]",
        topic_id: 'c-p5-t3',
        course_id: 'c-programming'
      };
    case 189029:
      return {
        id: 189029,
        title: "Check Positive Number",
        description: "Write a C program to read a number from the user and check whether it is positive using an if statement.",
        reference_output: "Enter a number: The number is positive.",
        test_input: "5",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int num;\n\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n\n    if (num > 0) {\n        printf(\"The number is positive.\\n\");\n    }\n\n    return 0;\n}",
        hints: "[\"Accept a number using scanf()\",\"Use an if statement to check if it is greater than zero.\",\"Use printf to output the exact message.\"]",
        topic_id: 'c-p5-t1',
        course_id: 'c-programming'
      };
    case 189034:
      return {
        id: 189034,
        title: "Print Numbers using goto",
        description: "Write a C program to demonstrate the use of the goto statement by printing numbers from 1 to 5.",
        reference_output: "1 2 3 4 5 ",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int i = 1;\n\nstart:\n    printf(\"%d \", i);\n    i++;\n\n    if (i <= 5)\n        goto start;\n\n    return 0;\n}",
        hints: "[\"Use a label and the goto statement to repeatedly execute a block of code until a condition becomes false.\"]",
        topic_id: 'c-p5-t6',
        course_id: 'c-programming'
      };
    case 189039:
      return {
        id: 189039,
        title: "Number Pattern",
        description: "Write a C program to print the following number pattern using nested loops.",
        reference_output: "1 \n1 2 \n1 2 3 \n1 2 3 4 \n1 2 3 4 5 \n",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int i, j;\n\n    for (i = 1; i <= 5; i++) {\n        for (j = 1; j <= i; j++) {\n            printf(\"%d \", j);\n        }\n        printf(\"\\n\");\n    }\n\n    return 0;\n}",
        hints: "[\"Use the outer loop for rows and the inner loop to print numbers from 1 to the current row number.\"]",
        topic_id: 'c-p6-t4',
        course_id: 'c-programming'
      };
    case 189148:
      return {
        id: 189148,
        title: "Pointer Declaration",
        description: "Write a C program to declare a pointer, assign it the address of a variable, and display the value using the pointer.",
        reference_output: "Age = 20",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int age = 20;\n    int *ptr;\n\n    ptr = &age;\n\n    printf(\"Age = %d\\n\", *ptr);\n\n    return 0;\n}",
        hints: "[\"Use * to declare a pointer variable.\"]",
        topic_id: 'c-p11-t2',
        course_id: 'c-programming'
      };
    case 189150:
      return {
        id: 189150,
        title: "Dereference Operator (*)",
        description: "Write a C program to access and display the value stored at a memory address using the dereference (*) operator.",
        reference_output: "Value = 50",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int num = 50;\n    int *ptr = &num;\n\n    printf(\"Value = %d\\n\", *ptr);\n\n    return 0;\n}",
        hints: "[\"Use *pointer_name to access the value pointed to by a pointer.\"]",
        topic_id: 'c-p11-t4',
        course_id: 'c-programming'
      };
    case 189132:
      return {
        id: 189132,
        title: "Mastery Challenge",
        description: "Write a C program to find the larger of two numbers using the conditional (ternary) operator.",
        reference_output: "Larger Number = 20",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int a = 15, b = 20;\n\n    int max = (a > b) ? a : b;\n\n    printf(\"Larger Number = %d\\n\", max);\n\n    return 0;\n}",
        hints: "Use the ? : operator to choose between two values based on a condition.",
        topic_id: 'c-p3-t7',
        course_id: 'c-programming'
      };
    case 189169:
      return {
        id: 189169,
        title: "Pointer to Pointer",
        description: "Write a C program to demonstrate a pointer to a pointer and display the value of a variable using a double pointer.",
        reference_output: "Value = 10",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int num = 10;\n    int *ptr = &num;\n    int **dptr = &ptr;\n\n    printf(\"Value = %d\\n\", **dptr);\n\n    return 0;\n}",
        hints: "[\"A pointer to a pointer stores the address of another pointer.\"]",
        topic_id: 'c-p12-t1',
        course_id: 'c-programming'
      };
    case 189049:
      return {
        id: 189049,
        title: "Demonstrate Pass By Value",
        description: "Write a C program to demonstrate Pass By Value by creating a function that attempts to modify a variable. Display the value before and after the function call.",
        reference_output: "Before Function Call = 50\nInside Function = 100\nAfter Function Call = 50",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nvoid changeValue(int num) {\n    num = 100;\n    printf(\"Inside Function = %d\\n\", num);\n}\n\nint main() {\n    int num = 50;\n\n    printf(\"Before Function Call = %d\\n\", num);\n\n    changeValue(num);\n\n    printf(\"After Function Call = %d\\n\", num);\n\n    return 0;\n}",
        hints: "[\"In pass by value, a copy of the variable is passed to the function, so changes inside the function do not affect the original variable.\"]",
        topic_id: 'c-p7-t6',
        course_id: 'c-programming'
      };
    case 189173:
      return {
        id: 189173,
        title: "Callback Functions",
        description: "Write a C program to calculate the square of a number entered by the user using a callback function.",
        reference_output: "Enter a number: Square = 25",
        test_input: "5",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nvoid square(int num) {\n    printf(\"Square = %d\\n\", num * num);\n}\n\nvoid execute(void (*func)(int), int value) {\n    func(value);\n}\n\nint main() {\n    int num;\n\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n\n    execute(square, num);\n\n    return 0;\n}",
        hints: "[\"Pass a function pointer as an argument and invoke it inside another function.\"]",
        topic_id: 'c-p12-t5',
        course_id: 'c-programming'
      };
    case 189059:
      return {
        id: 189059,
        title: "Average Marks Using Array",
        description: "Write a C program to store the marks of 5 students in an array and calculate the average marks.",
        reference_output: "Average Marks = 79.00",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int marks[5] = {75, 80, 65, 90, 85};\n    int sum = 0, i;\n    float average;\n\n    for(i = 0; i < 5; i++) {\n        sum += marks[i];\n    }\n\n    average = sum / 5.0;\n\n    printf(\"Average Marks = %.2f\\n\", average);\n\n    return 0;\n}",
        hints: "[\"Store multiple marks using an array and use a loop to calculate their sum before finding the average.\"]",
        topic_id: 'c-p9-t1',
        course_id: 'c-programming'
      };
    case 189180:
      return {
        id: 189180,
        title: "Nested Structures",
        description: "Write a C program to store student information along with address details using nested structures.",
        reference_output: "Enter Name: Enter City: Name: Balu\nCity: Kakinada",
        test_input: "Balu Kakinada",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nstruct Address {\n    char city[20];\n};\n\nstruct Student {\n    char name[20];\n    struct Address addr;\n};\n\nint main() {\n    struct Student s;\n\n    printf(\"Enter Name: \");\n    scanf(\"%s\", s.name);\n\n    printf(\"Enter City: \");\n    scanf(\"%s\", s.addr.city);\n\n    printf(\"Name: %s\\n\", s.name);\n    printf(\"City: %s\\n\", s.addr.city);\n\n    return 0;\n}",
        hints: "[\"Create one structure inside another structure.\"]",
        topic_id: 'c-p13-t5',
        course_id: 'c-programming'
      };
    case 189054:
      return {
        id: 189054,
        title: "Demonstrate Local Scope",
        description: "Write a C program to demonstrate variable scope by using a local variable inside a function and showing that it cannot be accessed outside the function.",
        reference_output: "Inside Function: 10",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nvoid display() {\n    int x = 10;   // Local Variable\n    printf(\"Inside Function: %d\\n\", x);\n}\n\nint main() {\n    display();\n\n    return 0;\n}",
        hints: "[\"A local variable is accessible only within the function in which it is declared.\"]",
        topic_id: 'c-p8-t3',
        course_id: 'c-programming'
      };
    case 189061:
      return {
        id: 189061,
        title: "Find Largest Element",
        description: "Write a C program to find the largest element in an array.",
        reference_output: "Largest Element = 89",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int arr[5] = {12, 45, 7, 89, 34};\n    int largest = arr[0];\n    int i;\n\n    for(i = 1; i < 5; i++) {\n        if(arr[i] > largest)\n            largest = arr[i];\n    }\n\n    printf(\"Largest Element = %d\\n\", largest);\n\n    return 0;\n}",
        hints: "[\"Assume the first element is the largest and compare it with the remaining elements.\"]",
        topic_id: 'c-p9-t3',
        course_id: 'c-programming'
      };
    case 189064:
      return {
        id: 189064,
        title: "Array Sum Function",
        description: "Write a C program to pass an array to a function and find the sum of all elements.",
        reference_output: "Sum = 150",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint findSum(int arr[], int size) {\n    int i, sum = 0;\n    for(i = 0; i < size; i++) {\n        sum += arr[i];\n    }\n    return sum;\n}\n\nint main() {\n    int arr[] = {10, 20, 30, 40, 50};\n    printf(\"Sum = %d\\n\", findSum(arr, 5));\n    return 0;\n}",
        hints: "[\"Pass the array and its size as function arguments.\"]",
        topic_id: 'c-p9-t6',
        course_id: 'c-programming'
      };
    case 189070:
      return {
        id: 189070,
        title: "Find String Length",
        description: "Write a C program to find the length of a string using a string library function.",
        reference_output: "Length = 11",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char str[] = \"Programming\";\n\n    printf(\"Length = %lu\\n\", strlen(str));\n\n    return 0;\n}",
        hints: "[\"Use the strlen() function from <string.h>.\"]",
        topic_id: 'c-p10-t4',
        course_id: 'c-programming'
      };
    case 189190:
      return {
        id: 189190,
        title: "free() Function",
        description: "Write a C program to dynamically allocate memory for an integer, store a value, display it, and release the memory using free().",
        reference_output: "Value = 100",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *ptr;\n\n    ptr = (int *)malloc(sizeof(int));\n\n    *ptr = 100;\n\n    printf(\"Value = %d\\n\", *ptr);\n\n    free(ptr);\n\n    return 0;\n}",
        hints: "[\"Always free dynamically allocated memory when it is no longer needed.\"]",
        topic_id: 'c-p14-t5',
        course_id: 'c-programming'
      };
    case 189198:
      return {
        id: 189198,
        title: "Writing to Files",
        description: "Write a C program to accept a student's name and marks from the user and store them in a file.",
        reference_output: "Enter Name: Enter Marks: Record Saved Successfully",
        test_input: "Balu 95",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    FILE *fp;\n    char name[20];\n    int marks;\n\n    fp = fopen(\"student.txt\", \"w\");\n\n    printf(\"Enter Name: \");\n    scanf(\"%s\", name);\n\n    printf(\"Enter Marks: \");\n    scanf(\"%d\", &marks);\n\n    fprintf(fp, \"%s %d\", name, marks);\n\n    fclose(fp);\n\n    printf(\"Record Saved Successfully\\n\");\n\n    return 0;\n}",
        hints: "[\"Use fprintf() to write formatted data into a file.\"]",
        topic_id: 'c-p15-t5',
        course_id: 'c-programming'
      };
    case 189067:
      return {
        id: 189067,
        title: "Displaying a String",
        description: "Write a C program to store a string and display it.",
        reference_output: "Name: Balu",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    char name[] = \"Balu\";\n\n    printf(\"Name: %s\\n\", name);\n\n    return 0;\n}",
        hints: "[\"A string is a character array ending with the null character (\\\\0).\"]",
        topic_id: 'c-p10-t1',
        course_id: 'c-programming'
      };
    case 189147:
      return {
        id: 189147,
        title: "Introduction to Pointers",
        description: "Write a C program to store an integer value and display it using a pointer.",
        reference_output: "Value = 25",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int num = 25;\n    int *ptr = &num;\n\n    printf(\"Value = %d\\n\", *ptr);\n\n    return 0;\n}",
        hints: "[\"Create a pointer that stores the address of a variable and access the value through the pointer.\"]",
        topic_id: 'c-p11-t1',
        course_id: 'c-programming'
      };
    case 189149:
      return {
        id: 189149,
        title: "Address-of Operator (&)",
        description: "Write a C program to display the memory address of a variable using the address-of (&) operator.",
        reference_output: "Address of num = [Address]",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int num = 100;\n\n    printf(\"Address of num = %p\\n\", (void*)&num);\n\n    return 0;\n}",
        hints: "[\"Use &variable_name to obtain the memory address.\"]",
        topic_id: 'c-p11-t3',
        course_id: 'c-programming'
      };
    case 189170:
      return {
        id: 189170,
        title: "Array of Pointers",
        description: "Write a C program to store names using an array of pointers and display them.",
        reference_output: "Ravi\nSita\nKiran",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    char *names[] = {\"Ravi\", \"Sita\", \"Kiran\"};\n\n    for(int i = 0; i < 3; i++) {\n        printf(\"%s\\n\", names[i]);\n    }\n\n    return 0;\n}",
        hints: "[\"Each element of the array stores the address of a string.\"]",
        topic_id: 'c-p12-t2',
        course_id: 'c-programming'
      };
    case 189181:
      return {
        id: 189181,
        title: "Array of Structures",
        description: "Write a C program to store details of 3 students and find the student with the highest marks.",
        reference_output: "Enter Name and Marks: Enter Name and Marks: Enter Name and Marks: \nTop Student: Balu",
        test_input: "Ravi 80 Balu 95 Sita 88",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nstruct Student {\n    char name[20];\n    float marks;\n};\n\nint main() {\n    struct Student s[3];\n    int i, max = 0;\n\n    for(i = 0; i < 3; i++) {\n        printf(\"Enter Name and Marks: \");\n        scanf(\"%s %f\", s[i].name, &s[i].marks);\n    }\n\n    for(i = 1; i < 3; i++) {\n        if(s[i].marks > s[max].marks)\n            max = i;\n    }\n\n    printf(\"\\nTop Student: %s\\n\", s[max].name);\n\n    return 0;\n}",
        hints: "[\"Use an array of structures and compare marks.\"]",
        topic_id: 'c-p13-t6',
        course_id: 'c-programming'
      };
    case 189191:
      return {
        id: 189191,
        title: "Memory Leaks",
        description: "Write a C program that properly allocates and releases memory to avoid memory leaks.",
        reference_output: "Value = 50",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *ptr;\n\n    ptr = (int *)malloc(sizeof(int));\n\n    *ptr = 50;\n\n    printf(\"Value = %d\\n\", *ptr);\n\n    free(ptr);\n\n    ptr = NULL;\n\n    return 0;\n}",
        hints: "[\"Every successful malloc() should eventually have a matching free().\"]",
        topic_id: 'c-p14-t6',
        course_id: 'c-programming'
      };
    case 189199:
      return {
        id: 189199,
        title: "Binary File Operations",
        description: "Write a C program to store an integer in a binary file and read it back.",
        reference_output: "Value = 100",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    FILE *fp;\n    int num = 100, value;\n\n    fp = fopen(\"number.dat\", \"wb\");\n\n    fwrite(&num, sizeof(int), 1, fp);\n\n    fclose(fp);\n\n    fp = fopen(\"number.dat\", \"rb\");\n\n    fread(&value, sizeof(int), 1, fp);\n\n    printf(\"Value = %d\\n\", value);\n\n    fclose(fp);\n\n    return 0;\n}",
        hints: "[\"Use fwrite() and fread().\"]",
        topic_id: 'c-p15-t6',
        course_id: 'c-programming'
      };
    case 189205:
      return {
        id: 189205,
        title: "Macro Functions",
        description: "Write a C program to find the larger of two numbers using a macro function.",
        reference_output: "Enter two numbers: Largest = 25",
        test_input: "15 25",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\n#define MAX(a,b) ((a) > (b) ? (a) : (b))\n\nint main() {\n    int x, y;\n\n    printf(\"Enter two numbers: \");\n    scanf(\"%d %d\", &x, &y);\n\n    printf(\"Largest = %d\\n\", MAX(x, y));\n\n    return 0;\n}",
        hints: "[\"Create a macro that compares two values and returns the larger one.\"]",
        topic_id: 'c-p16-t4',
        course_id: 'c-programming'
      };
    case 189236:
      return {
        id: 189236,
        title: "Command-Line Arguments",
        description: "Write a C program to accept a student's name and marks through command-line arguments and display them.",
        reference_output: "Student Name: Balu\nMarks: 95",
        test_input: "",
        test_args: ["Balu","95"],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main(int argc, char *argv[]) {\n\n    printf(\"Student Name: %s\\n\", argv[1]);\n    printf(\"Marks: %s\\n\", argv[2]);\n\n    return 0;\n}",
        hints: "[\"Use argc and argv to access command-line arguments.\"]",
        topic_id: 'c-p17-t1',
        course_id: 'c-programming'
      };
    case 189241:
      return {
        id: 189241,
        title: "Variable Scope and Lifetime",
        description: "Write a C program to demonstrate the difference between a local variable and a static variable.",
        reference_output: "Count = 1\nCount = 2\nCount = 3",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nvoid counter() {\n    static int count = 0;\n\n    count++;\n\n    printf(\"Count = %d\\n\", count);\n}\n\nint main() {\n\n    counter();\n    counter();\n    counter();\n\n    return 0;\n}",
        hints: "[\"A static variable retains its value between function calls.\"]",
        topic_id: 'c-p17-t6',
        course_id: 'c-programming'
      };
    case 189171:
      return {
        id: 189171,
        title: "Pointer to Array",
        description: "Write a C program to access array elements using a pointer to an array.",
        reference_output: "10 20 30",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int arr[3] = {10, 20, 30};\n\n    int (*ptr)[3] = &arr;\n\n    printf(\"%d %d %d\\n\",\n           (*ptr)[0],\n           (*ptr)[1],\n           (*ptr)[2]);\n\n    return 0;\n}",
        hints: "[\"A pointer can point to the entire array instead of a single element.\"]",
        topic_id: 'c-p12-t3',
        course_id: 'c-programming'
      };
    case 189182:
      return {
        id: 189182,
        title: "Pointers to Structures",
        description: "Write a C program to access structure members using a structure pointer.",
        reference_output: "Enter Name: Name: Balu",
        test_input: "Balu",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nstruct Student {\n    char name[20];\n};\n\nint main() {\n    struct Student s;\n    struct Student *ptr = &s;\n\n    printf(\"Enter Name: \");\n    scanf(\"%s\", ptr->name);\n\n    printf(\"Name: %s\\n\", ptr->name);\n\n    return 0;\n}",
        hints: "[\"Use the arrow (->) operator.\"]",
        topic_id: 'c-p13-t7',
        course_id: 'c-programming'
      };
    case 189030:
      return {
        id: 189030,
        title: "Check Positive or Negative",
        description: "Write a C program to check whether a number entered by the user is positive or negative using an if-else statement.",
        reference_output: "Enter a number: The number is positive.",
        test_input: "5",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int num;\n\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n\n    if (num >= 0) {\n        printf(\"The number is positive.\\n\");\n    } else {\n        printf(\"The number is negative.\\n\");\n    }\n\n    return 0;\n}",
        hints: "[\"Use an if-else statement to execute one block when the condition is true and another when it is false.\"]",
        topic_id: 'c-p5-t2',
        course_id: 'c-programming'
      };
    case 189037:
      return {
        id: 189037,
        title: "Multiplication Table",
        description: "Write a C program to generate the multiplication table of a number using a do-while loop.",
        reference_output: "Enter a number: 5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n5 x 10 = 50",
        test_input: "5",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int num, i = 1;\n\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n\n    do {\n        printf(\"%d x %d = %d\\n\", num, i, num * i);\n        i++;\n    } while (i <= 10);\n\n    return 0;\n}",
        hints: "[\"Start from 1 and repeatedly multiply the entered number by the counter until 10.\"]",
        topic_id: 'c-p6-t2',
        course_id: 'c-programming'
      };
    case 189032:
      return {
        id: 189032,
        title: "Largest of Three Numbers",
        description: "Write a C program to find the largest of three numbers using an else-if ladder.",
        reference_output: "Enter three numbers: 25 is the largest number.",
        test_input: "10 20 30",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int a, b, c;\n\n    printf(\"Enter three numbers: \");\n    scanf(\"%d %d %d\", &a, &b, &c);\n\n    if (a >= b && a >= c) {\n        printf(\"%d is the largest number.\\n\", a);\n    }\n    else if (b >= a && b >= c) {\n        printf(\"%d is the largest number.\\n\", b);\n    }\n    else {\n        printf(\"%d is the largest number.\\n\", c);\n    }\n\n    return 0;\n}",
        hints: "[\"Compare the three numbers using multiple conditions and print the largest one.\"]",
        topic_id: 'c-p5-t4',
        course_id: 'c-programming'
      };
    case 189038:
      return {
        id: 189038,
        title: "Even Numbers",
        description: "Write a C program to print all even numbers from 1 to 20 using a for loop.",
        reference_output: "2 4 6 8 10 12 14 16 18 20 ",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int i;\n\n    for (i = 2; i <= 20; i += 2) {\n        printf(\"%d \", i);\n    }\n\n    return 0;\n}",
        hints: "[\"Start the loop from 2 and increment by 2 in each iteration.\"]",
        topic_id: 'c-p6-t3',
        course_id: 'c-programming'
      };
    case 189035:
      return {
        id: 189035,
        title: "Uppercase or Lowercase",
        description: "Write a C program to check whether a character entered by the user is an uppercase letter or a lowercase letter using the conditional (ternary) operator.",
        reference_output: "Enter a character: Uppercase Letter",
        test_input: "a",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    char ch;\n\n    printf(\"Enter a character: \");\n    scanf(\"%c\", &ch);\n\n    (ch >= 'A' && ch <= 'Z')\n        ? printf(\"Uppercase Letter\\n\")\n        : printf(\"Lowercase Letter\\n\");\n\n    return 0;\n}",
        hints: "[\"Compare the character with the range \\\\'A\\\\' to \\\\'Z\\\\' and use the ternary operator to display the result.\"]",
        topic_id: 'c-p5-t7',
        course_id: 'c-programming'
      };
    case 189041:
      return {
        id: 189041,
        title: "Skip a Number",
        description: "Write a C program to print numbers from 1 to 10, skipping the number 5 using the continue statement.",
        reference_output: "1 2 3 4 6 7 8 9 10 ",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int i;\n\n    for (i = 1; i <= 10; i++) {\n        if (i == 5) {\n            continue;\n        }\n        printf(\"%d \", i);\n    }\n\n    return 0;\n}",
        hints: "[\"Use continue to skip the current iteration when a specific condition is met.\"]",
        topic_id: 'c-p6-t6',
        course_id: 'c-programming'
      };
    case 189043:
      return {
        id: 189043,
        title: "Optimize Sum Calculation",
        description: "Write a C program to calculate the sum of numbers from 1 to N using a loop. Optimize the program by avoiding unnecessary calculations inside the loop.",
        reference_output: "Enter Number: Sum = 15\n",
        test_input: "4",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int n, i, sum = 0;\n\n    printf(\"Enter Number: \");\n    scanf(\"%d\", &n);\n\n    for (i = 1; i <= n; i++) {\n        sum += i;\n    }\n\n    printf(\"Sum = %d\\n\", sum);\n\n    return 0;\n}",
        hints: "[\"Perform only the required operation inside the loop and avoid repeating calculations that can be done once outside the loop.\"]",
        topic_id: 'c-p6-t8',
        course_id: 'c-programming'
      };
    case 189045:
      return {
        id: 189045,
        title: "Calculate Square Function",
        description: "Write a C program to declare and define a function that calculates the square of a number and displays the result.",
        reference_output: "Square = 25",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\n/* Function Declaration */\nint square(int);\n\nint main() {\n    int num = 5;\n\n    printf(\"Square = %d\\n\", square(num));\n\n    return 0;\n}\n\n/* Function Definition */\nint square(int n) {\n    return n * n;\n}",
        hints: "[\"Declare the function before main(), define it after main(), and call it from main().\"]",
        topic_id: 'c-p7-t2',
        course_id: 'c-programming'
      };
    case 189047:
      return {
        id: 189047,
        title: "Largest of Two Numbers",
        description: "Write a C program to create a function that returns the larger of two numbers using the return statement.",
        reference_output: "Enter two numbers: Largest Number = 25",
        test_input: "15 25",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint findMax(int a, int b) {\n    if (a > b)\n        return a;\n    else\n        return b;\n}\n\nint main() {\n    int num1, num2;\n\n    printf(\"Enter two numbers: \");\n    scanf(\"%d %d\", &num1, &num2);\n\n    printf(\"Largest Number = %d\\n\", findMax(num1, num2));\n\n    return 0;\n}",
        hints: "[\"Use the return statement to send a value from the function back to the calling function.\"]",
        topic_id: 'c-p7-t4',
        course_id: 'c-programming'
      };
    case 189048:
      return {
        id: 189048,
        title: "Add Two Numbers via Parameters",
        description: "Write a C program to create a function that accepts two numbers as parameters and returns their sum.",
        reference_output: "Enter two numbers: Sum = 30",
        test_input: "10 20",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint add(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    int num1, num2;\n\n    printf(\"Enter two numbers: \");\n    scanf(\"%d %d\", &num1, &num2);\n\n    printf(\"Sum = %d\\n\", add(num1, num2));\n\n    return 0;\n}",
        hints: "[\"Pass values to the function through parameters and use them inside the function.\"]",
        topic_id: 'c-p7-t5',
        course_id: 'c-programming'
      };
    case 189172:
      return {
        id: 189172,
        title: "Function Pointers",
        description: "Write a C program to add two numbers entered by the user using a function pointer.",
        reference_output: "Enter two numbers: Sum = 30",
        test_input: "10 20",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint add(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    int a, b;\n\n    printf(\"Enter two numbers: \");\n    scanf(\"%d %d\", &a, &b);\n\n    int (*ptr)(int, int) = add;\n\n    printf(\"Sum = %d\\n\", ptr(a, b));\n\n    return 0;\n}",
        hints: "[\"Store the address of the addition function in a function pointer and call it.\"]",
        topic_id: 'c-p12-t4',
        course_id: 'c-programming'
      };
    case 189183:
      return {
        id: 189183,
        title: "Structures and Functions",
        description: "Write a C program to pass a structure to a function and calculate the percentage of a student.",
        reference_output: "Enter Name: Enter Percentage: Percentage = 92.50%",
        test_input: "Balu 92.5",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nstruct Student {\n    char name[20];\n    float marks;\n};\n\nvoid display(struct Student s) {\n    printf(\"Percentage = %.2f%%\\n\", s.marks);\n}\n\nint main() {\n    struct Student s;\n\n    printf(\"Enter Name: \");\n    scanf(\"%s\", s.name);\n\n    printf(\"Enter Percentage: \");\n    scanf(\"%f\", &s.marks);\n\n    display(s);\n\n    return 0;\n}",
        hints: "[\"Pass the structure variable as a function argument.\"]",
        topic_id: 'c-p13-t8',
        course_id: 'c-programming'
      };
    case 189192:
      return {
        id: 189192,
        title: "Dynamic Arrays",
        description: "Write a C program to create a dynamic array of size N, accept elements from the user, and find the largest element.",
        reference_output: "Enter size: Enter elements:\nLargest Element = 67",
        test_input: "5 12 45 8 67 23",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n, i;\n    int *arr;\n\n    printf(\"Enter size: \");\n    scanf(\"%d\", &n);\n\n    arr = (int *)malloc(n * sizeof(int));\n\n    printf(\"Enter elements:\\n\");\n\n    for(i = 0; i < n; i++) {\n        scanf(\"%d\", &arr[i]);\n    }\n\n    int max = arr[0];\n\n    for(i = 1; i < n; i++) {\n        if(arr[i] > max)\n            max = arr[i];\n    }\n\n    printf(\"Largest Element = %d\\n\", max);\n\n    free(arr);\n\n    return 0;\n}",
        hints: "[\"Allocate memory according to the size entered by the user.\"]",
        topic_id: 'c-p14-t7',
        course_id: 'c-programming'
      };
    case 189051:
      return {
        id: 189051,
        title: "Calculate Square in Void Function",
        description: "Write a C program to create a void function that finds and displays the square of a number entered by the user.",
        reference_output: "Enter a number: Square = 36",
        test_input: "6",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nvoid findSquare(int num) {\n    printf(\"Square = %d\\n\", num * num);\n}\n\nint main() {\n    int num;\n\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n\n    findSquare(num);\n\n    return 0;\n}",
        hints: "[\"Use a void function to calculate the square and print the result directly without returning a value.\"]",
        topic_id: 'c-p7-t8',
        course_id: 'c-programming'
      };
    case 189057:
      return {
        id: 189057,
        title: "Inline Function Cube Calculator",
        description: "Write a C program to demonstrate an inline function that calculates the cube of a number.",
        reference_output: "Enter a number: Cube = 64",
        test_input: "4",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nstatic inline int cube(int n) {\n    return n * n * n;\n}\n\nint main() {\n    int num;\n\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n\n    printf(\"Cube = %d\\n\", cube(num));\n\n    return 0;\n}",
        hints: "[\"Create an inline function that returns the cube of the given number.\"]",
        topic_id: 'c-p8-t6',
        course_id: 'c-programming'
      };
    case 189060:
      return {
        id: 189060,
        title: "Initialize and Display Even Numbers",
        description: "Write a C program to initialize an array with the first 10 even numbers and display them.",
        reference_output: "Even Numbers: 2 4 6 8 10 12 14 16 18 20 ",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int even[10] = {2,4,6,8,10,12,14,16,18,20};\n    int i;\n\n    printf(\"Even Numbers: \");\n\n    for(i = 0; i < 10; i++) {\n        printf(\"%d \", even[i]);\n    }\n\n    return 0;\n}",
        hints: "[\"Initialize the array while declaring it and use a loop to print all elements.\"]",
        topic_id: 'c-p9-t2',
        course_id: 'c-programming'
      };
    case 189055:
      return {
        id: 189055,
        title: "Count Function Calls with Static Variable",
        description: "Write a C program to demonstrate the use of the static storage class by counting the number of times a function is called.",
        reference_output: "Function called 1 time(s)\nFunction called 2 time(s)\nFunction called 3 time(s)",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nvoid countCalls() {\n    static int count = 0;\n\n    count++;\n    printf(\"Function called %d time(s)\\n\", count);\n}\n\nint main() {\n    countCalls();\n    countCalls();\n    countCalls();\n\n    return 0;\n}",
        hints: "[\"A static variable retains its value between function calls.\"]",
        topic_id: 'c-p8-t4',
        course_id: 'c-programming'
      };
    case 189062:
      return {
        id: 189062,
        title: "Reverse Array Input",
        description: "Write a C program to accept 5 numbers from the user and display them in reverse order.",
        reference_output: "Enter 5 numbers:\nNumbers in Reverse Order: 50 40 30 20 10 ",
        test_input: "10\\n20\\n30\\n40\\n50",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int arr[5], i;\n\n    printf(\"Enter 5 numbers:\\n\");\n\n    for(i = 0; i < 5; i++) {\n        scanf(\"%d\", &arr[i]);\n    }\n\n    printf(\"Numbers in Reverse Order: \");\n\n    for(i = 4; i >= 0; i--) {\n        printf(\"%d \", arr[i]);\n    }\n\n    return 0;\n}",
        hints: "[\"Store the numbers in an array and use a loop from the last index to the first index.\"]",
        topic_id: 'c-p9-t4',
        course_id: 'c-programming'
      };
    case 189065:
      return {
        id: 189065,
        title: "Insert Element in Array",
        description: "Write a C program to insert an element at a specified position in an array.",
        reference_output: "Array After Insertion: 10 20 25 30 40 50 ",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int arr[10] = {10, 20, 30, 40, 50};\n    int size = 5, pos = 3, value = 25, i;\n\n    for(i = size; i >= pos; i--) {\n        arr[i] = arr[i - 1];\n    }\n    arr[pos - 1] = value;\n    size++;\n\n    printf(\"Array After Insertion: \");\n    for(i = 0; i < size; i++) {\n        printf(\"%d \", arr[i]);\n    }\n\n    return 0;\n}",
        hints: "[\"Shift elements to the right before inserting the new element.\"]",
        topic_id: 'c-p9-t7',
        course_id: 'c-programming'
      };
    case 189071:
      return {
        id: 189071,
        title: "Concatenate Two Strings",
        description: "Write a C program to concatenate two strings and display the result.",
        reference_output: "Hello World",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char first[30] = \"Hello \";\n    char second[] = \"World\";\n\n    strcat(first, second);\n\n    printf(\"%s\\n\", first);\n\n    return 0;\n}",
        hints: "[\"Use the strcat() function.\"]",
        topic_id: 'c-p10-t5',
        course_id: 'c-programming'
      };
    case 189069:
      return {
        id: 189069,
        title: "String Input with fgets()",
        description: "Write a C program to accept a name from the user and display a welcome message.",
        reference_output: "Enter your name: Welcome Ajith\n",
        test_input: "Ajith",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    char name[50];\n\n    printf(\"Enter your name: \");\n    fgets(name, sizeof(name), stdin);\n\n    printf(\"Welcome %s\", name);\n\n    return 0;\n}",
        hints: "[\"Use fgets() to read a string containing spaces.\"]",
        topic_id: 'c-p10-t3',
        course_id: 'c-programming'
      };
    case 189074:
      return {
        id: 189074,
        title: "String to Integer Conversion",
        description: "Write a C program to convert a numeric string into an integer and display the result.",
        reference_output: "Number = 1234",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    char str[] = \"1234\";\n    int num = atoi(str);\n    printf(\"Number = %d\\n\", num);\n    return 0;\n}",
        hints: "[\"Use the atoi() function.\"]",
        topic_id: 'c-p10-t8',
        course_id: 'c-programming'
      };
    case 189068:
      return {
        id: 189068,
        title: "Declare and Initialize City Name",
        description: "Write a C program to declare and initialize a string representing a city name and display it.",
        reference_output: "City: Hyderabad",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    char city[] = \"Hyderabad\";\n\n    printf(\"City: %s\\n\", city);\n\n    return 0;\n}",
        hints: "[\"Initialize the string at the time of declaration.\"]",
        topic_id: 'c-p10-t2',
        course_id: 'c-programming'
      };
    case 189174:
      return {
        id: 189174,
        title: "void Pointers",
        description: "Write a C program to accept an integer from the user, store its address in a void pointer, and display the value.",
        reference_output: "Enter a number: Value = 25",
        test_input: "25",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int num;\n\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n\n    void *ptr = &num;\n\n    printf(\"Value = %d\\n\", *(int *)ptr);\n\n    return 0;\n}",
        hints: "[\"A void pointer must be type-cast before dereferencing.\"]",
        topic_id: 'c-p12-t6',
        course_id: 'c-programming'
      };
    case 189184:
      return {
        id: 189184,
        title: "Unions",
        description: "Write a C program to demonstrate how a union shares memory between members.",
        reference_output: "Number = 100\nValue = 25.50",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nunion Data {\n    int num;\n    float value;\n};\n\nint main() {\n    union Data d;\n\n    d.num = 100;\n    printf(\"Number = %d\\n\", d.num);\n\n    d.value = 25.5;\n    printf(\"Value = %.2f\\n\", d.value);\n\n    return 0;\n}",
        hints: "[\"Assign values to different union members one after another and observe the output.\"]",
        topic_id: 'c-p13-t9',
        course_id: 'c-programming'
      };
    case 189193:
      return {
        id: 189193,
        title: "Dynamic Structures",
        description: "Write a C program to dynamically allocate memory for a student structure and display the entered student details.",
        reference_output: "Enter Name: Enter Roll Number: \nStudent Details\nName: Balu\nRoll No: 101",
        test_input: "Balu 101",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Student {\n    char name[20];\n    int rollNo;\n};\n\nint main() {\n    struct Student *s;\n\n    s = (struct Student *)malloc(sizeof(struct Student));\n\n    printf(\"Enter Name: \");\n    scanf(\"%s\", s->name);\n\n    printf(\"Enter Roll Number: \");\n    scanf(\"%d\", &s->rollNo);\n\n    printf(\"\\nStudent Details\\n\");\n    printf(\"Name: %s\\n\", s->name);\n    printf(\"Roll No: %d\\n\", s->rollNo);\n\n    free(s);\n\n    return 0;\n}",
        hints: "[\"Use malloc() with a structure pointer.\"]",
        topic_id: 'c-p14-t8',
        course_id: 'c-programming'
      };
    case 189200:
      return {
        id: 189200,
        title: "File Positioning",
        description: "Write a C program to move the file pointer to a specific position and read a character.",
        reference_output: "Character = m",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    FILE *fp;\n    char ch;\n\n    fp = fopen(\"data.txt\", \"r\");\n\n    fseek(fp, 5, SEEK_SET);\n\n    ch = fgetc(fp);\n\n    printf(\"Character = %c\\n\", ch);\n\n    fclose(fp);\n\n    return 0;\n}",
        hints: "[\"Use fseek() to reposition the file pointer.\"]",
        topic_id: 'c-p15-t7',
        course_id: 'c-programming'
      };
    case 189206:
      return {
        id: 189206,
        title: "Conditional Compilation",
        description: "Write a C program that displays a debugging message only when a macro named DEBUG is defined.",
        reference_output: "Debug Mode Enabled\nProgram Executed",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\n#define DEBUG\n\nint main() {\n\n#ifdef DEBUG\n    printf(\"Debug Mode Enabled\\n\");\n#endif\n\n    printf(\"Program Executed\\n\");\n\n    return 0;\n}",
        hints: "[\"Use #ifdef and #endif.\"]",
        topic_id: 'c-p16-t5',
        course_id: 'c-programming'
      };
    case 189237:
      return {
        id: 189237,
        title: "Bit Manipulation Techniques",
        description: "Write a C program to check whether the 3rd bit of a number is ON or OFF.",
        reference_output: "Enter a number: 3rd Bit is ON",
        test_input: "5",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int num;\n\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n\n    if(num & (1 << 2))\n        printf(\"3rd Bit is ON\\n\");\n    else\n        printf(\"3rd Bit is OFF\\n\");\n\n    return 0;\n}",
        hints: "[\"Use bitwise AND (&) with a bit mask.\"]",
        topic_id: 'c-p17-t2',
        course_id: 'c-programming'
      };
    case 189119:
      return {
        id: 189119,
        title: "Mastery Challenge",
        description: "Write a C program to declare variables of different data types (int, float, and char), initialize them with values, and display the values.",
        reference_output: "Age = 20\nHeight = 5.8\nGrade = A",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int age = 20;\n    float height = 5.8;\n    char grade = 'A';\n\n    printf(\"Age = %d\\n\", age);\n    printf(\"Height = %.1f\\n\", height);\n    printf(\"Grade = %c\\n\", grade);\n\n    return 0;\n}",
        hints: "Declare variables and assign values to them at the time of declaration before printing.",
        topic_id: 'c-p2-t2',
        course_id: 'c-programming'
      };
    case 189120:
      return {
        id: 189120,
        title: "Mastery Challenge",
        description: "Write a C program to demonstrate the use of constants and literals by declaring a constant value for PI and displaying it along with different numeric and character literals.",
        reference_output: "PI = 3.14159\nInteger Literal = 100\nFloat Literal = 25.75\nCharacter Literal = A",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    const float PI = 3.14159;\n\n    printf(\"PI = %.5f\\n\", PI);\n    printf(\"Integer Literal = %d\\n\", 100);\n    printf(\"Float Literal = %.2f\\n\", 25.75);\n    printf(\"Character Literal = %c\\n\", 'A');\n\n    return 0;\n}",
        hints: "Use the const keyword to declare a constant and directly use literals in printf() statements.",
        topic_id: 'c-p2-t3',
        course_id: 'c-programming'
      };
    case 189122:
      return {
        id: 189122,
        title: "Mastery Challenge",
        description: "Write a C program to find and display the memory size (in bytes) of different data types using the sizeof operator.",
        reference_output: "Size of int = 4 bytes\nSize of float = 4 bytes\nSize of char = 1 bytes\nSize of double = 8 bytes",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    printf(\"Size of int = %zu bytes\\n\", sizeof(int));\n    printf(\"Size of float = %zu bytes\\n\", sizeof(float));\n    printf(\"Size of char = %zu bytes\\n\", sizeof(char));\n    printf(\"Size of double = %zu bytes\\n\", sizeof(double));\n\n    return 0;\n}",
        hints: "Use the sizeof operator with data types or variables to determine their memory size.",
        topic_id: 'c-p2-t5',
        course_id: 'c-programming'
      };
    case 189124:
      return {
        id: 189124,
        title: "Mastery Challenge",
        description: "Write a C program to create an enumeration for the days of the week and display the value of a selected day.",
        reference_output: "Value of WEDNESDAY = 3",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nenum Day {\n    SUNDAY,\n    MONDAY,\n    TUESDAY,\n    WEDNESDAY,\n    THURSDAY,\n    FRIDAY,\n    SATURDAY\n};\n\nint main() {\n    enum Day today = WEDNESDAY;\n\n    printf(\"Value of WEDNESDAY = %d\\n\", today);\n\n    return 0;\n}",
        hints: "Use the enum keyword to define a set of named integer constants.",
        topic_id: 'c-p2-t7',
        course_id: 'c-programming'
      };
    case 189126:
      return {
        id: 189126,
        title: "Mastery Challenge",
        description: "Write a C program to perform arithmetic operations (addition, subtraction, multiplication, division, and modulus) on two integers and display the results.",
        reference_output: "Addition = 25\nSubtraction = 15\nMultiplication = 100\nDivision = 4\nModulus = 0",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int a = 20, b = 5;\n\n    printf(\"Addition = %d\\n\", a + b);\n    printf(\"Subtraction = %d\\n\", a - b);\n    printf(\"Multiplication = %d\\n\", a * b);\n    printf(\"Division = %d\\n\", a / b);\n    printf(\"Modulus = %d\\n\", a % b);\n\n    return 0;\n}",
        hints: "Use arithmetic operators +, -, *, /, and % to perform calculations.",
        topic_id: 'c-p3-t1',
        course_id: 'c-programming'
      };
    case 189128:
      return {
        id: 189128,
        title: "Mastery Challenge",
        description: "Write a C program to demonstrate the use of logical operators (&&, ||, !) by evaluating logical expressions.",
        reference_output: "(a < b && b > 15) = 1\n(a > b || b > 15) = 1\n!(a > b) = 1",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int a = 10, b = 20;\n\n    printf(\"(a < b && b > 15) = %d\\n\", (a < b && b > 15));\n    printf(\"(a > b || b > 15) = %d\\n\", (a > b || b > 15));\n    printf(\"!(a > b) = %d\\n\", !(a > b));\n\n    return 0;\n}",
        hints: "Use logical operators to combine or negate relational expressions.",
        topic_id: 'c-p3-t3',
        course_id: 'c-programming'
      };
    case 189129:
      return {
        id: 189129,
        title: "Mastery Challenge",
        description: "Write a C program to demonstrate the use of assignment operators (=, +=, -=, *=, /=, %=) on an integer variable and display the results.",
        reference_output: "After += : 15\nAfter -= : 12\nAfter *= : 24\nAfter /= : 6\nAfter %= : 0",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int a = 10;\n\n    a += 5;\n    printf(\"After += : %d\\n\", a);\n\n    a -= 3;\n    printf(\"After -= : %d\\n\", a);\n\n    a *= 2;\n    printf(\"After *= : %d\\n\", a);\n\n    a /= 4;\n    printf(\"After /= : %d\\n\", a);\n\n    a %= 3;\n    printf(\"After %%= : %d\\n\", a);\n\n    return 0;\n}",
        hints: "Use compound assignment operators to update the value of a variable.",
        topic_id: 'c-p3-t4',
        course_id: 'c-programming'
      };
    case 189131:
      return {
        id: 189131,
        title: "Mastery Challenge",
        description: "Write a C program to demonstrate the use of bitwise operators (&, |, ^, ~) on two integer values and display the results.",
        reference_output: "a & b = 1\na | b = 7\na ^ b = 6\n~a = -6",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int a = 5, b = 3;\n\n    printf(\"a & b = %d\\n\", a & b);\n    printf(\"a | b = %d\\n\", a | b);\n    printf(\"a ^ b = %d\\n\", a ^ b);\n    printf(\"~a = %d\\n\", ~a);\n\n    return 0;\n}",
        hints: "Use bitwise operators to perform operations directly on the binary representation of integers.",
        topic_id: 'c-p3-t6',
        course_id: 'c-programming'
      };
    case 189175:
      return {
        id: 189175,
        title: "const Pointers",
        description: "Write a C program to accept a number from the user and display it using a pointer to a constant.",
        reference_output: "Enter a number: Value = 100",
        test_input: "100",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int num;\n\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n\n    const int *ptr = &num;\n\n    printf(\"Value = %d\\n\", *ptr);\n\n    return 0;\n}",
        hints: "[\"A pointer to a constant can access the value but cannot modify it through the pointer.\"]",
        topic_id: 'c-p12-t7',
        course_id: 'c-programming'
      };
    case 189134:
      return {
        id: 189134,
        title: "Mastery Challenge",
        description: "Write a C program to display a student's name, age, and percentage using the printf() function.\n\nVariables provided:\n- name (char[]): \"Alice\"\n- age (int): 20\n- percentage (float): 85.5",
        reference_output: "Name: Alice\nAge: 20\nPercentage: 85.5",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\\n\\nint main() {\\n    char name[] = \"Alice\";\\n    int age = 20;\\n    float percentage = 85.5;\\n\\n    printf(\"Name: %s\\\\n\", name);\\n    printf(\"Age: %d\\\\n\", age);\\n    printf(\"Percentage: %.1f\\\\n\", percentage);\\n\\n    return 0;\\n}",
        hints: "Use the printf() function with appropriate format specifiers to display different types of data.",
        topic_id: 'c-p4-t1',
        course_id: 'c-programming'
      };
    case 189185:
      return {
        id: 189185,
        title: "typedef Keyword",
        description: "Write a C program to create a new data type for a structure using typedef and display employee details.",
        reference_output: "Enter ID: Enter Name: ID: 101\nName: Balu",
        test_input: "101 Balu",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\ntypedef struct {\n    int id;\n    char name[20];\n} Employee;\n\nint main() {\n    Employee emp;\n\n    printf(\"Enter ID: \");\n    scanf(\"%d\", &emp.id);\n\n    printf(\"Enter Name: \");\n    scanf(\"%s\", emp.name);\n\n    printf(\"ID: %d\\n\", emp.id);\n    printf(\"Name: %s\\n\", emp.name);\n\n    return 0;\n}",
        hints: "[\"Use typedef to avoid writing struct repeatedly.\"]",
        topic_id: 'c-p13-t10',
        course_id: 'c-programming'
      };
    case 189138:
      return {
        id: 189138,
        title: "Mastery Challenge",
        description: "Write a C program to read an integer from the user using the scanf() function and display the entered value.",
        reference_output: "Enter a number: You entered: 25",
        test_input: "25",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\\n\\nint main() {\\n    int num;\\n\\n    printf(\"Enter a number: \");\\n    scanf(\"%d\", &num);\\n\\n    printf(\"You entered: %d\\\\n\", num);\\n\\n    return 0;\\n}",
        hints: "Use scanf() with the appropriate format specifier to accept input from the user.",
        topic_id: 'c-p4-t2',
        course_id: 'c-programming'
      };
    case 189143:
      return {
        id: 189143,
        title: "Mastery Challenge",
        description: "Write a C program to display a student's name, roll number, and marks using formatted output.",
        reference_output: "Student Details\n---------------\nName       : Ishan\nRoll No    : 101\nMarks      : 89.5",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    char name[] = \"Ishan\";\n    int rollNo = 101;\n    float marks = 89.5;\n\n    printf(\"Student Details\\n\");\n    printf(\"---------------\\n\");\n    printf(\"Name       : %s\\n\", name);\n    printf(\"Roll No    : %d\\n\", rollNo);\n    printf(\"Marks      : %.1f\\n\", marks);\n\n    return 0;\n}",
        hints: "Use printf() with format specifiers to display data in a well-structured format.",
        topic_id: 'c-p4-t6',
        course_id: 'c-programming'
      };
    case 189145:
      return {
        id: 189145,
        title: "Mastery Challenge",
        description: "Write a C program to read a string from the user using gets() and display it using puts().",
        reference_output: "Enter a string: You entered: Welcome To CS Studio",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    char str[100];\n\n    printf(\"Enter a string: \");\n    gets(str);\n\n    printf(\"You entered: \");\n    puts(str);\n\n    return 0;\n}",
        hints: "Use gets() to accept a string and puts() to display it.",
        topic_id: 'c-p4-t5',
        course_id: 'c-programming'
      };
    case 189036:
      return {
        id: 189036,
        title: "Count Digits",
        description: "Write a C program to count the number of digits in an integer using a while loop.",
        reference_output: "Enter a number: Number of digits = 5",
        test_input: "5",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int num, count = 0;\n\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n\n    while (num != 0) {\n        count++;\n        num = num / 10;\n    }\n\n    printf(\"Number of digits = %d\\n\", count);\n\n    return 0;\n}",
        hints: "[\"Repeatedly divide the number by 10 until it becomes 0 and count the iterations.\"]",
        topic_id: 'c-p6-t1',
        course_id: 'c-programming'
      };
    case 189040:
      return {
        id: 189040,
        title: "Stop at Zero",
        description: "Write a C program to accept numbers from the user continuously and stop the program when the user enters 0 using the break statement.",
        reference_output: "Enter a number (0 to stop): You entered: 15\nEnter a number (0 to stop): You entered: 25\nEnter a number (0 to stop): Program terminated.\n",
        test_input: "1\\n2\\n3\\n0",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int num;\n\n    while (1) {\n        printf(\"Enter a number (0 to stop): \");\n        scanf(\"%d\", &num);\n\n        if (num == 0) {\n            break;\n        }\n\n        printf(\"You entered: %d\\n\", num);\n    }\n\n    printf(\"Program terminated.\\n\");\n\n    return 0;\n}",
        hints: "[\"Use an infinite loop and terminate it with break when the entered number is 0.\"]",
        topic_id: 'c-p6-t5',
        course_id: 'c-programming'
      };
    case 189144:
      return {
        id: 189144,
        title: "Mastery Challenge",
        description: "Write a C program to read a character using getchar() and display it using putchar().",
        reference_output: "Enter a character: You entered: A",
        test_input: "A",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    char ch;\n\n    printf(\"Enter a character: \");\n    ch = getchar();\n\n    printf(\"You entered: \");\n    putchar(ch);\n\n    return 0;\n}",
        hints: "Use getchar() to accept a single character from the user and putchar() to display it.",
        topic_id: 'c-p4-t4',
        course_id: 'c-programming'
      };
    case 189033:
      return {
        id: 189033,
        title: "Menu Driven Program",
        description: "Write a C program to display the corresponding menu item based on the user's choice using a switch statement.",
        reference_output: "Menu\n1. Pizza\n2. Burger\n3. Sandwich\n4. Pasta\nEnter your choice: You selected Sandwich.",
        test_input: "2",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int choice;\n\n    printf(\"Menu\\n\");\n    printf(\"1. Pizza\\n\");\n    printf(\"2. Burger\\n\");\n    printf(\"3. Sandwich\\n\");\n    printf(\"4. Pasta\\n\");\n\n    printf(\"Enter your choice: \");\n    scanf(\"%d\", &choice);\n\n    switch (choice) {\n        case 1:\n            printf(\"You selected Pizza.\\n\");\n            break;\n        case 2:\n            printf(\"You selected Burger.\\n\");\n            break;\n        case 3:\n            printf(\"You selected Sandwich.\\n\");\n            break;\n        case 4:\n            printf(\"You selected Pasta.\\n\");\n            break;\n        default:\n            printf(\"Invalid Choice\\n\");\n    }\n\n    return 0;\n}",
        hints: "[\"Use a switch statement to match the entered choice with a menu option.\"]",
        topic_id: 'c-p5-t5',
        course_id: 'c-programming'
      };
    case 189146:
      return {
        id: 189146,
        title: "Display Welcome Message",
        description: "Write a C program to create and call a user-defined function that displays a welcome message.",
        reference_output: "Welcome to Functions in C!",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nvoid displayMessage() {\n    printf(\"Welcome to Functions in C!\\n\");\n}\n\nint main() {\n    displayMessage();\n\n    return 0;\n}",
        hints: "[\"Define a function outside main() and call it from main().\"]",
        topic_id: 'c-p7-t1',
        course_id: 'c-programming'
      };
    case 189046:
      return {
        id: 189046,
        title: "Add Two Numbers Function",
        description: "Write a C program to create a function that adds two numbers and call the function from main() to display the result.",
        reference_output: "Sum = 30",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint add(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    int result;\n\n    result = add(10, 20);   // Function Call\n\n    printf(\"Sum = %d\\n\", result);\n\n    return 0;\n}",
        hints: "[\"Pass values to the function when calling it and use the returned value.\"]",
        topic_id: 'c-p7-t3',
        course_id: 'c-programming'
      };
    case 189052:
      return {
        id: 189052,
        title: "Factorial Using Recursion",
        description: "Write a C program to find the factorial of a number using recursion.",
        reference_output: "Enter a number: Factorial = 120",
        test_input: "5",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint factorial(int n) {\n    if (n == 0 || n == 1)\n        return 1;\n    else\n        return n * factorial(n - 1);\n}\n\nint main() {\n    int num;\n\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n\n    printf(\"Factorial = %d\\n\", factorial(num));\n\n    return 0;\n}",
        hints: "[\"A recursive function calls itself. Define a base case to stop the recursion.\"]",
        topic_id: 'c-p8-t1',
        course_id: 'c-programming'
      };
    case 189053:
      return {
        id: 189053,
        title: "Recursive vs Iterative Factorial",
        description: "Write a C program to calculate the factorial of a number using an iterative approach and compare it with a recursive approach by displaying both results.",
        reference_output: "Enter a number: Iterative Factorial = 120\nRecursive Factorial = 120",
        test_input: "5",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint recursiveFactorial(int n) {\n    if (n <= 1)\n        return 1;\n    return n * recursiveFactorial(n - 1);\n}\n\nint main() {\n    int num, i;\n    int iterativeFact = 1;\n\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n\n    for (i = 1; i <= num; i++) {\n        iterativeFact *= i;\n    }\n\n    printf(\"Iterative Factorial = %d\\n\", iterativeFact);\n    printf(\"Recursive Factorial = %d\\n\", recursiveFactorial(num));\n\n    return 0;\n}",
        hints: "[\"Use a loop for the iterative method and a function that calls itself for the recursive method.\"]",
        topic_id: 'c-p8-t2',
        course_id: 'c-programming'
      };
    case 189056:
      return {
        id: 189056,
        title: "Static Variable Retention",
        description: "Write a C program to demonstrate the use of a static variable inside a function. Call the function multiple times and display how the variable retains its value between calls.",
        reference_output: "Count = 1\nCount = 2\nCount = 3",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nvoid increment() {\n    static int count = 0;\n\n    count++;\n    printf(\"Count = %d\\n\", count);\n}\n\nint main() {\n    increment();\n    increment();\n    increment();\n\n    return 0;\n}",
        hints: "[\"A static variable is initialized only once and preserves its value across function calls.\"]",
        topic_id: 'c-p8-t5',
        course_id: 'c-programming'
      };
    case 189058:
      return {
        id: 189058,
        title: "Variable-Length Argument List Summation",
        description: "Write a C program to demonstrate Variable-Length Argument Lists by creating a function that calculates the sum of multiple numbers passed as arguments.",
        reference_output: "Sum = 100",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <stdarg.h>\n\nint sum(int count, ...) {\n    va_list args;\n    int total = 0;\n\n    va_start(args, count);\n\n    for (int i = 0; i < count; i++) {\n        total += va_arg(args, int);\n    }\n\n    va_end(args);\n\n    return total;\n}\n\nint main() {\n    printf(\"Sum = %d\\n\", sum(4, 10, 20, 30, 40));\n\n    return 0;\n}",
        hints: "[\"Use the macros va_list, va_start(), va_arg(), and va_end() from the <stdarg.h> header file.\"]",
        topic_id: 'c-p8-t7',
        course_id: 'c-programming'
      };
    case 189063:
      return {
        id: 189063,
        title: "2D Array Total Marks",
        description: "Write a C program to store marks of 3 students in 3 subjects and calculate the total marks of each student.",
        reference_output: "Student 1 Total = 245\nStudent 2 Total = 220\nStudent 3 Total = 275",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int marks[3][3] = {\n        {80, 75, 90},\n        {65, 70, 85},\n        {95, 88, 92}\n    };\n    int i, j, total;\n\n    for(i = 0; i < 3; i++) {\n        total = 0;\n        for(j = 0; j < 3; j++) {\n            total += marks[i][j];\n        }\n        printf(\"Student %d Total = %d\\n\", i + 1, total);\n    }\n\n    return 0;\n}",
        hints: "[\"Use a 2D array where rows represent students and columns represent subjects.\"]",
        topic_id: 'c-p9-t5',
        course_id: 'c-programming'
      };
    case 189176:
      return {
        id: 189176,
        title: "Introduction to Structures",
        description: "Write a C program to store and display a student's name, roll number, and marks using a structure.",
        reference_output: "Enter Name: Enter Roll Number: Enter Marks: \nStudent Details\nName: Balu\nRoll No: 101\nMarks: 89.50",
        test_input: "Balu 101 89.5",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nstruct Student {\n    char name[20];\n    int rollNo;\n    float marks;\n};\n\nint main() {\n    struct Student s;\n\n    printf(\"Enter Name: \");\n    scanf(\"%s\", s.name);\n\n    printf(\"Enter Roll Number: \");\n    scanf(\"%d\", &s.rollNo);\n\n    printf(\"Enter Marks: \");\n    scanf(\"%f\", &s.marks);\n\n    printf(\"\\nStudent Details\\n\");\n    printf(\"Name: %s\\n\", s.name);\n    printf(\"Roll No: %d\\n\", s.rollNo);\n    printf(\"Marks: %.2f\\n\", s.marks);\n\n    return 0;\n}",
        hints: "[\"Use a structure to group related data of a student.\"]",
        topic_id: 'c-p13-t1',
        course_id: 'c-programming'
      };
    case 189186:
      return {
        id: 189186,
        title: "Stack vs Heap Memory",
        description: "Write a C program to store a number using both a normal variable (stack memory) and a dynamically allocated variable (heap memory), then display both values.",
        reference_output: "Stack Value = 10\nHeap Value = 20",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int stackVar = 10;\n\n    int *heapVar = (int *)malloc(sizeof(int));\n    *heapVar = 20;\n\n    printf(\"Stack Value = %d\\n\", stackVar);\n    printf(\"Heap Value = %d\\n\", *heapVar);\n\n    free(heapVar);\n\n    return 0;\n}",
        hints: "[\"Use a normal variable for stack memory and malloc() for heap memory.\"]",
        topic_id: 'c-p14-t1',
        course_id: 'c-programming'
      };
    case 189194:
      return {
        id: 189194,
        title: "Introduction to File Handling",
        description: "Write a C program to create a file and display a message indicating that the file was created successfully.",
        reference_output: "File Created Successfully",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    FILE *fp;\n\n    fp = fopen(\"sample.txt\", \"w\");\n\n    if(fp != NULL) {\n        printf(\"File Created Successfully\\n\");\n        fclose(fp);\n    }\n\n    return 0;\n}",
        hints: "[\"Use fopen() to create a file and fclose() to close it.\"]",
        topic_id: 'c-p15-t1',
        course_id: 'c-programming'
      };
    case 189201:
      return {
        id: 189201,
        title: "Error Handling in Files",
        description: "Write a C program to check whether a file exists before reading it.",
        reference_output: "File Opened Successfully",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    FILE *fp;\n\n    fp = fopen(\"sample.txt\", \"r\");\n\n    if(fp == NULL) {\n        printf(\"File Not Found\\n\");\n    }\n    else {\n        printf(\"File Opened Successfully\\n\");\n        fclose(fp);\n    }\n\n    return 0;\n}",
        hints: "[\"Verify that fopen() does not return NULL.\"]",
        topic_id: 'c-p15-t8',
        course_id: 'c-programming'
      };
    case 189066:
      return {
        id: 189066,
        title: "Second Largest Element",
        description: "Write a C program to find the second largest element in an array.",
        reference_output: "Second Largest Element = 45",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int arr[] = {12, 45, 7, 89, 34};\n    int largest = arr[0], second = arr[0], i;\n\n    for(i = 1; i < 5; i++) {\n        if(arr[i] > largest) {\n            second = largest;\n            largest = arr[i];\n        }\n        else if(arr[i] > second && arr[i] != largest) {\n            second = arr[i];\n        }\n    }\n\n    printf(\"Second Largest Element = %d\\n\", second);\n\n    return 0;\n}",
        hints: "[\"Track both the largest and second largest values while traversing the array.\"]",
        topic_id: 'c-p9-t8',
        course_id: 'c-programming'
      };
    case 189072:
      return {
        id: 189072,
        title: "Array of Strings",
        description: "Write a C program to store and display the names of 3 students using an array of strings.",
        reference_output: "Ravi\nSita\nKiran",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    char names[3][20] = {\n        \"Ravi\",\n        \"Sita\",\n        \"Kiran\"\n    };\n    int i;\n\n    for(i = 0; i < 3; i++) {\n        printf(\"%s\\n\", names[i]);\n    }\n\n    return 0;\n}",
        hints: "[\"Use a two-dimensional character array.\"]",
        topic_id: 'c-p10-t6',
        course_id: 'c-programming'
      };
    case 189073:
      return {
        id: 189073,
        title: "String Tokenization",
        description: "Write a C program to split a sentence into individual words using string tokenization.",
        reference_output: "C\nProgramming\nLanguage",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char str[] = \"C Programming Language\";\n    char *token = strtok(str, \" \");\n\n    while(token != NULL) {\n        printf(\"%s\\n\", token);\n        token = strtok(NULL, \" \");\n    }\n\n    return 0;\n}",
        hints: "[\"Use the strtok() function.\"]",
        topic_id: 'c-p10-t7',
        course_id: 'c-programming'
      };
    case 189151:
      return {
        id: 189151,
        title: "Pointer Arithmetic",
        description: "Write a C program to demonstrate pointer arithmetic by moving a pointer to the next element in an array.",
        reference_output: "First Element = 10\nSecond Element = 20",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int arr[] = {10, 20, 30};\n\n    int *ptr = arr;\n\n    printf(\"First Element = %d\\n\", *ptr);\n\n    ptr++;\n\n    printf(\"Second Element = %d\\n\", *ptr);\n\n    return 0;\n}",
        hints: "[\"Increment the pointer using ptr++.\"]",
        topic_id: 'c-p11-t5',
        course_id: 'c-programming'
      };
    case 189152:
      return {
        id: 189152,
        title: "NULL Pointers",
        description: "Write a C program to declare a NULL pointer and check whether it points to a valid memory location.",
        reference_output: "Pointer is NULL",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int *ptr = NULL;\n\n    if(ptr == NULL)\n        printf(\"Pointer is NULL\\n\");\n    else\n        printf(\"Pointer is not NULL\\n\");\n\n    return 0;\n}",
        hints: "[\"Use NULL to initialize a pointer that does not point anywhere.\"]",
        topic_id: 'c-p11-t6',
        course_id: 'c-programming'
      };
    case 189177:
      return {
        id: 189177,
        title: "Structure Declaration and Definition",
        description: "Write a C program to declare a structure for an employee and display the entered employee details.",
        reference_output: "Enter Employee ID: Enter Employee Name: ID: 1001\nName: Ravi",
        test_input: "1001 Ravi",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nstruct Employee {\n    int id;\n    char name[20];\n};\n\nint main() {\n    struct Employee emp;\n\n    printf(\"Enter Employee ID: \");\n    scanf(\"%d\", &emp.id);\n\n    printf(\"Enter Employee Name: \");\n    scanf(\"%s\", emp.name);\n\n    printf(\"ID: %d\\n\", emp.id);\n    printf(\"Name: %s\\n\", emp.name);\n\n    return 0;\n}",
        hints: "[\"Declare the structure globally and create a structure variable inside main().\"]",
        topic_id: 'c-p13-t2',
        course_id: 'c-programming'
      };
    case 189187:
      return {
        id: 189187,
        title: "malloc() Function",
        description: "Write a C program to dynamically allocate memory for 5 integers using malloc(), accept values from the user, and find their sum.",
        reference_output: "Enter 5 numbers:\nSum = 150",
        test_input: "10 20 30 40 50",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *arr, i, sum = 0;\n\n    arr = (int *)malloc(5 * sizeof(int));\n\n    printf(\"Enter 5 numbers:\\n\");\n\n    for(i = 0; i < 5; i++) {\n        scanf(\"%d\", &arr[i]);\n        sum += arr[i];\n    }\n\n    printf(\"Sum = %d\\n\", sum);\n\n    free(arr);\n\n    return 0;\n}",
        hints: "[\"Use malloc() to create an integer array at runtime.\"]",
        topic_id: 'c-p14-t2',
        course_id: 'c-programming'
      };
    case 189195:
      return {
        id: 189195,
        title: "Opening and Closing Files",
        description: "Write a C program to open an existing file and close it properly.",
        reference_output: "File Opened Successfully\nFile Closed Successfully",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    FILE *fp;\n\n    fp = fopen(\"sample.txt\", \"r\");\n\n    if(fp != NULL) {\n        printf(\"File Opened Successfully\\n\");\n        fclose(fp);\n        printf(\"File Closed Successfully\\n\");\n    }\n\n    return 0;\n}",
        hints: "[\"Always close files using fclose() after use.\"]",
        topic_id: 'c-p15-t2',
        course_id: 'c-programming'
      };
    case 189202:
      return {
        id: 189202,
        title: "Introduction to Preprocessor",
        description: "Write a C program to use a preprocessor directive to include the standard input-output library and display a message.",
        reference_output: "Welcome to Preprocessor Directives",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    printf(\"Welcome to Preprocessor Directives\\n\");\n\n    return 0;\n}",
        hints: "[\"Preprocessor directives begin with # and are processed before compilation.\"]",
        topic_id: 'c-p16-t1',
        course_id: 'c-programming'
      };
    case 189207:
      return {
        id: 189207,
        title: "Predefined Macros",
        description: "Write a C program to display the current file name and compilation date using predefined macros.",
        reference_output: "File Name: [File]\nCompilation Date: [Date]",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n\n    printf(\"File Name: %s\\n\", __FILE__);\n    printf(\"Compilation Date: %s\\n\", __DATE__);\n\n    return 0;\n}",
        hints: "[\"Use __FILE__ and __DATE__.\"]",
        topic_id: 'c-p16-t6',
        course_id: 'c-programming'
      };
    case 189238:
      return {
        id: 189238,
        title: "Bit Fields",
        description: "Write a C program to store a student's age and section using bit fields.",
        reference_output: "Age = 20\nSection = 2",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nstruct Student {\n    unsigned int age : 7;\n    unsigned int section : 3;\n};\n\nint main() {\n    struct Student s;\n\n    s.age = 20;\n    s.section = 2;\n\n    printf(\"Age = %u\\n\", s.age);\n    printf(\"Section = %u\\n\", s.section);\n\n    return 0;\n}",
        hints: "[\"Bit fields allow efficient memory usage inside structures.\"]",
        topic_id: 'c-p17-t3',
        course_id: 'c-programming'
      };
    case 189153:
      return {
        id: 189153,
        title: "Pointers and Arrays",
        description: "Write a C program to display all elements of an array using a pointer.",
        reference_output: "5 10 15 20 25 ",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int arr[] = {5, 10, 15, 20, 25};\n    int *ptr = arr;\n    int i;\n\n    for(i = 0; i < 5; i++) {\n        printf(\"%d \", *(ptr + i));\n    }\n\n    return 0;\n}",
        hints: "[\"Array names act as pointers to their first element.\"]",
        topic_id: 'c-p11-t7',
        course_id: 'c-programming'
      };
    case 189154:
      return {
        id: 189154,
        title: "Pointers and Functions",
        description: "Write a C program to swap two numbers using a function and pointers.",
        reference_output: "Before Swap: 10 20\nAfter Swap: 20 10",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n    int temp;\n\n    temp = *a;\n    *a = *b;\n    *b = temp;\n}\n\nint main() {\n    int x = 10, y = 20;\n\n    printf(\"Before Swap: %d %d\\n\", x, y);\n\n    swap(&x, &y);\n\n    printf(\"After Swap: %d %d\\n\", x, y);\n\n    return 0;\n}",
        hints: "[\"Pass the addresses of variables to the function and modify them using pointers.\"]",
        topic_id: 'c-p11-t8',
        course_id: 'c-programming'
      };
    case 189178:
      return {
        id: 189178,
        title: "Accessing Structure Members",
        description: "Write a C program to calculate the total price of a product using structure members.",
        reference_output: "Enter Product Name: Enter Quantity: Enter Price: Total Cost = 50.00",
        test_input: "Pen 10 5",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nstruct Product {\n    char name[20];\n    int quantity;\n    float price;\n};\n\nint main() {\n    struct Product p;\n\n    printf(\"Enter Product Name: \");\n    scanf(\"%s\", p.name);\n\n    printf(\"Enter Quantity: \");\n    scanf(\"%d\", &p.quantity);\n\n    printf(\"Enter Price: \");\n    scanf(\"%f\", &p.price);\n\n    printf(\"Total Cost = %.2f\\n\", p.quantity * p.price);\n\n    return 0;\n}",
        hints: "[\"Access structure members using the dot (.) operator.\"]",
        topic_id: 'c-p13-t3',
        course_id: 'c-programming'
      };
    case 189188:
      return {
        id: 189188,
        title: "calloc() Function",
        description: "Write a C program to dynamically allocate memory for 5 integers using calloc() and display the default values.",
        reference_output: "Values:\n0 0 0 0 0 ",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *arr, i;\n\n    arr = (int *)calloc(5, sizeof(int));\n\n    printf(\"Values:\\n\");\n\n    for(i = 0; i < 5; i++) {\n        printf(\"%d \", arr[i]);\n    }\n\n    free(arr);\n\n    return 0;\n}",
        hints: "[\"calloc() initializes allocated memory to zero.\"]",
        topic_id: 'c-p14-t3',
        course_id: 'c-programming'
      };
    case 189196:
      return {
        id: 189196,
        title: "File Modes",
        description: "Write a C program to demonstrate writing to a file using write mode (w).",
        reference_output: "Data Written Successfully",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    FILE *fp;\n\n    fp = fopen(\"data.txt\", \"w\");\n\n    fprintf(fp, \"Welcome to File Handling\");\n\n    fclose(fp);\n\n    printf(\"Data Written Successfully\\n\");\n\n    return 0;\n}",
        hints: "[\"Use \\\"w\\\" mode to create a new file or overwrite an existing file.\"]",
        topic_id: 'c-p15-t3',
        course_id: 'c-programming'
      };
    case 189203:
      return {
        id: 189203,
        title: "#include Directive",
        description: "Write a C program that uses the #include directive to include the math library and calculate the square root of a number.",
        reference_output: "Enter a number: Square Root = 5.00",
        test_input: "25",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <math.h>\n\nint main() {\n    int num;\n\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n\n    printf(\"Square Root = %.2f\\n\", sqrt(num));\n\n    return 0;\n}",
        hints: "[\"Include the appropriate header file and use a library function.\"]",
        topic_id: 'c-p16-t2',
        course_id: 'c-programming'
      };
    case 189208:
      return {
        id: 189208,
        title: "#undef and #pragma",
        description: "Write a C program to define a macro, undefine it using #undef, and then define it again with a different value.",
        reference_output: "Value = 20",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\n#define VALUE 10\n\n#undef VALUE\n\n#define VALUE 20\n\nint main() {\n\n    printf(\"Value = %d\\n\", VALUE);\n\n    return 0;\n}",
        hints: "[\"Use #undef before redefining a macro.\"]",
        topic_id: 'c-p16-t7',
        course_id: 'c-programming'
      };
    case 189239:
      return {
        id: 189239,
        title: "Enumerations Advanced",
        description: "Write a C program to create an enumeration for traffic signals and display the action based on user input.",
        reference_output: "1.RED 2.YELLOW 3.GREEN\nEnter Signal: GO",
        test_input: "3",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nenum Signal { RED = 1, YELLOW, GREEN };\n\nint main() {\n    int choice;\n\n    printf(\"1.RED 2.YELLOW 3.GREEN\\n\");\n    printf(\"Enter Signal: \");\n    scanf(\"%d\", &choice);\n\n    switch(choice) {\n        case RED:\n            printf(\"STOP\\n\");\n            break;\n        case YELLOW:\n            printf(\"WAIT\\n\");\n            break;\n        case GREEN:\n            printf(\"GO\\n\");\n            break;\n        default:\n            printf(\"Invalid Signal\\n\");\n    }\n\n    return 0;\n}",
        hints: "[\"Use enum values inside a switch statement.\"]",
        topic_id: 'c-p17-t4',
        course_id: 'c-programming'
      };
    case 189179:
      return {
        id: 189179,
        title: "Structure Initialization",
        description: "Write a C program to initialize a structure with book details and display them.",
        reference_output: "Title: C Programming\nPrice: 450.50",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nstruct Book {\n    char title[30];\n    float price;\n};\n\nint main() {\n    struct Book b = {\"C Programming\", 450.50};\n\n    printf(\"Title: %s\\n\", b.title);\n    printf(\"Price: %.2f\\n\", b.price);\n\n    return 0;\n}",
        hints: "[\"Assign values during structure declaration.\"]",
        topic_id: 'c-p13-t4',
        course_id: 'c-programming'
      };
    case 189189:
      return {
        id: 189189,
        title: "realloc() Function",
        description: "Write a C program to dynamically create an array of 3 integers, then increase its size to 5 integers using realloc() and accept the additional values.",
        reference_output: "Enter 3 numbers:\nEnter 2 more numbers:\nArray Elements: 10 20 30 40 50 ",
        test_input: "10 20 30 40 50",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *arr, i;\n\n    arr = (int *)malloc(3 * sizeof(int));\n\n    printf(\"Enter 3 numbers:\\n\");\n    for(i = 0; i < 3; i++) {\n        scanf(\"%d\", &arr[i]);\n    }\n\n    arr = (int *)realloc(arr, 5 * sizeof(int));\n\n    printf(\"Enter 2 more numbers:\\n\");\n    for(i = 3; i < 5; i++) {\n        scanf(\"%d\", &arr[i]);\n    }\n\n    printf(\"Array Elements: \");\n\n    for(i = 0; i < 5; i++) {\n        printf(\"%d \", arr[i]);\n    }\n\n    free(arr);\n\n    return 0;\n}",
        hints: "[\"Use realloc() to resize previously allocated memory.\"]",
        topic_id: 'c-p14-t4',
        course_id: 'c-programming'
      };
    case 189197:
      return {
        id: 189197,
        title: "Reading from Files",
        description: "Write a C program to read and display the contents of a file.",
        reference_output: "Welcome to File Handling",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    FILE *fp;\n    char ch;\n\n    fp = fopen(\"data.txt\", \"r\");\n\n    while((ch = fgetc(fp)) != EOF) {\n        printf(\"%c\", ch);\n    }\n\n    fclose(fp);\n\n    return 0;\n}",
        hints: "[\"Use fgetc() to read one character at a time.\"]",
        topic_id: 'c-p15-t4',
        course_id: 'c-programming'
      };
    case 189204:
      return {
        id: 189204,
        title: "#define Directive",
        description: "Write a C program to calculate the area of a circle using a symbolic constant defined with #define.",
        reference_output: "Enter radius: Area = 78.54",
        test_input: "5",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\n#define PI 3.14159\n\nint main() {\n    float radius;\n\n    printf(\"Enter radius: \");\n    scanf(\"%f\", &radius);\n\n    printf(\"Area = %.2f\\n\", PI * radius * radius);\n\n    return 0;\n}",
        hints: "[\"Use #define to create a constant value for PI.\"]",
        topic_id: 'c-p16-t3',
        course_id: 'c-programming'
      };
    case 189240:
      return {
        id: 189240,
        title: "Type Qualifiers",
        description: "Write a C program to demonstrate the use of the const qualifier by storing the value of PI.",
        reference_output: "PI = 3.14159",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    const float PI = 3.14159;\n\n    printf(\"PI = %.5f\\n\", PI);\n\n    return 0;\n}",
        hints: "[\"A const variable cannot be modified after initialization.\"]",
        topic_id: 'c-p17-t5',
        course_id: 'c-programming'
      };
    case 189242:
      return {
        id: 189242,
        title: "Multi-File Programs",
        description: "Write a C program split across multiple files to calculate the square of a number. (Note: Since we use an online editor, simulate it within a single main function as a logical split).",
        reference_output: "Enter Number: Square = 25",
        test_input: "5",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint square(int);\n\nint main() {\n    int num;\n\n    printf(\"Enter Number: \");\n    scanf(\"%d\", &num);\n\n    printf(\"Square = %d\\n\", square(num));\n\n    return 0;\n}\n\nint square(int n) {\n    return n * n;\n}",
        hints: "[\"Define the function in one file and call it from another.\"]",
        topic_id: 'c-p17-t7',
        course_id: 'c-programming'
      };
    case 18005:
      return {
        id: 18005,
        title: "Project 1: Calculator",
        description: "A Calculator is one of the most common applications used daily. It performs mathematical operations such as addition, subtraction, multiplication, and division.\n\nIn this project, students will create a command-line calculator using C programming. This project helps beginners understand how user input, conditional statements, and arithmetic operations work together.\n\n---\n\n**Real World Usage**\n\nCalculators are used in Mobile Phones, Computers, Banking Software, Billing Systems, Scientific Calculators, and Engineering Applications. Every advanced calculator starts with the same basic logic you will learn in this project.\n\n---\n\n**Features**\n\n*   **Addition**: Adds two numbers (e.g., 10 + 20 = 30)\n*   **Subtraction**: Subtracts one number from another (e.g., 20 - 10 = 10)\n*   **Multiplication**: (e.g., 5 × 4 = 20)\n*   **Division**: (e.g., 20 ÷ 5 = 4)\n\n---\n\n**How the Project Works**\n\n1.  User enters first number. (e.g., `10`)\n2.  User enters second number. (e.g., `5`)\n3.  User selects operation: `1.Add`, `2.Subtract`, `3.Multiply`, `4.Divide`\n4.  Program performs selected operation.\n5.  Result is displayed.\n\n<!-- SPLIT -->\n\n**Problem Statement**\n\nCreate a Calculator program that performs Addition, Subtraction, Multiplication, and Division. The user enters two numbers and selects an operation.\n\n**Note:** For division, if the second number is 0, print `Cannot divide by zero`. Otherwise, print the result in the format `Result = X.XX` (2 decimal places).",
        reference_output: "15",
        test_input: "10\\n5\\n1\\n",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main()\n{\n    float a,b;\n    int choice;\n\n    printf(\"Enter First Number: \");\n    scanf(\"%f\",&a);\n\n    printf(\"Enter Second Number: \");\n    scanf(\"%f\",&b);\n\n    printf(\"\\n1.Add\");\n    printf(\"\\n2.Subtract\");\n    printf(\"\\n3.Multiply\");\n    printf(\"\\n4.Divide\");\n\n    printf(\"\\nChoice: \");\n    scanf(\"%d\",&choice);\n\n    switch(choice)\n    {\n        case 1:\n            printf(\"Result = %.2f\",a+b);\n            break;\n\n        case 2:\n            printf(\"Result = %.2f\",a-b);\n            break;\n\n        case 3:\n            printf(\"Result = %.2f\",a*b);\n            break;\n\n        case 4:\n            if(b!=0)\n                printf(\"Result = %.2f\",a/b);\n            else\n                printf(\"Cannot divide by zero\");\n            break;\n\n        default:\n            printf(\"Invalid Choice\");\n    }\n\n    return 0;\n}",
        hints: "[\"Take two numbers from the user.\",\"Display operation choices.\",\"Use switch-case to determine the operation.\"]",
        topic_id: 'c-p18-t5',
        course_id: 'c-programming'
      };
    case 189116:
      return {
        id: 189116,
        title: "Project: Student Management System",
        description: "The Student Management System is a menu-driven application used to manage student records efficiently. It allows users to add, view, search, update, and delete student information.\n\nThis project simulates how educational institutions manage student data and introduces students to real-world data management concepts.\n\n---\n\n**Features**\n\n**Add Student**\n\nAllows users to enter and store new student records.\n\nExample:\n\nRoll No: 101\n\nName: Balu\n\nMarks: 95\n\nThe record is saved successfully.\n\n**Display Students**\n\nDisplays all stored student records in a tabular format.\n\nExample:\n\nRoll No    Name      Marks\n\n101        Balu      95\n\n102        Ram       89\n\n**Search Student**\n\nUsers can search for a student using the roll number.\n\nExample:\n\nEnter Roll Number: 101\n\nRecord Found\n\nRoll No: 101\n\nName: Balu\n\nMarks: 95\n\n**Update Student**\n\nAllows modification of existing student details.\n\nExample:\n\nSearch Roll Number: 101\n\nEnter New Name: Balu Kumar\n\nEnter New Marks: 98\n\nRecord Updated Successfully\n\n**Delete Student**\n\nRemoves a student record permanently.\n\nExample:\n\nEnter Roll Number: 101\n\nStudent Deleted Successfully\n\n---\n\n**How the Project Works**\n\n**Step 1**\n\nProgram starts and creates an array of student structures.\n\n**Step 2**\n\nMenu is displayed.\n\n1. Add Student\n2. Display Students\n3. Search Student\n4. Update Student\n5. Delete Student\n6. Exit\n\n**Step 3**\n\nUser selects an operation.\n\n**Step 4**\n\nProgram processes the request.\n\n**Step 5**\n\nUpdated records are displayed.\n\n<!-- SPLIT -->\n\n**Problem Statement**\n\nDevelop a Student Management System using C programming that performs the following operations:\n\n1. Add Student\n2. Display All Students\n3. Search Student\n4. Update Student Information\n5. Delete Student Record\n6. Exit Program\n\nEach student record should contain:\n\n* Roll Number\n* Name\n* Marks",
        reference_output: "Student Added Successfully",
        test_input: "1\\n591\\nBalu\\n93\\n6\\n",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int a = 10, b = 20;\n    printf(\"%d\\n\", a + b);\n    return 0;\n}",
        hints: "[\"Create a structure to store student information.\\\\n\\\\nstruct Student\\\\n{\\\\n    int roll;\\\\n    char name[50];\\\\n    float marks;\\\\n};\",\"Store multiple students using an array.\\\\n\\\\nstruct Student s[100];\",\"Use a menu-driven approach with a loop.\\\\n\\\\nwhile(1)\\\\n{\\\\n    // Menu\\\\n}\",\"Search students using Roll Number.\\\\n\\\\nfor(i=0;i<count;i++)\\\\n{\\\\n    if(s[i].roll==searchRoll)\\\\n    {\\\\n        // Found\\\\n    }\\\\n}\",\"For deletion, shift all records one position left.\\\\n\\\\nfor(i=index;i<count-1;i++)\\\\n{\\\\n    s[i]=s[i+1];\\\\n}\"]",
        topic_id: 'c-p18-t6',
        course_id: 'c-programming'
      };
    case 18007:
      return {
        id: 18007,
        title: "Project 3: Mini Text Editor",
        description: "# Project 3: Mini Text Editor\n\n## Project Overview\n\nA Text Editor is software used to create and edit text documents.\n\n**Examples:**\n* Notepad\n* Notepad++\n* VS Code\n* Sublime Text\n\nIn this project, students will build a simplified version of a text editor.\n\n---\n\n## Features\n\n### Enter Text\nSave text entered by user.\n\n### Display Text\nView saved content.\n\n### Count Characters\nCalculate total characters.\n\n### Clear Text\nRemove all content.\n\n---\n\n## How the Project Works\n\n**Step 1**\nUser enters text.\n*(Example: Hello World)*\n\n**Step 2**\nProgram stores text in a character array.\n\n**Step 3**\nUser selects menu option.\n*(Example: Display Text)*\n\n**Step 4**\nProgram shows stored text.\n\n**Step 5**\nAdditional operations can be performed.\n\n<!-- SPLIT -->\n\n## Problem Statement\n\nCreate a Mini Text Editor that allows users to perform the following operations using a menu-driven approach:\n\n1. Enter Text\n2. Display Text\n3. Count Characters\n4. Clear Text\n5. Exit\n\n---\n\n## Hints & Logic Guide\n\n**Hint 1**\nStore text in a character array (e.g., `char text[1000]`).\n\n**Hint 2**\nUse `strlen()` to count the number of characters.\n\n**Hint 3**\nUse a `switch-case` menu inside an infinite loop to handle user choices.\n\n---\n\n## Sample Input\n```text\n1.Enter Text\n2.Display Text\n3.Count Characters\n4.Clear Text\n5.Exit\n\nChoice: 1\n\nEnter Text: Hello World\n```\n\n## Sample Output\n```text\nSaved Successfully\n```\n",
        reference_output: "Saved Successfully",
        test_input: "1\\ntest.txt\\nHello World\\n5\\n",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <string.h>\n\nint main()\n{\n    char text[1000]=\"\";\n    int choice;\n\n    while(1)\n    {\n        printf(\"\\n\\n1.Enter Text\");\n        printf(\"\\n2.Display Text\");\n        printf(\"\\n3.Count Characters\");\n        printf(\"\\n4.Clear Text\");\n        printf(\"\\n5.Exit\");\n\n        printf(\"\\nChoice: \");\n        scanf(\"%d\",&choice);\n        getchar(); // consume newline\n\n        switch(choice)\n        {\n            case 1:\n                printf(\"Enter Text: \");\n                fgets(text,1000,stdin);\n                printf(\"Saved Successfully\");\n                break;\n\n            case 2:\n                printf(\"\\nText:\\n%s\",text);\n                break;\n\n            case 3:\n                printf(\"Characters = %d\", (int)strlen(text)-1);\n                break;\n\n            case 4:\n                strcpy(text,\"\");\n                printf(\"Text Cleared\");\n                break;\n\n            case 5:\n                return 0;\n\n            default:\n                printf(\"Invalid Choice\");\n        }\n    }\n}",
        hints: "[\"Use fopen() to open files in write ('w'), read ('r'), or append ('a') modes.\",\"Use remove() function to delete a file.\"]",
        topic_id: 'c-p18-t7',
        course_id: 'c-programming'
      };
    default:
      return null;
  }
};

const getFallbackChallengeByTopicId = (topicId) => {
  switch (topicId) {
    case 'c-syntax-rules':
      return {
        id: 189000,
        title: "Print Hello World",
        description: "Write a program that prints \"Hello, World!\" to the console.",
        reference_output: "Hello, World!",
        test_input: "None",
        test_args: [],
        starter_code: "",
        solution_code: "",
        hints: "Use printf function\\nDon't forget the newline character",
        topic_id: 'c-syntax-rules',
        course_id: 'c-programming'
      };
    case 'c-p1-t4':
      return {
        id: 189005,
        title: "Hello, World!",
        description: "Write a standard 'Hello, World!' program.",
        reference_output: "Hello, World!",
        test_input: "None",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello, World!\");\n    return 0;\n}",
        hints: "[]",
        topic_id: 'c-p1-t4',
        course_id: 'c-programming'
      };
    case 'c-p2-t4':
      return {
        id: 189121,
        title: "Mastery Challenge",
        description: "Write a C program to demonstrate the use of type modifiers (short, long, unsigned) by declaring variables and displaying their values.",
        reference_output: "Short Integer = 100\nLong Integer = 100000\nUnsigned Integer = 500",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    short int a = 100;\n    long int b = 100000;\n    unsigned int c = 500;\n\n    printf(\"Short Integer = %d\\n\", a);\n    printf(\"Long Integer = %ld\\n\", b);\n    printf(\"Unsigned Integer = %u\\n\", c);\n\n    return 0;\n}",
        hints: "Use type modifiers with integer data types to change their range and storage capacity.",
        topic_id: 'c-p2-t4',
        course_id: 'c-programming'
      };
    case 'c-p2-t1':
      return {
        id: 189118,
        title: "Mastery Challenge",
        description: "Write a C program that declares variables of different basic data types and displays their values.",
        reference_output: "Age = 20\nHeight = 5.8\nSalary = 25000.50\nGrade = A",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main()\n{\n    int age = 20;\n    float height = 5.8;\n    double salary = 25000.50;\n    char grade = 'A';\n\n    printf(\"Age = %d\\n\", age);\n    printf(\"Height = %.1f\\n\", height);\n    printf(\"Salary = %.2lf\\n\", salary);\n    printf(\"Grade = %c\\n\", grade);\n\n    return 0;\n}",
        hints: "Declare variables using int, float, double, and char, then display their values using the appropriate format specifiers.",
        topic_id: 'c-p2-t1',
        course_id: 'c-programming'
      };
    case 'c-p2-t6':
      return {
        id: 189123,
        title: "Mastery Challenge",
        description: "Write a C program to demonstrate type conversion and type casting by converting an integer value to a float and displaying the result.",
        reference_output: "Integer Value = 10\nFloat Value = 10.00",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int num = 10;\n\n    float result = (float)num;\n\n    printf(\"Integer Value = %d\\n\", num);\n    printf(\"Float Value = %.2f\\n\", result);\n\n    return 0;\n}",
        hints: "Use a type cast to convert one data type into another before performing calculations.",
        topic_id: 'c-p2-t6',
        course_id: 'c-programming'
      };
    case 'c-p3-t2':
      return {
        id: 189127,
        title: "Mastery Challenge",
        description: "Write a C program to compare two integers using relational operators and display the results.",
        reference_output: "a > b  = 0\na < b  = 1\na >= b = 0\na <= b = 1\na == b = 0\na != b = 1",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int a = 10, b = 20;\n\n    printf(\"a > b  = %d\\n\", a > b);\n    printf(\"a < b  = %d\\n\", a < b);\n    printf(\"a >= b = %d\\n\", a >= b);\n    printf(\"a <= b = %d\\n\", a <= b);\n    printf(\"a == b = %d\\n\", a == b);\n    printf(\"a != b = %d\\n\", a != b);\n\n    return 0;\n}",
        hints: "Use relational operators (>, <, >=, <=, ==, !=) to compare two values.",
        topic_id: 'c-p3-t2',
        course_id: 'c-programming'
      };
    case 'c-p3-t5':
      return {
        id: 189130,
        title: "Mastery Challenge",
        description: "Write a C program to demonstrate the use of increment (++) and decrement (--) operators on an integer variable.",
        reference_output: "Initial Value = 10\nAfter Increment = 11\nAfter Decrement = 10",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int a = 10;\n\n    printf(\"Initial Value = %d\\n\", a);\n\n    a++;\n    printf(\"After Increment = %d\\n\", a);\n\n    a--;\n    printf(\"After Decrement = %d\\n\", a);\n\n    return 0;\n}",
        hints: "Use ++ to increase a variable's value by 1 and -- to decrease it by 1.",
        topic_id: 'c-p3-t5',
        course_id: 'c-programming'
      };
    case 'c-p5-t3':
      return {
        id: 189031,
        title: "Leap Year Checker",
        description: "Write a C program to check whether a year entered by the user is a leap year or not using nested if-else statements.",
        reference_output: "Enter a year: Leap Year",
        test_input: "2024",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int year;\n\n    printf(\"Enter a year: \");\n    scanf(\"%d\", &year);\n\n    if (year % 4 == 0) {\n        if (year % 100 == 0) {\n            if (year % 400 == 0) {\n                printf(\"Leap Year\\n\");\n            } else {\n                printf(\"Not a Leap Year\\n\");\n            }\n        } else {\n            printf(\"Leap Year\\n\");\n        }\n    } else {\n        printf(\"Not a Leap Year\\n\");\n    }\n\n    return 0;\n}",
        hints: "[\"A leap year is divisible by 4. If it is divisible by 100, then it must also be divisible by 400.\"]",
        topic_id: 'c-p5-t3',
        course_id: 'c-programming'
      };
    case 'c-p5-t1':
      return {
        id: 189029,
        title: "Check Positive Number",
        description: "Write a C program to read a number from the user and check whether it is positive using an if statement.",
        reference_output: "Enter a number: The number is positive.",
        test_input: "5",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int num;\n\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n\n    if (num > 0) {\n        printf(\"The number is positive.\\n\");\n    }\n\n    return 0;\n}",
        hints: "[\"Accept a number using scanf()\",\"Use an if statement to check if it is greater than zero.\",\"Use printf to output the exact message.\"]",
        topic_id: 'c-p5-t1',
        course_id: 'c-programming'
      };
    case 'c-p5-t6':
      return {
        id: 189034,
        title: "Print Numbers using goto",
        description: "Write a C program to demonstrate the use of the goto statement by printing numbers from 1 to 5.",
        reference_output: "1 2 3 4 5 ",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int i = 1;\n\nstart:\n    printf(\"%d \", i);\n    i++;\n\n    if (i <= 5)\n        goto start;\n\n    return 0;\n}",
        hints: "[\"Use a label and the goto statement to repeatedly execute a block of code until a condition becomes false.\"]",
        topic_id: 'c-p5-t6',
        course_id: 'c-programming'
      };
    case 'c-p6-t4':
      return {
        id: 189039,
        title: "Number Pattern",
        description: "Write a C program to print the following number pattern using nested loops.",
        reference_output: "1 \n1 2 \n1 2 3 \n1 2 3 4 \n1 2 3 4 5 \n",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int i, j;\n\n    for (i = 1; i <= 5; i++) {\n        for (j = 1; j <= i; j++) {\n            printf(\"%d \", j);\n        }\n        printf(\"\\n\");\n    }\n\n    return 0;\n}",
        hints: "[\"Use the outer loop for rows and the inner loop to print numbers from 1 to the current row number.\"]",
        topic_id: 'c-p6-t4',
        course_id: 'c-programming'
      };
    case 'c-p11-t2':
      return {
        id: 189148,
        title: "Pointer Declaration",
        description: "Write a C program to declare a pointer, assign it the address of a variable, and display the value using the pointer.",
        reference_output: "Age = 20",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int age = 20;\n    int *ptr;\n\n    ptr = &age;\n\n    printf(\"Age = %d\\n\", *ptr);\n\n    return 0;\n}",
        hints: "[\"Use * to declare a pointer variable.\"]",
        topic_id: 'c-p11-t2',
        course_id: 'c-programming'
      };
    case 'c-p11-t4':
      return {
        id: 189150,
        title: "Dereference Operator (*)",
        description: "Write a C program to access and display the value stored at a memory address using the dereference (*) operator.",
        reference_output: "Value = 50",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int num = 50;\n    int *ptr = &num;\n\n    printf(\"Value = %d\\n\", *ptr);\n\n    return 0;\n}",
        hints: "[\"Use *pointer_name to access the value pointed to by a pointer.\"]",
        topic_id: 'c-p11-t4',
        course_id: 'c-programming'
      };
    case 'c-p3-t7':
      return {
        id: 189132,
        title: "Mastery Challenge",
        description: "Write a C program to find the larger of two numbers using the conditional (ternary) operator.",
        reference_output: "Larger Number = 20",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int a = 15, b = 20;\n\n    int max = (a > b) ? a : b;\n\n    printf(\"Larger Number = %d\\n\", max);\n\n    return 0;\n}",
        hints: "Use the ? : operator to choose between two values based on a condition.",
        topic_id: 'c-p3-t7',
        course_id: 'c-programming'
      };
    case 'c-p12-t1':
      return {
        id: 189169,
        title: "Pointer to Pointer",
        description: "Write a C program to demonstrate a pointer to a pointer and display the value of a variable using a double pointer.",
        reference_output: "Value = 10",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int num = 10;\n    int *ptr = &num;\n    int **dptr = &ptr;\n\n    printf(\"Value = %d\\n\", **dptr);\n\n    return 0;\n}",
        hints: "[\"A pointer to a pointer stores the address of another pointer.\"]",
        topic_id: 'c-p12-t1',
        course_id: 'c-programming'
      };
    case 'c-p7-t6':
      return {
        id: 189049,
        title: "Demonstrate Pass By Value",
        description: "Write a C program to demonstrate Pass By Value by creating a function that attempts to modify a variable. Display the value before and after the function call.",
        reference_output: "Before Function Call = 50\nInside Function = 100\nAfter Function Call = 50",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nvoid changeValue(int num) {\n    num = 100;\n    printf(\"Inside Function = %d\\n\", num);\n}\n\nint main() {\n    int num = 50;\n\n    printf(\"Before Function Call = %d\\n\", num);\n\n    changeValue(num);\n\n    printf(\"After Function Call = %d\\n\", num);\n\n    return 0;\n}",
        hints: "[\"In pass by value, a copy of the variable is passed to the function, so changes inside the function do not affect the original variable.\"]",
        topic_id: 'c-p7-t6',
        course_id: 'c-programming'
      };
    case 'c-p12-t5':
      return {
        id: 189173,
        title: "Callback Functions",
        description: "Write a C program to calculate the square of a number entered by the user using a callback function.",
        reference_output: "Enter a number: Square = 25",
        test_input: "5",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nvoid square(int num) {\n    printf(\"Square = %d\\n\", num * num);\n}\n\nvoid execute(void (*func)(int), int value) {\n    func(value);\n}\n\nint main() {\n    int num;\n\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n\n    execute(square, num);\n\n    return 0;\n}",
        hints: "[\"Pass a function pointer as an argument and invoke it inside another function.\"]",
        topic_id: 'c-p12-t5',
        course_id: 'c-programming'
      };
    case 'c-p9-t1':
      return {
        id: 189059,
        title: "Average Marks Using Array",
        description: "Write a C program to store the marks of 5 students in an array and calculate the average marks.",
        reference_output: "Average Marks = 79.00",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int marks[5] = {75, 80, 65, 90, 85};\n    int sum = 0, i;\n    float average;\n\n    for(i = 0; i < 5; i++) {\n        sum += marks[i];\n    }\n\n    average = sum / 5.0;\n\n    printf(\"Average Marks = %.2f\\n\", average);\n\n    return 0;\n}",
        hints: "[\"Store multiple marks using an array and use a loop to calculate their sum before finding the average.\"]",
        topic_id: 'c-p9-t1',
        course_id: 'c-programming'
      };
    case 'c-p13-t5':
      return {
        id: 189180,
        title: "Nested Structures",
        description: "Write a C program to store student information along with address details using nested structures.",
        reference_output: "Enter Name: Enter City: Name: Balu\nCity: Kakinada",
        test_input: "Balu Kakinada",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nstruct Address {\n    char city[20];\n};\n\nstruct Student {\n    char name[20];\n    struct Address addr;\n};\n\nint main() {\n    struct Student s;\n\n    printf(\"Enter Name: \");\n    scanf(\"%s\", s.name);\n\n    printf(\"Enter City: \");\n    scanf(\"%s\", s.addr.city);\n\n    printf(\"Name: %s\\n\", s.name);\n    printf(\"City: %s\\n\", s.addr.city);\n\n    return 0;\n}",
        hints: "[\"Create one structure inside another structure.\"]",
        topic_id: 'c-p13-t5',
        course_id: 'c-programming'
      };
    case 'c-p8-t3':
      return {
        id: 189054,
        title: "Demonstrate Local Scope",
        description: "Write a C program to demonstrate variable scope by using a local variable inside a function and showing that it cannot be accessed outside the function.",
        reference_output: "Inside Function: 10",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nvoid display() {\n    int x = 10;   // Local Variable\n    printf(\"Inside Function: %d\\n\", x);\n}\n\nint main() {\n    display();\n\n    return 0;\n}",
        hints: "[\"A local variable is accessible only within the function in which it is declared.\"]",
        topic_id: 'c-p8-t3',
        course_id: 'c-programming'
      };
    case 'c-p9-t3':
      return {
        id: 189061,
        title: "Find Largest Element",
        description: "Write a C program to find the largest element in an array.",
        reference_output: "Largest Element = 89",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int arr[5] = {12, 45, 7, 89, 34};\n    int largest = arr[0];\n    int i;\n\n    for(i = 1; i < 5; i++) {\n        if(arr[i] > largest)\n            largest = arr[i];\n    }\n\n    printf(\"Largest Element = %d\\n\", largest);\n\n    return 0;\n}",
        hints: "[\"Assume the first element is the largest and compare it with the remaining elements.\"]",
        topic_id: 'c-p9-t3',
        course_id: 'c-programming'
      };
    case 'c-p9-t6':
      return {
        id: 189064,
        title: "Array Sum Function",
        description: "Write a C program to pass an array to a function and find the sum of all elements.",
        reference_output: "Sum = 150",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint findSum(int arr[], int size) {\n    int i, sum = 0;\n    for(i = 0; i < size; i++) {\n        sum += arr[i];\n    }\n    return sum;\n}\n\nint main() {\n    int arr[] = {10, 20, 30, 40, 50};\n    printf(\"Sum = %d\\n\", findSum(arr, 5));\n    return 0;\n}",
        hints: "[\"Pass the array and its size as function arguments.\"]",
        topic_id: 'c-p9-t6',
        course_id: 'c-programming'
      };
    case 'c-p10-t4':
      return {
        id: 189070,
        title: "Find String Length",
        description: "Write a C program to find the length of a string using a string library function.",
        reference_output: "Length = 11",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char str[] = \"Programming\";\n\n    printf(\"Length = %lu\\n\", strlen(str));\n\n    return 0;\n}",
        hints: "[\"Use the strlen() function from <string.h>.\"]",
        topic_id: 'c-p10-t4',
        course_id: 'c-programming'
      };
    case 'c-p14-t5':
      return {
        id: 189190,
        title: "free() Function",
        description: "Write a C program to dynamically allocate memory for an integer, store a value, display it, and release the memory using free().",
        reference_output: "Value = 100",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *ptr;\n\n    ptr = (int *)malloc(sizeof(int));\n\n    *ptr = 100;\n\n    printf(\"Value = %d\\n\", *ptr);\n\n    free(ptr);\n\n    return 0;\n}",
        hints: "[\"Always free dynamically allocated memory when it is no longer needed.\"]",
        topic_id: 'c-p14-t5',
        course_id: 'c-programming'
      };
    case 'c-p15-t5':
      return {
        id: 189198,
        title: "Writing to Files",
        description: "Write a C program to accept a student's name and marks from the user and store them in a file.",
        reference_output: "Enter Name: Enter Marks: Record Saved Successfully",
        test_input: "Balu 95",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    FILE *fp;\n    char name[20];\n    int marks;\n\n    fp = fopen(\"student.txt\", \"w\");\n\n    printf(\"Enter Name: \");\n    scanf(\"%s\", name);\n\n    printf(\"Enter Marks: \");\n    scanf(\"%d\", &marks);\n\n    fprintf(fp, \"%s %d\", name, marks);\n\n    fclose(fp);\n\n    printf(\"Record Saved Successfully\\n\");\n\n    return 0;\n}",
        hints: "[\"Use fprintf() to write formatted data into a file.\"]",
        topic_id: 'c-p15-t5',
        course_id: 'c-programming'
      };
    case 'c-p10-t1':
      return {
        id: 189067,
        title: "Displaying a String",
        description: "Write a C program to store a string and display it.",
        reference_output: "Name: Balu",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    char name[] = \"Balu\";\n\n    printf(\"Name: %s\\n\", name);\n\n    return 0;\n}",
        hints: "[\"A string is a character array ending with the null character (\\\\0).\"]",
        topic_id: 'c-p10-t1',
        course_id: 'c-programming'
      };
    case 'c-p11-t1':
      return {
        id: 189147,
        title: "Introduction to Pointers",
        description: "Write a C program to store an integer value and display it using a pointer.",
        reference_output: "Value = 25",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int num = 25;\n    int *ptr = &num;\n\n    printf(\"Value = %d\\n\", *ptr);\n\n    return 0;\n}",
        hints: "[\"Create a pointer that stores the address of a variable and access the value through the pointer.\"]",
        topic_id: 'c-p11-t1',
        course_id: 'c-programming'
      };
    case 'c-p11-t3':
      return {
        id: 189149,
        title: "Address-of Operator (&)",
        description: "Write a C program to display the memory address of a variable using the address-of (&) operator.",
        reference_output: "Address of num = [Address]",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int num = 100;\n\n    printf(\"Address of num = %p\\n\", (void*)&num);\n\n    return 0;\n}",
        hints: "[\"Use &variable_name to obtain the memory address.\"]",
        topic_id: 'c-p11-t3',
        course_id: 'c-programming'
      };
    case 'c-p12-t2':
      return {
        id: 189170,
        title: "Array of Pointers",
        description: "Write a C program to store names using an array of pointers and display them.",
        reference_output: "Ravi\nSita\nKiran",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    char *names[] = {\"Ravi\", \"Sita\", \"Kiran\"};\n\n    for(int i = 0; i < 3; i++) {\n        printf(\"%s\\n\", names[i]);\n    }\n\n    return 0;\n}",
        hints: "[\"Each element of the array stores the address of a string.\"]",
        topic_id: 'c-p12-t2',
        course_id: 'c-programming'
      };
    case 'c-p13-t6':
      return {
        id: 189181,
        title: "Array of Structures",
        description: "Write a C program to store details of 3 students and find the student with the highest marks.",
        reference_output: "Enter Name and Marks: Enter Name and Marks: Enter Name and Marks: \nTop Student: Balu",
        test_input: "Ravi 80 Balu 95 Sita 88",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nstruct Student {\n    char name[20];\n    float marks;\n};\n\nint main() {\n    struct Student s[3];\n    int i, max = 0;\n\n    for(i = 0; i < 3; i++) {\n        printf(\"Enter Name and Marks: \");\n        scanf(\"%s %f\", s[i].name, &s[i].marks);\n    }\n\n    for(i = 1; i < 3; i++) {\n        if(s[i].marks > s[max].marks)\n            max = i;\n    }\n\n    printf(\"\\nTop Student: %s\\n\", s[max].name);\n\n    return 0;\n}",
        hints: "[\"Use an array of structures and compare marks.\"]",
        topic_id: 'c-p13-t6',
        course_id: 'c-programming'
      };
    case 'c-p14-t6':
      return {
        id: 189191,
        title: "Memory Leaks",
        description: "Write a C program that properly allocates and releases memory to avoid memory leaks.",
        reference_output: "Value = 50",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *ptr;\n\n    ptr = (int *)malloc(sizeof(int));\n\n    *ptr = 50;\n\n    printf(\"Value = %d\\n\", *ptr);\n\n    free(ptr);\n\n    ptr = NULL;\n\n    return 0;\n}",
        hints: "[\"Every successful malloc() should eventually have a matching free().\"]",
        topic_id: 'c-p14-t6',
        course_id: 'c-programming'
      };
    case 'c-p15-t6':
      return {
        id: 189199,
        title: "Binary File Operations",
        description: "Write a C program to store an integer in a binary file and read it back.",
        reference_output: "Value = 100",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    FILE *fp;\n    int num = 100, value;\n\n    fp = fopen(\"number.dat\", \"wb\");\n\n    fwrite(&num, sizeof(int), 1, fp);\n\n    fclose(fp);\n\n    fp = fopen(\"number.dat\", \"rb\");\n\n    fread(&value, sizeof(int), 1, fp);\n\n    printf(\"Value = %d\\n\", value);\n\n    fclose(fp);\n\n    return 0;\n}",
        hints: "[\"Use fwrite() and fread().\"]",
        topic_id: 'c-p15-t6',
        course_id: 'c-programming'
      };
    case 'c-p16-t4':
      return {
        id: 189205,
        title: "Macro Functions",
        description: "Write a C program to find the larger of two numbers using a macro function.",
        reference_output: "Enter two numbers: Largest = 25",
        test_input: "15 25",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\n#define MAX(a,b) ((a) > (b) ? (a) : (b))\n\nint main() {\n    int x, y;\n\n    printf(\"Enter two numbers: \");\n    scanf(\"%d %d\", &x, &y);\n\n    printf(\"Largest = %d\\n\", MAX(x, y));\n\n    return 0;\n}",
        hints: "[\"Create a macro that compares two values and returns the larger one.\"]",
        topic_id: 'c-p16-t4',
        course_id: 'c-programming'
      };
    case 'c-p17-t1':
      return {
        id: 189236,
        title: "Command-Line Arguments",
        description: "Write a C program to accept a student's name and marks through command-line arguments and display them.",
        reference_output: "Student Name: Balu\nMarks: 95",
        test_input: "",
        test_args: ["Balu","95"],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main(int argc, char *argv[]) {\n\n    printf(\"Student Name: %s\\n\", argv[1]);\n    printf(\"Marks: %s\\n\", argv[2]);\n\n    return 0;\n}",
        hints: "[\"Use argc and argv to access command-line arguments.\"]",
        topic_id: 'c-p17-t1',
        course_id: 'c-programming'
      };
    case 'c-p17-t6':
      return {
        id: 189241,
        title: "Variable Scope and Lifetime",
        description: "Write a C program to demonstrate the difference between a local variable and a static variable.",
        reference_output: "Count = 1\nCount = 2\nCount = 3",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nvoid counter() {\n    static int count = 0;\n\n    count++;\n\n    printf(\"Count = %d\\n\", count);\n}\n\nint main() {\n\n    counter();\n    counter();\n    counter();\n\n    return 0;\n}",
        hints: "[\"A static variable retains its value between function calls.\"]",
        topic_id: 'c-p17-t6',
        course_id: 'c-programming'
      };
    case 'c-p12-t3':
      return {
        id: 189171,
        title: "Pointer to Array",
        description: "Write a C program to access array elements using a pointer to an array.",
        reference_output: "10 20 30",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int arr[3] = {10, 20, 30};\n\n    int (*ptr)[3] = &arr;\n\n    printf(\"%d %d %d\\n\",\n           (*ptr)[0],\n           (*ptr)[1],\n           (*ptr)[2]);\n\n    return 0;\n}",
        hints: "[\"A pointer can point to the entire array instead of a single element.\"]",
        topic_id: 'c-p12-t3',
        course_id: 'c-programming'
      };
    case 'c-p13-t7':
      return {
        id: 189182,
        title: "Pointers to Structures",
        description: "Write a C program to access structure members using a structure pointer.",
        reference_output: "Enter Name: Name: Balu",
        test_input: "Balu",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nstruct Student {\n    char name[20];\n};\n\nint main() {\n    struct Student s;\n    struct Student *ptr = &s;\n\n    printf(\"Enter Name: \");\n    scanf(\"%s\", ptr->name);\n\n    printf(\"Name: %s\\n\", ptr->name);\n\n    return 0;\n}",
        hints: "[\"Use the arrow (->) operator.\"]",
        topic_id: 'c-p13-t7',
        course_id: 'c-programming'
      };
    case 'c-p5-t2':
      return {
        id: 189030,
        title: "Check Positive or Negative",
        description: "Write a C program to check whether a number entered by the user is positive or negative using an if-else statement.",
        reference_output: "Enter a number: The number is positive.",
        test_input: "5",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int num;\n\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n\n    if (num >= 0) {\n        printf(\"The number is positive.\\n\");\n    } else {\n        printf(\"The number is negative.\\n\");\n    }\n\n    return 0;\n}",
        hints: "[\"Use an if-else statement to execute one block when the condition is true and another when it is false.\"]",
        topic_id: 'c-p5-t2',
        course_id: 'c-programming'
      };
    case 'c-p6-t2':
      return {
        id: 189037,
        title: "Multiplication Table",
        description: "Write a C program to generate the multiplication table of a number using a do-while loop.",
        reference_output: "Enter a number: 5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n5 x 10 = 50",
        test_input: "5",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int num, i = 1;\n\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n\n    do {\n        printf(\"%d x %d = %d\\n\", num, i, num * i);\n        i++;\n    } while (i <= 10);\n\n    return 0;\n}",
        hints: "[\"Start from 1 and repeatedly multiply the entered number by the counter until 10.\"]",
        topic_id: 'c-p6-t2',
        course_id: 'c-programming'
      };
    case 'c-p5-t4':
      return {
        id: 189032,
        title: "Largest of Three Numbers",
        description: "Write a C program to find the largest of three numbers using an else-if ladder.",
        reference_output: "Enter three numbers: 25 is the largest number.",
        test_input: "10 20 30",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int a, b, c;\n\n    printf(\"Enter three numbers: \");\n    scanf(\"%d %d %d\", &a, &b, &c);\n\n    if (a >= b && a >= c) {\n        printf(\"%d is the largest number.\\n\", a);\n    }\n    else if (b >= a && b >= c) {\n        printf(\"%d is the largest number.\\n\", b);\n    }\n    else {\n        printf(\"%d is the largest number.\\n\", c);\n    }\n\n    return 0;\n}",
        hints: "[\"Compare the three numbers using multiple conditions and print the largest one.\"]",
        topic_id: 'c-p5-t4',
        course_id: 'c-programming'
      };
    case 'c-p6-t3':
      return {
        id: 189038,
        title: "Even Numbers",
        description: "Write a C program to print all even numbers from 1 to 20 using a for loop.",
        reference_output: "2 4 6 8 10 12 14 16 18 20 ",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int i;\n\n    for (i = 2; i <= 20; i += 2) {\n        printf(\"%d \", i);\n    }\n\n    return 0;\n}",
        hints: "[\"Start the loop from 2 and increment by 2 in each iteration.\"]",
        topic_id: 'c-p6-t3',
        course_id: 'c-programming'
      };
    case 'c-p5-t7':
      return {
        id: 189035,
        title: "Uppercase or Lowercase",
        description: "Write a C program to check whether a character entered by the user is an uppercase letter or a lowercase letter using the conditional (ternary) operator.",
        reference_output: "Enter a character: Uppercase Letter",
        test_input: "a",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    char ch;\n\n    printf(\"Enter a character: \");\n    scanf(\"%c\", &ch);\n\n    (ch >= 'A' && ch <= 'Z')\n        ? printf(\"Uppercase Letter\\n\")\n        : printf(\"Lowercase Letter\\n\");\n\n    return 0;\n}",
        hints: "[\"Compare the character with the range \\\\'A\\\\' to \\\\'Z\\\\' and use the ternary operator to display the result.\"]",
        topic_id: 'c-p5-t7',
        course_id: 'c-programming'
      };
    case 'c-p6-t6':
      return {
        id: 189041,
        title: "Skip a Number",
        description: "Write a C program to print numbers from 1 to 10, skipping the number 5 using the continue statement.",
        reference_output: "1 2 3 4 6 7 8 9 10 ",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int i;\n\n    for (i = 1; i <= 10; i++) {\n        if (i == 5) {\n            continue;\n        }\n        printf(\"%d \", i);\n    }\n\n    return 0;\n}",
        hints: "[\"Use continue to skip the current iteration when a specific condition is met.\"]",
        topic_id: 'c-p6-t6',
        course_id: 'c-programming'
      };
    case 'c-p6-t8':
      return {
        id: 189043,
        title: "Optimize Sum Calculation",
        description: "Write a C program to calculate the sum of numbers from 1 to N using a loop. Optimize the program by avoiding unnecessary calculations inside the loop.",
        reference_output: "Enter Number: Sum = 15\n",
        test_input: "4",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int n, i, sum = 0;\n\n    printf(\"Enter Number: \");\n    scanf(\"%d\", &n);\n\n    for (i = 1; i <= n; i++) {\n        sum += i;\n    }\n\n    printf(\"Sum = %d\\n\", sum);\n\n    return 0;\n}",
        hints: "[\"Perform only the required operation inside the loop and avoid repeating calculations that can be done once outside the loop.\"]",
        topic_id: 'c-p6-t8',
        course_id: 'c-programming'
      };
    case 'c-p7-t2':
      return {
        id: 189045,
        title: "Calculate Square Function",
        description: "Write a C program to declare and define a function that calculates the square of a number and displays the result.",
        reference_output: "Square = 25",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\n/* Function Declaration */\nint square(int);\n\nint main() {\n    int num = 5;\n\n    printf(\"Square = %d\\n\", square(num));\n\n    return 0;\n}\n\n/* Function Definition */\nint square(int n) {\n    return n * n;\n}",
        hints: "[\"Declare the function before main(), define it after main(), and call it from main().\"]",
        topic_id: 'c-p7-t2',
        course_id: 'c-programming'
      };
    case 'c-p7-t4':
      return {
        id: 189047,
        title: "Largest of Two Numbers",
        description: "Write a C program to create a function that returns the larger of two numbers using the return statement.",
        reference_output: "Enter two numbers: Largest Number = 25",
        test_input: "15 25",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint findMax(int a, int b) {\n    if (a > b)\n        return a;\n    else\n        return b;\n}\n\nint main() {\n    int num1, num2;\n\n    printf(\"Enter two numbers: \");\n    scanf(\"%d %d\", &num1, &num2);\n\n    printf(\"Largest Number = %d\\n\", findMax(num1, num2));\n\n    return 0;\n}",
        hints: "[\"Use the return statement to send a value from the function back to the calling function.\"]",
        topic_id: 'c-p7-t4',
        course_id: 'c-programming'
      };
    case 'c-p7-t5':
      return {
        id: 189048,
        title: "Add Two Numbers via Parameters",
        description: "Write a C program to create a function that accepts two numbers as parameters and returns their sum.",
        reference_output: "Enter two numbers: Sum = 30",
        test_input: "10 20",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint add(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    int num1, num2;\n\n    printf(\"Enter two numbers: \");\n    scanf(\"%d %d\", &num1, &num2);\n\n    printf(\"Sum = %d\\n\", add(num1, num2));\n\n    return 0;\n}",
        hints: "[\"Pass values to the function through parameters and use them inside the function.\"]",
        topic_id: 'c-p7-t5',
        course_id: 'c-programming'
      };
    case 'c-p12-t4':
      return {
        id: 189172,
        title: "Function Pointers",
        description: "Write a C program to add two numbers entered by the user using a function pointer.",
        reference_output: "Enter two numbers: Sum = 30",
        test_input: "10 20",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint add(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    int a, b;\n\n    printf(\"Enter two numbers: \");\n    scanf(\"%d %d\", &a, &b);\n\n    int (*ptr)(int, int) = add;\n\n    printf(\"Sum = %d\\n\", ptr(a, b));\n\n    return 0;\n}",
        hints: "[\"Store the address of the addition function in a function pointer and call it.\"]",
        topic_id: 'c-p12-t4',
        course_id: 'c-programming'
      };
    case 'c-p13-t8':
      return {
        id: 189183,
        title: "Structures and Functions",
        description: "Write a C program to pass a structure to a function and calculate the percentage of a student.",
        reference_output: "Enter Name: Enter Percentage: Percentage = 92.50%",
        test_input: "Balu 92.5",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nstruct Student {\n    char name[20];\n    float marks;\n};\n\nvoid display(struct Student s) {\n    printf(\"Percentage = %.2f%%\\n\", s.marks);\n}\n\nint main() {\n    struct Student s;\n\n    printf(\"Enter Name: \");\n    scanf(\"%s\", s.name);\n\n    printf(\"Enter Percentage: \");\n    scanf(\"%f\", &s.marks);\n\n    display(s);\n\n    return 0;\n}",
        hints: "[\"Pass the structure variable as a function argument.\"]",
        topic_id: 'c-p13-t8',
        course_id: 'c-programming'
      };
    case 'c-p14-t7':
      return {
        id: 189192,
        title: "Dynamic Arrays",
        description: "Write a C program to create a dynamic array of size N, accept elements from the user, and find the largest element.",
        reference_output: "Enter size: Enter elements:\nLargest Element = 67",
        test_input: "5 12 45 8 67 23",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n, i;\n    int *arr;\n\n    printf(\"Enter size: \");\n    scanf(\"%d\", &n);\n\n    arr = (int *)malloc(n * sizeof(int));\n\n    printf(\"Enter elements:\\n\");\n\n    for(i = 0; i < n; i++) {\n        scanf(\"%d\", &arr[i]);\n    }\n\n    int max = arr[0];\n\n    for(i = 1; i < n; i++) {\n        if(arr[i] > max)\n            max = arr[i];\n    }\n\n    printf(\"Largest Element = %d\\n\", max);\n\n    free(arr);\n\n    return 0;\n}",
        hints: "[\"Allocate memory according to the size entered by the user.\"]",
        topic_id: 'c-p14-t7',
        course_id: 'c-programming'
      };
    case 'c-p7-t8':
      return {
        id: 189051,
        title: "Calculate Square in Void Function",
        description: "Write a C program to create a void function that finds and displays the square of a number entered by the user.",
        reference_output: "Enter a number: Square = 36",
        test_input: "6",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nvoid findSquare(int num) {\n    printf(\"Square = %d\\n\", num * num);\n}\n\nint main() {\n    int num;\n\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n\n    findSquare(num);\n\n    return 0;\n}",
        hints: "[\"Use a void function to calculate the square and print the result directly without returning a value.\"]",
        topic_id: 'c-p7-t8',
        course_id: 'c-programming'
      };
    case 'c-p8-t6':
      return {
        id: 189057,
        title: "Inline Function Cube Calculator",
        description: "Write a C program to demonstrate an inline function that calculates the cube of a number.",
        reference_output: "Enter a number: Cube = 64",
        test_input: "4",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nstatic inline int cube(int n) {\n    return n * n * n;\n}\n\nint main() {\n    int num;\n\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n\n    printf(\"Cube = %d\\n\", cube(num));\n\n    return 0;\n}",
        hints: "[\"Create an inline function that returns the cube of the given number.\"]",
        topic_id: 'c-p8-t6',
        course_id: 'c-programming'
      };
    case 'c-p9-t2':
      return {
        id: 189060,
        title: "Initialize and Display Even Numbers",
        description: "Write a C program to initialize an array with the first 10 even numbers and display them.",
        reference_output: "Even Numbers: 2 4 6 8 10 12 14 16 18 20 ",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int even[10] = {2,4,6,8,10,12,14,16,18,20};\n    int i;\n\n    printf(\"Even Numbers: \");\n\n    for(i = 0; i < 10; i++) {\n        printf(\"%d \", even[i]);\n    }\n\n    return 0;\n}",
        hints: "[\"Initialize the array while declaring it and use a loop to print all elements.\"]",
        topic_id: 'c-p9-t2',
        course_id: 'c-programming'
      };
    case 'c-p8-t4':
      return {
        id: 189055,
        title: "Count Function Calls with Static Variable",
        description: "Write a C program to demonstrate the use of the static storage class by counting the number of times a function is called.",
        reference_output: "Function called 1 time(s)\nFunction called 2 time(s)\nFunction called 3 time(s)",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nvoid countCalls() {\n    static int count = 0;\n\n    count++;\n    printf(\"Function called %d time(s)\\n\", count);\n}\n\nint main() {\n    countCalls();\n    countCalls();\n    countCalls();\n\n    return 0;\n}",
        hints: "[\"A static variable retains its value between function calls.\"]",
        topic_id: 'c-p8-t4',
        course_id: 'c-programming'
      };
    case 'c-p9-t4':
      return {
        id: 189062,
        title: "Reverse Array Input",
        description: "Write a C program to accept 5 numbers from the user and display them in reverse order.",
        reference_output: "Enter 5 numbers:\nNumbers in Reverse Order: 50 40 30 20 10 ",
        test_input: "10\\n20\\n30\\n40\\n50",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int arr[5], i;\n\n    printf(\"Enter 5 numbers:\\n\");\n\n    for(i = 0; i < 5; i++) {\n        scanf(\"%d\", &arr[i]);\n    }\n\n    printf(\"Numbers in Reverse Order: \");\n\n    for(i = 4; i >= 0; i--) {\n        printf(\"%d \", arr[i]);\n    }\n\n    return 0;\n}",
        hints: "[\"Store the numbers in an array and use a loop from the last index to the first index.\"]",
        topic_id: 'c-p9-t4',
        course_id: 'c-programming'
      };
    case 'c-p9-t7':
      return {
        id: 189065,
        title: "Insert Element in Array",
        description: "Write a C program to insert an element at a specified position in an array.",
        reference_output: "Array After Insertion: 10 20 25 30 40 50 ",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int arr[10] = {10, 20, 30, 40, 50};\n    int size = 5, pos = 3, value = 25, i;\n\n    for(i = size; i >= pos; i--) {\n        arr[i] = arr[i - 1];\n    }\n    arr[pos - 1] = value;\n    size++;\n\n    printf(\"Array After Insertion: \");\n    for(i = 0; i < size; i++) {\n        printf(\"%d \", arr[i]);\n    }\n\n    return 0;\n}",
        hints: "[\"Shift elements to the right before inserting the new element.\"]",
        topic_id: 'c-p9-t7',
        course_id: 'c-programming'
      };
    case 'c-p10-t5':
      return {
        id: 189071,
        title: "Concatenate Two Strings",
        description: "Write a C program to concatenate two strings and display the result.",
        reference_output: "Hello World",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char first[30] = \"Hello \";\n    char second[] = \"World\";\n\n    strcat(first, second);\n\n    printf(\"%s\\n\", first);\n\n    return 0;\n}",
        hints: "[\"Use the strcat() function.\"]",
        topic_id: 'c-p10-t5',
        course_id: 'c-programming'
      };
    case 'c-p10-t3':
      return {
        id: 189069,
        title: "String Input with fgets()",
        description: "Write a C program to accept a name from the user and display a welcome message.",
        reference_output: "Enter your name: Welcome Ajith\n",
        test_input: "Ajith",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    char name[50];\n\n    printf(\"Enter your name: \");\n    fgets(name, sizeof(name), stdin);\n\n    printf(\"Welcome %s\", name);\n\n    return 0;\n}",
        hints: "[\"Use fgets() to read a string containing spaces.\"]",
        topic_id: 'c-p10-t3',
        course_id: 'c-programming'
      };
    case 'c-p10-t8':
      return {
        id: 189074,
        title: "String to Integer Conversion",
        description: "Write a C program to convert a numeric string into an integer and display the result.",
        reference_output: "Number = 1234",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    char str[] = \"1234\";\n    int num = atoi(str);\n    printf(\"Number = %d\\n\", num);\n    return 0;\n}",
        hints: "[\"Use the atoi() function.\"]",
        topic_id: 'c-p10-t8',
        course_id: 'c-programming'
      };
    case 'c-p10-t2':
      return {
        id: 189068,
        title: "Declare and Initialize City Name",
        description: "Write a C program to declare and initialize a string representing a city name and display it.",
        reference_output: "City: Hyderabad",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    char city[] = \"Hyderabad\";\n\n    printf(\"City: %s\\n\", city);\n\n    return 0;\n}",
        hints: "[\"Initialize the string at the time of declaration.\"]",
        topic_id: 'c-p10-t2',
        course_id: 'c-programming'
      };
    case 'c-p12-t6':
      return {
        id: 189174,
        title: "void Pointers",
        description: "Write a C program to accept an integer from the user, store its address in a void pointer, and display the value.",
        reference_output: "Enter a number: Value = 25",
        test_input: "25",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int num;\n\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n\n    void *ptr = &num;\n\n    printf(\"Value = %d\\n\", *(int *)ptr);\n\n    return 0;\n}",
        hints: "[\"A void pointer must be type-cast before dereferencing.\"]",
        topic_id: 'c-p12-t6',
        course_id: 'c-programming'
      };
    case 'c-p13-t9':
      return {
        id: 189184,
        title: "Unions",
        description: "Write a C program to demonstrate how a union shares memory between members.",
        reference_output: "Number = 100\nValue = 25.50",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nunion Data {\n    int num;\n    float value;\n};\n\nint main() {\n    union Data d;\n\n    d.num = 100;\n    printf(\"Number = %d\\n\", d.num);\n\n    d.value = 25.5;\n    printf(\"Value = %.2f\\n\", d.value);\n\n    return 0;\n}",
        hints: "[\"Assign values to different union members one after another and observe the output.\"]",
        topic_id: 'c-p13-t9',
        course_id: 'c-programming'
      };
    case 'c-p14-t8':
      return {
        id: 189193,
        title: "Dynamic Structures",
        description: "Write a C program to dynamically allocate memory for a student structure and display the entered student details.",
        reference_output: "Enter Name: Enter Roll Number: \nStudent Details\nName: Balu\nRoll No: 101",
        test_input: "Balu 101",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Student {\n    char name[20];\n    int rollNo;\n};\n\nint main() {\n    struct Student *s;\n\n    s = (struct Student *)malloc(sizeof(struct Student));\n\n    printf(\"Enter Name: \");\n    scanf(\"%s\", s->name);\n\n    printf(\"Enter Roll Number: \");\n    scanf(\"%d\", &s->rollNo);\n\n    printf(\"\\nStudent Details\\n\");\n    printf(\"Name: %s\\n\", s->name);\n    printf(\"Roll No: %d\\n\", s->rollNo);\n\n    free(s);\n\n    return 0;\n}",
        hints: "[\"Use malloc() with a structure pointer.\"]",
        topic_id: 'c-p14-t8',
        course_id: 'c-programming'
      };
    case 'c-p15-t7':
      return {
        id: 189200,
        title: "File Positioning",
        description: "Write a C program to move the file pointer to a specific position and read a character.",
        reference_output: "Character = m",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    FILE *fp;\n    char ch;\n\n    fp = fopen(\"data.txt\", \"r\");\n\n    fseek(fp, 5, SEEK_SET);\n\n    ch = fgetc(fp);\n\n    printf(\"Character = %c\\n\", ch);\n\n    fclose(fp);\n\n    return 0;\n}",
        hints: "[\"Use fseek() to reposition the file pointer.\"]",
        topic_id: 'c-p15-t7',
        course_id: 'c-programming'
      };
    case 'c-p16-t5':
      return {
        id: 189206,
        title: "Conditional Compilation",
        description: "Write a C program that displays a debugging message only when a macro named DEBUG is defined.",
        reference_output: "Debug Mode Enabled\nProgram Executed",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\n#define DEBUG\n\nint main() {\n\n#ifdef DEBUG\n    printf(\"Debug Mode Enabled\\n\");\n#endif\n\n    printf(\"Program Executed\\n\");\n\n    return 0;\n}",
        hints: "[\"Use #ifdef and #endif.\"]",
        topic_id: 'c-p16-t5',
        course_id: 'c-programming'
      };
    case 'c-p17-t2':
      return {
        id: 189237,
        title: "Bit Manipulation Techniques",
        description: "Write a C program to check whether the 3rd bit of a number is ON or OFF.",
        reference_output: "Enter a number: 3rd Bit is ON",
        test_input: "5",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int num;\n\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n\n    if(num & (1 << 2))\n        printf(\"3rd Bit is ON\\n\");\n    else\n        printf(\"3rd Bit is OFF\\n\");\n\n    return 0;\n}",
        hints: "[\"Use bitwise AND (&) with a bit mask.\"]",
        topic_id: 'c-p17-t2',
        course_id: 'c-programming'
      };
    case 'c-p2-t2':
      return {
        id: 189119,
        title: "Mastery Challenge",
        description: "Write a C program to declare variables of different data types (int, float, and char), initialize them with values, and display the values.",
        reference_output: "Age = 20\nHeight = 5.8\nGrade = A",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int age = 20;\n    float height = 5.8;\n    char grade = 'A';\n\n    printf(\"Age = %d\\n\", age);\n    printf(\"Height = %.1f\\n\", height);\n    printf(\"Grade = %c\\n\", grade);\n\n    return 0;\n}",
        hints: "Declare variables and assign values to them at the time of declaration before printing.",
        topic_id: 'c-p2-t2',
        course_id: 'c-programming'
      };
    case 'c-p2-t3':
      return {
        id: 189120,
        title: "Mastery Challenge",
        description: "Write a C program to demonstrate the use of constants and literals by declaring a constant value for PI and displaying it along with different numeric and character literals.",
        reference_output: "PI = 3.14159\nInteger Literal = 100\nFloat Literal = 25.75\nCharacter Literal = A",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    const float PI = 3.14159;\n\n    printf(\"PI = %.5f\\n\", PI);\n    printf(\"Integer Literal = %d\\n\", 100);\n    printf(\"Float Literal = %.2f\\n\", 25.75);\n    printf(\"Character Literal = %c\\n\", 'A');\n\n    return 0;\n}",
        hints: "Use the const keyword to declare a constant and directly use literals in printf() statements.",
        topic_id: 'c-p2-t3',
        course_id: 'c-programming'
      };
    case 'c-p2-t5':
      return {
        id: 189122,
        title: "Mastery Challenge",
        description: "Write a C program to find and display the memory size (in bytes) of different data types using the sizeof operator.",
        reference_output: "Size of int = 4 bytes\nSize of float = 4 bytes\nSize of char = 1 bytes\nSize of double = 8 bytes",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    printf(\"Size of int = %zu bytes\\n\", sizeof(int));\n    printf(\"Size of float = %zu bytes\\n\", sizeof(float));\n    printf(\"Size of char = %zu bytes\\n\", sizeof(char));\n    printf(\"Size of double = %zu bytes\\n\", sizeof(double));\n\n    return 0;\n}",
        hints: "Use the sizeof operator with data types or variables to determine their memory size.",
        topic_id: 'c-p2-t5',
        course_id: 'c-programming'
      };
    case 'c-p2-t7':
      return {
        id: 189124,
        title: "Mastery Challenge",
        description: "Write a C program to create an enumeration for the days of the week and display the value of a selected day.",
        reference_output: "Value of WEDNESDAY = 3",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nenum Day {\n    SUNDAY,\n    MONDAY,\n    TUESDAY,\n    WEDNESDAY,\n    THURSDAY,\n    FRIDAY,\n    SATURDAY\n};\n\nint main() {\n    enum Day today = WEDNESDAY;\n\n    printf(\"Value of WEDNESDAY = %d\\n\", today);\n\n    return 0;\n}",
        hints: "Use the enum keyword to define a set of named integer constants.",
        topic_id: 'c-p2-t7',
        course_id: 'c-programming'
      };
    case 'c-p3-t1':
      return {
        id: 189126,
        title: "Mastery Challenge",
        description: "Write a C program to perform arithmetic operations (addition, subtraction, multiplication, division, and modulus) on two integers and display the results.",
        reference_output: "Addition = 25\nSubtraction = 15\nMultiplication = 100\nDivision = 4\nModulus = 0",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int a = 20, b = 5;\n\n    printf(\"Addition = %d\\n\", a + b);\n    printf(\"Subtraction = %d\\n\", a - b);\n    printf(\"Multiplication = %d\\n\", a * b);\n    printf(\"Division = %d\\n\", a / b);\n    printf(\"Modulus = %d\\n\", a % b);\n\n    return 0;\n}",
        hints: "Use arithmetic operators +, -, *, /, and % to perform calculations.",
        topic_id: 'c-p3-t1',
        course_id: 'c-programming'
      };
    case 'c-p3-t3':
      return {
        id: 189128,
        title: "Mastery Challenge",
        description: "Write a C program to demonstrate the use of logical operators (&&, ||, !) by evaluating logical expressions.",
        reference_output: "(a < b && b > 15) = 1\n(a > b || b > 15) = 1\n!(a > b) = 1",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int a = 10, b = 20;\n\n    printf(\"(a < b && b > 15) = %d\\n\", (a < b && b > 15));\n    printf(\"(a > b || b > 15) = %d\\n\", (a > b || b > 15));\n    printf(\"!(a > b) = %d\\n\", !(a > b));\n\n    return 0;\n}",
        hints: "Use logical operators to combine or negate relational expressions.",
        topic_id: 'c-p3-t3',
        course_id: 'c-programming'
      };
    case 'c-p3-t4':
      return {
        id: 189129,
        title: "Mastery Challenge",
        description: "Write a C program to demonstrate the use of assignment operators (=, +=, -=, *=, /=, %=) on an integer variable and display the results.",
        reference_output: "After += : 15\nAfter -= : 12\nAfter *= : 24\nAfter /= : 6\nAfter %= : 0",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int a = 10;\n\n    a += 5;\n    printf(\"After += : %d\\n\", a);\n\n    a -= 3;\n    printf(\"After -= : %d\\n\", a);\n\n    a *= 2;\n    printf(\"After *= : %d\\n\", a);\n\n    a /= 4;\n    printf(\"After /= : %d\\n\", a);\n\n    a %= 3;\n    printf(\"After %%= : %d\\n\", a);\n\n    return 0;\n}",
        hints: "Use compound assignment operators to update the value of a variable.",
        topic_id: 'c-p3-t4',
        course_id: 'c-programming'
      };
    case 'c-p3-t6':
      return {
        id: 189131,
        title: "Mastery Challenge",
        description: "Write a C program to demonstrate the use of bitwise operators (&, |, ^, ~) on two integer values and display the results.",
        reference_output: "a & b = 1\na | b = 7\na ^ b = 6\n~a = -6",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int a = 5, b = 3;\n\n    printf(\"a & b = %d\\n\", a & b);\n    printf(\"a | b = %d\\n\", a | b);\n    printf(\"a ^ b = %d\\n\", a ^ b);\n    printf(\"~a = %d\\n\", ~a);\n\n    return 0;\n}",
        hints: "Use bitwise operators to perform operations directly on the binary representation of integers.",
        topic_id: 'c-p3-t6',
        course_id: 'c-programming'
      };
    case 'c-p12-t7':
      return {
        id: 189175,
        title: "const Pointers",
        description: "Write a C program to accept a number from the user and display it using a pointer to a constant.",
        reference_output: "Enter a number: Value = 100",
        test_input: "100",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int num;\n\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n\n    const int *ptr = &num;\n\n    printf(\"Value = %d\\n\", *ptr);\n\n    return 0;\n}",
        hints: "[\"A pointer to a constant can access the value but cannot modify it through the pointer.\"]",
        topic_id: 'c-p12-t7',
        course_id: 'c-programming'
      };
    case 'c-p4-t1':
      return {
        id: 189134,
        title: "Mastery Challenge",
        description: "Write a C program to display a student's name, age, and percentage using the printf() function.\n\nVariables provided:\n- name (char[]): \"Alice\"\n- age (int): 20\n- percentage (float): 85.5",
        reference_output: "Name: Alice\nAge: 20\nPercentage: 85.5",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\\n\\nint main() {\\n    char name[] = \"Alice\";\\n    int age = 20;\\n    float percentage = 85.5;\\n\\n    printf(\"Name: %s\\\\n\", name);\\n    printf(\"Age: %d\\\\n\", age);\\n    printf(\"Percentage: %.1f\\\\n\", percentage);\\n\\n    return 0;\\n}",
        hints: "Use the printf() function with appropriate format specifiers to display different types of data.",
        topic_id: 'c-p4-t1',
        course_id: 'c-programming'
      };
    case 'c-p13-t10':
      return {
        id: 189185,
        title: "typedef Keyword",
        description: "Write a C program to create a new data type for a structure using typedef and display employee details.",
        reference_output: "Enter ID: Enter Name: ID: 101\nName: Balu",
        test_input: "101 Balu",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\ntypedef struct {\n    int id;\n    char name[20];\n} Employee;\n\nint main() {\n    Employee emp;\n\n    printf(\"Enter ID: \");\n    scanf(\"%d\", &emp.id);\n\n    printf(\"Enter Name: \");\n    scanf(\"%s\", emp.name);\n\n    printf(\"ID: %d\\n\", emp.id);\n    printf(\"Name: %s\\n\", emp.name);\n\n    return 0;\n}",
        hints: "[\"Use typedef to avoid writing struct repeatedly.\"]",
        topic_id: 'c-p13-t10',
        course_id: 'c-programming'
      };
    case 'c-p4-t2':
      return {
        id: 189138,
        title: "Mastery Challenge",
        description: "Write a C program to read an integer from the user using the scanf() function and display the entered value.",
        reference_output: "Enter a number: You entered: 25",
        test_input: "25",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\\n\\nint main() {\\n    int num;\\n\\n    printf(\"Enter a number: \");\\n    scanf(\"%d\", &num);\\n\\n    printf(\"You entered: %d\\\\n\", num);\\n\\n    return 0;\\n}",
        hints: "Use scanf() with the appropriate format specifier to accept input from the user.",
        topic_id: 'c-p4-t2',
        course_id: 'c-programming'
      };
    case 'c-p4-t6':
      return {
        id: 189143,
        title: "Mastery Challenge",
        description: "Write a C program to display a student's name, roll number, and marks using formatted output.",
        reference_output: "Student Details\n---------------\nName       : Ishan\nRoll No    : 101\nMarks      : 89.5",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    char name[] = \"Ishan\";\n    int rollNo = 101;\n    float marks = 89.5;\n\n    printf(\"Student Details\\n\");\n    printf(\"---------------\\n\");\n    printf(\"Name       : %s\\n\", name);\n    printf(\"Roll No    : %d\\n\", rollNo);\n    printf(\"Marks      : %.1f\\n\", marks);\n\n    return 0;\n}",
        hints: "Use printf() with format specifiers to display data in a well-structured format.",
        topic_id: 'c-p4-t6',
        course_id: 'c-programming'
      };
    case 'c-p4-t5':
      return {
        id: 189145,
        title: "Mastery Challenge",
        description: "Write a C program to read a string from the user using gets() and display it using puts().",
        reference_output: "Enter a string: You entered: Welcome To CS Studio",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    char str[100];\n\n    printf(\"Enter a string: \");\n    gets(str);\n\n    printf(\"You entered: \");\n    puts(str);\n\n    return 0;\n}",
        hints: "Use gets() to accept a string and puts() to display it.",
        topic_id: 'c-p4-t5',
        course_id: 'c-programming'
      };
    case 'c-p6-t1':
      return {
        id: 189036,
        title: "Count Digits",
        description: "Write a C program to count the number of digits in an integer using a while loop.",
        reference_output: "Enter a number: Number of digits = 5",
        test_input: "5",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int num, count = 0;\n\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n\n    while (num != 0) {\n        count++;\n        num = num / 10;\n    }\n\n    printf(\"Number of digits = %d\\n\", count);\n\n    return 0;\n}",
        hints: "[\"Repeatedly divide the number by 10 until it becomes 0 and count the iterations.\"]",
        topic_id: 'c-p6-t1',
        course_id: 'c-programming'
      };
    case 'c-p6-t5':
      return {
        id: 189040,
        title: "Stop at Zero",
        description: "Write a C program to accept numbers from the user continuously and stop the program when the user enters 0 using the break statement.",
        reference_output: "Enter a number (0 to stop): You entered: 15\nEnter a number (0 to stop): You entered: 25\nEnter a number (0 to stop): Program terminated.\n",
        test_input: "1\\n2\\n3\\n0",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int num;\n\n    while (1) {\n        printf(\"Enter a number (0 to stop): \");\n        scanf(\"%d\", &num);\n\n        if (num == 0) {\n            break;\n        }\n\n        printf(\"You entered: %d\\n\", num);\n    }\n\n    printf(\"Program terminated.\\n\");\n\n    return 0;\n}",
        hints: "[\"Use an infinite loop and terminate it with break when the entered number is 0.\"]",
        topic_id: 'c-p6-t5',
        course_id: 'c-programming'
      };
    case 'c-p4-t4':
      return {
        id: 189144,
        title: "Mastery Challenge",
        description: "Write a C program to read a character using getchar() and display it using putchar().",
        reference_output: "Enter a character: You entered: A",
        test_input: "A",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    char ch;\n\n    printf(\"Enter a character: \");\n    ch = getchar();\n\n    printf(\"You entered: \");\n    putchar(ch);\n\n    return 0;\n}",
        hints: "Use getchar() to accept a single character from the user and putchar() to display it.",
        topic_id: 'c-p4-t4',
        course_id: 'c-programming'
      };
    case 'c-p5-t5':
      return {
        id: 189033,
        title: "Menu Driven Program",
        description: "Write a C program to display the corresponding menu item based on the user's choice using a switch statement.",
        reference_output: "Menu\n1. Pizza\n2. Burger\n3. Sandwich\n4. Pasta\nEnter your choice: You selected Sandwich.",
        test_input: "2",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int choice;\n\n    printf(\"Menu\\n\");\n    printf(\"1. Pizza\\n\");\n    printf(\"2. Burger\\n\");\n    printf(\"3. Sandwich\\n\");\n    printf(\"4. Pasta\\n\");\n\n    printf(\"Enter your choice: \");\n    scanf(\"%d\", &choice);\n\n    switch (choice) {\n        case 1:\n            printf(\"You selected Pizza.\\n\");\n            break;\n        case 2:\n            printf(\"You selected Burger.\\n\");\n            break;\n        case 3:\n            printf(\"You selected Sandwich.\\n\");\n            break;\n        case 4:\n            printf(\"You selected Pasta.\\n\");\n            break;\n        default:\n            printf(\"Invalid Choice\\n\");\n    }\n\n    return 0;\n}",
        hints: "[\"Use a switch statement to match the entered choice with a menu option.\"]",
        topic_id: 'c-p5-t5',
        course_id: 'c-programming'
      };
    case 'c-p7-t1':
      return {
        id: 189146,
        title: "Display Welcome Message",
        description: "Write a C program to create and call a user-defined function that displays a welcome message.",
        reference_output: "Welcome to Functions in C!",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nvoid displayMessage() {\n    printf(\"Welcome to Functions in C!\\n\");\n}\n\nint main() {\n    displayMessage();\n\n    return 0;\n}",
        hints: "[\"Define a function outside main() and call it from main().\"]",
        topic_id: 'c-p7-t1',
        course_id: 'c-programming'
      };
    case 'c-p7-t3':
      return {
        id: 189046,
        title: "Add Two Numbers Function",
        description: "Write a C program to create a function that adds two numbers and call the function from main() to display the result.",
        reference_output: "Sum = 30",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint add(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    int result;\n\n    result = add(10, 20);   // Function Call\n\n    printf(\"Sum = %d\\n\", result);\n\n    return 0;\n}",
        hints: "[\"Pass values to the function when calling it and use the returned value.\"]",
        topic_id: 'c-p7-t3',
        course_id: 'c-programming'
      };
    case 'c-p8-t1':
      return {
        id: 189052,
        title: "Factorial Using Recursion",
        description: "Write a C program to find the factorial of a number using recursion.",
        reference_output: "Enter a number: Factorial = 120",
        test_input: "5",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint factorial(int n) {\n    if (n == 0 || n == 1)\n        return 1;\n    else\n        return n * factorial(n - 1);\n}\n\nint main() {\n    int num;\n\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n\n    printf(\"Factorial = %d\\n\", factorial(num));\n\n    return 0;\n}",
        hints: "[\"A recursive function calls itself. Define a base case to stop the recursion.\"]",
        topic_id: 'c-p8-t1',
        course_id: 'c-programming'
      };
    case 'c-p8-t2':
      return {
        id: 189053,
        title: "Recursive vs Iterative Factorial",
        description: "Write a C program to calculate the factorial of a number using an iterative approach and compare it with a recursive approach by displaying both results.",
        reference_output: "Enter a number: Iterative Factorial = 120\nRecursive Factorial = 120",
        test_input: "5",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint recursiveFactorial(int n) {\n    if (n <= 1)\n        return 1;\n    return n * recursiveFactorial(n - 1);\n}\n\nint main() {\n    int num, i;\n    int iterativeFact = 1;\n\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n\n    for (i = 1; i <= num; i++) {\n        iterativeFact *= i;\n    }\n\n    printf(\"Iterative Factorial = %d\\n\", iterativeFact);\n    printf(\"Recursive Factorial = %d\\n\", recursiveFactorial(num));\n\n    return 0;\n}",
        hints: "[\"Use a loop for the iterative method and a function that calls itself for the recursive method.\"]",
        topic_id: 'c-p8-t2',
        course_id: 'c-programming'
      };
    case 'c-p8-t5':
      return {
        id: 189056,
        title: "Static Variable Retention",
        description: "Write a C program to demonstrate the use of a static variable inside a function. Call the function multiple times and display how the variable retains its value between calls.",
        reference_output: "Count = 1\nCount = 2\nCount = 3",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nvoid increment() {\n    static int count = 0;\n\n    count++;\n    printf(\"Count = %d\\n\", count);\n}\n\nint main() {\n    increment();\n    increment();\n    increment();\n\n    return 0;\n}",
        hints: "[\"A static variable is initialized only once and preserves its value across function calls.\"]",
        topic_id: 'c-p8-t5',
        course_id: 'c-programming'
      };
    case 'c-p8-t7':
      return {
        id: 189058,
        title: "Variable-Length Argument List Summation",
        description: "Write a C program to demonstrate Variable-Length Argument Lists by creating a function that calculates the sum of multiple numbers passed as arguments.",
        reference_output: "Sum = 100",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <stdarg.h>\n\nint sum(int count, ...) {\n    va_list args;\n    int total = 0;\n\n    va_start(args, count);\n\n    for (int i = 0; i < count; i++) {\n        total += va_arg(args, int);\n    }\n\n    va_end(args);\n\n    return total;\n}\n\nint main() {\n    printf(\"Sum = %d\\n\", sum(4, 10, 20, 30, 40));\n\n    return 0;\n}",
        hints: "[\"Use the macros va_list, va_start(), va_arg(), and va_end() from the <stdarg.h> header file.\"]",
        topic_id: 'c-p8-t7',
        course_id: 'c-programming'
      };
    case 'c-p9-t5':
      return {
        id: 189063,
        title: "2D Array Total Marks",
        description: "Write a C program to store marks of 3 students in 3 subjects and calculate the total marks of each student.",
        reference_output: "Student 1 Total = 245\nStudent 2 Total = 220\nStudent 3 Total = 275",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int marks[3][3] = {\n        {80, 75, 90},\n        {65, 70, 85},\n        {95, 88, 92}\n    };\n    int i, j, total;\n\n    for(i = 0; i < 3; i++) {\n        total = 0;\n        for(j = 0; j < 3; j++) {\n            total += marks[i][j];\n        }\n        printf(\"Student %d Total = %d\\n\", i + 1, total);\n    }\n\n    return 0;\n}",
        hints: "[\"Use a 2D array where rows represent students and columns represent subjects.\"]",
        topic_id: 'c-p9-t5',
        course_id: 'c-programming'
      };
    case 'c-p13-t1':
      return {
        id: 189176,
        title: "Introduction to Structures",
        description: "Write a C program to store and display a student's name, roll number, and marks using a structure.",
        reference_output: "Enter Name: Enter Roll Number: Enter Marks: \nStudent Details\nName: Balu\nRoll No: 101\nMarks: 89.50",
        test_input: "Balu 101 89.5",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nstruct Student {\n    char name[20];\n    int rollNo;\n    float marks;\n};\n\nint main() {\n    struct Student s;\n\n    printf(\"Enter Name: \");\n    scanf(\"%s\", s.name);\n\n    printf(\"Enter Roll Number: \");\n    scanf(\"%d\", &s.rollNo);\n\n    printf(\"Enter Marks: \");\n    scanf(\"%f\", &s.marks);\n\n    printf(\"\\nStudent Details\\n\");\n    printf(\"Name: %s\\n\", s.name);\n    printf(\"Roll No: %d\\n\", s.rollNo);\n    printf(\"Marks: %.2f\\n\", s.marks);\n\n    return 0;\n}",
        hints: "[\"Use a structure to group related data of a student.\"]",
        topic_id: 'c-p13-t1',
        course_id: 'c-programming'
      };
    case 'c-p14-t1':
      return {
        id: 189186,
        title: "Stack vs Heap Memory",
        description: "Write a C program to store a number using both a normal variable (stack memory) and a dynamically allocated variable (heap memory), then display both values.",
        reference_output: "Stack Value = 10\nHeap Value = 20",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int stackVar = 10;\n\n    int *heapVar = (int *)malloc(sizeof(int));\n    *heapVar = 20;\n\n    printf(\"Stack Value = %d\\n\", stackVar);\n    printf(\"Heap Value = %d\\n\", *heapVar);\n\n    free(heapVar);\n\n    return 0;\n}",
        hints: "[\"Use a normal variable for stack memory and malloc() for heap memory.\"]",
        topic_id: 'c-p14-t1',
        course_id: 'c-programming'
      };
    case 'c-p15-t1':
      return {
        id: 189194,
        title: "Introduction to File Handling",
        description: "Write a C program to create a file and display a message indicating that the file was created successfully.",
        reference_output: "File Created Successfully",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    FILE *fp;\n\n    fp = fopen(\"sample.txt\", \"w\");\n\n    if(fp != NULL) {\n        printf(\"File Created Successfully\\n\");\n        fclose(fp);\n    }\n\n    return 0;\n}",
        hints: "[\"Use fopen() to create a file and fclose() to close it.\"]",
        topic_id: 'c-p15-t1',
        course_id: 'c-programming'
      };
    case 'c-p15-t8':
      return {
        id: 189201,
        title: "Error Handling in Files",
        description: "Write a C program to check whether a file exists before reading it.",
        reference_output: "File Opened Successfully",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    FILE *fp;\n\n    fp = fopen(\"sample.txt\", \"r\");\n\n    if(fp == NULL) {\n        printf(\"File Not Found\\n\");\n    }\n    else {\n        printf(\"File Opened Successfully\\n\");\n        fclose(fp);\n    }\n\n    return 0;\n}",
        hints: "[\"Verify that fopen() does not return NULL.\"]",
        topic_id: 'c-p15-t8',
        course_id: 'c-programming'
      };
    case 'c-p9-t8':
      return {
        id: 189066,
        title: "Second Largest Element",
        description: "Write a C program to find the second largest element in an array.",
        reference_output: "Second Largest Element = 45",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int arr[] = {12, 45, 7, 89, 34};\n    int largest = arr[0], second = arr[0], i;\n\n    for(i = 1; i < 5; i++) {\n        if(arr[i] > largest) {\n            second = largest;\n            largest = arr[i];\n        }\n        else if(arr[i] > second && arr[i] != largest) {\n            second = arr[i];\n        }\n    }\n\n    printf(\"Second Largest Element = %d\\n\", second);\n\n    return 0;\n}",
        hints: "[\"Track both the largest and second largest values while traversing the array.\"]",
        topic_id: 'c-p9-t8',
        course_id: 'c-programming'
      };
    case 'c-p10-t6':
      return {
        id: 189072,
        title: "Array of Strings",
        description: "Write a C program to store and display the names of 3 students using an array of strings.",
        reference_output: "Ravi\nSita\nKiran",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    char names[3][20] = {\n        \"Ravi\",\n        \"Sita\",\n        \"Kiran\"\n    };\n    int i;\n\n    for(i = 0; i < 3; i++) {\n        printf(\"%s\\n\", names[i]);\n    }\n\n    return 0;\n}",
        hints: "[\"Use a two-dimensional character array.\"]",
        topic_id: 'c-p10-t6',
        course_id: 'c-programming'
      };
    case 'c-p10-t7':
      return {
        id: 189073,
        title: "String Tokenization",
        description: "Write a C program to split a sentence into individual words using string tokenization.",
        reference_output: "C\nProgramming\nLanguage",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char str[] = \"C Programming Language\";\n    char *token = strtok(str, \" \");\n\n    while(token != NULL) {\n        printf(\"%s\\n\", token);\n        token = strtok(NULL, \" \");\n    }\n\n    return 0;\n}",
        hints: "[\"Use the strtok() function.\"]",
        topic_id: 'c-p10-t7',
        course_id: 'c-programming'
      };
    case 'c-p11-t5':
      return {
        id: 189151,
        title: "Pointer Arithmetic",
        description: "Write a C program to demonstrate pointer arithmetic by moving a pointer to the next element in an array.",
        reference_output: "First Element = 10\nSecond Element = 20",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int arr[] = {10, 20, 30};\n\n    int *ptr = arr;\n\n    printf(\"First Element = %d\\n\", *ptr);\n\n    ptr++;\n\n    printf(\"Second Element = %d\\n\", *ptr);\n\n    return 0;\n}",
        hints: "[\"Increment the pointer using ptr++.\"]",
        topic_id: 'c-p11-t5',
        course_id: 'c-programming'
      };
    case 'c-p11-t6':
      return {
        id: 189152,
        title: "NULL Pointers",
        description: "Write a C program to declare a NULL pointer and check whether it points to a valid memory location.",
        reference_output: "Pointer is NULL",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int *ptr = NULL;\n\n    if(ptr == NULL)\n        printf(\"Pointer is NULL\\n\");\n    else\n        printf(\"Pointer is not NULL\\n\");\n\n    return 0;\n}",
        hints: "[\"Use NULL to initialize a pointer that does not point anywhere.\"]",
        topic_id: 'c-p11-t6',
        course_id: 'c-programming'
      };
    case 'c-p13-t2':
      return {
        id: 189177,
        title: "Structure Declaration and Definition",
        description: "Write a C program to declare a structure for an employee and display the entered employee details.",
        reference_output: "Enter Employee ID: Enter Employee Name: ID: 1001\nName: Ravi",
        test_input: "1001 Ravi",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nstruct Employee {\n    int id;\n    char name[20];\n};\n\nint main() {\n    struct Employee emp;\n\n    printf(\"Enter Employee ID: \");\n    scanf(\"%d\", &emp.id);\n\n    printf(\"Enter Employee Name: \");\n    scanf(\"%s\", emp.name);\n\n    printf(\"ID: %d\\n\", emp.id);\n    printf(\"Name: %s\\n\", emp.name);\n\n    return 0;\n}",
        hints: "[\"Declare the structure globally and create a structure variable inside main().\"]",
        topic_id: 'c-p13-t2',
        course_id: 'c-programming'
      };
    case 'c-p14-t2':
      return {
        id: 189187,
        title: "malloc() Function",
        description: "Write a C program to dynamically allocate memory for 5 integers using malloc(), accept values from the user, and find their sum.",
        reference_output: "Enter 5 numbers:\nSum = 150",
        test_input: "10 20 30 40 50",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *arr, i, sum = 0;\n\n    arr = (int *)malloc(5 * sizeof(int));\n\n    printf(\"Enter 5 numbers:\\n\");\n\n    for(i = 0; i < 5; i++) {\n        scanf(\"%d\", &arr[i]);\n        sum += arr[i];\n    }\n\n    printf(\"Sum = %d\\n\", sum);\n\n    free(arr);\n\n    return 0;\n}",
        hints: "[\"Use malloc() to create an integer array at runtime.\"]",
        topic_id: 'c-p14-t2',
        course_id: 'c-programming'
      };
    case 'c-p15-t2':
      return {
        id: 189195,
        title: "Opening and Closing Files",
        description: "Write a C program to open an existing file and close it properly.",
        reference_output: "File Opened Successfully\nFile Closed Successfully",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    FILE *fp;\n\n    fp = fopen(\"sample.txt\", \"r\");\n\n    if(fp != NULL) {\n        printf(\"File Opened Successfully\\n\");\n        fclose(fp);\n        printf(\"File Closed Successfully\\n\");\n    }\n\n    return 0;\n}",
        hints: "[\"Always close files using fclose() after use.\"]",
        topic_id: 'c-p15-t2',
        course_id: 'c-programming'
      };
    case 'c-p16-t1':
      return {
        id: 189202,
        title: "Introduction to Preprocessor",
        description: "Write a C program to use a preprocessor directive to include the standard input-output library and display a message.",
        reference_output: "Welcome to Preprocessor Directives",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    printf(\"Welcome to Preprocessor Directives\\n\");\n\n    return 0;\n}",
        hints: "[\"Preprocessor directives begin with # and are processed before compilation.\"]",
        topic_id: 'c-p16-t1',
        course_id: 'c-programming'
      };
    case 'c-p16-t6':
      return {
        id: 189207,
        title: "Predefined Macros",
        description: "Write a C program to display the current file name and compilation date using predefined macros.",
        reference_output: "File Name: [File]\nCompilation Date: [Date]",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n\n    printf(\"File Name: %s\\n\", __FILE__);\n    printf(\"Compilation Date: %s\\n\", __DATE__);\n\n    return 0;\n}",
        hints: "[\"Use __FILE__ and __DATE__.\"]",
        topic_id: 'c-p16-t6',
        course_id: 'c-programming'
      };
    case 'c-p17-t3':
      return {
        id: 189238,
        title: "Bit Fields",
        description: "Write a C program to store a student's age and section using bit fields.",
        reference_output: "Age = 20\nSection = 2",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nstruct Student {\n    unsigned int age : 7;\n    unsigned int section : 3;\n};\n\nint main() {\n    struct Student s;\n\n    s.age = 20;\n    s.section = 2;\n\n    printf(\"Age = %u\\n\", s.age);\n    printf(\"Section = %u\\n\", s.section);\n\n    return 0;\n}",
        hints: "[\"Bit fields allow efficient memory usage inside structures.\"]",
        topic_id: 'c-p17-t3',
        course_id: 'c-programming'
      };
    case 'c-p11-t7':
      return {
        id: 189153,
        title: "Pointers and Arrays",
        description: "Write a C program to display all elements of an array using a pointer.",
        reference_output: "5 10 15 20 25 ",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int arr[] = {5, 10, 15, 20, 25};\n    int *ptr = arr;\n    int i;\n\n    for(i = 0; i < 5; i++) {\n        printf(\"%d \", *(ptr + i));\n    }\n\n    return 0;\n}",
        hints: "[\"Array names act as pointers to their first element.\"]",
        topic_id: 'c-p11-t7',
        course_id: 'c-programming'
      };
    case 'c-p11-t8':
      return {
        id: 189154,
        title: "Pointers and Functions",
        description: "Write a C program to swap two numbers using a function and pointers.",
        reference_output: "Before Swap: 10 20\nAfter Swap: 20 10",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n    int temp;\n\n    temp = *a;\n    *a = *b;\n    *b = temp;\n}\n\nint main() {\n    int x = 10, y = 20;\n\n    printf(\"Before Swap: %d %d\\n\", x, y);\n\n    swap(&x, &y);\n\n    printf(\"After Swap: %d %d\\n\", x, y);\n\n    return 0;\n}",
        hints: "[\"Pass the addresses of variables to the function and modify them using pointers.\"]",
        topic_id: 'c-p11-t8',
        course_id: 'c-programming'
      };
    case 'c-p13-t3':
      return {
        id: 189178,
        title: "Accessing Structure Members",
        description: "Write a C program to calculate the total price of a product using structure members.",
        reference_output: "Enter Product Name: Enter Quantity: Enter Price: Total Cost = 50.00",
        test_input: "Pen 10 5",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nstruct Product {\n    char name[20];\n    int quantity;\n    float price;\n};\n\nint main() {\n    struct Product p;\n\n    printf(\"Enter Product Name: \");\n    scanf(\"%s\", p.name);\n\n    printf(\"Enter Quantity: \");\n    scanf(\"%d\", &p.quantity);\n\n    printf(\"Enter Price: \");\n    scanf(\"%f\", &p.price);\n\n    printf(\"Total Cost = %.2f\\n\", p.quantity * p.price);\n\n    return 0;\n}",
        hints: "[\"Access structure members using the dot (.) operator.\"]",
        topic_id: 'c-p13-t3',
        course_id: 'c-programming'
      };
    case 'c-p14-t3':
      return {
        id: 189188,
        title: "calloc() Function",
        description: "Write a C program to dynamically allocate memory for 5 integers using calloc() and display the default values.",
        reference_output: "Values:\n0 0 0 0 0 ",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *arr, i;\n\n    arr = (int *)calloc(5, sizeof(int));\n\n    printf(\"Values:\\n\");\n\n    for(i = 0; i < 5; i++) {\n        printf(\"%d \", arr[i]);\n    }\n\n    free(arr);\n\n    return 0;\n}",
        hints: "[\"calloc() initializes allocated memory to zero.\"]",
        topic_id: 'c-p14-t3',
        course_id: 'c-programming'
      };
    case 'c-p15-t3':
      return {
        id: 189196,
        title: "File Modes",
        description: "Write a C program to demonstrate writing to a file using write mode (w).",
        reference_output: "Data Written Successfully",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    FILE *fp;\n\n    fp = fopen(\"data.txt\", \"w\");\n\n    fprintf(fp, \"Welcome to File Handling\");\n\n    fclose(fp);\n\n    printf(\"Data Written Successfully\\n\");\n\n    return 0;\n}",
        hints: "[\"Use \\\"w\\\" mode to create a new file or overwrite an existing file.\"]",
        topic_id: 'c-p15-t3',
        course_id: 'c-programming'
      };
    case 'c-p16-t2':
      return {
        id: 189203,
        title: "#include Directive",
        description: "Write a C program that uses the #include directive to include the math library and calculate the square root of a number.",
        reference_output: "Enter a number: Square Root = 5.00",
        test_input: "25",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <math.h>\n\nint main() {\n    int num;\n\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n\n    printf(\"Square Root = %.2f\\n\", sqrt(num));\n\n    return 0;\n}",
        hints: "[\"Include the appropriate header file and use a library function.\"]",
        topic_id: 'c-p16-t2',
        course_id: 'c-programming'
      };
    case 'c-p16-t7':
      return {
        id: 189208,
        title: "#undef and #pragma",
        description: "Write a C program to define a macro, undefine it using #undef, and then define it again with a different value.",
        reference_output: "Value = 20",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\n#define VALUE 10\n\n#undef VALUE\n\n#define VALUE 20\n\nint main() {\n\n    printf(\"Value = %d\\n\", VALUE);\n\n    return 0;\n}",
        hints: "[\"Use #undef before redefining a macro.\"]",
        topic_id: 'c-p16-t7',
        course_id: 'c-programming'
      };
    case 'c-p17-t4':
      return {
        id: 189239,
        title: "Enumerations Advanced",
        description: "Write a C program to create an enumeration for traffic signals and display the action based on user input.",
        reference_output: "1.RED 2.YELLOW 3.GREEN\nEnter Signal: GO",
        test_input: "3",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nenum Signal { RED = 1, YELLOW, GREEN };\n\nint main() {\n    int choice;\n\n    printf(\"1.RED 2.YELLOW 3.GREEN\\n\");\n    printf(\"Enter Signal: \");\n    scanf(\"%d\", &choice);\n\n    switch(choice) {\n        case RED:\n            printf(\"STOP\\n\");\n            break;\n        case YELLOW:\n            printf(\"WAIT\\n\");\n            break;\n        case GREEN:\n            printf(\"GO\\n\");\n            break;\n        default:\n            printf(\"Invalid Signal\\n\");\n    }\n\n    return 0;\n}",
        hints: "[\"Use enum values inside a switch statement.\"]",
        topic_id: 'c-p17-t4',
        course_id: 'c-programming'
      };
    case 'c-p13-t4':
      return {
        id: 189179,
        title: "Structure Initialization",
        description: "Write a C program to initialize a structure with book details and display them.",
        reference_output: "Title: C Programming\nPrice: 450.50",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nstruct Book {\n    char title[30];\n    float price;\n};\n\nint main() {\n    struct Book b = {\"C Programming\", 450.50};\n\n    printf(\"Title: %s\\n\", b.title);\n    printf(\"Price: %.2f\\n\", b.price);\n\n    return 0;\n}",
        hints: "[\"Assign values during structure declaration.\"]",
        topic_id: 'c-p13-t4',
        course_id: 'c-programming'
      };
    case 'c-p14-t4':
      return {
        id: 189189,
        title: "realloc() Function",
        description: "Write a C program to dynamically create an array of 3 integers, then increase its size to 5 integers using realloc() and accept the additional values.",
        reference_output: "Enter 3 numbers:\nEnter 2 more numbers:\nArray Elements: 10 20 30 40 50 ",
        test_input: "10 20 30 40 50",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *arr, i;\n\n    arr = (int *)malloc(3 * sizeof(int));\n\n    printf(\"Enter 3 numbers:\\n\");\n    for(i = 0; i < 3; i++) {\n        scanf(\"%d\", &arr[i]);\n    }\n\n    arr = (int *)realloc(arr, 5 * sizeof(int));\n\n    printf(\"Enter 2 more numbers:\\n\");\n    for(i = 3; i < 5; i++) {\n        scanf(\"%d\", &arr[i]);\n    }\n\n    printf(\"Array Elements: \");\n\n    for(i = 0; i < 5; i++) {\n        printf(\"%d \", arr[i]);\n    }\n\n    free(arr);\n\n    return 0;\n}",
        hints: "[\"Use realloc() to resize previously allocated memory.\"]",
        topic_id: 'c-p14-t4',
        course_id: 'c-programming'
      };
    case 'c-p15-t4':
      return {
        id: 189197,
        title: "Reading from Files",
        description: "Write a C program to read and display the contents of a file.",
        reference_output: "Welcome to File Handling",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    FILE *fp;\n    char ch;\n\n    fp = fopen(\"data.txt\", \"r\");\n\n    while((ch = fgetc(fp)) != EOF) {\n        printf(\"%c\", ch);\n    }\n\n    fclose(fp);\n\n    return 0;\n}",
        hints: "[\"Use fgetc() to read one character at a time.\"]",
        topic_id: 'c-p15-t4',
        course_id: 'c-programming'
      };
    case 'c-p16-t3':
      return {
        id: 189204,
        title: "#define Directive",
        description: "Write a C program to calculate the area of a circle using a symbolic constant defined with #define.",
        reference_output: "Enter radius: Area = 78.54",
        test_input: "5",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\n#define PI 3.14159\n\nint main() {\n    float radius;\n\n    printf(\"Enter radius: \");\n    scanf(\"%f\", &radius);\n\n    printf(\"Area = %.2f\\n\", PI * radius * radius);\n\n    return 0;\n}",
        hints: "[\"Use #define to create a constant value for PI.\"]",
        topic_id: 'c-p16-t3',
        course_id: 'c-programming'
      };
    case 'c-p17-t5':
      return {
        id: 189240,
        title: "Type Qualifiers",
        description: "Write a C program to demonstrate the use of the const qualifier by storing the value of PI.",
        reference_output: "PI = 3.14159",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    const float PI = 3.14159;\n\n    printf(\"PI = %.5f\\n\", PI);\n\n    return 0;\n}",
        hints: "[\"A const variable cannot be modified after initialization.\"]",
        topic_id: 'c-p17-t5',
        course_id: 'c-programming'
      };
    case 'c-p17-t7':
      return {
        id: 189242,
        title: "Multi-File Programs",
        description: "Write a C program split across multiple files to calculate the square of a number. (Note: Since we use an online editor, simulate it within a single main function as a logical split).",
        reference_output: "Enter Number: Square = 25",
        test_input: "5",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint square(int);\n\nint main() {\n    int num;\n\n    printf(\"Enter Number: \");\n    scanf(\"%d\", &num);\n\n    printf(\"Square = %d\\n\", square(num));\n\n    return 0;\n}\n\nint square(int n) {\n    return n * n;\n}",
        hints: "[\"Define the function in one file and call it from another.\"]",
        topic_id: 'c-p17-t7',
        course_id: 'c-programming'
      };
    case 'c-p18-t5':
      return {
        id: 18005,
        title: "Project 1: Calculator",
        description: "A Calculator is one of the most common applications used daily. It performs mathematical operations such as addition, subtraction, multiplication, and division.\n\nIn this project, students will create a command-line calculator using C programming. This project helps beginners understand how user input, conditional statements, and arithmetic operations work together.\n\n---\n\n**Real World Usage**\n\nCalculators are used in Mobile Phones, Computers, Banking Software, Billing Systems, Scientific Calculators, and Engineering Applications. Every advanced calculator starts with the same basic logic you will learn in this project.\n\n---\n\n**Features**\n\n*   **Addition**: Adds two numbers (e.g., 10 + 20 = 30)\n*   **Subtraction**: Subtracts one number from another (e.g., 20 - 10 = 10)\n*   **Multiplication**: (e.g., 5 × 4 = 20)\n*   **Division**: (e.g., 20 ÷ 5 = 4)\n\n---\n\n**How the Project Works**\n\n1.  User enters first number. (e.g., `10`)\n2.  User enters second number. (e.g., `5`)\n3.  User selects operation: `1.Add`, `2.Subtract`, `3.Multiply`, `4.Divide`\n4.  Program performs selected operation.\n5.  Result is displayed.\n\n<!-- SPLIT -->\n\n**Problem Statement**\n\nCreate a Calculator program that performs Addition, Subtraction, Multiplication, and Division. The user enters two numbers and selects an operation.\n\n**Note:** For division, if the second number is 0, print `Cannot divide by zero`. Otherwise, print the result in the format `Result = X.XX` (2 decimal places).",
        reference_output: "15",
        test_input: "10\\n5\\n1\\n",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main()\n{\n    float a,b;\n    int choice;\n\n    printf(\"Enter First Number: \");\n    scanf(\"%f\",&a);\n\n    printf(\"Enter Second Number: \");\n    scanf(\"%f\",&b);\n\n    printf(\"\\n1.Add\");\n    printf(\"\\n2.Subtract\");\n    printf(\"\\n3.Multiply\");\n    printf(\"\\n4.Divide\");\n\n    printf(\"\\nChoice: \");\n    scanf(\"%d\",&choice);\n\n    switch(choice)\n    {\n        case 1:\n            printf(\"Result = %.2f\",a+b);\n            break;\n\n        case 2:\n            printf(\"Result = %.2f\",a-b);\n            break;\n\n        case 3:\n            printf(\"Result = %.2f\",a*b);\n            break;\n\n        case 4:\n            if(b!=0)\n                printf(\"Result = %.2f\",a/b);\n            else\n                printf(\"Cannot divide by zero\");\n            break;\n\n        default:\n            printf(\"Invalid Choice\");\n    }\n\n    return 0;\n}",
        hints: "[\"Take two numbers from the user.\",\"Display operation choices.\",\"Use switch-case to determine the operation.\"]",
        topic_id: 'c-p18-t5',
        course_id: 'c-programming'
      };
    case 'c-p18-t6':
      return {
        id: 189116,
        title: "Project: Student Management System",
        description: "The Student Management System is a menu-driven application used to manage student records efficiently. It allows users to add, view, search, update, and delete student information.\n\nThis project simulates how educational institutions manage student data and introduces students to real-world data management concepts.\n\n---\n\n**Features**\n\n**Add Student**\n\nAllows users to enter and store new student records.\n\nExample:\n\nRoll No: 101\n\nName: Balu\n\nMarks: 95\n\nThe record is saved successfully.\n\n**Display Students**\n\nDisplays all stored student records in a tabular format.\n\nExample:\n\nRoll No    Name      Marks\n\n101        Balu      95\n\n102        Ram       89\n\n**Search Student**\n\nUsers can search for a student using the roll number.\n\nExample:\n\nEnter Roll Number: 101\n\nRecord Found\n\nRoll No: 101\n\nName: Balu\n\nMarks: 95\n\n**Update Student**\n\nAllows modification of existing student details.\n\nExample:\n\nSearch Roll Number: 101\n\nEnter New Name: Balu Kumar\n\nEnter New Marks: 98\n\nRecord Updated Successfully\n\n**Delete Student**\n\nRemoves a student record permanently.\n\nExample:\n\nEnter Roll Number: 101\n\nStudent Deleted Successfully\n\n---\n\n**How the Project Works**\n\n**Step 1**\n\nProgram starts and creates an array of student structures.\n\n**Step 2**\n\nMenu is displayed.\n\n1. Add Student\n2. Display Students\n3. Search Student\n4. Update Student\n5. Delete Student\n6. Exit\n\n**Step 3**\n\nUser selects an operation.\n\n**Step 4**\n\nProgram processes the request.\n\n**Step 5**\n\nUpdated records are displayed.\n\n<!-- SPLIT -->\n\n**Problem Statement**\n\nDevelop a Student Management System using C programming that performs the following operations:\n\n1. Add Student\n2. Display All Students\n3. Search Student\n4. Update Student Information\n5. Delete Student Record\n6. Exit Program\n\nEach student record should contain:\n\n* Roll Number\n* Name\n* Marks",
        reference_output: "Student Added Successfully",
        test_input: "1\\n591\\nBalu\\n93\\n6\\n",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int a = 10, b = 20;\n    printf(\"%d\\n\", a + b);\n    return 0;\n}",
        hints: "[\"Create a structure to store student information.\\\\n\\\\nstruct Student\\\\n{\\\\n    int roll;\\\\n    char name[50];\\\\n    float marks;\\\\n};\",\"Store multiple students using an array.\\\\n\\\\nstruct Student s[100];\",\"Use a menu-driven approach with a loop.\\\\n\\\\nwhile(1)\\\\n{\\\\n    // Menu\\\\n}\",\"Search students using Roll Number.\\\\n\\\\nfor(i=0;i<count;i++)\\\\n{\\\\n    if(s[i].roll==searchRoll)\\\\n    {\\\\n        // Found\\\\n    }\\\\n}\",\"For deletion, shift all records one position left.\\\\n\\\\nfor(i=index;i<count-1;i++)\\\\n{\\\\n    s[i]=s[i+1];\\\\n}\"]",
        topic_id: 'c-p18-t6',
        course_id: 'c-programming'
      };
    case 'c-p18-t7':
      return {
        id: 18007,
        title: "Project 3: Mini Text Editor",
        description: "# Project 3: Mini Text Editor\n\n## Project Overview\n\nA Text Editor is software used to create and edit text documents.\n\n**Examples:**\n* Notepad\n* Notepad++\n* VS Code\n* Sublime Text\n\nIn this project, students will build a simplified version of a text editor.\n\n---\n\n## Features\n\n### Enter Text\nSave text entered by user.\n\n### Display Text\nView saved content.\n\n### Count Characters\nCalculate total characters.\n\n### Clear Text\nRemove all content.\n\n---\n\n## How the Project Works\n\n**Step 1**\nUser enters text.\n*(Example: Hello World)*\n\n**Step 2**\nProgram stores text in a character array.\n\n**Step 3**\nUser selects menu option.\n*(Example: Display Text)*\n\n**Step 4**\nProgram shows stored text.\n\n**Step 5**\nAdditional operations can be performed.\n\n<!-- SPLIT -->\n\n## Problem Statement\n\nCreate a Mini Text Editor that allows users to perform the following operations using a menu-driven approach:\n\n1. Enter Text\n2. Display Text\n3. Count Characters\n4. Clear Text\n5. Exit\n\n---\n\n## Hints & Logic Guide\n\n**Hint 1**\nStore text in a character array (e.g., `char text[1000]`).\n\n**Hint 2**\nUse `strlen()` to count the number of characters.\n\n**Hint 3**\nUse a `switch-case` menu inside an infinite loop to handle user choices.\n\n---\n\n## Sample Input\n```text\n1.Enter Text\n2.Display Text\n3.Count Characters\n4.Clear Text\n5.Exit\n\nChoice: 1\n\nEnter Text: Hello World\n```\n\n## Sample Output\n```text\nSaved Successfully\n```\n",
        reference_output: "Saved Successfully",
        test_input: "1\\ntest.txt\\nHello World\\n5\\n",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <string.h>\n\nint main()\n{\n    char text[1000]=\"\";\n    int choice;\n\n    while(1)\n    {\n        printf(\"\\n\\n1.Enter Text\");\n        printf(\"\\n2.Display Text\");\n        printf(\"\\n3.Count Characters\");\n        printf(\"\\n4.Clear Text\");\n        printf(\"\\n5.Exit\");\n\n        printf(\"\\nChoice: \");\n        scanf(\"%d\",&choice);\n        getchar(); // consume newline\n\n        switch(choice)\n        {\n            case 1:\n                printf(\"Enter Text: \");\n                fgets(text,1000,stdin);\n                printf(\"Saved Successfully\");\n                break;\n\n            case 2:\n                printf(\"\\nText:\\n%s\",text);\n                break;\n\n            case 3:\n                printf(\"Characters = %d\", (int)strlen(text)-1);\n                break;\n\n            case 4:\n                strcpy(text,\"\");\n                printf(\"Text Cleared\");\n                break;\n\n            case 5:\n                return 0;\n\n            default:\n                printf(\"Invalid Choice\");\n        }\n    }\n}",
        hints: "[\"Use fopen() to open files in write ('w'), read ('r'), or append ('a') modes.\",\"Use remove() function to delete a file.\"]",
        topic_id: 'c-p18-t7',
        course_id: 'c-programming'
      };
    default:
      return null;
  }
};

const getFallbackChallengeByTopicTitle = (topicTitle) => {
  switch (topicTitle) {
    case "Print Hello World":
      return {
        id: 189000,
        title: "Print Hello World",
        description: "Write a program that prints \"Hello, World!\" to the console.",
        reference_output: "Hello, World!",
        test_input: "None",
        test_args: [],
        starter_code: "",
        solution_code: "",
        hints: "Use printf function\\nDon't forget the newline character",
        topic_id: 'c-syntax-rules',
        course_id: 'c-programming'
      };
    case "Hello, World!":
      return {
        id: 189005,
        title: "Hello, World!",
        description: "Write a standard 'Hello, World!' program.",
        reference_output: "Hello, World!",
        test_input: "None",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello, World!\");\n    return 0;\n}",
        hints: "[]",
        topic_id: 'c-p1-t4',
        course_id: 'c-programming'
      };
    case "Mastery Challenge":
      return {
        id: 189121,
        title: "Mastery Challenge",
        description: "Write a C program to demonstrate the use of type modifiers (short, long, unsigned) by declaring variables and displaying their values.",
        reference_output: "Short Integer = 100\nLong Integer = 100000\nUnsigned Integer = 500",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    short int a = 100;\n    long int b = 100000;\n    unsigned int c = 500;\n\n    printf(\"Short Integer = %d\\n\", a);\n    printf(\"Long Integer = %ld\\n\", b);\n    printf(\"Unsigned Integer = %u\\n\", c);\n\n    return 0;\n}",
        hints: "Use type modifiers with integer data types to change their range and storage capacity.",
        topic_id: 'c-p2-t4',
        course_id: 'c-programming'
      };
    case "Mastery Challenge":
      return {
        id: 189118,
        title: "Mastery Challenge",
        description: "Write a C program that declares variables of different basic data types and displays their values.",
        reference_output: "Age = 20\nHeight = 5.8\nSalary = 25000.50\nGrade = A",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main()\n{\n    int age = 20;\n    float height = 5.8;\n    double salary = 25000.50;\n    char grade = 'A';\n\n    printf(\"Age = %d\\n\", age);\n    printf(\"Height = %.1f\\n\", height);\n    printf(\"Salary = %.2lf\\n\", salary);\n    printf(\"Grade = %c\\n\", grade);\n\n    return 0;\n}",
        hints: "Declare variables using int, float, double, and char, then display their values using the appropriate format specifiers.",
        topic_id: 'c-p2-t1',
        course_id: 'c-programming'
      };
    case "Mastery Challenge":
      return {
        id: 189123,
        title: "Mastery Challenge",
        description: "Write a C program to demonstrate type conversion and type casting by converting an integer value to a float and displaying the result.",
        reference_output: "Integer Value = 10\nFloat Value = 10.00",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int num = 10;\n\n    float result = (float)num;\n\n    printf(\"Integer Value = %d\\n\", num);\n    printf(\"Float Value = %.2f\\n\", result);\n\n    return 0;\n}",
        hints: "Use a type cast to convert one data type into another before performing calculations.",
        topic_id: 'c-p2-t6',
        course_id: 'c-programming'
      };
    case "Mastery Challenge":
      return {
        id: 189127,
        title: "Mastery Challenge",
        description: "Write a C program to compare two integers using relational operators and display the results.",
        reference_output: "a > b  = 0\na < b  = 1\na >= b = 0\na <= b = 1\na == b = 0\na != b = 1",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int a = 10, b = 20;\n\n    printf(\"a > b  = %d\\n\", a > b);\n    printf(\"a < b  = %d\\n\", a < b);\n    printf(\"a >= b = %d\\n\", a >= b);\n    printf(\"a <= b = %d\\n\", a <= b);\n    printf(\"a == b = %d\\n\", a == b);\n    printf(\"a != b = %d\\n\", a != b);\n\n    return 0;\n}",
        hints: "Use relational operators (>, <, >=, <=, ==, !=) to compare two values.",
        topic_id: 'c-p3-t2',
        course_id: 'c-programming'
      };
    case "Mastery Challenge":
      return {
        id: 189130,
        title: "Mastery Challenge",
        description: "Write a C program to demonstrate the use of increment (++) and decrement (--) operators on an integer variable.",
        reference_output: "Initial Value = 10\nAfter Increment = 11\nAfter Decrement = 10",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int a = 10;\n\n    printf(\"Initial Value = %d\\n\", a);\n\n    a++;\n    printf(\"After Increment = %d\\n\", a);\n\n    a--;\n    printf(\"After Decrement = %d\\n\", a);\n\n    return 0;\n}",
        hints: "Use ++ to increase a variable's value by 1 and -- to decrease it by 1.",
        topic_id: 'c-p3-t5',
        course_id: 'c-programming'
      };
    case "Leap Year Checker":
      return {
        id: 189031,
        title: "Leap Year Checker",
        description: "Write a C program to check whether a year entered by the user is a leap year or not using nested if-else statements.",
        reference_output: "Enter a year: Leap Year",
        test_input: "2024",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int year;\n\n    printf(\"Enter a year: \");\n    scanf(\"%d\", &year);\n\n    if (year % 4 == 0) {\n        if (year % 100 == 0) {\n            if (year % 400 == 0) {\n                printf(\"Leap Year\\n\");\n            } else {\n                printf(\"Not a Leap Year\\n\");\n            }\n        } else {\n            printf(\"Leap Year\\n\");\n        }\n    } else {\n        printf(\"Not a Leap Year\\n\");\n    }\n\n    return 0;\n}",
        hints: "[\"A leap year is divisible by 4. If it is divisible by 100, then it must also be divisible by 400.\"]",
        topic_id: 'c-p5-t3',
        course_id: 'c-programming'
      };
    case "Check Positive Number":
      return {
        id: 189029,
        title: "Check Positive Number",
        description: "Write a C program to read a number from the user and check whether it is positive using an if statement.",
        reference_output: "Enter a number: The number is positive.",
        test_input: "5",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int num;\n\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n\n    if (num > 0) {\n        printf(\"The number is positive.\\n\");\n    }\n\n    return 0;\n}",
        hints: "[\"Accept a number using scanf()\",\"Use an if statement to check if it is greater than zero.\",\"Use printf to output the exact message.\"]",
        topic_id: 'c-p5-t1',
        course_id: 'c-programming'
      };
    case "Print Numbers using goto":
      return {
        id: 189034,
        title: "Print Numbers using goto",
        description: "Write a C program to demonstrate the use of the goto statement by printing numbers from 1 to 5.",
        reference_output: "1 2 3 4 5 ",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int i = 1;\n\nstart:\n    printf(\"%d \", i);\n    i++;\n\n    if (i <= 5)\n        goto start;\n\n    return 0;\n}",
        hints: "[\"Use a label and the goto statement to repeatedly execute a block of code until a condition becomes false.\"]",
        topic_id: 'c-p5-t6',
        course_id: 'c-programming'
      };
    case "Number Pattern":
      return {
        id: 189039,
        title: "Number Pattern",
        description: "Write a C program to print the following number pattern using nested loops.",
        reference_output: "1 \n1 2 \n1 2 3 \n1 2 3 4 \n1 2 3 4 5 \n",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int i, j;\n\n    for (i = 1; i <= 5; i++) {\n        for (j = 1; j <= i; j++) {\n            printf(\"%d \", j);\n        }\n        printf(\"\\n\");\n    }\n\n    return 0;\n}",
        hints: "[\"Use the outer loop for rows and the inner loop to print numbers from 1 to the current row number.\"]",
        topic_id: 'c-p6-t4',
        course_id: 'c-programming'
      };
    case "Pointer Declaration":
      return {
        id: 189148,
        title: "Pointer Declaration",
        description: "Write a C program to declare a pointer, assign it the address of a variable, and display the value using the pointer.",
        reference_output: "Age = 20",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int age = 20;\n    int *ptr;\n\n    ptr = &age;\n\n    printf(\"Age = %d\\n\", *ptr);\n\n    return 0;\n}",
        hints: "[\"Use * to declare a pointer variable.\"]",
        topic_id: 'c-p11-t2',
        course_id: 'c-programming'
      };
    case "Dereference Operator (*)":
      return {
        id: 189150,
        title: "Dereference Operator (*)",
        description: "Write a C program to access and display the value stored at a memory address using the dereference (*) operator.",
        reference_output: "Value = 50",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int num = 50;\n    int *ptr = &num;\n\n    printf(\"Value = %d\\n\", *ptr);\n\n    return 0;\n}",
        hints: "[\"Use *pointer_name to access the value pointed to by a pointer.\"]",
        topic_id: 'c-p11-t4',
        course_id: 'c-programming'
      };
    case "Mastery Challenge":
      return {
        id: 189132,
        title: "Mastery Challenge",
        description: "Write a C program to find the larger of two numbers using the conditional (ternary) operator.",
        reference_output: "Larger Number = 20",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int a = 15, b = 20;\n\n    int max = (a > b) ? a : b;\n\n    printf(\"Larger Number = %d\\n\", max);\n\n    return 0;\n}",
        hints: "Use the ? : operator to choose between two values based on a condition.",
        topic_id: 'c-p3-t7',
        course_id: 'c-programming'
      };
    case "Pointer to Pointer":
      return {
        id: 189169,
        title: "Pointer to Pointer",
        description: "Write a C program to demonstrate a pointer to a pointer and display the value of a variable using a double pointer.",
        reference_output: "Value = 10",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int num = 10;\n    int *ptr = &num;\n    int **dptr = &ptr;\n\n    printf(\"Value = %d\\n\", **dptr);\n\n    return 0;\n}",
        hints: "[\"A pointer to a pointer stores the address of another pointer.\"]",
        topic_id: 'c-p12-t1',
        course_id: 'c-programming'
      };
    case "Demonstrate Pass By Value":
      return {
        id: 189049,
        title: "Demonstrate Pass By Value",
        description: "Write a C program to demonstrate Pass By Value by creating a function that attempts to modify a variable. Display the value before and after the function call.",
        reference_output: "Before Function Call = 50\nInside Function = 100\nAfter Function Call = 50",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nvoid changeValue(int num) {\n    num = 100;\n    printf(\"Inside Function = %d\\n\", num);\n}\n\nint main() {\n    int num = 50;\n\n    printf(\"Before Function Call = %d\\n\", num);\n\n    changeValue(num);\n\n    printf(\"After Function Call = %d\\n\", num);\n\n    return 0;\n}",
        hints: "[\"In pass by value, a copy of the variable is passed to the function, so changes inside the function do not affect the original variable.\"]",
        topic_id: 'c-p7-t6',
        course_id: 'c-programming'
      };
    case "Callback Functions":
      return {
        id: 189173,
        title: "Callback Functions",
        description: "Write a C program to calculate the square of a number entered by the user using a callback function.",
        reference_output: "Enter a number: Square = 25",
        test_input: "5",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nvoid square(int num) {\n    printf(\"Square = %d\\n\", num * num);\n}\n\nvoid execute(void (*func)(int), int value) {\n    func(value);\n}\n\nint main() {\n    int num;\n\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n\n    execute(square, num);\n\n    return 0;\n}",
        hints: "[\"Pass a function pointer as an argument and invoke it inside another function.\"]",
        topic_id: 'c-p12-t5',
        course_id: 'c-programming'
      };
    case "Average Marks Using Array":
      return {
        id: 189059,
        title: "Average Marks Using Array",
        description: "Write a C program to store the marks of 5 students in an array and calculate the average marks.",
        reference_output: "Average Marks = 79.00",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int marks[5] = {75, 80, 65, 90, 85};\n    int sum = 0, i;\n    float average;\n\n    for(i = 0; i < 5; i++) {\n        sum += marks[i];\n    }\n\n    average = sum / 5.0;\n\n    printf(\"Average Marks = %.2f\\n\", average);\n\n    return 0;\n}",
        hints: "[\"Store multiple marks using an array and use a loop to calculate their sum before finding the average.\"]",
        topic_id: 'c-p9-t1',
        course_id: 'c-programming'
      };
    case "Nested Structures":
      return {
        id: 189180,
        title: "Nested Structures",
        description: "Write a C program to store student information along with address details using nested structures.",
        reference_output: "Enter Name: Enter City: Name: Balu\nCity: Kakinada",
        test_input: "Balu Kakinada",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nstruct Address {\n    char city[20];\n};\n\nstruct Student {\n    char name[20];\n    struct Address addr;\n};\n\nint main() {\n    struct Student s;\n\n    printf(\"Enter Name: \");\n    scanf(\"%s\", s.name);\n\n    printf(\"Enter City: \");\n    scanf(\"%s\", s.addr.city);\n\n    printf(\"Name: %s\\n\", s.name);\n    printf(\"City: %s\\n\", s.addr.city);\n\n    return 0;\n}",
        hints: "[\"Create one structure inside another structure.\"]",
        topic_id: 'c-p13-t5',
        course_id: 'c-programming'
      };
    case "Demonstrate Local Scope":
      return {
        id: 189054,
        title: "Demonstrate Local Scope",
        description: "Write a C program to demonstrate variable scope by using a local variable inside a function and showing that it cannot be accessed outside the function.",
        reference_output: "Inside Function: 10",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nvoid display() {\n    int x = 10;   // Local Variable\n    printf(\"Inside Function: %d\\n\", x);\n}\n\nint main() {\n    display();\n\n    return 0;\n}",
        hints: "[\"A local variable is accessible only within the function in which it is declared.\"]",
        topic_id: 'c-p8-t3',
        course_id: 'c-programming'
      };
    case "Find Largest Element":
      return {
        id: 189061,
        title: "Find Largest Element",
        description: "Write a C program to find the largest element in an array.",
        reference_output: "Largest Element = 89",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int arr[5] = {12, 45, 7, 89, 34};\n    int largest = arr[0];\n    int i;\n\n    for(i = 1; i < 5; i++) {\n        if(arr[i] > largest)\n            largest = arr[i];\n    }\n\n    printf(\"Largest Element = %d\\n\", largest);\n\n    return 0;\n}",
        hints: "[\"Assume the first element is the largest and compare it with the remaining elements.\"]",
        topic_id: 'c-p9-t3',
        course_id: 'c-programming'
      };
    case "Array Sum Function":
      return {
        id: 189064,
        title: "Array Sum Function",
        description: "Write a C program to pass an array to a function and find the sum of all elements.",
        reference_output: "Sum = 150",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint findSum(int arr[], int size) {\n    int i, sum = 0;\n    for(i = 0; i < size; i++) {\n        sum += arr[i];\n    }\n    return sum;\n}\n\nint main() {\n    int arr[] = {10, 20, 30, 40, 50};\n    printf(\"Sum = %d\\n\", findSum(arr, 5));\n    return 0;\n}",
        hints: "[\"Pass the array and its size as function arguments.\"]",
        topic_id: 'c-p9-t6',
        course_id: 'c-programming'
      };
    case "Find String Length":
      return {
        id: 189070,
        title: "Find String Length",
        description: "Write a C program to find the length of a string using a string library function.",
        reference_output: "Length = 11",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char str[] = \"Programming\";\n\n    printf(\"Length = %lu\\n\", strlen(str));\n\n    return 0;\n}",
        hints: "[\"Use the strlen() function from <string.h>.\"]",
        topic_id: 'c-p10-t4',
        course_id: 'c-programming'
      };
    case "free() Function":
      return {
        id: 189190,
        title: "free() Function",
        description: "Write a C program to dynamically allocate memory for an integer, store a value, display it, and release the memory using free().",
        reference_output: "Value = 100",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *ptr;\n\n    ptr = (int *)malloc(sizeof(int));\n\n    *ptr = 100;\n\n    printf(\"Value = %d\\n\", *ptr);\n\n    free(ptr);\n\n    return 0;\n}",
        hints: "[\"Always free dynamically allocated memory when it is no longer needed.\"]",
        topic_id: 'c-p14-t5',
        course_id: 'c-programming'
      };
    case "Writing to Files":
      return {
        id: 189198,
        title: "Writing to Files",
        description: "Write a C program to accept a student's name and marks from the user and store them in a file.",
        reference_output: "Enter Name: Enter Marks: Record Saved Successfully",
        test_input: "Balu 95",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    FILE *fp;\n    char name[20];\n    int marks;\n\n    fp = fopen(\"student.txt\", \"w\");\n\n    printf(\"Enter Name: \");\n    scanf(\"%s\", name);\n\n    printf(\"Enter Marks: \");\n    scanf(\"%d\", &marks);\n\n    fprintf(fp, \"%s %d\", name, marks);\n\n    fclose(fp);\n\n    printf(\"Record Saved Successfully\\n\");\n\n    return 0;\n}",
        hints: "[\"Use fprintf() to write formatted data into a file.\"]",
        topic_id: 'c-p15-t5',
        course_id: 'c-programming'
      };
    case "Displaying a String":
      return {
        id: 189067,
        title: "Displaying a String",
        description: "Write a C program to store a string and display it.",
        reference_output: "Name: Balu",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    char name[] = \"Balu\";\n\n    printf(\"Name: %s\\n\", name);\n\n    return 0;\n}",
        hints: "[\"A string is a character array ending with the null character (\\\\0).\"]",
        topic_id: 'c-p10-t1',
        course_id: 'c-programming'
      };
    case "Introduction to Pointers":
      return {
        id: 189147,
        title: "Introduction to Pointers",
        description: "Write a C program to store an integer value and display it using a pointer.",
        reference_output: "Value = 25",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int num = 25;\n    int *ptr = &num;\n\n    printf(\"Value = %d\\n\", *ptr);\n\n    return 0;\n}",
        hints: "[\"Create a pointer that stores the address of a variable and access the value through the pointer.\"]",
        topic_id: 'c-p11-t1',
        course_id: 'c-programming'
      };
    case "Address-of Operator (&)":
      return {
        id: 189149,
        title: "Address-of Operator (&)",
        description: "Write a C program to display the memory address of a variable using the address-of (&) operator.",
        reference_output: "Address of num = [Address]",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int num = 100;\n\n    printf(\"Address of num = %p\\n\", (void*)&num);\n\n    return 0;\n}",
        hints: "[\"Use &variable_name to obtain the memory address.\"]",
        topic_id: 'c-p11-t3',
        course_id: 'c-programming'
      };
    case "Array of Pointers":
      return {
        id: 189170,
        title: "Array of Pointers",
        description: "Write a C program to store names using an array of pointers and display them.",
        reference_output: "Ravi\nSita\nKiran",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    char *names[] = {\"Ravi\", \"Sita\", \"Kiran\"};\n\n    for(int i = 0; i < 3; i++) {\n        printf(\"%s\\n\", names[i]);\n    }\n\n    return 0;\n}",
        hints: "[\"Each element of the array stores the address of a string.\"]",
        topic_id: 'c-p12-t2',
        course_id: 'c-programming'
      };
    case "Array of Structures":
      return {
        id: 189181,
        title: "Array of Structures",
        description: "Write a C program to store details of 3 students and find the student with the highest marks.",
        reference_output: "Enter Name and Marks: Enter Name and Marks: Enter Name and Marks: \nTop Student: Balu",
        test_input: "Ravi 80 Balu 95 Sita 88",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nstruct Student {\n    char name[20];\n    float marks;\n};\n\nint main() {\n    struct Student s[3];\n    int i, max = 0;\n\n    for(i = 0; i < 3; i++) {\n        printf(\"Enter Name and Marks: \");\n        scanf(\"%s %f\", s[i].name, &s[i].marks);\n    }\n\n    for(i = 1; i < 3; i++) {\n        if(s[i].marks > s[max].marks)\n            max = i;\n    }\n\n    printf(\"\\nTop Student: %s\\n\", s[max].name);\n\n    return 0;\n}",
        hints: "[\"Use an array of structures and compare marks.\"]",
        topic_id: 'c-p13-t6',
        course_id: 'c-programming'
      };
    case "Memory Leaks":
      return {
        id: 189191,
        title: "Memory Leaks",
        description: "Write a C program that properly allocates and releases memory to avoid memory leaks.",
        reference_output: "Value = 50",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *ptr;\n\n    ptr = (int *)malloc(sizeof(int));\n\n    *ptr = 50;\n\n    printf(\"Value = %d\\n\", *ptr);\n\n    free(ptr);\n\n    ptr = NULL;\n\n    return 0;\n}",
        hints: "[\"Every successful malloc() should eventually have a matching free().\"]",
        topic_id: 'c-p14-t6',
        course_id: 'c-programming'
      };
    case "Binary File Operations":
      return {
        id: 189199,
        title: "Binary File Operations",
        description: "Write a C program to store an integer in a binary file and read it back.",
        reference_output: "Value = 100",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    FILE *fp;\n    int num = 100, value;\n\n    fp = fopen(\"number.dat\", \"wb\");\n\n    fwrite(&num, sizeof(int), 1, fp);\n\n    fclose(fp);\n\n    fp = fopen(\"number.dat\", \"rb\");\n\n    fread(&value, sizeof(int), 1, fp);\n\n    printf(\"Value = %d\\n\", value);\n\n    fclose(fp);\n\n    return 0;\n}",
        hints: "[\"Use fwrite() and fread().\"]",
        topic_id: 'c-p15-t6',
        course_id: 'c-programming'
      };
    case "Macro Functions":
      return {
        id: 189205,
        title: "Macro Functions",
        description: "Write a C program to find the larger of two numbers using a macro function.",
        reference_output: "Enter two numbers: Largest = 25",
        test_input: "15 25",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\n#define MAX(a,b) ((a) > (b) ? (a) : (b))\n\nint main() {\n    int x, y;\n\n    printf(\"Enter two numbers: \");\n    scanf(\"%d %d\", &x, &y);\n\n    printf(\"Largest = %d\\n\", MAX(x, y));\n\n    return 0;\n}",
        hints: "[\"Create a macro that compares two values and returns the larger one.\"]",
        topic_id: 'c-p16-t4',
        course_id: 'c-programming'
      };
    case "Command-Line Arguments":
      return {
        id: 189236,
        title: "Command-Line Arguments",
        description: "Write a C program to accept a student's name and marks through command-line arguments and display them.",
        reference_output: "Student Name: Balu\nMarks: 95",
        test_input: "",
        test_args: ["Balu","95"],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main(int argc, char *argv[]) {\n\n    printf(\"Student Name: %s\\n\", argv[1]);\n    printf(\"Marks: %s\\n\", argv[2]);\n\n    return 0;\n}",
        hints: "[\"Use argc and argv to access command-line arguments.\"]",
        topic_id: 'c-p17-t1',
        course_id: 'c-programming'
      };
    case "Variable Scope and Lifetime":
      return {
        id: 189241,
        title: "Variable Scope and Lifetime",
        description: "Write a C program to demonstrate the difference between a local variable and a static variable.",
        reference_output: "Count = 1\nCount = 2\nCount = 3",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nvoid counter() {\n    static int count = 0;\n\n    count++;\n\n    printf(\"Count = %d\\n\", count);\n}\n\nint main() {\n\n    counter();\n    counter();\n    counter();\n\n    return 0;\n}",
        hints: "[\"A static variable retains its value between function calls.\"]",
        topic_id: 'c-p17-t6',
        course_id: 'c-programming'
      };
    case "Pointer to Array":
      return {
        id: 189171,
        title: "Pointer to Array",
        description: "Write a C program to access array elements using a pointer to an array.",
        reference_output: "10 20 30",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int arr[3] = {10, 20, 30};\n\n    int (*ptr)[3] = &arr;\n\n    printf(\"%d %d %d\\n\",\n           (*ptr)[0],\n           (*ptr)[1],\n           (*ptr)[2]);\n\n    return 0;\n}",
        hints: "[\"A pointer can point to the entire array instead of a single element.\"]",
        topic_id: 'c-p12-t3',
        course_id: 'c-programming'
      };
    case "Pointers to Structures":
      return {
        id: 189182,
        title: "Pointers to Structures",
        description: "Write a C program to access structure members using a structure pointer.",
        reference_output: "Enter Name: Name: Balu",
        test_input: "Balu",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nstruct Student {\n    char name[20];\n};\n\nint main() {\n    struct Student s;\n    struct Student *ptr = &s;\n\n    printf(\"Enter Name: \");\n    scanf(\"%s\", ptr->name);\n\n    printf(\"Name: %s\\n\", ptr->name);\n\n    return 0;\n}",
        hints: "[\"Use the arrow (->) operator.\"]",
        topic_id: 'c-p13-t7',
        course_id: 'c-programming'
      };
    case "Check Positive or Negative":
      return {
        id: 189030,
        title: "Check Positive or Negative",
        description: "Write a C program to check whether a number entered by the user is positive or negative using an if-else statement.",
        reference_output: "Enter a number: The number is positive.",
        test_input: "5",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int num;\n\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n\n    if (num >= 0) {\n        printf(\"The number is positive.\\n\");\n    } else {\n        printf(\"The number is negative.\\n\");\n    }\n\n    return 0;\n}",
        hints: "[\"Use an if-else statement to execute one block when the condition is true and another when it is false.\"]",
        topic_id: 'c-p5-t2',
        course_id: 'c-programming'
      };
    case "Multiplication Table":
      return {
        id: 189037,
        title: "Multiplication Table",
        description: "Write a C program to generate the multiplication table of a number using a do-while loop.",
        reference_output: "Enter a number: 5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n5 x 10 = 50",
        test_input: "5",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int num, i = 1;\n\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n\n    do {\n        printf(\"%d x %d = %d\\n\", num, i, num * i);\n        i++;\n    } while (i <= 10);\n\n    return 0;\n}",
        hints: "[\"Start from 1 and repeatedly multiply the entered number by the counter until 10.\"]",
        topic_id: 'c-p6-t2',
        course_id: 'c-programming'
      };
    case "Largest of Three Numbers":
      return {
        id: 189032,
        title: "Largest of Three Numbers",
        description: "Write a C program to find the largest of three numbers using an else-if ladder.",
        reference_output: "Enter three numbers: 25 is the largest number.",
        test_input: "10 20 30",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int a, b, c;\n\n    printf(\"Enter three numbers: \");\n    scanf(\"%d %d %d\", &a, &b, &c);\n\n    if (a >= b && a >= c) {\n        printf(\"%d is the largest number.\\n\", a);\n    }\n    else if (b >= a && b >= c) {\n        printf(\"%d is the largest number.\\n\", b);\n    }\n    else {\n        printf(\"%d is the largest number.\\n\", c);\n    }\n\n    return 0;\n}",
        hints: "[\"Compare the three numbers using multiple conditions and print the largest one.\"]",
        topic_id: 'c-p5-t4',
        course_id: 'c-programming'
      };
    case "Even Numbers":
      return {
        id: 189038,
        title: "Even Numbers",
        description: "Write a C program to print all even numbers from 1 to 20 using a for loop.",
        reference_output: "2 4 6 8 10 12 14 16 18 20 ",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int i;\n\n    for (i = 2; i <= 20; i += 2) {\n        printf(\"%d \", i);\n    }\n\n    return 0;\n}",
        hints: "[\"Start the loop from 2 and increment by 2 in each iteration.\"]",
        topic_id: 'c-p6-t3',
        course_id: 'c-programming'
      };
    case "Uppercase or Lowercase":
      return {
        id: 189035,
        title: "Uppercase or Lowercase",
        description: "Write a C program to check whether a character entered by the user is an uppercase letter or a lowercase letter using the conditional (ternary) operator.",
        reference_output: "Enter a character: Uppercase Letter",
        test_input: "a",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    char ch;\n\n    printf(\"Enter a character: \");\n    scanf(\"%c\", &ch);\n\n    (ch >= 'A' && ch <= 'Z')\n        ? printf(\"Uppercase Letter\\n\")\n        : printf(\"Lowercase Letter\\n\");\n\n    return 0;\n}",
        hints: "[\"Compare the character with the range \\\\'A\\\\' to \\\\'Z\\\\' and use the ternary operator to display the result.\"]",
        topic_id: 'c-p5-t7',
        course_id: 'c-programming'
      };
    case "Skip a Number":
      return {
        id: 189041,
        title: "Skip a Number",
        description: "Write a C program to print numbers from 1 to 10, skipping the number 5 using the continue statement.",
        reference_output: "1 2 3 4 6 7 8 9 10 ",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int i;\n\n    for (i = 1; i <= 10; i++) {\n        if (i == 5) {\n            continue;\n        }\n        printf(\"%d \", i);\n    }\n\n    return 0;\n}",
        hints: "[\"Use continue to skip the current iteration when a specific condition is met.\"]",
        topic_id: 'c-p6-t6',
        course_id: 'c-programming'
      };
    case "Optimize Sum Calculation":
      return {
        id: 189043,
        title: "Optimize Sum Calculation",
        description: "Write a C program to calculate the sum of numbers from 1 to N using a loop. Optimize the program by avoiding unnecessary calculations inside the loop.",
        reference_output: "Enter Number: Sum = 15\n",
        test_input: "4",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int n, i, sum = 0;\n\n    printf(\"Enter Number: \");\n    scanf(\"%d\", &n);\n\n    for (i = 1; i <= n; i++) {\n        sum += i;\n    }\n\n    printf(\"Sum = %d\\n\", sum);\n\n    return 0;\n}",
        hints: "[\"Perform only the required operation inside the loop and avoid repeating calculations that can be done once outside the loop.\"]",
        topic_id: 'c-p6-t8',
        course_id: 'c-programming'
      };
    case "Calculate Square Function":
      return {
        id: 189045,
        title: "Calculate Square Function",
        description: "Write a C program to declare and define a function that calculates the square of a number and displays the result.",
        reference_output: "Square = 25",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\n/* Function Declaration */\nint square(int);\n\nint main() {\n    int num = 5;\n\n    printf(\"Square = %d\\n\", square(num));\n\n    return 0;\n}\n\n/* Function Definition */\nint square(int n) {\n    return n * n;\n}",
        hints: "[\"Declare the function before main(), define it after main(), and call it from main().\"]",
        topic_id: 'c-p7-t2',
        course_id: 'c-programming'
      };
    case "Largest of Two Numbers":
      return {
        id: 189047,
        title: "Largest of Two Numbers",
        description: "Write a C program to create a function that returns the larger of two numbers using the return statement.",
        reference_output: "Enter two numbers: Largest Number = 25",
        test_input: "15 25",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint findMax(int a, int b) {\n    if (a > b)\n        return a;\n    else\n        return b;\n}\n\nint main() {\n    int num1, num2;\n\n    printf(\"Enter two numbers: \");\n    scanf(\"%d %d\", &num1, &num2);\n\n    printf(\"Largest Number = %d\\n\", findMax(num1, num2));\n\n    return 0;\n}",
        hints: "[\"Use the return statement to send a value from the function back to the calling function.\"]",
        topic_id: 'c-p7-t4',
        course_id: 'c-programming'
      };
    case "Add Two Numbers via Parameters":
      return {
        id: 189048,
        title: "Add Two Numbers via Parameters",
        description: "Write a C program to create a function that accepts two numbers as parameters and returns their sum.",
        reference_output: "Enter two numbers: Sum = 30",
        test_input: "10 20",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint add(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    int num1, num2;\n\n    printf(\"Enter two numbers: \");\n    scanf(\"%d %d\", &num1, &num2);\n\n    printf(\"Sum = %d\\n\", add(num1, num2));\n\n    return 0;\n}",
        hints: "[\"Pass values to the function through parameters and use them inside the function.\"]",
        topic_id: 'c-p7-t5',
        course_id: 'c-programming'
      };
    case "Function Pointers":
      return {
        id: 189172,
        title: "Function Pointers",
        description: "Write a C program to add two numbers entered by the user using a function pointer.",
        reference_output: "Enter two numbers: Sum = 30",
        test_input: "10 20",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint add(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    int a, b;\n\n    printf(\"Enter two numbers: \");\n    scanf(\"%d %d\", &a, &b);\n\n    int (*ptr)(int, int) = add;\n\n    printf(\"Sum = %d\\n\", ptr(a, b));\n\n    return 0;\n}",
        hints: "[\"Store the address of the addition function in a function pointer and call it.\"]",
        topic_id: 'c-p12-t4',
        course_id: 'c-programming'
      };
    case "Structures and Functions":
      return {
        id: 189183,
        title: "Structures and Functions",
        description: "Write a C program to pass a structure to a function and calculate the percentage of a student.",
        reference_output: "Enter Name: Enter Percentage: Percentage = 92.50%",
        test_input: "Balu 92.5",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nstruct Student {\n    char name[20];\n    float marks;\n};\n\nvoid display(struct Student s) {\n    printf(\"Percentage = %.2f%%\\n\", s.marks);\n}\n\nint main() {\n    struct Student s;\n\n    printf(\"Enter Name: \");\n    scanf(\"%s\", s.name);\n\n    printf(\"Enter Percentage: \");\n    scanf(\"%f\", &s.marks);\n\n    display(s);\n\n    return 0;\n}",
        hints: "[\"Pass the structure variable as a function argument.\"]",
        topic_id: 'c-p13-t8',
        course_id: 'c-programming'
      };
    case "Dynamic Arrays":
      return {
        id: 189192,
        title: "Dynamic Arrays",
        description: "Write a C program to create a dynamic array of size N, accept elements from the user, and find the largest element.",
        reference_output: "Enter size: Enter elements:\nLargest Element = 67",
        test_input: "5 12 45 8 67 23",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n, i;\n    int *arr;\n\n    printf(\"Enter size: \");\n    scanf(\"%d\", &n);\n\n    arr = (int *)malloc(n * sizeof(int));\n\n    printf(\"Enter elements:\\n\");\n\n    for(i = 0; i < n; i++) {\n        scanf(\"%d\", &arr[i]);\n    }\n\n    int max = arr[0];\n\n    for(i = 1; i < n; i++) {\n        if(arr[i] > max)\n            max = arr[i];\n    }\n\n    printf(\"Largest Element = %d\\n\", max);\n\n    free(arr);\n\n    return 0;\n}",
        hints: "[\"Allocate memory according to the size entered by the user.\"]",
        topic_id: 'c-p14-t7',
        course_id: 'c-programming'
      };
    case "Calculate Square in Void Function":
      return {
        id: 189051,
        title: "Calculate Square in Void Function",
        description: "Write a C program to create a void function that finds and displays the square of a number entered by the user.",
        reference_output: "Enter a number: Square = 36",
        test_input: "6",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nvoid findSquare(int num) {\n    printf(\"Square = %d\\n\", num * num);\n}\n\nint main() {\n    int num;\n\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n\n    findSquare(num);\n\n    return 0;\n}",
        hints: "[\"Use a void function to calculate the square and print the result directly without returning a value.\"]",
        topic_id: 'c-p7-t8',
        course_id: 'c-programming'
      };
    case "Inline Function Cube Calculator":
      return {
        id: 189057,
        title: "Inline Function Cube Calculator",
        description: "Write a C program to demonstrate an inline function that calculates the cube of a number.",
        reference_output: "Enter a number: Cube = 64",
        test_input: "4",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nstatic inline int cube(int n) {\n    return n * n * n;\n}\n\nint main() {\n    int num;\n\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n\n    printf(\"Cube = %d\\n\", cube(num));\n\n    return 0;\n}",
        hints: "[\"Create an inline function that returns the cube of the given number.\"]",
        topic_id: 'c-p8-t6',
        course_id: 'c-programming'
      };
    case "Initialize and Display Even Numbers":
      return {
        id: 189060,
        title: "Initialize and Display Even Numbers",
        description: "Write a C program to initialize an array with the first 10 even numbers and display them.",
        reference_output: "Even Numbers: 2 4 6 8 10 12 14 16 18 20 ",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int even[10] = {2,4,6,8,10,12,14,16,18,20};\n    int i;\n\n    printf(\"Even Numbers: \");\n\n    for(i = 0; i < 10; i++) {\n        printf(\"%d \", even[i]);\n    }\n\n    return 0;\n}",
        hints: "[\"Initialize the array while declaring it and use a loop to print all elements.\"]",
        topic_id: 'c-p9-t2',
        course_id: 'c-programming'
      };
    case "Count Function Calls with Static Variable":
      return {
        id: 189055,
        title: "Count Function Calls with Static Variable",
        description: "Write a C program to demonstrate the use of the static storage class by counting the number of times a function is called.",
        reference_output: "Function called 1 time(s)\nFunction called 2 time(s)\nFunction called 3 time(s)",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nvoid countCalls() {\n    static int count = 0;\n\n    count++;\n    printf(\"Function called %d time(s)\\n\", count);\n}\n\nint main() {\n    countCalls();\n    countCalls();\n    countCalls();\n\n    return 0;\n}",
        hints: "[\"A static variable retains its value between function calls.\"]",
        topic_id: 'c-p8-t4',
        course_id: 'c-programming'
      };
    case "Reverse Array Input":
      return {
        id: 189062,
        title: "Reverse Array Input",
        description: "Write a C program to accept 5 numbers from the user and display them in reverse order.",
        reference_output: "Enter 5 numbers:\nNumbers in Reverse Order: 50 40 30 20 10 ",
        test_input: "10\\n20\\n30\\n40\\n50",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int arr[5], i;\n\n    printf(\"Enter 5 numbers:\\n\");\n\n    for(i = 0; i < 5; i++) {\n        scanf(\"%d\", &arr[i]);\n    }\n\n    printf(\"Numbers in Reverse Order: \");\n\n    for(i = 4; i >= 0; i--) {\n        printf(\"%d \", arr[i]);\n    }\n\n    return 0;\n}",
        hints: "[\"Store the numbers in an array and use a loop from the last index to the first index.\"]",
        topic_id: 'c-p9-t4',
        course_id: 'c-programming'
      };
    case "Insert Element in Array":
      return {
        id: 189065,
        title: "Insert Element in Array",
        description: "Write a C program to insert an element at a specified position in an array.",
        reference_output: "Array After Insertion: 10 20 25 30 40 50 ",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int arr[10] = {10, 20, 30, 40, 50};\n    int size = 5, pos = 3, value = 25, i;\n\n    for(i = size; i >= pos; i--) {\n        arr[i] = arr[i - 1];\n    }\n    arr[pos - 1] = value;\n    size++;\n\n    printf(\"Array After Insertion: \");\n    for(i = 0; i < size; i++) {\n        printf(\"%d \", arr[i]);\n    }\n\n    return 0;\n}",
        hints: "[\"Shift elements to the right before inserting the new element.\"]",
        topic_id: 'c-p9-t7',
        course_id: 'c-programming'
      };
    case "Concatenate Two Strings":
      return {
        id: 189071,
        title: "Concatenate Two Strings",
        description: "Write a C program to concatenate two strings and display the result.",
        reference_output: "Hello World",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char first[30] = \"Hello \";\n    char second[] = \"World\";\n\n    strcat(first, second);\n\n    printf(\"%s\\n\", first);\n\n    return 0;\n}",
        hints: "[\"Use the strcat() function.\"]",
        topic_id: 'c-p10-t5',
        course_id: 'c-programming'
      };
    case "String Input with fgets()":
      return {
        id: 189069,
        title: "String Input with fgets()",
        description: "Write a C program to accept a name from the user and display a welcome message.",
        reference_output: "Enter your name: Welcome Ajith\n",
        test_input: "Ajith",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    char name[50];\n\n    printf(\"Enter your name: \");\n    fgets(name, sizeof(name), stdin);\n\n    printf(\"Welcome %s\", name);\n\n    return 0;\n}",
        hints: "[\"Use fgets() to read a string containing spaces.\"]",
        topic_id: 'c-p10-t3',
        course_id: 'c-programming'
      };
    case "String to Integer Conversion":
      return {
        id: 189074,
        title: "String to Integer Conversion",
        description: "Write a C program to convert a numeric string into an integer and display the result.",
        reference_output: "Number = 1234",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    char str[] = \"1234\";\n    int num = atoi(str);\n    printf(\"Number = %d\\n\", num);\n    return 0;\n}",
        hints: "[\"Use the atoi() function.\"]",
        topic_id: 'c-p10-t8',
        course_id: 'c-programming'
      };
    case "Declare and Initialize City Name":
      return {
        id: 189068,
        title: "Declare and Initialize City Name",
        description: "Write a C program to declare and initialize a string representing a city name and display it.",
        reference_output: "City: Hyderabad",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    char city[] = \"Hyderabad\";\n\n    printf(\"City: %s\\n\", city);\n\n    return 0;\n}",
        hints: "[\"Initialize the string at the time of declaration.\"]",
        topic_id: 'c-p10-t2',
        course_id: 'c-programming'
      };
    case "void Pointers":
      return {
        id: 189174,
        title: "void Pointers",
        description: "Write a C program to accept an integer from the user, store its address in a void pointer, and display the value.",
        reference_output: "Enter a number: Value = 25",
        test_input: "25",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int num;\n\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n\n    void *ptr = &num;\n\n    printf(\"Value = %d\\n\", *(int *)ptr);\n\n    return 0;\n}",
        hints: "[\"A void pointer must be type-cast before dereferencing.\"]",
        topic_id: 'c-p12-t6',
        course_id: 'c-programming'
      };
    case "Unions":
      return {
        id: 189184,
        title: "Unions",
        description: "Write a C program to demonstrate how a union shares memory between members.",
        reference_output: "Number = 100\nValue = 25.50",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nunion Data {\n    int num;\n    float value;\n};\n\nint main() {\n    union Data d;\n\n    d.num = 100;\n    printf(\"Number = %d\\n\", d.num);\n\n    d.value = 25.5;\n    printf(\"Value = %.2f\\n\", d.value);\n\n    return 0;\n}",
        hints: "[\"Assign values to different union members one after another and observe the output.\"]",
        topic_id: 'c-p13-t9',
        course_id: 'c-programming'
      };
    case "Dynamic Structures":
      return {
        id: 189193,
        title: "Dynamic Structures",
        description: "Write a C program to dynamically allocate memory for a student structure and display the entered student details.",
        reference_output: "Enter Name: Enter Roll Number: \nStudent Details\nName: Balu\nRoll No: 101",
        test_input: "Balu 101",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Student {\n    char name[20];\n    int rollNo;\n};\n\nint main() {\n    struct Student *s;\n\n    s = (struct Student *)malloc(sizeof(struct Student));\n\n    printf(\"Enter Name: \");\n    scanf(\"%s\", s->name);\n\n    printf(\"Enter Roll Number: \");\n    scanf(\"%d\", &s->rollNo);\n\n    printf(\"\\nStudent Details\\n\");\n    printf(\"Name: %s\\n\", s->name);\n    printf(\"Roll No: %d\\n\", s->rollNo);\n\n    free(s);\n\n    return 0;\n}",
        hints: "[\"Use malloc() with a structure pointer.\"]",
        topic_id: 'c-p14-t8',
        course_id: 'c-programming'
      };
    case "File Positioning":
      return {
        id: 189200,
        title: "File Positioning",
        description: "Write a C program to move the file pointer to a specific position and read a character.",
        reference_output: "Character = m",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    FILE *fp;\n    char ch;\n\n    fp = fopen(\"data.txt\", \"r\");\n\n    fseek(fp, 5, SEEK_SET);\n\n    ch = fgetc(fp);\n\n    printf(\"Character = %c\\n\", ch);\n\n    fclose(fp);\n\n    return 0;\n}",
        hints: "[\"Use fseek() to reposition the file pointer.\"]",
        topic_id: 'c-p15-t7',
        course_id: 'c-programming'
      };
    case "Conditional Compilation":
      return {
        id: 189206,
        title: "Conditional Compilation",
        description: "Write a C program that displays a debugging message only when a macro named DEBUG is defined.",
        reference_output: "Debug Mode Enabled\nProgram Executed",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\n#define DEBUG\n\nint main() {\n\n#ifdef DEBUG\n    printf(\"Debug Mode Enabled\\n\");\n#endif\n\n    printf(\"Program Executed\\n\");\n\n    return 0;\n}",
        hints: "[\"Use #ifdef and #endif.\"]",
        topic_id: 'c-p16-t5',
        course_id: 'c-programming'
      };
    case "Bit Manipulation Techniques":
      return {
        id: 189237,
        title: "Bit Manipulation Techniques",
        description: "Write a C program to check whether the 3rd bit of a number is ON or OFF.",
        reference_output: "Enter a number: 3rd Bit is ON",
        test_input: "5",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int num;\n\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n\n    if(num & (1 << 2))\n        printf(\"3rd Bit is ON\\n\");\n    else\n        printf(\"3rd Bit is OFF\\n\");\n\n    return 0;\n}",
        hints: "[\"Use bitwise AND (&) with a bit mask.\"]",
        topic_id: 'c-p17-t2',
        course_id: 'c-programming'
      };
    case "Mastery Challenge":
      return {
        id: 189119,
        title: "Mastery Challenge",
        description: "Write a C program to declare variables of different data types (int, float, and char), initialize them with values, and display the values.",
        reference_output: "Age = 20\nHeight = 5.8\nGrade = A",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int age = 20;\n    float height = 5.8;\n    char grade = 'A';\n\n    printf(\"Age = %d\\n\", age);\n    printf(\"Height = %.1f\\n\", height);\n    printf(\"Grade = %c\\n\", grade);\n\n    return 0;\n}",
        hints: "Declare variables and assign values to them at the time of declaration before printing.",
        topic_id: 'c-p2-t2',
        course_id: 'c-programming'
      };
    case "Mastery Challenge":
      return {
        id: 189120,
        title: "Mastery Challenge",
        description: "Write a C program to demonstrate the use of constants and literals by declaring a constant value for PI and displaying it along with different numeric and character literals.",
        reference_output: "PI = 3.14159\nInteger Literal = 100\nFloat Literal = 25.75\nCharacter Literal = A",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    const float PI = 3.14159;\n\n    printf(\"PI = %.5f\\n\", PI);\n    printf(\"Integer Literal = %d\\n\", 100);\n    printf(\"Float Literal = %.2f\\n\", 25.75);\n    printf(\"Character Literal = %c\\n\", 'A');\n\n    return 0;\n}",
        hints: "Use the const keyword to declare a constant and directly use literals in printf() statements.",
        topic_id: 'c-p2-t3',
        course_id: 'c-programming'
      };
    case "Mastery Challenge":
      return {
        id: 189122,
        title: "Mastery Challenge",
        description: "Write a C program to find and display the memory size (in bytes) of different data types using the sizeof operator.",
        reference_output: "Size of int = 4 bytes\nSize of float = 4 bytes\nSize of char = 1 bytes\nSize of double = 8 bytes",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    printf(\"Size of int = %zu bytes\\n\", sizeof(int));\n    printf(\"Size of float = %zu bytes\\n\", sizeof(float));\n    printf(\"Size of char = %zu bytes\\n\", sizeof(char));\n    printf(\"Size of double = %zu bytes\\n\", sizeof(double));\n\n    return 0;\n}",
        hints: "Use the sizeof operator with data types or variables to determine their memory size.",
        topic_id: 'c-p2-t5',
        course_id: 'c-programming'
      };
    case "Mastery Challenge":
      return {
        id: 189124,
        title: "Mastery Challenge",
        description: "Write a C program to create an enumeration for the days of the week and display the value of a selected day.",
        reference_output: "Value of WEDNESDAY = 3",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nenum Day {\n    SUNDAY,\n    MONDAY,\n    TUESDAY,\n    WEDNESDAY,\n    THURSDAY,\n    FRIDAY,\n    SATURDAY\n};\n\nint main() {\n    enum Day today = WEDNESDAY;\n\n    printf(\"Value of WEDNESDAY = %d\\n\", today);\n\n    return 0;\n}",
        hints: "Use the enum keyword to define a set of named integer constants.",
        topic_id: 'c-p2-t7',
        course_id: 'c-programming'
      };
    case "Mastery Challenge":
      return {
        id: 189126,
        title: "Mastery Challenge",
        description: "Write a C program to perform arithmetic operations (addition, subtraction, multiplication, division, and modulus) on two integers and display the results.",
        reference_output: "Addition = 25\nSubtraction = 15\nMultiplication = 100\nDivision = 4\nModulus = 0",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int a = 20, b = 5;\n\n    printf(\"Addition = %d\\n\", a + b);\n    printf(\"Subtraction = %d\\n\", a - b);\n    printf(\"Multiplication = %d\\n\", a * b);\n    printf(\"Division = %d\\n\", a / b);\n    printf(\"Modulus = %d\\n\", a % b);\n\n    return 0;\n}",
        hints: "Use arithmetic operators +, -, *, /, and % to perform calculations.",
        topic_id: 'c-p3-t1',
        course_id: 'c-programming'
      };
    case "Mastery Challenge":
      return {
        id: 189128,
        title: "Mastery Challenge",
        description: "Write a C program to demonstrate the use of logical operators (&&, ||, !) by evaluating logical expressions.",
        reference_output: "(a < b && b > 15) = 1\n(a > b || b > 15) = 1\n!(a > b) = 1",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int a = 10, b = 20;\n\n    printf(\"(a < b && b > 15) = %d\\n\", (a < b && b > 15));\n    printf(\"(a > b || b > 15) = %d\\n\", (a > b || b > 15));\n    printf(\"!(a > b) = %d\\n\", !(a > b));\n\n    return 0;\n}",
        hints: "Use logical operators to combine or negate relational expressions.",
        topic_id: 'c-p3-t3',
        course_id: 'c-programming'
      };
    case "Mastery Challenge":
      return {
        id: 189129,
        title: "Mastery Challenge",
        description: "Write a C program to demonstrate the use of assignment operators (=, +=, -=, *=, /=, %=) on an integer variable and display the results.",
        reference_output: "After += : 15\nAfter -= : 12\nAfter *= : 24\nAfter /= : 6\nAfter %= : 0",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int a = 10;\n\n    a += 5;\n    printf(\"After += : %d\\n\", a);\n\n    a -= 3;\n    printf(\"After -= : %d\\n\", a);\n\n    a *= 2;\n    printf(\"After *= : %d\\n\", a);\n\n    a /= 4;\n    printf(\"After /= : %d\\n\", a);\n\n    a %= 3;\n    printf(\"After %%= : %d\\n\", a);\n\n    return 0;\n}",
        hints: "Use compound assignment operators to update the value of a variable.",
        topic_id: 'c-p3-t4',
        course_id: 'c-programming'
      };
    case "Mastery Challenge":
      return {
        id: 189131,
        title: "Mastery Challenge",
        description: "Write a C program to demonstrate the use of bitwise operators (&, |, ^, ~) on two integer values and display the results.",
        reference_output: "a & b = 1\na | b = 7\na ^ b = 6\n~a = -6",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int a = 5, b = 3;\n\n    printf(\"a & b = %d\\n\", a & b);\n    printf(\"a | b = %d\\n\", a | b);\n    printf(\"a ^ b = %d\\n\", a ^ b);\n    printf(\"~a = %d\\n\", ~a);\n\n    return 0;\n}",
        hints: "Use bitwise operators to perform operations directly on the binary representation of integers.",
        topic_id: 'c-p3-t6',
        course_id: 'c-programming'
      };
    case "const Pointers":
      return {
        id: 189175,
        title: "const Pointers",
        description: "Write a C program to accept a number from the user and display it using a pointer to a constant.",
        reference_output: "Enter a number: Value = 100",
        test_input: "100",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int num;\n\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n\n    const int *ptr = &num;\n\n    printf(\"Value = %d\\n\", *ptr);\n\n    return 0;\n}",
        hints: "[\"A pointer to a constant can access the value but cannot modify it through the pointer.\"]",
        topic_id: 'c-p12-t7',
        course_id: 'c-programming'
      };
    case "Mastery Challenge":
      return {
        id: 189134,
        title: "Mastery Challenge",
        description: "Write a C program to display a student's name, age, and percentage using the printf() function.\n\nVariables provided:\n- name (char[]): \"Alice\"\n- age (int): 20\n- percentage (float): 85.5",
        reference_output: "Name: Alice\nAge: 20\nPercentage: 85.5",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\\n\\nint main() {\\n    char name[] = \"Alice\";\\n    int age = 20;\\n    float percentage = 85.5;\\n\\n    printf(\"Name: %s\\\\n\", name);\\n    printf(\"Age: %d\\\\n\", age);\\n    printf(\"Percentage: %.1f\\\\n\", percentage);\\n\\n    return 0;\\n}",
        hints: "Use the printf() function with appropriate format specifiers to display different types of data.",
        topic_id: 'c-p4-t1',
        course_id: 'c-programming'
      };
    case "typedef Keyword":
      return {
        id: 189185,
        title: "typedef Keyword",
        description: "Write a C program to create a new data type for a structure using typedef and display employee details.",
        reference_output: "Enter ID: Enter Name: ID: 101\nName: Balu",
        test_input: "101 Balu",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\ntypedef struct {\n    int id;\n    char name[20];\n} Employee;\n\nint main() {\n    Employee emp;\n\n    printf(\"Enter ID: \");\n    scanf(\"%d\", &emp.id);\n\n    printf(\"Enter Name: \");\n    scanf(\"%s\", emp.name);\n\n    printf(\"ID: %d\\n\", emp.id);\n    printf(\"Name: %s\\n\", emp.name);\n\n    return 0;\n}",
        hints: "[\"Use typedef to avoid writing struct repeatedly.\"]",
        topic_id: 'c-p13-t10',
        course_id: 'c-programming'
      };
    case "Mastery Challenge":
      return {
        id: 189138,
        title: "Mastery Challenge",
        description: "Write a C program to read an integer from the user using the scanf() function and display the entered value.",
        reference_output: "Enter a number: You entered: 25",
        test_input: "25",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\\n\\nint main() {\\n    int num;\\n\\n    printf(\"Enter a number: \");\\n    scanf(\"%d\", &num);\\n\\n    printf(\"You entered: %d\\\\n\", num);\\n\\n    return 0;\\n}",
        hints: "Use scanf() with the appropriate format specifier to accept input from the user.",
        topic_id: 'c-p4-t2',
        course_id: 'c-programming'
      };
    case "Mastery Challenge":
      return {
        id: 189143,
        title: "Mastery Challenge",
        description: "Write a C program to display a student's name, roll number, and marks using formatted output.",
        reference_output: "Student Details\n---------------\nName       : Ishan\nRoll No    : 101\nMarks      : 89.5",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    char name[] = \"Ishan\";\n    int rollNo = 101;\n    float marks = 89.5;\n\n    printf(\"Student Details\\n\");\n    printf(\"---------------\\n\");\n    printf(\"Name       : %s\\n\", name);\n    printf(\"Roll No    : %d\\n\", rollNo);\n    printf(\"Marks      : %.1f\\n\", marks);\n\n    return 0;\n}",
        hints: "Use printf() with format specifiers to display data in a well-structured format.",
        topic_id: 'c-p4-t6',
        course_id: 'c-programming'
      };
    case "Mastery Challenge":
      return {
        id: 189145,
        title: "Mastery Challenge",
        description: "Write a C program to read a string from the user using gets() and display it using puts().",
        reference_output: "Enter a string: You entered: Welcome To CS Studio",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    char str[100];\n\n    printf(\"Enter a string: \");\n    gets(str);\n\n    printf(\"You entered: \");\n    puts(str);\n\n    return 0;\n}",
        hints: "Use gets() to accept a string and puts() to display it.",
        topic_id: 'c-p4-t5',
        course_id: 'c-programming'
      };
    case "Count Digits":
      return {
        id: 189036,
        title: "Count Digits",
        description: "Write a C program to count the number of digits in an integer using a while loop.",
        reference_output: "Enter a number: Number of digits = 5",
        test_input: "5",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int num, count = 0;\n\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n\n    while (num != 0) {\n        count++;\n        num = num / 10;\n    }\n\n    printf(\"Number of digits = %d\\n\", count);\n\n    return 0;\n}",
        hints: "[\"Repeatedly divide the number by 10 until it becomes 0 and count the iterations.\"]",
        topic_id: 'c-p6-t1',
        course_id: 'c-programming'
      };
    case "Stop at Zero":
      return {
        id: 189040,
        title: "Stop at Zero",
        description: "Write a C program to accept numbers from the user continuously and stop the program when the user enters 0 using the break statement.",
        reference_output: "Enter a number (0 to stop): You entered: 15\nEnter a number (0 to stop): You entered: 25\nEnter a number (0 to stop): Program terminated.\n",
        test_input: "1\\n2\\n3\\n0",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int num;\n\n    while (1) {\n        printf(\"Enter a number (0 to stop): \");\n        scanf(\"%d\", &num);\n\n        if (num == 0) {\n            break;\n        }\n\n        printf(\"You entered: %d\\n\", num);\n    }\n\n    printf(\"Program terminated.\\n\");\n\n    return 0;\n}",
        hints: "[\"Use an infinite loop and terminate it with break when the entered number is 0.\"]",
        topic_id: 'c-p6-t5',
        course_id: 'c-programming'
      };
    case "Mastery Challenge":
      return {
        id: 189144,
        title: "Mastery Challenge",
        description: "Write a C program to read a character using getchar() and display it using putchar().",
        reference_output: "Enter a character: You entered: A",
        test_input: "A",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    char ch;\n\n    printf(\"Enter a character: \");\n    ch = getchar();\n\n    printf(\"You entered: \");\n    putchar(ch);\n\n    return 0;\n}",
        hints: "Use getchar() to accept a single character from the user and putchar() to display it.",
        topic_id: 'c-p4-t4',
        course_id: 'c-programming'
      };
    case "Menu Driven Program":
      return {
        id: 189033,
        title: "Menu Driven Program",
        description: "Write a C program to display the corresponding menu item based on the user's choice using a switch statement.",
        reference_output: "Menu\n1. Pizza\n2. Burger\n3. Sandwich\n4. Pasta\nEnter your choice: You selected Sandwich.",
        test_input: "2",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int choice;\n\n    printf(\"Menu\\n\");\n    printf(\"1. Pizza\\n\");\n    printf(\"2. Burger\\n\");\n    printf(\"3. Sandwich\\n\");\n    printf(\"4. Pasta\\n\");\n\n    printf(\"Enter your choice: \");\n    scanf(\"%d\", &choice);\n\n    switch (choice) {\n        case 1:\n            printf(\"You selected Pizza.\\n\");\n            break;\n        case 2:\n            printf(\"You selected Burger.\\n\");\n            break;\n        case 3:\n            printf(\"You selected Sandwich.\\n\");\n            break;\n        case 4:\n            printf(\"You selected Pasta.\\n\");\n            break;\n        default:\n            printf(\"Invalid Choice\\n\");\n    }\n\n    return 0;\n}",
        hints: "[\"Use a switch statement to match the entered choice with a menu option.\"]",
        topic_id: 'c-p5-t5',
        course_id: 'c-programming'
      };
    case "Display Welcome Message":
      return {
        id: 189146,
        title: "Display Welcome Message",
        description: "Write a C program to create and call a user-defined function that displays a welcome message.",
        reference_output: "Welcome to Functions in C!",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nvoid displayMessage() {\n    printf(\"Welcome to Functions in C!\\n\");\n}\n\nint main() {\n    displayMessage();\n\n    return 0;\n}",
        hints: "[\"Define a function outside main() and call it from main().\"]",
        topic_id: 'c-p7-t1',
        course_id: 'c-programming'
      };
    case "Add Two Numbers Function":
      return {
        id: 189046,
        title: "Add Two Numbers Function",
        description: "Write a C program to create a function that adds two numbers and call the function from main() to display the result.",
        reference_output: "Sum = 30",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint add(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    int result;\n\n    result = add(10, 20);   // Function Call\n\n    printf(\"Sum = %d\\n\", result);\n\n    return 0;\n}",
        hints: "[\"Pass values to the function when calling it and use the returned value.\"]",
        topic_id: 'c-p7-t3',
        course_id: 'c-programming'
      };
    case "Factorial Using Recursion":
      return {
        id: 189052,
        title: "Factorial Using Recursion",
        description: "Write a C program to find the factorial of a number using recursion.",
        reference_output: "Enter a number: Factorial = 120",
        test_input: "5",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint factorial(int n) {\n    if (n == 0 || n == 1)\n        return 1;\n    else\n        return n * factorial(n - 1);\n}\n\nint main() {\n    int num;\n\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n\n    printf(\"Factorial = %d\\n\", factorial(num));\n\n    return 0;\n}",
        hints: "[\"A recursive function calls itself. Define a base case to stop the recursion.\"]",
        topic_id: 'c-p8-t1',
        course_id: 'c-programming'
      };
    case "Recursive vs Iterative Factorial":
      return {
        id: 189053,
        title: "Recursive vs Iterative Factorial",
        description: "Write a C program to calculate the factorial of a number using an iterative approach and compare it with a recursive approach by displaying both results.",
        reference_output: "Enter a number: Iterative Factorial = 120\nRecursive Factorial = 120",
        test_input: "5",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint recursiveFactorial(int n) {\n    if (n <= 1)\n        return 1;\n    return n * recursiveFactorial(n - 1);\n}\n\nint main() {\n    int num, i;\n    int iterativeFact = 1;\n\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n\n    for (i = 1; i <= num; i++) {\n        iterativeFact *= i;\n    }\n\n    printf(\"Iterative Factorial = %d\\n\", iterativeFact);\n    printf(\"Recursive Factorial = %d\\n\", recursiveFactorial(num));\n\n    return 0;\n}",
        hints: "[\"Use a loop for the iterative method and a function that calls itself for the recursive method.\"]",
        topic_id: 'c-p8-t2',
        course_id: 'c-programming'
      };
    case "Static Variable Retention":
      return {
        id: 189056,
        title: "Static Variable Retention",
        description: "Write a C program to demonstrate the use of a static variable inside a function. Call the function multiple times and display how the variable retains its value between calls.",
        reference_output: "Count = 1\nCount = 2\nCount = 3",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nvoid increment() {\n    static int count = 0;\n\n    count++;\n    printf(\"Count = %d\\n\", count);\n}\n\nint main() {\n    increment();\n    increment();\n    increment();\n\n    return 0;\n}",
        hints: "[\"A static variable is initialized only once and preserves its value across function calls.\"]",
        topic_id: 'c-p8-t5',
        course_id: 'c-programming'
      };
    case "Variable-Length Argument List Summation":
      return {
        id: 189058,
        title: "Variable-Length Argument List Summation",
        description: "Write a C program to demonstrate Variable-Length Argument Lists by creating a function that calculates the sum of multiple numbers passed as arguments.",
        reference_output: "Sum = 100",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <stdarg.h>\n\nint sum(int count, ...) {\n    va_list args;\n    int total = 0;\n\n    va_start(args, count);\n\n    for (int i = 0; i < count; i++) {\n        total += va_arg(args, int);\n    }\n\n    va_end(args);\n\n    return total;\n}\n\nint main() {\n    printf(\"Sum = %d\\n\", sum(4, 10, 20, 30, 40));\n\n    return 0;\n}",
        hints: "[\"Use the macros va_list, va_start(), va_arg(), and va_end() from the <stdarg.h> header file.\"]",
        topic_id: 'c-p8-t7',
        course_id: 'c-programming'
      };
    case "2D Array Total Marks":
      return {
        id: 189063,
        title: "2D Array Total Marks",
        description: "Write a C program to store marks of 3 students in 3 subjects and calculate the total marks of each student.",
        reference_output: "Student 1 Total = 245\nStudent 2 Total = 220\nStudent 3 Total = 275",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int marks[3][3] = {\n        {80, 75, 90},\n        {65, 70, 85},\n        {95, 88, 92}\n    };\n    int i, j, total;\n\n    for(i = 0; i < 3; i++) {\n        total = 0;\n        for(j = 0; j < 3; j++) {\n            total += marks[i][j];\n        }\n        printf(\"Student %d Total = %d\\n\", i + 1, total);\n    }\n\n    return 0;\n}",
        hints: "[\"Use a 2D array where rows represent students and columns represent subjects.\"]",
        topic_id: 'c-p9-t5',
        course_id: 'c-programming'
      };
    case "Introduction to Structures":
      return {
        id: 189176,
        title: "Introduction to Structures",
        description: "Write a C program to store and display a student's name, roll number, and marks using a structure.",
        reference_output: "Enter Name: Enter Roll Number: Enter Marks: \nStudent Details\nName: Balu\nRoll No: 101\nMarks: 89.50",
        test_input: "Balu 101 89.5",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nstruct Student {\n    char name[20];\n    int rollNo;\n    float marks;\n};\n\nint main() {\n    struct Student s;\n\n    printf(\"Enter Name: \");\n    scanf(\"%s\", s.name);\n\n    printf(\"Enter Roll Number: \");\n    scanf(\"%d\", &s.rollNo);\n\n    printf(\"Enter Marks: \");\n    scanf(\"%f\", &s.marks);\n\n    printf(\"\\nStudent Details\\n\");\n    printf(\"Name: %s\\n\", s.name);\n    printf(\"Roll No: %d\\n\", s.rollNo);\n    printf(\"Marks: %.2f\\n\", s.marks);\n\n    return 0;\n}",
        hints: "[\"Use a structure to group related data of a student.\"]",
        topic_id: 'c-p13-t1',
        course_id: 'c-programming'
      };
    case "Stack vs Heap Memory":
      return {
        id: 189186,
        title: "Stack vs Heap Memory",
        description: "Write a C program to store a number using both a normal variable (stack memory) and a dynamically allocated variable (heap memory), then display both values.",
        reference_output: "Stack Value = 10\nHeap Value = 20",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int stackVar = 10;\n\n    int *heapVar = (int *)malloc(sizeof(int));\n    *heapVar = 20;\n\n    printf(\"Stack Value = %d\\n\", stackVar);\n    printf(\"Heap Value = %d\\n\", *heapVar);\n\n    free(heapVar);\n\n    return 0;\n}",
        hints: "[\"Use a normal variable for stack memory and malloc() for heap memory.\"]",
        topic_id: 'c-p14-t1',
        course_id: 'c-programming'
      };
    case "Introduction to File Handling":
      return {
        id: 189194,
        title: "Introduction to File Handling",
        description: "Write a C program to create a file and display a message indicating that the file was created successfully.",
        reference_output: "File Created Successfully",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    FILE *fp;\n\n    fp = fopen(\"sample.txt\", \"w\");\n\n    if(fp != NULL) {\n        printf(\"File Created Successfully\\n\");\n        fclose(fp);\n    }\n\n    return 0;\n}",
        hints: "[\"Use fopen() to create a file and fclose() to close it.\"]",
        topic_id: 'c-p15-t1',
        course_id: 'c-programming'
      };
    case "Error Handling in Files":
      return {
        id: 189201,
        title: "Error Handling in Files",
        description: "Write a C program to check whether a file exists before reading it.",
        reference_output: "File Opened Successfully",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    FILE *fp;\n\n    fp = fopen(\"sample.txt\", \"r\");\n\n    if(fp == NULL) {\n        printf(\"File Not Found\\n\");\n    }\n    else {\n        printf(\"File Opened Successfully\\n\");\n        fclose(fp);\n    }\n\n    return 0;\n}",
        hints: "[\"Verify that fopen() does not return NULL.\"]",
        topic_id: 'c-p15-t8',
        course_id: 'c-programming'
      };
    case "Second Largest Element":
      return {
        id: 189066,
        title: "Second Largest Element",
        description: "Write a C program to find the second largest element in an array.",
        reference_output: "Second Largest Element = 45",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int arr[] = {12, 45, 7, 89, 34};\n    int largest = arr[0], second = arr[0], i;\n\n    for(i = 1; i < 5; i++) {\n        if(arr[i] > largest) {\n            second = largest;\n            largest = arr[i];\n        }\n        else if(arr[i] > second && arr[i] != largest) {\n            second = arr[i];\n        }\n    }\n\n    printf(\"Second Largest Element = %d\\n\", second);\n\n    return 0;\n}",
        hints: "[\"Track both the largest and second largest values while traversing the array.\"]",
        topic_id: 'c-p9-t8',
        course_id: 'c-programming'
      };
    case "Array of Strings":
      return {
        id: 189072,
        title: "Array of Strings",
        description: "Write a C program to store and display the names of 3 students using an array of strings.",
        reference_output: "Ravi\nSita\nKiran",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    char names[3][20] = {\n        \"Ravi\",\n        \"Sita\",\n        \"Kiran\"\n    };\n    int i;\n\n    for(i = 0; i < 3; i++) {\n        printf(\"%s\\n\", names[i]);\n    }\n\n    return 0;\n}",
        hints: "[\"Use a two-dimensional character array.\"]",
        topic_id: 'c-p10-t6',
        course_id: 'c-programming'
      };
    case "String Tokenization":
      return {
        id: 189073,
        title: "String Tokenization",
        description: "Write a C program to split a sentence into individual words using string tokenization.",
        reference_output: "C\nProgramming\nLanguage",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char str[] = \"C Programming Language\";\n    char *token = strtok(str, \" \");\n\n    while(token != NULL) {\n        printf(\"%s\\n\", token);\n        token = strtok(NULL, \" \");\n    }\n\n    return 0;\n}",
        hints: "[\"Use the strtok() function.\"]",
        topic_id: 'c-p10-t7',
        course_id: 'c-programming'
      };
    case "Pointer Arithmetic":
      return {
        id: 189151,
        title: "Pointer Arithmetic",
        description: "Write a C program to demonstrate pointer arithmetic by moving a pointer to the next element in an array.",
        reference_output: "First Element = 10\nSecond Element = 20",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int arr[] = {10, 20, 30};\n\n    int *ptr = arr;\n\n    printf(\"First Element = %d\\n\", *ptr);\n\n    ptr++;\n\n    printf(\"Second Element = %d\\n\", *ptr);\n\n    return 0;\n}",
        hints: "[\"Increment the pointer using ptr++.\"]",
        topic_id: 'c-p11-t5',
        course_id: 'c-programming'
      };
    case "NULL Pointers":
      return {
        id: 189152,
        title: "NULL Pointers",
        description: "Write a C program to declare a NULL pointer and check whether it points to a valid memory location.",
        reference_output: "Pointer is NULL",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int *ptr = NULL;\n\n    if(ptr == NULL)\n        printf(\"Pointer is NULL\\n\");\n    else\n        printf(\"Pointer is not NULL\\n\");\n\n    return 0;\n}",
        hints: "[\"Use NULL to initialize a pointer that does not point anywhere.\"]",
        topic_id: 'c-p11-t6',
        course_id: 'c-programming'
      };
    case "Structure Declaration and Definition":
      return {
        id: 189177,
        title: "Structure Declaration and Definition",
        description: "Write a C program to declare a structure for an employee and display the entered employee details.",
        reference_output: "Enter Employee ID: Enter Employee Name: ID: 1001\nName: Ravi",
        test_input: "1001 Ravi",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nstruct Employee {\n    int id;\n    char name[20];\n};\n\nint main() {\n    struct Employee emp;\n\n    printf(\"Enter Employee ID: \");\n    scanf(\"%d\", &emp.id);\n\n    printf(\"Enter Employee Name: \");\n    scanf(\"%s\", emp.name);\n\n    printf(\"ID: %d\\n\", emp.id);\n    printf(\"Name: %s\\n\", emp.name);\n\n    return 0;\n}",
        hints: "[\"Declare the structure globally and create a structure variable inside main().\"]",
        topic_id: 'c-p13-t2',
        course_id: 'c-programming'
      };
    case "malloc() Function":
      return {
        id: 189187,
        title: "malloc() Function",
        description: "Write a C program to dynamically allocate memory for 5 integers using malloc(), accept values from the user, and find their sum.",
        reference_output: "Enter 5 numbers:\nSum = 150",
        test_input: "10 20 30 40 50",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *arr, i, sum = 0;\n\n    arr = (int *)malloc(5 * sizeof(int));\n\n    printf(\"Enter 5 numbers:\\n\");\n\n    for(i = 0; i < 5; i++) {\n        scanf(\"%d\", &arr[i]);\n        sum += arr[i];\n    }\n\n    printf(\"Sum = %d\\n\", sum);\n\n    free(arr);\n\n    return 0;\n}",
        hints: "[\"Use malloc() to create an integer array at runtime.\"]",
        topic_id: 'c-p14-t2',
        course_id: 'c-programming'
      };
    case "Opening and Closing Files":
      return {
        id: 189195,
        title: "Opening and Closing Files",
        description: "Write a C program to open an existing file and close it properly.",
        reference_output: "File Opened Successfully\nFile Closed Successfully",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    FILE *fp;\n\n    fp = fopen(\"sample.txt\", \"r\");\n\n    if(fp != NULL) {\n        printf(\"File Opened Successfully\\n\");\n        fclose(fp);\n        printf(\"File Closed Successfully\\n\");\n    }\n\n    return 0;\n}",
        hints: "[\"Always close files using fclose() after use.\"]",
        topic_id: 'c-p15-t2',
        course_id: 'c-programming'
      };
    case "Introduction to Preprocessor":
      return {
        id: 189202,
        title: "Introduction to Preprocessor",
        description: "Write a C program to use a preprocessor directive to include the standard input-output library and display a message.",
        reference_output: "Welcome to Preprocessor Directives",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    printf(\"Welcome to Preprocessor Directives\\n\");\n\n    return 0;\n}",
        hints: "[\"Preprocessor directives begin with # and are processed before compilation.\"]",
        topic_id: 'c-p16-t1',
        course_id: 'c-programming'
      };
    case "Predefined Macros":
      return {
        id: 189207,
        title: "Predefined Macros",
        description: "Write a C program to display the current file name and compilation date using predefined macros.",
        reference_output: "File Name: [File]\nCompilation Date: [Date]",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n\n    printf(\"File Name: %s\\n\", __FILE__);\n    printf(\"Compilation Date: %s\\n\", __DATE__);\n\n    return 0;\n}",
        hints: "[\"Use __FILE__ and __DATE__.\"]",
        topic_id: 'c-p16-t6',
        course_id: 'c-programming'
      };
    case "Bit Fields":
      return {
        id: 189238,
        title: "Bit Fields",
        description: "Write a C program to store a student's age and section using bit fields.",
        reference_output: "Age = 20\nSection = 2",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nstruct Student {\n    unsigned int age : 7;\n    unsigned int section : 3;\n};\n\nint main() {\n    struct Student s;\n\n    s.age = 20;\n    s.section = 2;\n\n    printf(\"Age = %u\\n\", s.age);\n    printf(\"Section = %u\\n\", s.section);\n\n    return 0;\n}",
        hints: "[\"Bit fields allow efficient memory usage inside structures.\"]",
        topic_id: 'c-p17-t3',
        course_id: 'c-programming'
      };
    case "Pointers and Arrays":
      return {
        id: 189153,
        title: "Pointers and Arrays",
        description: "Write a C program to display all elements of an array using a pointer.",
        reference_output: "5 10 15 20 25 ",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int arr[] = {5, 10, 15, 20, 25};\n    int *ptr = arr;\n    int i;\n\n    for(i = 0; i < 5; i++) {\n        printf(\"%d \", *(ptr + i));\n    }\n\n    return 0;\n}",
        hints: "[\"Array names act as pointers to their first element.\"]",
        topic_id: 'c-p11-t7',
        course_id: 'c-programming'
      };
    case "Pointers and Functions":
      return {
        id: 189154,
        title: "Pointers and Functions",
        description: "Write a C program to swap two numbers using a function and pointers.",
        reference_output: "Before Swap: 10 20\nAfter Swap: 20 10",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n    int temp;\n\n    temp = *a;\n    *a = *b;\n    *b = temp;\n}\n\nint main() {\n    int x = 10, y = 20;\n\n    printf(\"Before Swap: %d %d\\n\", x, y);\n\n    swap(&x, &y);\n\n    printf(\"After Swap: %d %d\\n\", x, y);\n\n    return 0;\n}",
        hints: "[\"Pass the addresses of variables to the function and modify them using pointers.\"]",
        topic_id: 'c-p11-t8',
        course_id: 'c-programming'
      };
    case "Accessing Structure Members":
      return {
        id: 189178,
        title: "Accessing Structure Members",
        description: "Write a C program to calculate the total price of a product using structure members.",
        reference_output: "Enter Product Name: Enter Quantity: Enter Price: Total Cost = 50.00",
        test_input: "Pen 10 5",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nstruct Product {\n    char name[20];\n    int quantity;\n    float price;\n};\n\nint main() {\n    struct Product p;\n\n    printf(\"Enter Product Name: \");\n    scanf(\"%s\", p.name);\n\n    printf(\"Enter Quantity: \");\n    scanf(\"%d\", &p.quantity);\n\n    printf(\"Enter Price: \");\n    scanf(\"%f\", &p.price);\n\n    printf(\"Total Cost = %.2f\\n\", p.quantity * p.price);\n\n    return 0;\n}",
        hints: "[\"Access structure members using the dot (.) operator.\"]",
        topic_id: 'c-p13-t3',
        course_id: 'c-programming'
      };
    case "calloc() Function":
      return {
        id: 189188,
        title: "calloc() Function",
        description: "Write a C program to dynamically allocate memory for 5 integers using calloc() and display the default values.",
        reference_output: "Values:\n0 0 0 0 0 ",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *arr, i;\n\n    arr = (int *)calloc(5, sizeof(int));\n\n    printf(\"Values:\\n\");\n\n    for(i = 0; i < 5; i++) {\n        printf(\"%d \", arr[i]);\n    }\n\n    free(arr);\n\n    return 0;\n}",
        hints: "[\"calloc() initializes allocated memory to zero.\"]",
        topic_id: 'c-p14-t3',
        course_id: 'c-programming'
      };
    case "File Modes":
      return {
        id: 189196,
        title: "File Modes",
        description: "Write a C program to demonstrate writing to a file using write mode (w).",
        reference_output: "Data Written Successfully",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    FILE *fp;\n\n    fp = fopen(\"data.txt\", \"w\");\n\n    fprintf(fp, \"Welcome to File Handling\");\n\n    fclose(fp);\n\n    printf(\"Data Written Successfully\\n\");\n\n    return 0;\n}",
        hints: "[\"Use \\\"w\\\" mode to create a new file or overwrite an existing file.\"]",
        topic_id: 'c-p15-t3',
        course_id: 'c-programming'
      };
    case "#include Directive":
      return {
        id: 189203,
        title: "#include Directive",
        description: "Write a C program that uses the #include directive to include the math library and calculate the square root of a number.",
        reference_output: "Enter a number: Square Root = 5.00",
        test_input: "25",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <math.h>\n\nint main() {\n    int num;\n\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n\n    printf(\"Square Root = %.2f\\n\", sqrt(num));\n\n    return 0;\n}",
        hints: "[\"Include the appropriate header file and use a library function.\"]",
        topic_id: 'c-p16-t2',
        course_id: 'c-programming'
      };
    case "#undef and #pragma":
      return {
        id: 189208,
        title: "#undef and #pragma",
        description: "Write a C program to define a macro, undefine it using #undef, and then define it again with a different value.",
        reference_output: "Value = 20",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\n#define VALUE 10\n\n#undef VALUE\n\n#define VALUE 20\n\nint main() {\n\n    printf(\"Value = %d\\n\", VALUE);\n\n    return 0;\n}",
        hints: "[\"Use #undef before redefining a macro.\"]",
        topic_id: 'c-p16-t7',
        course_id: 'c-programming'
      };
    case "Enumerations Advanced":
      return {
        id: 189239,
        title: "Enumerations Advanced",
        description: "Write a C program to create an enumeration for traffic signals and display the action based on user input.",
        reference_output: "1.RED 2.YELLOW 3.GREEN\nEnter Signal: GO",
        test_input: "3",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nenum Signal { RED = 1, YELLOW, GREEN };\n\nint main() {\n    int choice;\n\n    printf(\"1.RED 2.YELLOW 3.GREEN\\n\");\n    printf(\"Enter Signal: \");\n    scanf(\"%d\", &choice);\n\n    switch(choice) {\n        case RED:\n            printf(\"STOP\\n\");\n            break;\n        case YELLOW:\n            printf(\"WAIT\\n\");\n            break;\n        case GREEN:\n            printf(\"GO\\n\");\n            break;\n        default:\n            printf(\"Invalid Signal\\n\");\n    }\n\n    return 0;\n}",
        hints: "[\"Use enum values inside a switch statement.\"]",
        topic_id: 'c-p17-t4',
        course_id: 'c-programming'
      };
    case "Structure Initialization":
      return {
        id: 189179,
        title: "Structure Initialization",
        description: "Write a C program to initialize a structure with book details and display them.",
        reference_output: "Title: C Programming\nPrice: 450.50",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nstruct Book {\n    char title[30];\n    float price;\n};\n\nint main() {\n    struct Book b = {\"C Programming\", 450.50};\n\n    printf(\"Title: %s\\n\", b.title);\n    printf(\"Price: %.2f\\n\", b.price);\n\n    return 0;\n}",
        hints: "[\"Assign values during structure declaration.\"]",
        topic_id: 'c-p13-t4',
        course_id: 'c-programming'
      };
    case "realloc() Function":
      return {
        id: 189189,
        title: "realloc() Function",
        description: "Write a C program to dynamically create an array of 3 integers, then increase its size to 5 integers using realloc() and accept the additional values.",
        reference_output: "Enter 3 numbers:\nEnter 2 more numbers:\nArray Elements: 10 20 30 40 50 ",
        test_input: "10 20 30 40 50",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *arr, i;\n\n    arr = (int *)malloc(3 * sizeof(int));\n\n    printf(\"Enter 3 numbers:\\n\");\n    for(i = 0; i < 3; i++) {\n        scanf(\"%d\", &arr[i]);\n    }\n\n    arr = (int *)realloc(arr, 5 * sizeof(int));\n\n    printf(\"Enter 2 more numbers:\\n\");\n    for(i = 3; i < 5; i++) {\n        scanf(\"%d\", &arr[i]);\n    }\n\n    printf(\"Array Elements: \");\n\n    for(i = 0; i < 5; i++) {\n        printf(\"%d \", arr[i]);\n    }\n\n    free(arr);\n\n    return 0;\n}",
        hints: "[\"Use realloc() to resize previously allocated memory.\"]",
        topic_id: 'c-p14-t4',
        course_id: 'c-programming'
      };
    case "Reading from Files":
      return {
        id: 189197,
        title: "Reading from Files",
        description: "Write a C program to read and display the contents of a file.",
        reference_output: "Welcome to File Handling",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    FILE *fp;\n    char ch;\n\n    fp = fopen(\"data.txt\", \"r\");\n\n    while((ch = fgetc(fp)) != EOF) {\n        printf(\"%c\", ch);\n    }\n\n    fclose(fp);\n\n    return 0;\n}",
        hints: "[\"Use fgetc() to read one character at a time.\"]",
        topic_id: 'c-p15-t4',
        course_id: 'c-programming'
      };
    case "#define Directive":
      return {
        id: 189204,
        title: "#define Directive",
        description: "Write a C program to calculate the area of a circle using a symbolic constant defined with #define.",
        reference_output: "Enter radius: Area = 78.54",
        test_input: "5",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\n#define PI 3.14159\n\nint main() {\n    float radius;\n\n    printf(\"Enter radius: \");\n    scanf(\"%f\", &radius);\n\n    printf(\"Area = %.2f\\n\", PI * radius * radius);\n\n    return 0;\n}",
        hints: "[\"Use #define to create a constant value for PI.\"]",
        topic_id: 'c-p16-t3',
        course_id: 'c-programming'
      };
    case "Type Qualifiers":
      return {
        id: 189240,
        title: "Type Qualifiers",
        description: "Write a C program to demonstrate the use of the const qualifier by storing the value of PI.",
        reference_output: "PI = 3.14159",
        test_input: "",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    const float PI = 3.14159;\n\n    printf(\"PI = %.5f\\n\", PI);\n\n    return 0;\n}",
        hints: "[\"A const variable cannot be modified after initialization.\"]",
        topic_id: 'c-p17-t5',
        course_id: 'c-programming'
      };
    case "Multi-File Programs":
      return {
        id: 189242,
        title: "Multi-File Programs",
        description: "Write a C program split across multiple files to calculate the square of a number. (Note: Since we use an online editor, simulate it within a single main function as a logical split).",
        reference_output: "Enter Number: Square = 25",
        test_input: "5",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint square(int);\n\nint main() {\n    int num;\n\n    printf(\"Enter Number: \");\n    scanf(\"%d\", &num);\n\n    printf(\"Square = %d\\n\", square(num));\n\n    return 0;\n}\n\nint square(int n) {\n    return n * n;\n}",
        hints: "[\"Define the function in one file and call it from another.\"]",
        topic_id: 'c-p17-t7',
        course_id: 'c-programming'
      };
    case "Project 1: Calculator":
      return {
        id: 18005,
        title: "Project 1: Calculator",
        description: "A Calculator is one of the most common applications used daily. It performs mathematical operations such as addition, subtraction, multiplication, and division.\n\nIn this project, students will create a command-line calculator using C programming. This project helps beginners understand how user input, conditional statements, and arithmetic operations work together.\n\n---\n\n**Real World Usage**\n\nCalculators are used in Mobile Phones, Computers, Banking Software, Billing Systems, Scientific Calculators, and Engineering Applications. Every advanced calculator starts with the same basic logic you will learn in this project.\n\n---\n\n**Features**\n\n*   **Addition**: Adds two numbers (e.g., 10 + 20 = 30)\n*   **Subtraction**: Subtracts one number from another (e.g., 20 - 10 = 10)\n*   **Multiplication**: (e.g., 5 × 4 = 20)\n*   **Division**: (e.g., 20 ÷ 5 = 4)\n\n---\n\n**How the Project Works**\n\n1.  User enters first number. (e.g., `10`)\n2.  User enters second number. (e.g., `5`)\n3.  User selects operation: `1.Add`, `2.Subtract`, `3.Multiply`, `4.Divide`\n4.  Program performs selected operation.\n5.  Result is displayed.\n\n<!-- SPLIT -->\n\n**Problem Statement**\n\nCreate a Calculator program that performs Addition, Subtraction, Multiplication, and Division. The user enters two numbers and selects an operation.\n\n**Note:** For division, if the second number is 0, print `Cannot divide by zero`. Otherwise, print the result in the format `Result = X.XX` (2 decimal places).",
        reference_output: "15",
        test_input: "10\\n5\\n1\\n",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main()\n{\n    float a,b;\n    int choice;\n\n    printf(\"Enter First Number: \");\n    scanf(\"%f\",&a);\n\n    printf(\"Enter Second Number: \");\n    scanf(\"%f\",&b);\n\n    printf(\"\\n1.Add\");\n    printf(\"\\n2.Subtract\");\n    printf(\"\\n3.Multiply\");\n    printf(\"\\n4.Divide\");\n\n    printf(\"\\nChoice: \");\n    scanf(\"%d\",&choice);\n\n    switch(choice)\n    {\n        case 1:\n            printf(\"Result = %.2f\",a+b);\n            break;\n\n        case 2:\n            printf(\"Result = %.2f\",a-b);\n            break;\n\n        case 3:\n            printf(\"Result = %.2f\",a*b);\n            break;\n\n        case 4:\n            if(b!=0)\n                printf(\"Result = %.2f\",a/b);\n            else\n                printf(\"Cannot divide by zero\");\n            break;\n\n        default:\n            printf(\"Invalid Choice\");\n    }\n\n    return 0;\n}",
        hints: "[\"Take two numbers from the user.\",\"Display operation choices.\",\"Use switch-case to determine the operation.\"]",
        topic_id: 'c-p18-t5',
        course_id: 'c-programming'
      };
    case "Project: Student Management System":
      return {
        id: 189116,
        title: "Project: Student Management System",
        description: "The Student Management System is a menu-driven application used to manage student records efficiently. It allows users to add, view, search, update, and delete student information.\n\nThis project simulates how educational institutions manage student data and introduces students to real-world data management concepts.\n\n---\n\n**Features**\n\n**Add Student**\n\nAllows users to enter and store new student records.\n\nExample:\n\nRoll No: 101\n\nName: Balu\n\nMarks: 95\n\nThe record is saved successfully.\n\n**Display Students**\n\nDisplays all stored student records in a tabular format.\n\nExample:\n\nRoll No    Name      Marks\n\n101        Balu      95\n\n102        Ram       89\n\n**Search Student**\n\nUsers can search for a student using the roll number.\n\nExample:\n\nEnter Roll Number: 101\n\nRecord Found\n\nRoll No: 101\n\nName: Balu\n\nMarks: 95\n\n**Update Student**\n\nAllows modification of existing student details.\n\nExample:\n\nSearch Roll Number: 101\n\nEnter New Name: Balu Kumar\n\nEnter New Marks: 98\n\nRecord Updated Successfully\n\n**Delete Student**\n\nRemoves a student record permanently.\n\nExample:\n\nEnter Roll Number: 101\n\nStudent Deleted Successfully\n\n---\n\n**How the Project Works**\n\n**Step 1**\n\nProgram starts and creates an array of student structures.\n\n**Step 2**\n\nMenu is displayed.\n\n1. Add Student\n2. Display Students\n3. Search Student\n4. Update Student\n5. Delete Student\n6. Exit\n\n**Step 3**\n\nUser selects an operation.\n\n**Step 4**\n\nProgram processes the request.\n\n**Step 5**\n\nUpdated records are displayed.\n\n<!-- SPLIT -->\n\n**Problem Statement**\n\nDevelop a Student Management System using C programming that performs the following operations:\n\n1. Add Student\n2. Display All Students\n3. Search Student\n4. Update Student Information\n5. Delete Student Record\n6. Exit Program\n\nEach student record should contain:\n\n* Roll Number\n* Name\n* Marks",
        reference_output: "Student Added Successfully",
        test_input: "1\\n591\\nBalu\\n93\\n6\\n",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n\nint main() {\n    int a = 10, b = 20;\n    printf(\"%d\\n\", a + b);\n    return 0;\n}",
        hints: "[\"Create a structure to store student information.\\\\n\\\\nstruct Student\\\\n{\\\\n    int roll;\\\\n    char name[50];\\\\n    float marks;\\\\n};\",\"Store multiple students using an array.\\\\n\\\\nstruct Student s[100];\",\"Use a menu-driven approach with a loop.\\\\n\\\\nwhile(1)\\\\n{\\\\n    // Menu\\\\n}\",\"Search students using Roll Number.\\\\n\\\\nfor(i=0;i<count;i++)\\\\n{\\\\n    if(s[i].roll==searchRoll)\\\\n    {\\\\n        // Found\\\\n    }\\\\n}\",\"For deletion, shift all records one position left.\\\\n\\\\nfor(i=index;i<count-1;i++)\\\\n{\\\\n    s[i]=s[i+1];\\\\n}\"]",
        topic_id: 'c-p18-t6',
        course_id: 'c-programming'
      };
    case "Project 3: Mini Text Editor":
      return {
        id: 18007,
        title: "Project 3: Mini Text Editor",
        description: "# Project 3: Mini Text Editor\n\n## Project Overview\n\nA Text Editor is software used to create and edit text documents.\n\n**Examples:**\n* Notepad\n* Notepad++\n* VS Code\n* Sublime Text\n\nIn this project, students will build a simplified version of a text editor.\n\n---\n\n## Features\n\n### Enter Text\nSave text entered by user.\n\n### Display Text\nView saved content.\n\n### Count Characters\nCalculate total characters.\n\n### Clear Text\nRemove all content.\n\n---\n\n## How the Project Works\n\n**Step 1**\nUser enters text.\n*(Example: Hello World)*\n\n**Step 2**\nProgram stores text in a character array.\n\n**Step 3**\nUser selects menu option.\n*(Example: Display Text)*\n\n**Step 4**\nProgram shows stored text.\n\n**Step 5**\nAdditional operations can be performed.\n\n<!-- SPLIT -->\n\n## Problem Statement\n\nCreate a Mini Text Editor that allows users to perform the following operations using a menu-driven approach:\n\n1. Enter Text\n2. Display Text\n3. Count Characters\n4. Clear Text\n5. Exit\n\n---\n\n## Hints & Logic Guide\n\n**Hint 1**\nStore text in a character array (e.g., `char text[1000]`).\n\n**Hint 2**\nUse `strlen()` to count the number of characters.\n\n**Hint 3**\nUse a `switch-case` menu inside an infinite loop to handle user choices.\n\n---\n\n## Sample Input\n```text\n1.Enter Text\n2.Display Text\n3.Count Characters\n4.Clear Text\n5.Exit\n\nChoice: 1\n\nEnter Text: Hello World\n```\n\n## Sample Output\n```text\nSaved Successfully\n```\n",
        reference_output: "Saved Successfully",
        test_input: "1\\ntest.txt\\nHello World\\n5\\n",
        test_args: [],
        starter_code: "",
        solution_code: "#include <stdio.h>\n#include <string.h>\n\nint main()\n{\n    char text[1000]=\"\";\n    int choice;\n\n    while(1)\n    {\n        printf(\"\\n\\n1.Enter Text\");\n        printf(\"\\n2.Display Text\");\n        printf(\"\\n3.Count Characters\");\n        printf(\"\\n4.Clear Text\");\n        printf(\"\\n5.Exit\");\n\n        printf(\"\\nChoice: \");\n        scanf(\"%d\",&choice);\n        getchar(); // consume newline\n\n        switch(choice)\n        {\n            case 1:\n                printf(\"Enter Text: \");\n                fgets(text,1000,stdin);\n                printf(\"Saved Successfully\");\n                break;\n\n            case 2:\n                printf(\"\\nText:\\n%s\",text);\n                break;\n\n            case 3:\n                printf(\"Characters = %d\", (int)strlen(text)-1);\n                break;\n\n            case 4:\n                strcpy(text,\"\");\n                printf(\"Text Cleared\");\n                break;\n\n            case 5:\n                return 0;\n\n            default:\n                printf(\"Invalid Choice\");\n        }\n    }\n}",
        hints: "[\"Use fopen() to open files in write ('w'), read ('r'), or append ('a') modes.\",\"Use remove() function to delete a file.\"]",
        topic_id: 'c-p18-t7',
        course_id: 'c-programming'
      };
    default:
      return null;
  }
};

module.exports = {
  getFallbackChallengeById,
  getFallbackChallengeByTopicId,
  getFallbackChallengeByTopicTitle
};
