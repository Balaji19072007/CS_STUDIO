import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Aurora } from "./Aurora";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-32">
      <Aurora />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-semibold tracking-tight md:text-6xl text-gradient"
        >
          Your next breakthrough<br />starts with one line of code.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-6 max-w-xl text-muted-foreground"
        >
          Join 50,000+ developers building, learning, and competing on CS Studio.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          <button className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-8 py-4 text-base font-medium text-primary-foreground shadow-glow transition hover:scale-[1.02]">
            Get Started — It's Free
            <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
          </button>
          <button className="glass-strong rounded-xl px-8 py-4 text-base font-medium transition hover:bg-card">
            Talk to the team
          </button>
        </motion.div>
      </div>
    </section>
  );
}
