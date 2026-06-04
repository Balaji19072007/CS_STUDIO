#include <stdio.h>
#include <stdlib.h>

int main() {
    int n, i;
    int *arr;

    printf("Enter size: ");
    scanf("%d", &n);

    arr = (int *)malloc(n * sizeof(int));

    printf("Enter elements:\n");

    for(i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }

    int max = arr[0];

    for(i = 1; i < n; i++) {
        if(arr[i] > max)
            max = arr[i];
    }

    printf("Largest Element = %d\n", max);

    free(arr);

    return 0;
}