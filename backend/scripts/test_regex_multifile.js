const cleanedCode = `
// File: main.c
#include <stdio.h>
int square(int);
int main() {
    printf("Square = %d\\n", square(5));
    return 0;
}

// File: math.c
int square(int n) {
    return n * n;
}
`;

const cFileBlocks = cleanedCode.split(/\/\/\s*File:\s*([a-zA-Z0-9_\-\.]+)/i);
console.log(cFileBlocks);
if (cFileBlocks.length > 1) {
    for (let i = 1; i < cFileBlocks.length; i += 2) {
        console.log("FILENAME:", cFileBlocks[i]);
        console.log("CONTENT:", cFileBlocks[i+1].trim());
    }
}
