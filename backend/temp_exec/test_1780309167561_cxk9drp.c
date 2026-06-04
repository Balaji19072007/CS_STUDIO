#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr, i, sum = 0;

    arr = (int *)malloc(5 * sizeof(int));

    printf("Enter 5 numbers:\n");

    for(i = 0; i < 5; i++) {
        scanf("%d", &arr[i]);
        sum += arr[i];
    }

    printf("Sum = %d\n", sum);

    free(arr);

    return 0;
}