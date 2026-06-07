import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const CERTS = [
  { title: "Python Mastery", id: "CSS-PY-001247", color: "from-[oklch(0.75_0.20_200)] to-[oklch(0.55_0.20_240)]" },
  { title: "Full Stack Engineer", id: "CSS-FS-004821", color: "from-[oklch(0.75_0.20_280)] to-[oklch(0.55_0.22_330)]" },
  { title: "DSA Champion", id: "CSS-DSA-008812", color: "from-[oklch(0.78_0.18_80)] to-[oklch(0.60_0.20_30)]" },
];

export function Certificates() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Verified credentials"
          title="Certificates that recruiters trust"
          subtitle="Shareable, verifiable, and portfolio-ready."
        />
        <div className="grid gap-8 md:grid-cols-3">
          {CERTS.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ rotateY: 6, rotateX: -4, y: -6 }}
              style={{ transformStyle: "preserve-3d", perspective: 1000 }}
              className="glass-strong gradient-border relative overflow-hidden rounded-2xl p-7"
            >
              <div className={`absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${c.color} opacity-40 blur-2xl`} />
              <div className="flex items-center justify-between">
                <div className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${c.color} shadow-glow`}>
                  <ShieldCheck className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="glass rounded-full px-2.5 py-1 text-[10px] font-medium text-[oklch(0.78_0.18_150)]">VERIFIED</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold">{c.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">Issued by CS Studio · 2026</p>
              <div className="mt-6 flex items-end justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Credential ID</div>
                  <div className="font-mono text-xs">{c.id}</div>
                </div>
                <div className="h-10 w-10 rounded border border-border bg-background/60" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
