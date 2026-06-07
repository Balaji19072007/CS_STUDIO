import { motion } from "framer-motion";
import { Activity, GitPullRequest, Award, Sparkles } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const FEED = [
  { icon: Award, who: "Sofia", what: "earned the Python Mastery certificate", time: "2m" },
  { icon: GitPullRequest, who: "Aarav", what: "shipped a portfolio project to the gallery", time: "8m" },
  { icon: Sparkles, who: "Yuki", what: "completed the Full Stack roadmap", time: "12m" },
  { icon: Activity, who: "Priya", what: "solved 5 Hard problems in a row", time: "20m" },
  { icon: Award, who: "Daniel", what: "ranked #3 on this week's leaderboard", time: "1h" },
];

export function Community() {
  return (
    <section id="community" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Community"
          title="Build with thousands of developers in motion"
          subtitle="Real-time activity, peer reviews, and a culture of shipping."
        />
        <div className="glass-strong gradient-border mx-auto max-w-3xl rounded-2xl p-6">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[oklch(0.78_0.18_150)] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[oklch(0.78_0.18_150)]" />
              </span>
              Live activity
            </h3>
            <span className="text-xs text-muted-foreground">Updated just now</span>
          </div>
          <div className="space-y-2">
            {FEED.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-4 rounded-xl bg-background/40 p-3"
                >
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-primary/40 to-accent/40">
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="flex-1 text-sm">
                    <span className="font-medium">{f.who}</span>{" "}
                    <span className="text-muted-foreground">{f.what}</span>
                  </p>
                  <span className="text-xs text-muted-foreground">{f.time}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
