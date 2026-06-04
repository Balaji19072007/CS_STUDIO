const { execSync } = require('child_process');
const fs = require('fs');

const code = `
#include <stdio.h>

int main()
{
    float a,b;
    int choice;

    scanf("%f",&a);
    scanf("%f",&b);
    scanf("%d",&choice);
    
    printf("a: %f, b: %f, choice: %d\\n", a, b, choice);
    return 0;
}
`;

fs.writeFileSync('test.c', code);
execSync('gcc test.c -o test.exe');

try {
    const output = execSync('test.exe', { input: "10\\n5\\n1\\n" }).toString();
    console.log("RAW OUTPUT:");
    console.log(output);
} catch (err) {
    console.error(err);
}
