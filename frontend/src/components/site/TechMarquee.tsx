const TECH = ["React", "Java", "Python", "Node.js", "MongoDB", "Docker", "Git", "Tailwind CSS", "TypeScript", "PostgreSQL", "Next.js", "Kubernetes"];

export function TechMarquee() {
  const list = [...TECH, ...TECH];
  return (
    <section className="relative overflow-hidden py-16">
      <div className="absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />
      <p className="mb-6 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">Built for the modern stack</p>
      <div className="flex w-max marquee gap-6">
        {list.map((t, i) => (
          <div key={i} className="glass rounded-xl px-6 py-3 text-sm font-medium whitespace-nowrap">
            {t}
          </div>
        ))}
      </div>
    </section>
  );
}
