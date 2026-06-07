import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Aurora } from "./Aurora";
import { Particles } from "./Particles";
import { CodeMockup } from "./CodeMockup";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-32 pb-20">
      <Aurora />
      <Particles count={40} />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted-foreground"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            New · AI Career Roadmaps & Project Generator
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl"
          >
            <span className="text-gradient">Build.</span>{" "}
            <span className="text-gradient-primary">Learn.</span>{" "}
            <span className="text-gradient">Compete.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground"
          >
            One ecosystem for every developer — a cloud IDE, structured learning paths,
            global challenges, a builder community, and AI tools that grow your career.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <button className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition hover:scale-[1.02]">
              Start Learning
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </button>
            <button className="glass-strong rounded-xl px-6 py-3 text-sm font-medium text-foreground transition hover:bg-card">
              Explore Challenges
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-10 flex items-center gap-6 text-xs text-muted-foreground"
          >
            <div className="flex -space-x-2">
              {[280, 200, 330, 150].map((h) => (
                <div
                  key={h}
                  className="h-8 w-8 rounded-full border-2 border-background"
                  style={{ background: `linear-gradient(135deg, oklch(0.75 0.18 ${h}), oklch(0.6 0.2 ${h + 30}))` }}
                />
              ))}
            </div>
            Loved by 50,000+ developers worldwide
          </motion.div>
        </div>
        <CodeMockup />
      </div>
    </section>
  );
}
