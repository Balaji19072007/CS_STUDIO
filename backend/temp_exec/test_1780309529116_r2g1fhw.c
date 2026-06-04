#include <stdio.h>

int main() {
    FILE *fp;

    fp = fopen("sample.txt", "r");

    if(fp == NULL) {
        printf("File Not Found\n");
    }
    else {
        printf("File Opened Successfully\n");
        fclose(fp);
    }

    return 0;
}