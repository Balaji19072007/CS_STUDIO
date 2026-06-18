const fs = require('fs');
const path = './util/problemData.json';
let data = JSON.parse(fs.readFileSync(path, 'utf8'));

const algos = {
  "Basic Console Output": {
    JavaScript: `console.log("Hello, JavaScript!");`
  },
  "Variable Declaration and Sum": {
    JavaScript: `const a = 5, b = 10;\nconsole.log("Sum: " + (a + b));`
  },
  "Basic Function Definition": {
    JavaScript: `function add(a, b) { return a + b; }\nconsole.log("Result: " + add(20, 22));`
  },
  "Arrow Function (ES6)": {
    JavaScript: `const multiply = (a, b) => a * b;\nconsole.log("Result: " + multiply(3, 5));`
  },
  "Ternary Operator (Conditional)": {
    JavaScript: `const score = 75;\nconsole.log("Status: " + (score >= 50 ? "Passed" : "Failed"));`
  },
  "Array Iteration (for...of)": {
    JavaScript: `const fruits = ["apple", "banana", "cherry"];\nfor (const f of fruits) console.log(f);`
  },
  "Object Literal and Destructuring": {
    JavaScript: `const user = { name: "Alice", email: "a@test.com" };\nconst { name, email } = user;\nconsole.log("Name: " + name + ", Email: " + email);`
  },
  "Array Map (Transform)": {
    JavaScript: `const nums = [1, 2, 3, 4, 5];\nconst doubled = nums.map(n => n * 2);\nconsole.log(JSON.stringify(doubled));`
  },
  "Array Filter (Select)": {
    JavaScript: `const ages = [15, 20, 25, 30];\nconst adults = ages.filter(a => a >= 25);\nconsole.log(JSON.stringify(adults));`
  },
  "Array Reduce (Accumulate)": {
    JavaScript: `const prices = [5.5, 3.0, 9.0];\nconst total = prices.reduce((acc, p) => acc + p, 0);\nconsole.log("Total: " + total);`
  },
  "Set Creation and Uniqueness": {
    JavaScript: `const nums = [1, 2, 2, 3, 4, 4, 5];\nconst unique = [...new Set(nums)];\nconsole.log(JSON.stringify(unique));`
  },
  "Object Spread Operator (Merging)": {
    JavaScript: `const a = { name: 'Alice', age: 30 };\nconst b = { age: 31, city: 'NY' };\nconsole.log({ ...a, ...b });`
  },
  "Template Literals and Interpolation": {
    JavaScript: `const item = "Laptop", price = 1200;\nconsole.log(\`The \${item} costs $\${price}.\`);`
  },
  "Asynchronous: setTimeout (Delay)": {
    JavaScript: `console.log("Start");\nsetTimeout(() => console.log("Delayed message"), 0);\nconsole.log("End");`
  },
  "Closure: Counter Function": {
    JavaScript: `function makeCounter() { let c = 0; return () => ++c; }\nconst counter = makeCounter();\nconsole.log("Count 1: " + counter());\nconsole.log("Count 2: " + counter());`
  },
  "Higher-Order Function (Logger)": {
    JavaScript: `function withLogger(fn) {\n  return function(...args) {\n    console.log("Calling add with args: " + args.join(", "));\n    const result = fn(...args);\n    console.log("Result: " + result);\n    return result;\n  };\n}\nconst add = (a, b) => a + b;\nconst loggedAdd = withLogger(add);\nconst r = loggedAdd(5, 3);\nconsole.log("Final result: " + r);`
  },
  "String Reversal (Array Methods)": {
    JavaScript: `const str = "javascript";\nconsole.log(str.split("").reverse().join(""));`
  },
  "Max Element in Array (Reduce)": {
    JavaScript: `const nums = [5, 20, 3, 15];\nconst max = nums.reduce((a, b) => a > b ? a : b);\nconsole.log("Max: " + max);`
  },
  "Count Vowels": {
    JavaScript: `const str = "javascript";\nconst count = str.split("").filter(c => "aeiou".includes(c)).length;\nconsole.log("Vowel Count: " + count);`
  },
  "Check Anagrams (Frequency Map)": {
    JavaScript: `const sort = s => s.split("").sort().join("");\nconsole.log("Are Anagrams: " + (sort("listen") === sort("silent")));`
  },
  "Two Sum Problem (Hash Map)": {
    JavaScript: `const nums = [2, 7, 11, 15], target = 9;\nconst map = {};\nfor (let i = 0; i < nums.length; i++) {\n  const c = target - nums[i];\n  if (map[c] !== undefined) { console.log(JSON.stringify([map[c], i])); break; }\n  map[nums[i]] = i;\n}`
  },
  "Sliding Window: Max Sum of Size K": {
    JavaScript: `const nums = [2, 5, 3, 7, 11, 10, 2, 6, 8], k = 4;\nlet windowSum = nums.slice(0, k).reduce((a, b) => a + b, 0), maxSum = windowSum;\nfor (let i = k; i < nums.length; i++) {\n  windowSum += nums[i] - nums[i - k];\n  maxSum = Math.max(maxSum, windowSum);\n}\nconsole.log("Max Sum: " + maxSum);`
  },
  "Promises: Basic Resolve/Reject": {
    JavaScript: `const p = new Promise((resolve) => resolve("Status check passed!"));\np.then(msg => console.log("Success: " + msg));`
  },
  "Async/Await with Promises": {
    JavaScript: `async function fetchData() {\n  console.log("Fetching data...");\n  const result = await Promise.resolve("Data fetched successfully");\n  console.log("Result: " + result);\n}\nfetchData();`
  },
  "Closures for Private Object Methods": {
    JavaScript: `function BankAccount(initial) {\n  let balance = initial;\n  return {\n    deposit(amount) { balance += amount; return balance; },\n    getBalance() { return balance; }\n  };\n}\nconst acc = BankAccount(100);\nconsole.log("New Balance: " + acc.deposit(50));\nconsole.log("Private access failed: " + acc.balance);`
  },
  "Class and `this` Keyword": {
    JavaScript: `class Circle {\n  constructor(r) { this.r = r; }\n  area() { return Math.PI * this.r * this.r; }\n}\nconsole.log("Area: " + new Circle(5).area());`
  },
  "OOP: Static Method": {
    JavaScript: `class MathHelper {\n  static sum(arr) { return arr.reduce((a, b) => a + b, 0); }\n}\nconsole.log("Static Sum: " + MathHelper.sum([1, 2, 3, 4, 5]));`
  },
  "Inheritance and `super`": {
    JavaScript: `class Animal {\n  constructor(name) { this.name = name; }\n  speak() { console.log(this.name + " makes a sound."); }\n}\nclass Dog extends Animal {\n  wagTail() { console.log(this.name + " wags tail."); }\n}\nconst d = new Dog("Buddy");\nd.speak();\nd.wagTail();`
  },
  "Prototype Chain and Inheritance": {
    JavaScript: `function Vehicle(name) { this.name = name; }\nVehicle.prototype.drive = function() { console.log(this.name + " is driving."); };\nconst car = new Vehicle("Tesla");\ncar.drive();`
  },
  "Reverse Words in a Sentence": {
    JavaScript: `const sentence = "JavaScript is fun";\nconsole.log(sentence.split(" ").reverse().join(" "));`
  },
  "Callback Function (Filter Even)": {
    JavaScript: `const nums = [1, 2, 3, 4, 5];\nconst evens = nums.filter(n => n % 2 === 0);\nconsole.log("Filtered: " + evens.join(","));`
  },
  "Remove Falsy Values": {
    JavaScript: `const arr = [1, false, 2, null, 3, undefined, 0, ""];\nconsole.log(JSON.stringify(arr.filter(Boolean)));`
  },
  "Check Prime (Imperative Loop)": {
    JavaScript: `function isPrime(n) {\n  if (n < 2) return false;\n  for (let i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) return false;\n  return true;\n}\nconsole.log("13 is prime: " + isPrime(13));\nconsole.log("15 is prime: " + isPrime(15));`
  },
  "Class: Getters and Setters": {
    JavaScript: `class Product {\n  constructor(price) { this._price = price; }\n  get price() { return this._price; }\n  set price(val) {\n    if (val <= 0) { console.log("Error: Price must be greater than 0."); return; }\n    this._price = val;\n  }\n}\nconst p = new Product(100);\nconsole.log("Initial Price: " + p.price);\np.price = -5;\np.price = 150;\nconsole.log("New Price: " + p.price);`
  },
  "Callback Hell (Simulated)": {
    JavaScript: `function step1(cb) { cb("User fetched."); }\nfunction step2(cb) { cb("Orders fetched."); }\nfunction step3(cb) { cb("Total calculated: 150."); }\nstep1(msg => {\n  console.log("1. " + msg);\n  step2(msg2 => {\n    console.log("2. " + msg2);\n    step3(msg3 => console.log("3. " + msg3));\n  });\n});`
  },
  "Promisify a Callback Function": {
    JavaScript: `function promisify(fn) {\n  return () => new Promise((res, rej) => fn((err, data) => err ? rej(err) : res(data)));\n}\nconst cbFn = (cb) => cb(null, "Success");\nconst pFn = promisify(cbFn);\npFn().then(r => console.log("Result: " + r));`
  },
  "Destructuring and Renaming": {
    JavaScript: `const config = { host: "localhost", port: 8080 };\nconst { host, port: httpPort } = config;\nconsole.log("Host: " + host + ", HTTP Port: " + httpPort);`
  },
  "Spread Operator (Deep Clone check)": {
    JavaScript: `const obj1 = { nested: { b: 2 } };\nconst obj2 = { ...obj1 };\nobj2.nested.b = 99;\nconsole.log("Obj1.nested.b: " + obj1.nested.b);\nconsole.log("Obj2.nested.b: " + obj2.nested.b);`
  },
  "Array: Find Unique Elements (Filter/IndexOf)": {
    JavaScript: `const arr = [1, 2, 2, 3, 4, 4, 5];\nconst unique = arr.filter((v, i, a) => a.indexOf(v) === i);\nconsole.log(JSON.stringify(unique));`
  },
  "String to Title Case (Map/Join)": {
    JavaScript: `const str = "java script is powerful";\nconsole.log(str.split(" ").map(w => w[0].toUpperCase() + w.slice(1)).join(" "));`
  },
  "Shallow Copy vs Deep Copy (JSON)": {
    JavaScript: `const obj1 = { nested: { b: 2 } };\nconst obj3 = JSON.parse(JSON.stringify(obj1));\nobj1.nested.b = 99;\nconsole.log("Obj1.nested.b: " + obj1.nested.b);\nconsole.log("Obj3.nested.b: " + obj3.nested.b);`
  },
  "Array: Flatten Nested Array (Recursion)": {
    JavaScript: `function flatten(arr) {\n  return arr.reduce((acc, v) => Array.isArray(v) ? acc.concat(flatten(v)) : acc.concat(v), []);\n}\nconsole.log(JSON.stringify(flatten([1, [2, [3, [4, 5]]]])));`
  },
  "Promises: Chaining (Sequential Async)": {
    JavaScript: `Promise.resolve(0)\n  .then(v => { console.log("1. Initial value: " + v); return 10; })\n  .then(v => { console.log("2. Value after step 2: " + v); return 20; })\n  .then(v => console.log("3. Final result: " + v));`
  },
  "Hoisting vs TDZ (let/const)": {
    JavaScript: `console.log("var result (hoisted): " + typeof varResult);\nvar varResult = 5;\nlet letResult = 10;\nconsole.log("let result (TDZ passed): " + letResult);`
  },
  "Use `reduce` to create a Map/Object": {
    JavaScript: `const pairs = [["a", 1], ["b", 2], ["c", 3]];\nconst obj = pairs.reduce((acc, [k, v]) => { acc[k] = v; return acc; }, {});\nconsole.log(obj);`
  },
  "Event Loop and Microtasks": {
    JavaScript: `console.log("1. Sync Start");\nPromise.resolve().then(() => console.log("3. Promise Microtask"));\nsetTimeout(() => console.log("4. Timeout Macrotask"), 0);\nconsole.log("2. Sync End");`
  },
  "Use `async/await` to run tasks sequentially": {
    JavaScript: `async function runTask(n) { return new Promise(res => setTimeout(() => { console.log("Task " + n + " finished."); res(); }, 0)); }\nasync function main() {\n  await runTask(1); await runTask(2); await runTask(3);\n  console.log("Sequence complete.");\n}\nmain();`
  }
};

let count = 0;
data.forEach(p => {
  if (algos[p.title] && algos[p.title][p.language]) {
    p.solution.code = algos[p.title][p.language];
    count++;
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log("Injected " + count + " real algorithms!");
