import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const T = [
  { quote: "CS Studio replaced 4 different tools for me. The IDE alone is worth it, and the challenges keep me sharp.", name: "Aarav Mehta", role: "SDE II · Razorpay" },
  { quote: "The roadmaps gave me clarity I never had in college. I shipped 6 projects and landed my first offer in 4 months.", name: "Sofia Chen", role: "Frontend Engineer · Linear" },
  { quote: "It feels like Linear and LeetCode had a baby. The community is unreal — every PR review teaches me something new.", name: "Daniel Okoye", role: "Full Stack · Stripe" },
];

export function Testimonials() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Loved by developers" title="Stories from the community" />
        <div className="grid gap-6 md:grid-cols-3">
          {T.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-strong gradient-border rounded-2xl p-7"
            >
              <Quote className="h-7 w-7 text-accent" />
              <p className="mt-4 text-sm leading-relaxed text-foreground/90">"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3 border-t border-border/60 pt-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent" />
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
