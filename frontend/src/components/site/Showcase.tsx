import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Globe, Trophy, Users, Award } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const TABS = [
  { id: "ide", label: "Cloud IDE", icon: Terminal, body: { title: "Multi-language Cloud IDE", desc: "Java, Python, C, C++, JavaScript — instant containers, zero setup.", chips: ["Real-time compiler", "Auto-save", "Shareable workspaces"] } },
  { id: "web", label: "Web Studio", icon: Globe, body: { title: "Live HTML/CSS/JS Studio", desc: "Build websites in the browser with live preview and one-click deploy.", chips: ["Live preview", "Snippets", "Deploy"] } },
  { id: "ch", label: "Challenges", icon: Trophy, body: { title: "500+ Coding Challenges", desc: "From warm-ups to contest-grade problems with editorial solutions.", chips: ["DSA", "Contests", "Editorial"] } },
  { id: "co", label: "Community", icon: Users, body: { title: "Builder Community", desc: "Pair, review, and ship together. A culture of relentless improvement.", chips: ["Reviews", "Squads", "Showcases"] } },
  { id: "ce", label: "Certificates", icon: Award, body: { title: "Verified Certificates", desc: "Earn shareable certificates verified on a public ledger.", chips: ["Verified", "Shareable", "Portfolio-ready"] } },
];

export function Showcase() {
  const [tab, setTab] = useState(TABS[0].id);
  const active = TABS.find((t) => t.id === tab)!;

  // Auto-rotate tabs every 5 seconds
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTab((current) => {
        const currentIndex = TABS.findIndex((t) => t.id === current);
        return TABS[(currentIndex + 1) % TABS.length].id;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  return (
    <section id="product" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="One platform"
          title={<>Every tool a developer needs<br />in a single workspace</>}
          subtitle="Switch between writing code, learning concepts, and competing — without losing flow."
        />
        <div className="glass-strong shadow-elegant gradient-border rounded-3xl p-2">
          <div className="flex flex-wrap gap-1 rounded-2xl p-2 border-b border-white/5">
            {TABS.map((t) => {
              const Icon = t.icon;
              const isActive = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`relative flex flex-1 min-w-[140px] items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                    isActive ? "text-always-white" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="tab-bg"
                      className="absolute inset-0 rounded-xl bg-[#133F53] shadow-[0_0_15px_rgba(19,63,83,0.5)]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 flex items-center gap-2 ${isActive ? "text-always-white" : ""}`}>
                    {t.id === "ide" ? <span className={`font-mono ${isActive ? "text-always-white" : ""}`}>{">_"}</span> : <Icon className="h-4 w-4" />} {t.label}
                  </span>
                </button>
              );
            })}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="grid gap-8 p-8 md:grid-cols-2 md:p-12"
            >
              <div className="flex flex-col justify-center">
                <h3 className="text-3xl font-display font-semibold tracking-tight text-foreground">{active.body.title}</h3>
                <p className="mt-4 text-muted-foreground">{active.body.desc}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {active.body.chips.map((c) => (
                    <span key={c} className="rounded-full bg-slate-900 border border-slate-800 px-3 py-1 text-xs text-always-white">{c}</span>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl border border-white/5 bg-[#0B1527] p-6 h-72 grid place-items-center text-center shadow-lg">
                  <div>
                    {tab === "ide" ? (
                      <div className="mx-auto text-4xl text-[#8B5CF6] mb-4 font-mono">{">_"}</div>
                    ) : (
                      <active.icon className="mx-auto h-12 w-12 text-[#8B5CF6] mb-4" />
                    )}
                    <p className="text-sm text-[#8F9BB3]">Interactive {active.label.toLowerCase()} preview</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
