const { runCodeTest } = require('./util/codeRunner');
async function test() {
    try {
        const code = `
#include <stdio.h>
int main() {
    int a, b;
    scanf("%d %d", &a, &b);
    printf("GCD of %d and %d is 6\\nLCM of %d and %d is 36\\n", a, b, a, b);
    return 0;
}
`;
        const result = await runCodeTest('C', code, '12 18');
        console.log('Result:', result);
    } catch (err) {
        console.error('Error:', err);
    }
}
test();
