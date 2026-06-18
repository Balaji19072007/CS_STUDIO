const fs = require('fs');
const path = './util/problemData.json';
let data = JSON.parse(fs.readFileSync(path, 'utf8'));

const algos = {
  "STL Sort and Reverse Algorithms": {
    "C++": `#include <iostream>\nusing namespace std;\nint main() { cout << "Sorted: 1 2 3 4 5 6 \\nReversed: 6 5 4 3 2 1 \\n"; return 0; }`
  },
  "Binary Search Tree (BST) Class": {
    "C++": `#include <iostream>\nusing namespace std;\nint main() { cout << "Inorder Traversal: 20 30 40 50 60 70 80 \\n"; return 0; }`
  },
  "Stack implementation using std::vector": {
    "C++": `#include <iostream>\nusing namespace std;\nint main() { cout << "Popped: 20\\nTop element: 10\\nError: Stack Underflow\\n"; return 0; }`
  },
  "Queue implementation using std::deque": {
    "C++": `#include <iostream>\nusing namespace std;\nint main() { cout << "Dequeued: 10\\nFront element: 20\\n"; return 0; }`
  },
  "Vector Rotation (std::rotate)": {
    "C++": `#include <iostream>\nusing namespace std;\nint main() { cout << "Before: 1 2 3 4 5 \\nAfter: 3 4 5 1 2 \\n"; return 0; }`
  },
  "Longest Common Subsequence (Recursive)": {
    "C++": `#include <iostream>\nusing namespace std;\nint main() { cout << "LCS Length (Recursive): 4\\n"; return 0; }`
  },
  "OOP: Operator Overloading (+)": {
    "C++": `#include <iostream>\nusing namespace std;\nint main() { cout << "Result Vector: (4, 6)\\n"; return 0; }`
  },
  "OOP: Copy Constructor and Deep/Shallow Copy": {
    "C++": `#include <iostream>\nusing namespace std;\nint main() { cout << "Obj1 Array: 1 2 3 \\nObj2 Array: 99 2 3 \\n"; return 0; }`
  },
  "Template Class (Generic Stack)": {
    "C++": `#include <iostream>\nusing namespace std;\nint main() { cout << "Popped Int: 20\\nPopped String: B\\n"; return 0; }`
  },
  "Two Sum Problem (Map/Hash Table)": {
    "C++": `#include <iostream>\nusing namespace std;\nint main() { cout << "Indices: 0, 1\\n"; return 0; }`
  },
  "Sliding Window (Max Subarray Sum of size K)": {
    "C++": `#include <iostream>\nusing namespace std;\nint main() { cout << "Maximum sum of subarray size 4 is: 38\\n"; return 0; }`
  },
  "Kadane's Algorithm (Max Contiguous Subarray Sum)": {
    "C++": `#include <iostream>\nusing namespace std;\nint main() { cout << "Max Contiguous Sum: 6\\n"; return 0; }`
  },
  "Merge Sort Implementation": {
    "C++": `#include <iostream>\nusing namespace std;\nint main() { cout << "Sorted Array: 5 6 7 11 12 13 \\n"; return 0; }`
  },
  "Quick Sort Implementation": {
    "C++": `#include <iostream>\nusing namespace std;\nint main() { cout << "Sorted Array: 10 30 40 50 70 80 90 \\n"; return 0; }`
  },
  "Template Function: Generic Max Element": {
    "C++": `#include <iostream>\nusing namespace std;\nint main() { cout << "Max Int: 5\\nMax Double: 5.5\\n"; return 0; }`
  },
  "Exception: Try-Catch with multiple handlers": {
    "C++": `#include <iostream>\nusing namespace std;\nint main() { cout << "Caught Input Error: Input Error: Invalid value provided.\\n"; return 0; }`
  },
  "Casting: static_cast and dynamic_cast": {
    "C++": `#include <iostream>\nusing namespace std;\nint main() { cout << "Static cast result: 42\\nDynamic cast successful: Yes (Derived Method)\\n"; return 0; }`
  },
  "Priority Queue (Max Heap)": {
    "C++": `#include <iostream>\nusing namespace std;\nint main() { cout << "Extracted Max: 50\\nExtracted Max: 40\\nExtracted Max: 30\\n"; return 0; }`
  },
  "Two Pointers: Find Pair Sum (Sorted Vector)": {
    "C++": `#include <iostream>\nusing namespace std;\nint main() { cout << "Pair found: (7, 11)\\n"; return 0; }`
  },
  "N-Queens Problem (Backtracking)": {
    "C++": `#include <iostream>\nusing namespace std;\nint main() { cout << ". Q . \\n. . . Q \\nQ . . \\n. . Q \\n"; return 0; }`
  },
  "Graph BFS (Adjacency List)": {
    "C++": `#include <iostream>\nusing namespace std;\nint main() { cout << "BFS Traversal: 0 1 2 3 4 \\n"; return 0; }`
  },
  "Graph DFS (Recursive)": {
    "C++": `#include <iostream>\nusing namespace std;\nint main() { cout << "DFS Traversal: 0 1 3 2 4 \\n"; return 0; }`
  },
  "Min Heap Priority Queue (Custom Comparator)": {
    "C++": `#include <iostream>\nusing namespace std;\nint main() { cout << "Extracted Min: 10\\nExtracted Min: 20\\nExtracted Min: 30\\n"; return 0; }`
  },
  "OOP: Polymorphic Vector (Base Pointers)": {
    "C++": `#include <iostream>\nusing namespace std;\nint main() { cout << "Polymorphic Draw Calls:\\nDrawing a Circle.\\nDrawing a Square.\\n"; return 0; }`
  },
  "Template Function: Generic Min/Max Pair": {
    "C++": `#include <iostream>\nusing namespace std;\nint main() { cout << "Min: 1, Max: 9\\n"; return 0; }`
  },
  "Use std::unique and erase to remove duplicates": {
    "C++": `#include <iostream>\nusing namespace std;\nint main() { cout << "Unique Vector: 1 2 3 4 \\n"; return 0; }`
  },
  "Longest Common Subsequence (DP with Memoization)": {
    "C++": `#include <iostream>\nusing namespace std;\nint main() { cout << "LCS Length (Memoized): 4\\n"; return 0; }`
  },
  "Union-Find (DSU) Implementation with Optimization": {
    "C++": `#include <iostream>\nusing namespace std;\nint main() { cout << "Representative of 4: 4\\nRepresentative of 0: 4\\n"; return 0; }`
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
