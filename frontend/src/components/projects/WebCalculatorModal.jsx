import React, { useState } from 'react';
import api from '../../services/apiService';

const WebCalculatorModal = ({ isOpen, onClose, challengeId, code, language }) => {
    const [display, setDisplay] = useState('');
    const [isCalculating, setIsCalculating] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleButtonClick = (value) => {
        if (value === 'C') {
            setDisplay('');
            setError('');
            return;
        }
        
        if (value === '=') {
            calculateResult();
            return;
        }

        setDisplay(prev => prev + value);
    };

    const calculateResult = async () => {
        // Parse the expression from display (e.g. "10+20", "5*4")
        const match = display.match(/^(\d+(?:\.\d+)?)\s*([-+/*])\s*(\d+(?:\.\d+)?)$/);
        
        if (!match) {
            setError("Invalid expression. Format: A + B");
            return;
        }

        const num1 = match[1];
        const operator = match[2];
        const num2 = match[3];

        let choice = 0;
        switch (operator) {
            case '+': choice = 1; break;
            case '-': choice = 2; break;
            case '*': choice = 3; break;
            case '/': choice = 4; break;
        }

        const customInput = `${num1}\n${num2}\n${choice}\n`;
        setIsCalculating(true);
        setError('');

        try {
            const response = await api.post(`/course-challenges/${challengeId}/run`, {
                code,
                language: language || 'C',
                custom_input: customInput
            });

            if (response.data.success) {
                const output = response.data.output;
                // Look for "Result = 30.00" or "Cannot divide by zero"
                if (output.includes("Result =")) {
                    const resultMatch = output.match(/Result\s*=\s*([0-9.-]+)/);
                    if (resultMatch) {
                        setDisplay(resultMatch[1]);
                    } else {
                        setError("Output format not recognized.");
                    }
                } else if (output.includes("Cannot divide by zero")) {
                    setError("Cannot divide by zero");
                } else {
                    setError("Unexpected output from C program.");
                }
            } else {
                setError("Runtime error in C code.");
            }
        } catch (err) {
            console.error(err);
            setError("Failed to run code.");
        } finally {
            setIsCalculating(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-sm bg-gray-900 rounded-3xl border border-gray-700 shadow-2xl overflow-hidden relative">
                
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-800 bg-gray-900/50">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="ml-2 text-xs font-bold text-gray-400 tracking-widest uppercase">Project Preview</span>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Calculator Body */}
                <div className="p-6 bg-gradient-to-b from-gray-800 to-gray-900">
                    {/* Screen */}
                    <div className="bg-gray-950 rounded-xl p-4 mb-6 shadow-inner h-24 flex flex-col justify-end items-end relative overflow-hidden border border-gray-800">
                        {isCalculating && (
                            <div className="absolute top-2 left-3 flex items-center gap-2 text-blue-400 text-xs">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                </span>
                                Running C Code...
                            </div>
                        )}
                        <div className="text-3xl font-mono tracking-wider text-green-400 truncate w-full text-right">
                            {display || '0'}
                        </div>
                        {error && <div className="text-xs text-red-400 mt-1 absolute bottom-1 left-2">{error}</div>}
                    </div>

                    {/* Keypad */}
                    <div className="grid grid-cols-4 gap-3">
                        {['7', '8', '9', '/'].map((btn) => (
                            <button key={btn} onClick={() => handleButtonClick(btn)} className="btn-calc">
                                {btn}
                            </button>
                        ))}
                        {['4', '5', '6', '*'].map((btn) => (
                            <button key={btn} onClick={() => handleButtonClick(btn)} className="btn-calc">
                                {btn}
                            </button>
                        ))}
                        {['1', '2', '3', '-'].map((btn) => (
                            <button key={btn} onClick={() => handleButtonClick(btn)} className="btn-calc">
                                {btn}
                            </button>
                        ))}
                        {['C', '0', '=', '+'].map((btn) => (
                            <button 
                                key={btn} 
                                onClick={() => handleButtonClick(btn)} 
                                className={`btn-calc ${btn === '=' ? 'bg-blue-600 hover:bg-blue-500 text-white' : btn === 'C' ? 'bg-red-600 hover:bg-red-500 text-white' : ''}`}
                            >
                                {btn}
                            </button>
                        ))}
                    </div>
                </div>

            </div>
            <style>{`
                .btn-calc {
                    @apply h-14 rounded-xl bg-gray-700 hover:bg-gray-600 text-white text-xl font-semibold shadow-md active:scale-95 transition-all;
                }
            `}</style>
        </div>
    );
};

export default WebCalculatorModal;
