#include <stdio.h>

int main() {
    int num;

    printf("Enter a number: ");
    scanf("%d", &num);

    if(num & (1 << 2))
        printf("3rd Bit is ON\n");
    else
        printf("3rd Bit is OFF\n");

    return 0;
}