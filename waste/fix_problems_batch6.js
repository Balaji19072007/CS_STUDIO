const fs = require('fs');
const path = './util/problemData.json';
let data = JSON.parse(fs.readFileSync(path, 'utf8'));

const algos = {
  "Bonus: Array Reduce to count tags": {
    JavaScript: `const items = [{tags:['A','B']},{tags:['A']},{tags:['C']}];\nconst counts = items.reduce((acc, item) => {\n  item.tags.forEach(tag => acc[tag] = (acc[tag] || 0) + 1);\n  return acc;\n}, {});\nconsole.log(counts);`
  },
  "Bonus: Promise.race for fastest result": {
    JavaScript: `const p1 = new Promise(res => setTimeout(() => res("Server A"), 1000));\nconst p2 = new Promise(res => setTimeout(() => res("Server B"), 500));\nconst p3 = new Promise(res => setTimeout(() => res("Server C"), 2000));\nPromise.race([p1, p2, p3]).then(winner => console.log("Winner: " + winner));`
  },
  "Bonus: Recursive Fibonacci with Memoization": {
    JavaScript: `const memo = {};\nfunction fib(n) {\n  if (n <= 1) return n;\n  if (memo[n]) return memo[n];\n  return memo[n] = fib(n-1) + fib(n-2);\n}\nconsole.log("Fibonacci(30): " + fib(30));`
  },
  "Bonus: Recursive Factorial (Tail Recursion Concept)": {
    JavaScript: `function factorial(n, acc = 1) {\n  if (n <= 1) return acc;\n  return factorial(n - 1, n * acc);\n}\nconsole.log("Factorial of 5: " + factorial(5));`
  },
  "Bonus: Implement `flat` using Reduce": {
    JavaScript: `function myFlat(arr) {\n  return arr.reduce((acc, v) => acc.concat(Array.isArray(v) ? myFlat(v) : v), []);\n}\nconsole.log(JSON.stringify(myFlat([1, [2, [3]], 4])));`
  },
  // C Problems - real algorithmic code using scanf/printf
  "Sum of Two Numbers": {
    C: `#include <stdio.h>\nint main() { int a, b; scanf("%d %d", &a, &b); printf("%d", a+b); return 0; }`,
    Python: `a, b = map(int, input().split())\nprint(a + b)`,
    JavaScript: `const [a,b] = require('fs').readFileSync(0,'utf-8').trim().split(/\\s+/).map(Number);\nprocess.stdout.write(String(a+b));`
  },
  "Difference of Two Numbers": {
    C: `#include <stdio.h>\nint main() { int a, b; scanf("%d %d", &a, &b); printf("%d", a-b); return 0; }`,
    Python: `a, b = map(int, input().split())\nprint(a - b)`,
    JavaScript: `const [a,b] = require('fs').readFileSync(0,'utf-8').trim().split(/\\s+/).map(Number);\nprocess.stdout.write(String(a-b));`
  },
  "Product of Two Numbers": {
    C: `#include <stdio.h>\nint main() { int a, b; scanf("%d %d", &a, &b); printf("%d", a*b); return 0; }`,
    Python: `a, b = map(int, input().split())\nprint(a * b)`,
    JavaScript: `const [a,b] = require('fs').readFileSync(0,'utf-8').trim().split(/\\s+/).map(Number);\nprocess.stdout.write(String(a*b));`
  },
  "Division of Two Numbers": {
    C: `#include <stdio.h>\nint main() { int a, b; scanf("%d %d", &a, &b); printf("%d", a/b); return 0; }`,
    Python: `a, b = map(int, input().split())\nprint(a // b)`,
    JavaScript: `const [a,b] = require('fs').readFileSync(0,'utf-8').trim().split(/\\s+/).map(Number);\nprocess.stdout.write(String(Math.floor(a/b)));`
  },
  "Remainder of Division": {
    C: `#include <stdio.h>\nint main() { int a, b; scanf("%d %d", &a, &b); printf("%d", a%b); return 0; }`,
    Python: `a, b = map(int, input().split())\nprint(a % b)`,
    JavaScript: `const [a,b] = require('fs').readFileSync(0,'utf-8').trim().split(/\\s+/).map(Number);\nprocess.stdout.write(String(a%b));`
  },
  "Check Even or Odd": {
    C: `#include <stdio.h>\nint main() { int n; scanf("%d", &n); printf("%s", n%2==0 ? "Even" : "Odd"); return 0; }`,
    Python: `n = int(input())\nprint("Even" if n % 2 == 0 else "Odd")`,
    JavaScript: `const n = parseInt(require('fs').readFileSync(0,'utf-8').trim());\nprocess.stdout.write(n%2===0?"Even":"Odd");`
  },
  "Check Positive or Negative": {
    C: `#include <stdio.h>\nint main() { int n; scanf("%d", &n); printf("%s", n>0?"Positive":n<0?"Negative":"Zero"); return 0; }`,
    Python: `n = int(input())\nprint("Positive" if n > 0 else "Negative" if n < 0 else "Zero")`,
    JavaScript: `const n = parseInt(require('fs').readFileSync(0,'utf-8').trim());\nprocess.stdout.write(n>0?"Positive":n<0?"Negative":"Zero");`
  },
  "Maximum of Two Numbers": {
    C: `#include <stdio.h>\nint main() { int a, b; scanf("%d %d", &a, &b); printf("%d", a>b?a:b); return 0; }`,
    Python: `a, b = map(int, input().split())\nprint(max(a, b))`,
    JavaScript: `const [a,b] = require('fs').readFileSync(0,'utf-8').trim().split(/\\s+/).map(Number);\nprocess.stdout.write(String(Math.max(a,b)));`
  },
  "Minimum of Two Numbers": {
    C: `#include <stdio.h>\nint main() { int a, b; scanf("%d %d", &a, &b); printf("%d", a<b?a:b); return 0; }`,
    Python: `a, b = map(int, input().split())\nprint(min(a, b))`,
    JavaScript: `const [a,b] = require('fs').readFileSync(0,'utf-8').trim().split(/\\s+/).map(Number);\nprocess.stdout.write(String(Math.min(a,b)));`
  },
  "Square of a Number": {
    C: `#include <stdio.h>\nint main() { int n; scanf("%d", &n); printf("%d", n*n); return 0; }`,
    Python: `n = int(input())\nprint(n * n)`,
    JavaScript: `const n = parseInt(require('fs').readFileSync(0,'utf-8').trim());\nprocess.stdout.write(String(n*n));`
  },
  "Cube of a Number": {
    C: `#include <stdio.h>\nint main() { int n; scanf("%d", &n); printf("%d", n*n*n); return 0; }`,
    Python: `n = int(input())\nprint(n ** 3)`,
    JavaScript: `const n = parseInt(require('fs').readFileSync(0,'utf-8').trim());\nprocess.stdout.write(String(n**3));`
  },
  "Vote Eligibility": {
    C: `#include <stdio.h>\nint main() { int age; scanf("%d", &age); printf("%s", age>=18?"Eligible":"Not Eligible"); return 0; }`,
    Python: `age = int(input())\nprint("Eligible" if age >= 18 else "Not Eligible")`,
    JavaScript: `const age = parseInt(require('fs').readFileSync(0,'utf-8').trim());\nprocess.stdout.write(age>=18?"Eligible":"Not Eligible");`
  },
  "Sum of First N Natural Numbers": {
    C: `#include <stdio.h>\nint main() { int n; scanf("%d", &n); long long s=0; for(int i=1;i<=n;i++) s+=i; printf("%lld", s); return 0; }`,
    Python: `n = int(input())\nprint(n * (n + 1) // 2)`,
    JavaScript: `const n = parseInt(require('fs').readFileSync(0,'utf-8').trim());\nprocess.stdout.write(String(n*(n+1)/2));`
  },
  "Print Numbers 1 to N": {
    C: `#include <stdio.h>\nint main() { int n; scanf("%d", &n); for(int i=1;i<=n;i++) { if(i>1) printf(" "); printf("%d", i); } return 0; }`,
    Python: `n = int(input())\nprint(' '.join(str(i) for i in range(1, n+1)))`,
    JavaScript: `const n = parseInt(require('fs').readFileSync(0,'utf-8').trim());\nconst arr = [];\nfor(let i=1;i<=n;i++) arr.push(i);\nprocess.stdout.write(arr.join(' '));`
  },
  "Print N to 1": {
    C: `#include <stdio.h>\nint main() { int n; scanf("%d", &n); for(int i=n;i>=1;i--) { printf("%d", i); if(i>1) printf(" "); } return 0; }`,
    Python: `n = int(input())\nprint(' '.join(str(i) for i in range(n, 0, -1)))`,
    JavaScript: `const n = parseInt(require('fs').readFileSync(0,'utf-8').trim());\nconst arr = [];\nfor(let i=n;i>=1;i--) arr.push(i);\nprocess.stdout.write(arr.join(' '));`
  },
  "Factorial of a Number": {
    C: `#include <stdio.h>\nint main() { long long n, f=1; scanf("%lld", &n); for(int i=2;i<=n;i++) f*=i; printf("%lld", f); return 0; }`,
    Python: `import math\nn = int(input())\nprint(math.factorial(n))`,
    JavaScript: `const n = parseInt(require('fs').readFileSync(0,'utf-8').trim());\nlet f=1; for(let i=2;i<=n;i++) f*=i;\nprocess.stdout.write(String(f));`
  },
  "Check Prime Number": {
    C: `#include <stdio.h>\nint main() { int n; scanf("%d", &n); int p=1; if(n<2) p=0; for(int i=2;i*i<=n;i++) if(n%i==0){p=0;break;} printf("%s", p?"Prime":"Not Prime"); return 0; }`,
    Python: `n = int(input())\nif n < 2:\n    print("Not Prime")\nelse:\n    prime = all(n % i != 0 for i in range(2, int(n**0.5)+1))\n    print("Prime" if prime else "Not Prime")`,
    JavaScript: `const n = parseInt(require('fs').readFileSync(0,'utf-8').trim());\nif(n<2){process.stdout.write("Not Prime");}\nelse{\n  let p=true;\n  for(let i=2;i<=Math.sqrt(n);i++) if(n%i===0){p=false;break;}\n  process.stdout.write(p?"Prime":"Not Prime");\n}`
  },
  "Fibonacci Series": {
    C: `#include <stdio.h>\nint main() { int n; scanf("%d", &n); long long a=0,b=1; for(int i=0;i<n;i++) { if(i>0) printf(" "); printf("%lld", a); long long t=a+b; a=b; b=t; } return 0; }`,
    Python: `n = int(input())\na, b = 0, 1\nresult = []\nfor _ in range(n):\n    result.append(str(a))\n    a, b = b, a + b\nprint(' '.join(result))`,
    JavaScript: `const n = parseInt(require('fs').readFileSync(0,'utf-8').trim());\nlet a=0,b=1,arr=[];\nfor(let i=0;i<n;i++){arr.push(a);[a,b]=[b,a+b];}\nprocess.stdout.write(arr.join(' '));`
  },
  "Reverse a Number": {
    C: `#include <stdio.h>\nint main() { long long n; scanf("%lld", &n); long long rev=0; while(n>0){rev=rev*10+n%10;n/=10;} printf("%lld", rev); return 0; }`,
    Python: `n = input().strip()\nprint(int(n[::-1]))`,
    JavaScript: `const n = require('fs').readFileSync(0,'utf-8').trim();\nprocess.stdout.write(String(parseInt(n.split('').reverse().join(''))));`
  },
  "Sum of Digits": {
    C: `#include <stdio.h>\nint main() { long long n; scanf("%lld", &n); int s=0; while(n>0){s+=n%10;n/=10;} printf("%d", s); return 0; }`,
    Python: `n = input().strip()\nprint(sum(int(d) for d in n))`,
    JavaScript: `const n = require('fs').readFileSync(0,'utf-8').trim();\nprocess.stdout.write(String(n.split('').reduce((s,d)=>s+parseInt(d),0)));`
  },
  "Area of Rectangle": {
    C: `#include <stdio.h>\nint main() { long long w, h; scanf("%lld %lld", &w, &h); printf("%lld", w*h); return 0; }`,
    Python: `w, h = map(int, input().split())\nprint(w * h)`,
    JavaScript: `const [w,h] = require('fs').readFileSync(0,'utf-8').trim().split(/\\s+/).map(Number);\nprocess.stdout.write(String(w*h));`
  },
  "Perimeter of Rectangle": {
    C: `#include <stdio.h>\nint main() { int w, h; scanf("%d %d", &w, &h); printf("%d", 2*(w+h)); return 0; }`,
    Python: `w, h = map(int, input().split())\nprint(2 * (w + h))`,
    JavaScript: `const [w,h] = require('fs').readFileSync(0,'utf-8').trim().split(/\\s+/).map(Number);\nprocess.stdout.write(String(2*(w+h)));`
  },
  "Simple Interest": {
    C: `#include <stdio.h>\nint main() { double p, r, t; scanf("%lf %lf %lf", &p, &r, &t); printf("%.0f", p*r*t/100); return 0; }`,
    Python: `p, r, t = map(float, input().split())\nprint(int(p * r * t / 100))`,
    JavaScript: `const [p,r,t] = require('fs').readFileSync(0,'utf-8').trim().split(/\\s+/).map(Number);\nprocess.stdout.write(String(Math.round(p*r*t/100)));`
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
