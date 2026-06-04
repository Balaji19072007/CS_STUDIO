#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr, i;

    arr = (int *)calloc(5, sizeof(int));

    printf("Values:\n");

    for(i = 0; i < 5; i++) {
        printf("%d ", arr[i]);
    }

    free(arr);

    return 0;
}