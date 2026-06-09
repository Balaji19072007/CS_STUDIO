import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString());
  useEffect(() => {
    if (inView) animate(mv, to, { duration: 1.8, ease: "easeOut" });
  }, [inView, to, mv]);
  return (
    <span ref={ref} className="text-4xl font-display font-semibold md:text-5xl text-gradient-primary">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

const ITEMS = [
  { value: 500, suffix: "+", label: "Coding Challenges" },
  { value: 100, suffix: "+", label: "Learning Modules" },
  { value: 5, suffix: "", label: "Languages Supported" },
  { value: 50, suffix: "K+", label: "Global Community" },
];

export function Metrics() {
  return (
    <section className="relative border-y border-border/60 bg-card/30 py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
        {ITEMS.map((it, i) => (
          <motion.div
            key={it.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="text-center"
          >
            <Counter to={it.value} suffix={it.suffix} />
            <p className="mt-2 text-sm text-muted-foreground">{it.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
