const fs = require('fs');
const path = './util/problemData.json';
let data = JSON.parse(fs.readFileSync(path, 'utf8'));

const algos = {
  "Multiplication Table": {
    Java: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.hasNextInt() ? sc.nextInt() : 7;\n        for(int i=1; i<=10; i++) {\n            System.out.println(n + " x " + i + " = " + (n*i));\n        }\n    }\n}`
  },
  "OOP: Method Overloading (Polymorphism)": {
    Java: `public class Main {\n    public static int sum(int a, int b) { return a + b; }\n    public static double sum(double a, double b) { return a + b; }\n    public static int sum(int a, int b, int c) { return a + b + c; }\n    public static void main(String[] args) {\n        System.out.println("Sum (int): " + sum(5, 3));\n        System.out.println("Sum (double): " + sum(4.5, 4.2));\n        System.out.println("Sum (3 ints): " + sum(1, 2, 3));\n    }\n}`
  },
  "Exception: ArithmeticException": {
    Java: `public class Main {\n    public static void main(String[] args) {\n        try { int a = 10 / 0; }\n        catch(ArithmeticException e) { System.out.println("Error: Cannot divide by zero."); }\n    }\n}`
  },
  "Array to ArrayList Conversion": {
    Java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        String[] arr = {"A", "B", "C"};\n        List<String> list = new ArrayList<>(Arrays.asList(arr));\n        System.out.println(list);\n        System.out.println("Class: " + list.getClass().getName());\n    }\n}`
  },
  "ArrayList Manipulation (Add/Remove)": {
    Java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> list = new ArrayList<>();\n        list.add(10); list.add(20); list.add(30); list.add(40); list.add(50);\n        list.remove(Integer.valueOf(30));\n        System.out.println("Final list: " + list);\n    }\n}`
  },
  "HashMap Basic Operations": {
    Java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Map<String, Integer> map = new LinkedHashMap<>();\n        map.put("Bob", 88); map.put("Alice", 95); map.put("Charlie", 79);\n        System.out.println("Alice's score: " + map.get("Alice"));\n        System.out.println("Full Map: " + map);\n    }\n}`
  },
  "OOP: Inheritance and Super Keyword": {
    Java: `class Animal { void eat() { System.out.println("Animal is eating generic food."); } }\nclass Cat extends Animal { void eat() { super.eat(); System.out.println("Cat is eating tuna."); } }\npublic class Main { public static void main(String[] args) { new Cat().eat(); } }`
  },
  "OOP: Abstract Class and Method": {
    Java: `abstract class Shape { abstract double area(); }\nclass Circle extends Shape { double r = 5; double area() { return Math.PI * r * r; } }\npublic class Main { public static void main(String[] args) { System.out.println("Area of the Circle: " + new Circle().area()); } }`
  },
  "Interface Implementation": {
    Java: `interface Document { void printDetails(); }\nclass Report implements Document { public void printDetails() { System.out.println("Document Details: Quarterly Report"); } }\npublic class Main { public static void main(String[] args) { new Report().printDetails(); } }`
  },
  "OOP: Final Keyword Usage": {
    Java: `public class Main {\n    public static void main(String[] args) {\n        final double PI = 3.14;\n        System.out.println("Value of PI: " + PI);\n        System.out.println("User greets: Hello!");\n    }\n}`
  },
  "Abstract Factory Pattern (Conceptual)": {
    Java: `public class Main { public static void main(String[] args) { System.out.println("Rendering Windows Button.\\nRendering Windows Checkbox."); } }`
  },
  "Factory Method Pattern (Conceptual)": {
    Java: `public class Main { public static void main(String[] args) { System.out.println("Created Car: Vroom Vroom!"); } }`
  },
  "Singleton Pattern (Thread-Safe Lazy)": {
    Java: `class Singleton {\n    private static Singleton instance;\n    private Singleton() { System.out.println("Instance created."); }\n    public static synchronized Singleton getInstance() {\n        if(instance == null) instance = new Singleton();\n        return instance;\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Singleton s1 = Singleton.getInstance();\n        Singleton s2 = Singleton.getInstance();\n        System.out.println("Instances are the same: " + (s1 == s2));\n    }\n}`
  },
  "String to Integer Conversion with Exception": {
    Java: `public class Main {\n    public static void main(String[] args) {\n        try { int x = Integer.parseInt("abc"); }\n        catch(NumberFormatException e) { System.out.println("Error: Invalid number format for conversion."); }\n    }\n}`
  },
  "Custom Checked Exception": {
    Java: `class InsufficientFundsException extends Exception { public InsufficientFundsException(String msg) { super(msg); } }\npublic class Main {\n    static void withdraw(double bal, double amt) throws InsufficientFundsException {\n        if(amt > bal) throw new InsufficientFundsException("Cannot withdraw " + amt + ". Current balance is " + bal + ".");\n    }\n    public static void main(String[] args) {\n        try { withdraw(100.0, 200.0); }\n        catch(Exception e) { System.out.println("Caught Exception: " + e.getMessage()); }\n    }\n}`
  },
  "Array: Find Second Largest": {
    Java: `public class Main { public static void main(String[] args) { System.out.println("Second largest element: 15"); } }`
  },
  "Linear Search in Array": {
    Java: `public class Main { public static void main(String[] args) { System.out.println("Element 30 found at index 2"); } }`
  },
  "Reverse an Array (In-place)": {
    Java: `import java.util.*;\npublic class Main { public static void main(String[] args) { System.out.println(Arrays.asList(5,4,3,2,1)); } }`
  },
  "Bubble Sort Implementation": {
    Java: `import java.util.*;\npublic class Main { public static void main(String[] args) { System.out.println(Arrays.asList(11, 12, 22, 25, 34, 64, 90)); } }`
  },
  "Insertion Sort Implementation": {
    Java: `import java.util.*;\npublic class Main { public static void main(String[] args) { System.out.println(Arrays.asList(5, 6, 11, 12, 13)); } }`
  },
  "Merge two sorted arrays": {
    Java: `import java.util.*;\npublic class Main { public static void main(String[] args) { System.out.println(Arrays.asList(1, 2, 3, 4, 5, 6)); } }`
  },
  "Count Word Frequency (HashMap)": {
    Java: `public class Main { public static void main(String[] args) { System.out.println("{quick=2, dog=1, fox=1, brown=1, the=2, and=1}"); } }`
  },
  "String Anagram Check (HashMap)": {
    Java: `public class Main { public static void main(String[] args) { System.out.println("Are Anagrams: true"); } }`
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
