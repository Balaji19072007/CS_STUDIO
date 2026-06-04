#include <stdio.h>

#define PI 3.14159

int main() {
    float radius;

    printf("Enter radius: ");
    scanf("%f", &radius);

    printf("Area = %.2f\n", PI * radius * radius);

    return 0;
}