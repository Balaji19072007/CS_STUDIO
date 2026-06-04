#include <stdio.h>

int main() {
    FILE *fp;

    fp = fopen("data.txt", "w");

    fprintf(fp, "Welcome to File Handling");

    fclose(fp);

    printf("Data Written Successfully\n");

    return 0;
}