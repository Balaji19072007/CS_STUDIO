export const generateCalculatorHTML = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculator Project</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { margin: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; background-color: #0F172A; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
    </style>
</head>
<body class="bg-gray-900 text-white">

    <div class="relative w-full max-w-sm bg-[#111827] rounded-3xl shadow-2xl border border-gray-800 overflow-hidden transform transition-all flex flex-col">
        <!-- Header -->
        <div class="flex justify-between items-center p-4 bg-[#1E293B] border-b border-gray-800">
            <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                <span class="text-gray-300 font-bold text-sm uppercase tracking-wider">C Engine Powered</span>
            </div>
        </div>

        <!-- Display Area -->
        <div class="p-6 bg-[#111827] border-b border-gray-800 flex flex-col items-end justify-end space-y-2 h-32 relative">
            <div id="sub-display" class="text-gray-400 text-sm h-5 font-mono font-medium"></div>
            <div id="main-display" class="text-right w-full font-mono text-5xl tracking-tight text-white truncate transition-all duration-300">0</div>
        </div>

        <!-- Keypad -->
        <div class="p-4 sm:p-6 grid grid-cols-4 gap-3 sm:gap-4 bg-[#1E293B]">
            <button onclick="handleClear()" class="col-span-2 py-4 rounded-2xl font-bold text-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 active:scale-95 transition-all shadow-sm">AC</button>
            <button onclick="handleOperator('/')" class="py-4 rounded-2xl font-bold text-2xl bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 active:scale-95 transition-all shadow-sm">÷</button>
            <button onclick="handleOperator('*')" class="py-4 rounded-2xl font-bold text-xl bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 active:scale-95 transition-all shadow-sm">×</button>

            <button onclick="handleNumber('7')" class="py-4 rounded-2xl font-semibold text-2xl bg-[#111827] text-gray-200 hover:bg-gray-800 active:scale-95 transition-all shadow-sm border-0">7</button>
            <button onclick="handleNumber('8')" class="py-4 rounded-2xl font-semibold text-2xl bg-[#111827] text-gray-200 hover:bg-gray-800 active:scale-95 transition-all shadow-sm border-0">8</button>
            <button onclick="handleNumber('9')" class="py-4 rounded-2xl font-semibold text-2xl bg-[#111827] text-gray-200 hover:bg-gray-800 active:scale-95 transition-all shadow-sm border-0">9</button>
            
            <button onclick="handleOperator('-')" class="py-4 rounded-2xl font-bold text-3xl bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 active:scale-95 transition-all shadow-sm">−</button>

            <button onclick="handleNumber('4')" class="py-4 rounded-2xl font-semibold text-2xl bg-[#111827] text-gray-200 hover:bg-gray-800 active:scale-95 transition-all shadow-sm border-0">4</button>
            <button onclick="handleNumber('5')" class="py-4 rounded-2xl font-semibold text-2xl bg-[#111827] text-gray-200 hover:bg-gray-800 active:scale-95 transition-all shadow-sm border-0">5</button>
            <button onclick="handleNumber('6')" class="py-4 rounded-2xl font-semibold text-2xl bg-[#111827] text-gray-200 hover:bg-gray-800 active:scale-95 transition-all shadow-sm border-0">6</button>
            
            <button onclick="handleOperator('+')" class="py-4 rounded-2xl font-bold text-2xl bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 active:scale-95 transition-all shadow-sm">+</button>

            <button onclick="handleNumber('1')" class="py-4 rounded-2xl font-semibold text-2xl bg-[#111827] text-gray-200 hover:bg-gray-800 active:scale-95 transition-all shadow-sm border-0">1</button>
            <button onclick="handleNumber('2')" class="py-4 rounded-2xl font-semibold text-2xl bg-[#111827] text-gray-200 hover:bg-gray-800 active:scale-95 transition-all shadow-sm border-0">2</button>
            <button onclick="handleNumber('3')" class="py-4 rounded-2xl font-semibold text-2xl bg-[#111827] text-gray-200 hover:bg-gray-800 active:scale-95 transition-all shadow-sm border-0">3</button>
            
            <button onclick="handleEqual()" class="col-span-1 row-span-2 py-4 rounded-2xl font-bold text-3xl bg-indigo-600 text-white hover:bg-indigo-500 active:scale-95 transition-all shadow-md shadow-indigo-500/30 flex items-center justify-center">=</button>

            <button onclick="handleNumber('0')" class="col-span-2 py-4 rounded-2xl font-semibold text-2xl bg-[#111827] text-gray-200 hover:bg-gray-800 active:scale-95 transition-all shadow-sm border-0">0</button>
            <button onclick="handleDecimal()" class="py-4 rounded-2xl font-semibold text-2xl bg-[#111827] text-gray-200 hover:bg-gray-800 active:scale-95 transition-all shadow-sm border-0">.</button>
        </div>
    </div>

    <script>
        let display = '0';
        let operand1 = null;
        let operator = null;
        let waitingForOperand2 = false;

        const mainDisplay = document.getElementById('main-display');
        const subDisplay = document.getElementById('sub-display');

        function updateUI() {
            mainDisplay.innerText = display;
            subDisplay.innerText = (operand1 && operator) ? \`\${operand1} \${operator}\` : '';
        }

        function formatResult(val) {
            if (val === 'Error') return val;
            const num = parseFloat(val);
            if (!Number.isInteger(num)) return parseFloat(num.toFixed(6)).toString();
            return num.toString();
        }

        function calculate(a, b, op) {
            const num1 = parseFloat(a);
            const num2 = parseFloat(b);
            if (isNaN(num1) || isNaN(num2)) return b;
            let ans = 0;
            if (op === '+') ans = num1 + num2;
            if (op === '-') ans = num1 - num2;
            if (op === '*') ans = num1 * num2;
            if (op === '/') {
                if (num2 === 0) return 'Error';
                ans = num1 / num2;
            }
            return ans.toString();
        }

        function handleNumber(num) {
            if (display === 'Error') {
                display = num;
                waitingForOperand2 = false;
            } else if (waitingForOperand2) {
                display = num;
                waitingForOperand2 = false;
            } else {
                display = display === '0' ? num : display + num;
            }
            updateUI();
        }

        function handleDecimal() {
            if (waitingForOperand2 || display === 'Error') {
                display = '0.';
                waitingForOperand2 = false;
            } else if (!display.includes('.')) {
                display += '.';
            }
            updateUI();
        }

        function handleOperator(nextOp) {
            if (display === 'Error') return;
            if (operator && !waitingForOperand2) {
                const result = calculate(operand1, display, operator);
                const formatted = formatResult(result);
                display = formatted;
                operand1 = formatted;
            } else {
                operand1 = display;
            }
            operator = nextOp;
            waitingForOperand2 = true;
            updateUI();
        }

        function handleClear() {
            display = '0';
            operand1 = null;
            operator = null;
            waitingForOperand2 = false;
            updateUI();
        }

        function handleEqual() {
            if (!operand1 || !operator || display === 'Error') return;
            const result = calculate(operand1, display, operator);
            display = formatResult(result);
            operand1 = null;
            operator = null;
            waitingForOperand2 = true;
            updateUI();
        }
    </script>
</body>
</html>`;
};
