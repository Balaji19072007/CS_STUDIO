#include <stdio.h>

int main() {
    FILE *fp;
    char name[20];
    int marks;

    fp = fopen("student.txt", "w");

    printf("Enter Name: ");
    scanf("%s", name);

    printf("Enter Marks: ");
    scanf("%d", &marks);

    fprintf(fp, "%s %d", name, marks);

    fclose(fp);

    printf("Record Saved Successfully\n");

    return 0;
}