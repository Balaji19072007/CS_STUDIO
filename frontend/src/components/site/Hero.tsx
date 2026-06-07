import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Code2, Globe, Terminal } from "lucide-react";
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
            <span className="text-white">Build.</span>{" "}
            <span className="bg-gradient-to-r from-[#00D2FF] to-[#3A7BD5] bg-clip-text text-transparent">Learn.</span>{" "}
            <span className="text-[#A3B8CC]">Compete.</span>
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
            <button className="group inline-flex items-center gap-2 rounded-2xl bg-[#00D2FF] px-6 py-3 text-sm font-medium text-black shadow-[0_0_20px_rgba(0,210,255,0.3)] transition hover:bg-[#00b8e6] hover:scale-[1.02]">
              Start Learning
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </button>
            <button className="rounded-2xl border border-white/5 bg-[#0A0F1A] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#111827]">
              Explore Challenges
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-10 flex items-center gap-6 text-xs text-[#8F9BB3]"
          >
            <div className="flex -space-x-2">
              {[
                "#8B5CF6", // Purple
                "#0EA5E9", // Blue
                "#D946EF", // Pink
                "#10B981", // Green
              ].map((color, i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-background shadow-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            Loved by 50,000+<br />developers worldwide
          </motion.div>
        </div>
        <CodeMockup />
      </div>
    </section>
  );
}
