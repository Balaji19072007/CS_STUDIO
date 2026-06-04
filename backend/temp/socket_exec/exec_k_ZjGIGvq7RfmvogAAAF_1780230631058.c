#include <stdio.h>

int main() { setvbuf(stdout, NULL, _IONBF, 0);
    char name[] = "Balu";
    int rollNo = 101;
    float marks = 89.5;

    printf("Student Details\n");
    printf("---------------\n");
    printf("Name       : %s\n", name);
    printf("Roll No    : %d\n", rollNo);
    printf("Marks      : %.1f\n", marks);

    return 0;
}