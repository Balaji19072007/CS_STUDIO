#include <stdio.h>

int main() {
    FILE *fp;

    fp = fopen("sample.txt", "w");

    if(fp != NULL) {
        printf("File Created Successfully\n");
        fclose(fp);
    }

    return 0;
}