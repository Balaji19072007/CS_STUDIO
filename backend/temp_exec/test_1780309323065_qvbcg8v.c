#include <stdio.h>
#include <stdlib.h>

struct Student {
    char name[20];
    int rollNo;
};

int main() {
    struct Student *s;

    s = (struct Student *)malloc(sizeof(struct Student));

    printf("Enter Name: ");
    scanf("%s", s->name);

    printf("Enter Roll Number: ");
    scanf("%d", &s->rollNo);

    printf("\nStudent Details\n");
    printf("Name: %s\n", s->name);
    printf("Roll No: %d\n", s->rollNo);

    free(s);

    return 0;
}