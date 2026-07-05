import { motion } from "framer-motion";
import { Coffee, FileCode2, Terminal, Cpu } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { Link } from "react-router-dom";

const COURSES = [
  { 
    id: "c-programming",
    icon: Terminal, 
    title: "C Programming", 
    desc: "Master the fundamentals of memory, pointers, and performance.", 
    color: "from-[oklch(0.75_0.20_200)] to-[oklch(0.70_0.20_240)]" 
  },
  { 
    id: "cpp-programming",
    icon: Cpu, 
    title: "C++ Masterclass", 
    desc: "Object-oriented design, STL, and advanced systems programming.", 
    color: "from-[oklch(0.75_0.20_330)] to-[oklch(0.70_0.20_280)]" 
  },
  { 
    id: "java-programming",
    icon: Coffee, 
    title: "Java Developer", 
    desc: "Core Java, OOP, Data Structures, and enterprise patterns.", 
    color: "from-[oklch(0.75_0.20_50)] to-[oklch(0.70_0.18_25)]" 
  },
  { 
    id: "python-programming",
    icon: FileCode2, 
    title: "Python for Engineering", 
    desc: "From basic syntax to algorithms, data handling, and automation.", 
    color: "from-[oklch(0.75_0.20_150)] to-[oklch(0.70_0.18_200)]" 
  },
];

export function FeaturedCourses() {
  return (
    <section id="courses" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Featured Courses"
          title="Master languages from the ground up"
          subtitle="Comprehensive, interactive courses designed to build real-world proficiency."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {COURSES.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                whileHover={{ y: -6 }}
                className="glass-strong gradient-border group relative rounded-2xl p-6 transition flex flex-col"
              >
                <div className={`mb-5 inline-grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${c.color} shadow-glow`}>
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground flex-1">
                  {c.desc}
                </p>
                <Link
                  to={`/courses/${c.id}`}
                  className="mt-6 inline-flex items-center justify-center rounded-lg bg-secondary/50 px-4 py-2 text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  View Course
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
