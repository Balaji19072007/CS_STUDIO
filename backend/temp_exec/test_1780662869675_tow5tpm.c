#include <stdio.h>

int main() {
    int arr[5];
    int sum=0;
    float average;

    printf("Enter 5 integers:\n");
    for(int i=0;i<5;i++){
        scanf("%d",&arr[i]);
        sum += arr[i];
    }
    average = (float)sum/5;
    printf("Sum of elements: %d\n",sum);
    printf("Average of elements: %2.f\n",average);
    return 0;
}