#include <stdio.h>

int main() {
    FILE *fp;

    fp = fopen("sample.txt", "r");

    if(fp != NULL) {
        printf("File Opened Successfully\n");
        fclose(fp);
        printf("File Closed Successfully\n");
    }

    return 0;
}