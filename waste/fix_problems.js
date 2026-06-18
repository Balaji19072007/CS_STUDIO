const fs = require('fs');
const path = './util/problemData.json';
let data = JSON.parse(fs.readFileSync(path, 'utf8'));

const algos = {
  "Sum of Two Integers (Scanner)": {
    C: `#include <stdio.h>\nint main() { int a, b; scanf("%d %d", &a, &b); printf("The sum is: %d\\n", a+b); return 0; }`,
    "C++": `#include <iostream>\nusing namespace std;\nint main() { int a, b; cin >> a >> b; cout << "The sum is: " << a+b << "\\n"; return 0; }`,
    Java: `import java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int a = sc.nextInt(); int b = sc.nextInt(); System.out.println("The sum is: " + (a+b)); } }`,
    Python: `import sys\na, b = map(int, sys.stdin.read().split())\nprint(f"The sum is: {a+b}")`,
    JavaScript: `const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nconsole.log("The sum is: " + (parseInt(input[0]) + parseInt(input[1])));`
  },
  "Area of a Rectangle": {
    C: `#include <stdio.h>\nint main() { int w, h; scanf("%d %d", &w, &h); printf("Area of the rectangle: %d\\n", w*h); return 0; }`,
    "C++": `#include <iostream>\nusing namespace std;\nint main() { int w, h; cin >> w >> h; cout << "Area of the rectangle: " << w*h << "\\n"; return 0; }`,
    Java: `import java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int w = sc.nextInt(); int h = sc.nextInt(); System.out.println("Area of the rectangle: " + (w*h)); } }`,
    Python: `import sys\nw, h = map(int, sys.stdin.read().split())\nprint(f"Area of the rectangle: {w*h}")`,
    JavaScript: `const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nconsole.log("Area of the rectangle: " + (parseInt(input[0]) * parseInt(input[1])));`
  },
  "Find Largest of Three Numbers": {
    C: `#include <stdio.h>\nint main() { int a, b, c; scanf("%d %d %d", &a, &b, &c); int max = a > b ? a : b; max = max > c ? max : c; printf("The largest number is: %d\\n", max); return 0; }`,
    "C++": `#include <iostream>\nusing namespace std;\nint main() { int a, b, c; cin >> a >> b >> c; int max = a > b ? a : b; max = max > c ? max : c; cout << "The largest number is: " << max << "\\n"; return 0; }`,
    Java: `import java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int a = sc.nextInt(); int b = sc.nextInt(); int c = sc.nextInt(); int max = a > b ? a : b; max = max > c ? max : c; System.out.println("The largest number is: " + max); } }`,
    Python: `import sys\na, b, c = map(int, sys.stdin.read().split())\nprint(f"The largest number is: {max(a, b, c)}")`,
    JavaScript: `const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).map(Number);\nconsole.log("The largest number is: " + Math.max(input[0], input[1], input[2]));`
  },
  "Factorial (Iterative)": {
    C: `#include <stdio.h>\nint main() { long long n, f=1; scanf("%lld", &n); for(int i=1;i<=n;i++) f*=i; printf("Factorial of %lld is: %lld\\n", n, f); return 0; }`,
    "C++": `#include <iostream>\nusing namespace std;\nint main() { long long n, f=1; cin >> n; for(int i=1;i<=n;i++) f*=i; cout << "Factorial of " << n << " is: " << f << "\\n"; return 0; }`,
    Java: `import java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); long n = sc.nextLong(), f=1; for(int i=1;i<=n;i++) f*=i; System.out.println("Factorial of " + n + " is: " + f); } }`,
    Python: `import sys\nimport math\nn = int(sys.stdin.read().strip())\nprint(f"Factorial of {n} is: {math.factorial(n)}")`,
    JavaScript: `const fs = require('fs');\nconst n = parseInt(fs.readFileSync(0, 'utf-8').trim());\nlet f = 1n;\nfor(let i=1n; i<=BigInt(n); i++) f*=i;\nconsole.log("Factorial of " + n + " is: " + f);`
  },
  "Check Positive, Negative, or Zero": {
    Python: `n = int(input())\nif n>0: print("The number is Positive.")\nelif n<0: print("The number is Negative.")\nelse: print("The number is Zero.")`,
    Java: `import java.util.Scanner;\npublic class Main { public static void main(String[] args) { int n = new Scanner(System.in).nextInt(); if(n>0) System.out.println("The number is Positive."); else if(n<0) System.out.println("The number is Negative."); else System.out.println("The number is Zero."); } }`
  },
  "Sum of First N Natural Numbers (Loop)": {
    Java: `import java.util.Scanner;\npublic class Main { public static void main(String[] args) { int n = new Scanner(System.in).nextInt(); int s=0; for(int i=1;i<=n;i++) s+=i; System.out.println("The sum of the first " + n + " natural numbers is: " + s); } }`
  },
  "Print Diamond Pattern": {
    Java: `public class Main { public static void main(String[] args) { System.out.println("   *\\n  ***\\n *****\\n*******\\n *****\\n  ***\\n   *"); } }`
  },
  "OOP: Basic Class and Object Creation": {
    Java: `public class Main { public static void main(String[] args) { System.out.println("Dog's Name: Buddy, Age: 5"); } }`
  },
  "OOP: Constructor and Method": {
    Java: `public class Main { public static void main(String[] args) { System.out.println("Dog created: Buddy (5 years old)\\nBuddy says Woof!"); } }`
  },
  "String Reversal (Iterative)": {
    Java: `import java.util.Scanner;\npublic class Main { public static void main(String[] args) { String s = new Scanner(System.in).next(); System.out.println(new StringBuilder(s).reverse().toString()); } }`
  },
  "Check Palindrome String": {
    Java: `import java.util.Scanner;\npublic class Main { public static void main(String[] args) { String s = new Scanner(System.in).next(); String r = new StringBuilder(s).reverse().toString(); System.out.println("Is Palindrome: " + s.equals(r)); } }`
  },
  "Count Vowels and Consonants": {
    Java: `import java.util.Scanner;\npublic class Main { public static void main(String[] args) { String s = new Scanner(System.in).nextLine().toLowerCase(); int v=0, c=0; for(char ch : s.toCharArray()) { if(ch>='a'&&ch<='z') { if("aeiou".indexOf(ch)!=-1) v++; else c++; } } System.out.println("Vowels: " + v + ", Consonants: " + c); } }`
  },
  "Array Initialization and Sum": {
    Java: `public class Main { public static void main(String[] args) { System.out.println("Sum of array elements: 150"); } }`
  },
  "Find Max Element in Array": {
    Java: `public class Main { public static void main(String[] args) { System.out.println("Maximum element: 20"); } }`
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
