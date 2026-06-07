import { motion } from "framer-motion";
import { Flame, Trophy, Star, Zap } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const BOARD = [
  { rank: 1, name: "Aarav Mehta", xp: 28420, badge: "Grandmaster" },
  { rank: 2, name: "Sofia Chen", xp: 26110, badge: "Master" },
  { rank: 3, name: "Daniel Okoye", xp: 24890, badge: "Master" },
  { rank: 4, name: "Yuki Tanaka", xp: 22340, badge: "Expert" },
  { rank: 5, name: "Priya Rao", xp: 21005, badge: "Expert" },
];

const CHALLENGES = [
  { title: "Two Sum II", diff: "Easy", xp: 50, color: "text-[oklch(0.78_0.18_150)]" },
  { title: "LRU Cache", diff: "Medium", xp: 150, color: "text-[oklch(0.80_0.18_80)]" },
  { title: "Median of Streams", diff: "Hard", xp: 300, color: "text-[oklch(0.72_0.22_25)]" },
];

export function Arena() {
  return (
    <section id="arena" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Competitive arena"
          title="Climb the global leaderboard"
          subtitle="Daily challenges, weekly contests, XP, and badges that fuel your growth."
        />
        <div className="grid gap-6 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-strong gradient-border lg:col-span-3 rounded-2xl p-6"
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-lg font-semibold"><Trophy className="h-5 w-5 text-accent" /> Global Leaderboard</h3>
              <span className="glass rounded-full px-3 py-1 text-xs">This week</span>
            </div>
            <div className="space-y-2">
              {BOARD.map((u, i) => (
                <motion.div
                  key={u.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center justify-between rounded-xl bg-background/40 px-4 py-3 hover:bg-background/60 transition"
                >
                  <div className="flex items-center gap-4">
                    <span className={`grid h-9 w-9 place-items-center rounded-lg font-semibold ${
                      u.rank === 1 ? "bg-gradient-to-br from-[oklch(0.85_0.18_85)] to-[oklch(0.65_0.18_50)] text-background"
                      : u.rank === 2 ? "bg-gradient-to-br from-[oklch(0.85_0.02_250)] to-[oklch(0.60_0.02_250)] text-background"
                      : u.rank === 3 ? "bg-gradient-to-br from-[oklch(0.70_0.15_50)] to-[oklch(0.50_0.12_40)] text-background"
                      : "bg-secondary text-muted-foreground"
                    }`}>{u.rank}</span>
                    <div>
                      <div className="text-sm font-medium">{u.name}</div>
                      <div className="text-xs text-muted-foreground">{u.badge}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-gradient-primary">
                    <Zap className="h-4 w-4 text-accent" /> {u.xp.toLocaleString()} XP
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-strong gradient-border rounded-2xl p-6"
            >
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold"><Flame className="h-5 w-5 text-accent" /> Featured Challenges</h3>
              <div className="space-y-3">
                {CHALLENGES.map((c) => (
                  <div key={c.title} className="flex items-center justify-between rounded-xl bg-background/40 p-3">
                    <div>
                      <div className="text-sm font-medium">{c.title}</div>
                      <div className={`text-xs ${c.color}`}>{c.diff}</div>
                    </div>
                    <span className="text-xs text-muted-foreground">+{c.xp} XP</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-strong gradient-border rounded-2xl p-6"
            >
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold"><Star className="h-5 w-5 text-accent" /> Achievements</h3>
              <div className="grid grid-cols-4 gap-3">
                {[280, 200, 330, 150, 80, 50, 240, 20].map((h) => (
                  <div key={h} className="aspect-square rounded-xl p-[1px]" style={{ background: `conic-gradient(from 0deg, oklch(0.75 0.20 ${h}), oklch(0.55 0.20 ${h + 60}), oklch(0.75 0.20 ${h}))` }}>
                    <div className="grid h-full w-full place-items-center rounded-[10px] bg-card text-xs">
                      <Trophy className="h-4 w-4 text-accent" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
