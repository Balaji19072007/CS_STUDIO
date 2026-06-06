const { runCodeTest } = require('./util/codeRunner');

console.log('Testing JavaScript execution...');

runCodeTest('javascript', 'console.log("Hello, JavaScript!");', '')
    .then(result => {
        console.log('✅ Test passed!');
        console.log('Result:', result);
        process.exit(0);
    })
    .catch(error => {
        console.error('❌ Test failed!');
        console.error('Error:', error.message);
        console.error('Stack:', error.stack);
        process.exit(1);
    });
