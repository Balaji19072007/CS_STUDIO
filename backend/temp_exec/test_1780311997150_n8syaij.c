#include <stdio.h>

enum Signal { RED = 1, YELLOW, GREEN };

int main() {
    int choice;

    printf("1.RED 2.YELLOW 3.GREEN\n");
    printf("Enter Signal: ");
    scanf("%d", &choice);

    switch(choice) {
        case RED:
            printf("STOP\n");
            break;
        case YELLOW:
            printf("WAIT\n");
            break;
        case GREEN:
            printf("GO\n");
            break;
        default:
            printf("Invalid Signal\n");
    }

    return 0;
}