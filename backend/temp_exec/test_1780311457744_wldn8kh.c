#include <stdio.h>

#define MAX(a,b) ((a) > (b) ? (a) : (b))

int main() {
    int x, y;

    printf("Enter two numbers: ");
    scanf("%d %d", &x, &y);

    printf("Largest = %d\n", MAX(x, y));

    return 0;
}