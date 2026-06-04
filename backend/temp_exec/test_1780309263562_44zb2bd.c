#include <stdio.h>
#include <stdlib.h>

int main() {
    int *ptr;

    ptr = (int *)malloc(sizeof(int));

    *ptr = 50;

    printf("Value = %d\n", *ptr);

    free(ptr);

    ptr = NULL;

    return 0;
}