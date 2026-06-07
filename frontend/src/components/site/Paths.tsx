import { motion } from "framer-motion";
import { Layout, Coffee, FileCode2, Layers } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const PATHS = [
  { icon: Layout, title: "Frontend Developer", steps: ["HTML/CSS", "JavaScript", "React", "UI Engineering"], color: "from-[oklch(0.75_0.20_330)] to-[oklch(0.70_0.20_280)]" },
  { icon: Coffee, title: "Java Developer", steps: ["Core Java", "OOP & DSA", "Spring Boot", "System Design"], color: "from-[oklch(0.75_0.20_50)] to-[oklch(0.70_0.18_25)]" },
  { icon: FileCode2, title: "Python Developer", steps: ["Syntax", "Data Structures", "Django/FastAPI", "ML Basics"], color: "from-[oklch(0.75_0.20_200)] to-[oklch(0.70_0.20_240)]" },
  { icon: Layers, title: "Full Stack Engineer", steps: ["Frontend", "Backend APIs", "Databases", "DevOps"], color: "from-[oklch(0.75_0.20_150)] to-[oklch(0.70_0.18_200)]" },
];

export function Paths() {
  return (
    <section id="paths" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Learning paths"
          title="Roadmaps that take you from zero to job-ready"
          subtitle="Structured, project-driven tracks designed by senior engineers."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PATHS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                whileHover={{ y: -6 }}
                className="glass-strong gradient-border group relative rounded-2xl p-6 transition"
              >
                <div className={`mb-5 inline-grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${p.color} shadow-glow`}>
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <ul className="mt-4 space-y-2">
                  {p.steps.map((s, idx) => (
                    <li key={s} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="grid h-6 w-6 place-items-center rounded-full border border-border text-xs">{idx + 1}</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
