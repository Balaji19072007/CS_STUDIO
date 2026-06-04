// File: math.c
int square(int n) { 
    return n * n; 
}

// File: main.c
#include <stdio.h>

int square(int);

int main() {
    int num;
    printf("Enter Number: ");
    scanf("%d", &num);
    printf("Square = %d\n", square(num));
    return 0;
}
