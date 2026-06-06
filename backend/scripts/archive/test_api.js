const jwt = require('jsonwebtoken');
const token = jwt.sign({ id: 'test_user_123' }, '6a2583cd2558f98527dc2eecdbec41b00e89aa9f7e66444aea5883dfad0f8a41');
const code = `#include <stdio.h>\nint main() { int num; printf("Enter a number: "); scanf("%d", &num); printf("You entered: %d\\n", num); return 0; }`;
fetch('http://localhost:5000/api/course-challenges/189138/run', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
    body: JSON.stringify({ code: code, language: 'C' })
}).then(res => res.json()).then(console.log);
