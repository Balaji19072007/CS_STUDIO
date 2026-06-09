import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LINES = [
  { t: "// CS Studio — Cloud IDE", c: "text-muted-foreground" },
  { t: "class Solution {", c: "text-accent" },
  { t: "  public boolean isEven(int n) {", c: "" },
  { t: "    // Bitwise AND with 1 checks the LSB", c: "text-muted-foreground" },
  { t: "    return (n & 1) == 0;", c: "" },
  { t: "  }", c: "" },
  { t: "}", c: "" },
  { t: "// ✓ Accepted · Runtime 0 ms · Beats 100%", c: "text-[oklch(0.78_0.18_150)]" },
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
      <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-primary/30 via-accent/20 to-transparent blur-2xl" />
      <div className="glass-strong shadow-elegant overflow-hidden rounded-2xl">
        <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[oklch(0.70_0.20_25)]" />
            <span className="h-3 w-3 rounded-full bg-[oklch(0.78_0.18_80)]" />
            <span className="h-3 w-3 rounded-full bg-[oklch(0.78_0.18_150)]" />
          </div>
          <span className="text-xs text-muted-foreground">Solution.java · Java</span>
          <span className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">Run ▸</span>
        </div>
        <div className="grid grid-cols-[40px_1fr] font-mono text-[13px] leading-6 text-left">
          <div className="border-r border-border/60 bg-background/40 py-4 text-right text-muted-foreground/70">
            {LINES.map((_, i) => (
              <div key={i} className="px-2">{i + 1}</div>
            ))}
          </div>
          <div className="py-4 pl-4 pr-4 whitespace-pre overflow-x-auto text-foreground">
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
