#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr, i;

    arr = (int *)malloc(3 * sizeof(int));

    printf("Enter 3 numbers:\n");
    for(i = 0; i < 3; i++) {
        scanf("%d", &arr[i]);
    }

    arr = (int *)realloc(arr, 5 * sizeof(int));

    printf("Enter 2 more numbers:\n");
    for(i = 3; i < 5; i++) {
        scanf("%d", &arr[i]);
    }

    printf("Array Elements: ");

    for(i = 0; i < 5; i++) {
        printf("%d ", arr[i]);
    }

    free(arr);

    return 0;
}