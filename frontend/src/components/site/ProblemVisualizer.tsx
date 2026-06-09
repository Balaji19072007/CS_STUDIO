import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const ARRAY = [2, 7, 11, 15];
const TARGET = 9;

export const ProblemVisualizer = () => {
  const [step, setStep] = useState(0);

  // Animation logic for Two Sum
  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => {
        if (prev >= 6) return 0;
        return prev + 1;
      });
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const getCodeLineFocus = (s: number) => {
    if (s === 0) return 2; // let map = new Map()
    if (s === 1) return 3; // for let i=0
    if (s === 2) return 4; // const diff
    if (s === 3) return 5; // if seen.has
    if (s === 4) return 6; // seen.set
    if (s === 5) return 3; // for let i=1
    if (s === 6) return 5; // return [get, i]
    return 0;
  };

  const getPointerPos = (s: number) => {
    if (s >= 1 && s <= 4) return 0;
    if (s >= 5) return 1;
    return -1;
  };

  const codeLineFocus = getCodeLineFocus(step);
  const pointerPos = getPointerPos(step);

  return (
    <section className="relative py-28 overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Interactive Visualizer"
          title="See algorithms solve problems in real-time."
          subtitle="Stop staring at static code. Watch data structures and algorithms execute line-by-line, visually."
        />
        
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Code Editor */}
          <div className="relative glass-strong shadow-elegant rounded-2xl p-6 border border-white/5 bg-[#0F172A]/80 backdrop-blur-xl font-mono text-sm leading-7">
            <div className="absolute top-4 right-4 text-xs text-[#8F9BB3]">TwoSum.js</div>
            <div className="flex flex-col">
              {[
                { l: 1, t: "function twoSum(nums, target) {" },
                { l: 2, t: "  const seen = new Map();" },
                { l: 3, t: "  for (let i = 0; i < nums.length; i++) {" },
                { l: 4, t: "    const diff = target - nums[i];" },
                { l: 5, t: "    if (seen.has(diff)) return [seen.get(diff), i];" },
                { l: 6, t: "    seen.set(nums[i], i);" },
                { l: 7, t: "  }" },
                { l: 8, t: "}" }
              ].map((line) => (
                <div 
                  key={line.l} 
                  className={`px-4 py-1 rounded-md transition-colors duration-300 ${codeLineFocus === line.l ? 'bg-primary/20 border-l-2 border-primary text-white' : 'text-[#8F9BB3] border-l-2 border-transparent'}`}
                >
                  <span className="w-6 inline-block text-[#475569]">{line.l}</span>
                  {line.t}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visualizer */}
          <div className="relative h-[400px] rounded-2xl border border-white/5 bg-[#0B1527] p-8 flex flex-col justify-center items-center shadow-lg">
            <div className="absolute top-8 text-[#8F9BB3] font-mono text-lg">
              Target: <span className="text-white font-bold">{TARGET}</span>
            </div>
            
            <div className="flex gap-4 relative mt-12">
              {ARRAY.map((num, i) => (
                <div key={i} className="relative flex flex-col items-center">
                  <motion.div 
                    className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold border-2 transition-colors duration-500 ${
                      pointerPos === i ? 'border-[#00D2FF] bg-[#00D2FF]/20 text-white' : 
                      (step >= 6 && i === 0) || (step >= 6 && i === 1) ? 'border-[#10B981] bg-[#10B981]/20 text-white' :
                      'border-[#1E293B] bg-[#0F172A] text-[#8F9BB3]'
                    }`}
                  >
                    {num}
                  </motion.div>
                  {pointerPos === i && (
                    <motion.div 
                      layoutId="pointer"
                      className="absolute -bottom-10 text-[#00D2FF] font-mono font-bold"
                    >
                      ↑ i
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-20 w-full max-w-sm rounded-xl border border-white/10 bg-[#0F172A] p-6">
              <h4 className="text-[#8F9BB3] text-sm mb-4 border-b border-white/5 pb-2">Hash Map `seen`</h4>
              <div className="font-mono text-sm min-h-[60px] flex flex-wrap gap-4">
                <AnimatePresence>
                  {step >= 5 && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="px-3 py-1.5 rounded bg-purple-500/20 text-purple-200 border border-purple-500/30"
                    >
                      {`{ 2 => 0 }`}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

// Simple AnimatePresence stub for imports
import { AnimatePresence } from "framer-motion";
