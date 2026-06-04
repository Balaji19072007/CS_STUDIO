#include <stdio.h>
#include <stdlib.h>

int main() {
    int stackVar = 10;

    int *heapVar = (int *)malloc(sizeof(int));
    *heapVar = 20;

    printf("Stack Value = %d\n", stackVar);
    printf("Heap Value = %d\n", *heapVar);

    free(heapVar);

    return 0;
}