const fetch = require('node-fetch') || globalThis.fetch;

const code = `#include <stdio.h>
int main() {
    int num1, num2;
    int sum, product;
    scanf("%d", &num1);
    scanf("%d", &num2);
    sum = num1 + num2;
    product = num1 * num2;
    printf("Sum: %d\\n", sum);
    printf("Product: %d\\n", product);
    return 0;
}`;

async function test() {
    try {
        const loginRes = await fetch('http://localhost:5000/api/auth/session/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin', password: 'Admin123!' })
        });
        const loginData = await loginRes.json();
        console.log('Login Response:', loginData);
        if (!loginData.token) return;

        const res = await fetch('http://localhost:5000/api/problems/1/run-tests', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${loginData.token}`
            },
            body: JSON.stringify({ code: code, language: 'C' })
        });
        const data = await res.json();
        console.log('Run Tests Response:', JSON.stringify(data, null, 2));
    } catch (e) {
        console.error(e);
    }
}
test();
