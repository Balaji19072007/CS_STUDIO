#include <stdio.h>

#define VALUE 10

#undef VALUE

#define VALUE 20

int main() {

    printf("Value = %d\n", VALUE);

    return 0;
}