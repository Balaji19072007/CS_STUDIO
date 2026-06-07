import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const ROWS = [
  ["Multi-language Cloud IDE", true, false],
  ["Live Web Studio", true, false],
  ["Structured roadmaps", true, true],
  ["Global leaderboards & XP", true, false],
  ["Verified certificates", true, true],
  ["AI Career Roadmap", true, false],
  ["AI Project Generator", true, false],
  ["Algorithm Visualizer", true, false],
  ["Active community & reviews", true, false],
];

export function WhyUs() {
  return (
    <section id="pricing" className="relative py-28">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeader
          eyebrow="Why CS Studio"
          title="A whole ecosystem, not just a course"
          subtitle="Traditional platforms teach. CS Studio teaches, ships, and grows you."
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong gradient-border overflow-hidden rounded-2xl"
        >
          <div className="grid grid-cols-3 border-b border-border/60 bg-background/40 px-6 py-4 text-xs uppercase tracking-wider text-muted-foreground">
            <div>Feature</div>
            <div className="text-center text-gradient-primary font-semibold">CS Studio</div>
            <div className="text-center">Traditional platforms</div>
          </div>
          {ROWS.map(([label, a, b], i) => (
            <div key={i} className="grid grid-cols-3 items-center border-b border-border/40 px-6 py-4 last:border-0 text-sm">
              <div>{label as string}</div>
              <div className="flex justify-center">
                {a ? <Check className="h-5 w-5 text-[oklch(0.78_0.18_150)]" /> : <X className="h-5 w-5 text-muted-foreground" />}
              </div>
              <div className="flex justify-center">
                {b ? <Check className="h-5 w-5 text-muted-foreground" /> : <X className="h-5 w-5 text-muted-foreground/60" />}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
