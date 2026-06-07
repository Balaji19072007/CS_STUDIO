import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SectionHeader } from "./SectionHeader";

function Bars({ seed }: { seed: number }) {
  const [bars, setBars] = useState<number[]>([]);
  useEffect(() => {
    const arr = Array.from({ length: 18 }, () => Math.random() * 100 + 10);
    setBars(arr);
    let sorted = [...arr];
    let i = 0;
    const interval = setInterval(() => {
      sorted = [...sorted].sort((a, b) => (i % 2 ? a - b : Math.random() - 0.5));
      setBars([...sorted]);
      i++;
      if (i > 8) clearInterval(interval);
    }, 600);
    return () => clearInterval(interval);
  }, [seed]);
  return (
    <div className="flex h-32 items-end gap-1.5">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          layout
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          className="flex-1 rounded-t-md bg-gradient-to-t from-primary to-accent"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

export function AlgoVisualizer() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Algorithm visualizer"
          title="See algorithms come to life"
          subtitle="Interactive visualizations for sorting, searching, graphs, and more."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {["Quick Sort", "Merge Sort", "Binary Search"].map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-strong gradient-border rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold">{name}</h3>
              <p className="text-xs text-muted-foreground mb-4">O(n log n) · Animated</p>
              <Bars seed={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
