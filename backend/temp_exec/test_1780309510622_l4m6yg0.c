#include <stdio.h>

int main() {
    FILE *fp;
    char ch;

    fp = fopen("data.txt", "r");

    fseek(fp, 5, SEEK_SET);

    ch = fgetc(fp);

    printf("Character = %c\n", ch);

    fclose(fp);

    return 0;
}