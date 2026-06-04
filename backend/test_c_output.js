const { execSync } = require('child_process');
const fs = require('fs');

const code = `
#include <stdio.h>

int main()
{
    float a,b;
    int choice;

    printf("Enter First Number: ");
    scanf("%f",&a);

    printf("Enter Second Number: ");
    scanf("%f",&b);

    printf("\\n1.Add");
    printf("\\n2.Subtract");
    printf("\\n3.Multiply");
    printf("\\n4.Divide");

    printf("\\nChoice: ");
    scanf("%d",&choice);

    switch(choice)
    {
        case 1:
            printf("Result = %.2f",a+b);
            break;

        case 2:
            printf("Result = %.2f",a-b);
            break;

        case 3:
            printf("Result = %.2f",a*b);
            break;

        case 4:
            if(b!=0)
                printf("Result = %.2f",a/b);
            else
                printf("Cannot divide by zero");
            break;

        default:
            printf("Invalid Choice");
    }

    return 0;
}
`;

fs.writeFileSync('test.c', code);
execSync('gcc test.c -o test.exe');

try {
    const output = execSync('test.exe', { input: "10\\n5\\n1\\n" }).toString();
    console.log("RAW OUTPUT:");
    console.log(output);

    const actual = (output || '').toString().replace(/\\s+/g, ' ').trim();
    const expected = ("Result = 15.00" || '').toString().replace(/\\s+/g, ' ').trim();

    console.log("ACTUAL: '" + actual + "'");
    console.log("EXPECTED: '" + expected + "'");
    console.log("INCLUDES:", actual.includes(expected));
} catch (err) {
    console.error(err);
}
