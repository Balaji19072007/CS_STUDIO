import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, Globe, Sparkles } from "lucide-react";

const content = [
  {
    title: "Write code anywhere.",
    description: "Our interactive Cloud IDE instantly spins up environments in Java, Python, C++, and more. No local setup required, just start coding.",
    content: (
      <div className="h-full w-full rounded-xl bg-[#0B1527] p-6 border border-white/10 shadow-2xl flex flex-col justify-center items-center">
        <Code2 className="w-16 h-16 text-[#00D2FF] mb-4" />
        <h3 className="text-xl font-mono text-white">Instant Environments</h3>
      </div>
    ),
  },
  {
    title: "Master the algorithms.",
    description: "Interactive visualizers break down complex data structures and algorithms step-by-step so you deeply understand what's happening under the hood.",
    content: (
      <div className="h-full w-full rounded-xl bg-gradient-to-br from-[#8B5CF6]/20 to-transparent p-6 border border-[#8B5CF6]/30 shadow-2xl flex flex-col justify-center items-center">
        <Globe className="w-16 h-16 text-[#8B5CF6] mb-4" />
        <h3 className="text-xl font-mono text-white">Visual Learning</h3>
      </div>
    ),
  },
  {
    title: "Compete and grow.",
    description: "Join global challenges, climb the leaderboard, and showcase your verified certificates to top employers around the world.",
    content: (
      <div className="h-full w-full rounded-xl bg-gradient-to-br from-[#D946EF]/20 to-transparent p-6 border border-[#D946EF]/30 shadow-2xl flex flex-col justify-center items-center">
        <Sparkles className="w-16 h-16 text-[#D946EF] mb-4" />
        <h3 className="text-xl font-mono text-white">Global Arena</h3>
      </div>
    ),
  },
];

export const FeatureSlides = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-background">
      <div className="sticky top-0 h-screen flex items-center px-6 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
          {/* Left: Text Content */}
          <div className="relative h-[400px] flex items-center">
            {content.map((item, i) => {
              const step = 1 / content.length;
              const start = i * step;
              const end = start + step;
              
              // Only fade in when it's the active item
              const opacity = useTransform(
                scrollYProgress,
                [Math.max(0, start - 0.1), start, end - 0.1, Math.min(1, end)],
                [0, 1, 1, 0]
              );
              
              const y = useTransform(
                scrollYProgress,
                [Math.max(0, start - 0.1), start, end - 0.1, Math.min(1, end)],
                [20, 0, 0, -20]
              );

              return (
                <motion.div
                  key={i}
                  style={{ opacity, y }}
                  className="absolute inset-0 flex flex-col justify-center pointer-events-none"
                >
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                    {item.title}
                  </h2>
                  <p className="text-xl text-[#8F9BB3] leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Right: Visual Content */}
          <div className="relative h-[400px] w-full rounded-2xl overflow-hidden hidden md:block">
            {content.map((item, i) => {
              const step = 1 / content.length;
              const start = i * step;
              const end = start + step;
              
              const opacity = useTransform(
                scrollYProgress,
                [Math.max(0, start - 0.05), start + 0.05, end - 0.05, Math.min(1, end + 0.05)],
                [0, 1, 1, 0]
              );
              
              const scale = useTransform(
                scrollYProgress,
                [start, start + 0.1],
                [0.9, 1]
              );

              return (
                <motion.div
                  key={i}
                  style={{ opacity, scale }}
                  className="absolute inset-0 w-full h-full"
                >
                  {item.content}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
