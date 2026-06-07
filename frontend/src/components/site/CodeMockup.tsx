import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LINES = [
  { t: "// CS Studio - Cloud IDE", c: "text-[#8F9BB3]" },
  { t: "function solve(nums) {", c: "text-[#E2E8F0]" },
  { t: "  const seen = new Map();", c: "text-[#E2E8F0]" },
  { t: "  for (let i = 0; i < nums.length; i++) {", c: "text-[#E2E8F0]" },
  { t: "    const diff = target - nums[i];", c: "text-[#E2E8F0]" },
  { t: "    if (seen.has(diff)) return [seen.get(diff), i];", c: "text-[#E2E8F0]" },
  { t: "    seen.set(nums[i], i);", c: "text-[#E2E8F0]" },
  { t: "  }", c: "text-[#E2E8F0]" },
  { t: "}", c: "text-[#E2E8F0]" },
  { t: "// ✓ Accepted · Runtime 64 ms · Beats 98%", c: "text-[#10B981]" },
];

export function CodeMockup() {
  const [shown, setShown] = useState(0);
  const [char, setChar] = useState(0);

  useEffect(() => {
    if (shown >= LINES.length) return;
    const line = LINES[shown].t;
    if (char < line.length) {
      const t = setTimeout(() => setChar((c) => c + 1), 18);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setShown((s) => s + 1);
        setChar(0);
      }, 220);
      return () => clearTimeout(t);
    }
  }, [shown, char]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 12 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1, delay: 0.4 }}
      style={{ perspective: 1200 }}
      className="relative mx-auto w-full max-w-2xl"
    >
      <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-[#00D2FF]/20 via-[#3A7BD5]/10 to-transparent blur-2xl" />
      <div className="glass-strong shadow-elegant overflow-hidden rounded-2xl bg-[#0F172A]/80 backdrop-blur-xl border border-white/10">
        <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#FF5F56]" />
            <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
            <span className="h-3 w-3 rounded-full bg-[#27C93F]" />
          </div>
          <span className="text-xs text-[#8F9BB3]">solution.js · JavaScript</span>
          <span className="text-xs text-[#8F9BB3] cursor-pointer hover:text-white transition-colors">Run ▸</span>
        </div>
        <div className="grid grid-cols-[40px_1fr] font-mono text-[13px] leading-6 text-left">
          <div className="border-r border-white/5 bg-[#0A0F1A]/50 py-4 text-right text-[#475569]">
            {LINES.map((_, i) => (
              <div key={i} className="px-2">{i + 1}</div>
            ))}
          </div>
          <div className="py-4 pl-4 pr-4 whitespace-pre overflow-x-auto text-[#E2E8F0]">
            {LINES.map((l, i) => (
              <div key={i} className={l.c}>
                {i < shown ? l.t : i === shown ? l.t.slice(0, char) : "\u00A0"}
                {i === shown && <span className="ml-0.5 inline-block h-4 w-1.5 -mb-0.5 bg-primary animate-pulse" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
