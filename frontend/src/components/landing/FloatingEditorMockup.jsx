import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const codeSnippet = `function calculateComplexity(algorithm) {
  const t0 = performance.now();
  
  // Executing highly optimized routine
  const result = engine.compile({
    target: "WebAssembly",
    optimizationLevel: 3,
    latency: "zero"
  });

  const t1 = performance.now();
  return \`Executed in \${t1 - t0}ms. Systems nominal.\`;
}

// Initializing CS Studio Environment...`;

// Extremely basic syntax highlighting for demo purposes
const highlightSyntax = (text) => {
    return text
        .replace(/function/g, '<span class="text-purple-600 dark:text-purple-400">function</span>')
        .replace(/const/g, '<span class="text-purple-600 dark:text-purple-400">const</span>')
        .replace(/return/g, '<span class="text-purple-600 dark:text-purple-400">return</span>')
        .replace(/performance\.now/g, '<span class="text-blue-600 dark:text-blue-400">performance.now</span>')
        .replace(/engine\.compile/g, '<span class="text-blue-600 dark:text-blue-400">engine.compile</span>')
        .replace(/(".*?")/g, '<span class="text-emerald-600 dark:text-emerald-400">$1</span>')
        .replace(/(\/\/.*)/g, '<span class="text-gray-400 dark:text-gray-500 italic">$1</span>')
        .replace(/([0-9]+)/g, '<span class="text-amber-600 dark:text-amber-400">$1</span>');
};

const FloatingEditorMockup = () => {
    const [displayedCode, setDisplayedCode] = useState("");
    
    useEffect(() => {
        let i = 0;
        let isCancelled = false;
        
        const typeNextChar = () => {
            if (isCancelled) return;
            if (i < codeSnippet.length) {
                setDisplayedCode(codeSnippet.substring(0, i + 1));
                i++;
                // Randomize typing speed slightly for realism
                setTimeout(typeNextChar, Math.random() * 30 + 20);
            } else {
                setTimeout(() => {
                    if (!isCancelled) {
                        setDisplayedCode("");
                        i = 0;
                        typeNextChar();
                    }
                }, 5000);
            }
        };
        
        setTimeout(typeNextChar, 1000);
        
        return () => { isCancelled = true; };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, rotateY: -15, rotateX: 10, y: 50 }}
            animate={{ 
                opacity: 1, 
                rotateY: [-15, -10, -15],
                rotateX: [10, 5, 10],
                y: [0, -15, 0]
            }}
            transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
            }}
            style={{ perspective: 1000 }}
            className="relative w-full max-w-2xl mx-auto z-20"
        >
            <div className="rounded-2xl shadow-premium-lg overflow-hidden border border-gray-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0B1120]/90 backdrop-blur-xl transition-colors duration-500">
                {/* Editor Header */}
                <div className="flex items-center px-4 py-3 bg-gray-50/90 dark:bg-black/40 border-b border-gray-200/80 dark:border-white/5 transition-colors duration-500">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500 border border-red-600/50"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-500 border border-amber-600/50"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-500 border border-emerald-600/50"></div>
                    </div>
                    <div className="mx-auto text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wider">core_engine.js</div>
                </div>
                
                {/* Editor Body */}
                <div className="p-6 font-mono text-sm md:text-base leading-relaxed text-gray-800 dark:text-gray-200 min-h-[300px] text-left">
                    <pre className="whitespace-pre-wrap">
                        <code dangerouslySetInnerHTML={{ __html: highlightSyntax(displayedCode) }} />
                        <span className="animate-blink inline-block w-2 h-4 bg-primary-500 ml-1 translate-y-1"></span>
                    </pre>
                </div>
            </div>
            
            {/* Glow behind editor */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/30 to-purple-500/30 blur-2xl -z-10 rounded-full animate-pulse-slow"></div>
        </motion.div>
    );
};

export default FloatingEditorMockup;
