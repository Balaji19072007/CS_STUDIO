#include <stdio.h>

struct Student {
    unsigned int age : 7;
    unsigned int section : 3;
};

int main() {
    struct Student s;

    s.age = 20;
    s.section = 2;

    printf("Age = %u\n", s.age);
    printf("Section = %u\n", s.section);

    return 0;
}