import React, { useState } from 'react';
import * as feather from '../util/featherIcons';

const Icon = ({ name, className = '' }) => {
    if (!name || !feather.icons[name]) return null;
    return <span className={`inline-flex items-center justify-center flex-shrink-0 ${className}`} dangerouslySetInnerHTML={{ __html: feather.icons[name].toSvg({ class: 'w-full h-full' }) }} />;
};

const ProjectCalculatorUI = ({ onClose }) => {
    const [display, setDisplay] = useState('0');
    const [operand1, setOperand1] = useState(null);
    const [operator, setOperator] = useState(null);
    const [waitingForOperand2, setWaitingForOperand2] = useState(false);

    const formatResult = (val) => {
        if (val === 'Error') return val;
        const num = parseFloat(val);
        // Avoid extremely long decimals
        if (!Number.isInteger(num)) {
            return parseFloat(num.toFixed(6)).toString();
        }
        return num.toString();
    };

    const calculate = (a, b, op) => {
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
    };

    const handleNumberClick = (num) => {
        if (display === 'Error') {
            setDisplay(num);
            setWaitingForOperand2(false);
            return;
        }
        
        if (waitingForOperand2) {
            setDisplay(num);
            setWaitingForOperand2(false);
        } else {
            setDisplay(display === '0' ? num : display + num);
        }
    };

    const handleDecimalClick = () => {
        if (waitingForOperand2 || display === 'Error') {
            setDisplay('0.');
            setWaitingForOperand2(false);
            return;
        }
        if (!display.includes('.')) {
            setDisplay(display + '.');
        }
    };

    const handleOperatorClick = (nextOperator) => {
        if (display === 'Error') return;

        if (operator && !waitingForOperand2) {
            const result = calculate(operand1, display, operator);
            const formatted = formatResult(result);
            setDisplay(formatted);
            setOperand1(formatted);
        } else {
            setOperand1(display);
        }
        setOperator(nextOperator);
        setWaitingForOperand2(true);
    };

    const handleClearClick = () => {
        setDisplay('0');
        setOperand1(null);
        setOperator(null);
        setWaitingForOperand2(false);
    };

    const handleEqualClick = () => {
        if (!operand1 || !operator || display === 'Error') return;
        
        const result = calculate(operand1, display, operator);
        setDisplay(formatResult(result));
        setOperand1(null);
        setOperator(null);
        setWaitingForOperand2(true);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/40 dark:bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="relative w-full max-w-sm bg-white dark:bg-[#111827] rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden transform transition-all flex flex-col">
                
                {/* Header / Top Bar */}
                <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-[#1E293B] border-b border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-2">
                        <Icon name="calculator" className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                        <span className="text-gray-600 dark:text-gray-300 font-bold text-sm uppercase tracking-wider">C Engine Powered</span>
                    </div>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors p-1.5 bg-gray-200 hover:bg-gray-300 dark:bg-[#111827] dark:hover:bg-gray-800 rounded-full flex items-center justify-center"
                    >
                        <Icon name="x" className="w-5 h-5" />
                    </button>
                </div>

                {/* Display Area */}
                <div className="p-6 bg-white dark:bg-[#111827] border-b border-gray-200 dark:border-gray-800 flex flex-col items-end justify-end space-y-2 h-32 relative">
                    <div className="text-gray-500 dark:text-gray-400 text-sm h-5 font-mono font-medium">
                        {operand1 && operator ? `${operand1} ${operator}` : ''}
                    </div>
                    <div className="text-right w-full font-mono text-5xl tracking-tight text-gray-900 dark:text-white truncate transition-all duration-300">
                        {display}
                    </div>
                </div>

                {/* Keypad */}
                <div className="p-4 sm:p-6 grid grid-cols-4 gap-3 sm:gap-4 bg-gray-50 dark:bg-[#1E293B]">
                    <button onClick={handleClearClick} className="col-span-2 py-4 rounded-2xl font-bold text-xl bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-500/10 dark:text-red-500 dark:hover:bg-red-500/20 active:scale-95 transition-all shadow-sm">
                        AC
                    </button>
                    <button onClick={() => handleOperatorClick('/')} className="py-4 rounded-2xl font-bold text-2xl bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:hover:bg-indigo-500/20 active:scale-95 transition-all shadow-sm">
                        ÷
                    </button>
                    <button onClick={() => handleOperatorClick('*')} className="py-4 rounded-2xl font-bold text-xl bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:hover:bg-indigo-500/20 active:scale-95 transition-all shadow-sm">
                        ×
                    </button>

                    {[7, 8, 9].map(num => (
                        <button key={num} onClick={() => handleNumberClick(num.toString())} className="py-4 rounded-2xl font-semibold text-2xl bg-white text-gray-800 border border-gray-200 shadow-sm hover:bg-gray-100 dark:border-0 dark:bg-[#111827] dark:text-gray-200 dark:hover:bg-gray-800 active:scale-95 transition-all">
                            {num}
                        </button>
                    ))}
                    <button onClick={() => handleOperatorClick('-')} className="py-4 rounded-2xl font-bold text-3xl bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:hover:bg-indigo-500/20 active:scale-95 transition-all shadow-sm">
                        −
                    </button>

                    {[4, 5, 6].map(num => (
                        <button key={num} onClick={() => handleNumberClick(num.toString())} className="py-4 rounded-2xl font-semibold text-2xl bg-white text-gray-800 border border-gray-200 shadow-sm hover:bg-gray-100 dark:border-0 dark:bg-[#111827] dark:text-gray-200 dark:hover:bg-gray-800 active:scale-95 transition-all">
                            {num}
                        </button>
                    ))}
                    <button onClick={() => handleOperatorClick('+')} className="py-4 rounded-2xl font-bold text-2xl bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:hover:bg-indigo-500/20 active:scale-95 transition-all shadow-sm">
                        +
                    </button>

                    {[1, 2, 3].map(num => (
                        <button key={num} onClick={() => handleNumberClick(num.toString())} className="py-4 rounded-2xl font-semibold text-2xl bg-white text-gray-800 border border-gray-200 shadow-sm hover:bg-gray-100 dark:border-0 dark:bg-[#111827] dark:text-gray-200 dark:hover:bg-gray-800 active:scale-95 transition-all">
                            {num}
                        </button>
                    ))}
                    <button onClick={handleEqualClick} className="col-span-1 row-span-2 py-4 rounded-2xl font-bold text-3xl bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 active:scale-95 transition-all shadow-md shadow-indigo-500/30 flex items-center justify-center">
                        =
                    </button>

                    <button onClick={() => handleNumberClick('0')} className="col-span-2 py-4 rounded-2xl font-semibold text-2xl bg-white text-gray-800 border border-gray-200 shadow-sm hover:bg-gray-100 dark:border-0 dark:bg-[#111827] dark:text-gray-200 dark:hover:bg-gray-800 active:scale-95 transition-all">
                        0
                    </button>
                    <button onClick={handleDecimalClick} className="py-4 rounded-2xl font-semibold text-2xl bg-white text-gray-800 border border-gray-200 shadow-sm hover:bg-gray-100 dark:border-0 dark:bg-[#111827] dark:text-gray-200 dark:hover:bg-gray-800 active:scale-95 transition-all">
                        .
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectCalculatorUI;

