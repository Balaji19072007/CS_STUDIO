#include <stdio.h>

int main() {
    FILE *fp;
    int num = 100, value;

    fp = fopen("number.dat", "wb");

    fwrite(&num, sizeof(int), 1, fp);

    fclose(fp);

    fp = fopen("number.dat", "rb");

    fread(&value, sizeof(int), 1, fp);

    printf("Value = %d\n", value);

    fclose(fp);

    return 0;
}