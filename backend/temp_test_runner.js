const { runCodeTest } = require('./util/codeRunner');
runCodeTest('c', '#include <stdio.h>\nint main() { int num; printf("Enter a number: "); scanf("%d", &num); printf("You entered: %d\\n", num); return 0; }', '25\n').then(console.log);
